import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Tipi definiti localmente per evitare dipendenza da @/types
export type AdvancedSelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type AdvancedSelectGroup = {
  label: string;
  options: AdvancedSelectOption[];
};

export type AdvancedSelectProps = {
  options: AdvancedSelectOption[] | AdvancedSelectGroup[];
  value?: string | string[];
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  labelDisabled?: boolean;
  variant?: "default" | "compact";
  onSearch?: (query: string) => void;
  minSearchChars?: number;
  maxItems?: number;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  sortedOptions?: boolean;
  icon?: React.ReactNode;
  direction?: "down" | "up";
  onChange?: (value: string | string[]) => void;
};

// Verifica se l'array di opzioni è composto da gruppi
function isGrouped(
  opts: AdvancedSelectOption[] | AdvancedSelectGroup[]
): opts is AdvancedSelectGroup[] {
  return opts.length > 0 && "options" in opts[0];
}

// Appiattisce i gruppi in un array piatto (utile per cercare un'opzione per valore)
function flattenOptions(
  opts: AdvancedSelectOption[] | AdvancedSelectGroup[]
): AdvancedSelectOption[] {
  if (isGrouped(opts)) return opts.flatMap((g) => g.options);
  return opts as AdvancedSelectOption[];
}

export default function AdvancedSelect({
  options,
  value,
  placeholder,
  multiple = false,
  searchable = false,
  labelDisabled = false,
  variant = "default",
  onSearch,
  minSearchChars = 3,
  maxItems,
  disabled = false,
  clearable = false,
  loading = false,
  sortedOptions = false,
  icon,
  direction = "down",
  onChange,
}: AdvancedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, bottom: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalizza il valore in array per semplificare la logica interna
  const selectedValues: string[] = multiple
    ? ((value as string[] | undefined) ?? [])
    : value !== undefined && value !== ""
      ? [value as string]
      : [];

  const allOptions = flattenOptions(options);

  // Risolve i valori selezionati in oggetti opzione completi
  const selectedOptions = selectedValues
    .map((v) => allOptions.find((o) => o.value === v))
    .filter((o): o is AdvancedSelectOption => Boolean(o));

  const isMaxReached = multiple && maxItems !== undefined && selectedValues.length >= maxItems;
  const isAsyncMode = Boolean(onSearch);
  const showSearch = searchable || isAsyncMode;
  const hasValue = selectedValues.length > 0;

  // Calcola la posizione del dropdown in base al container corrente (fixed = relativo al viewport)
  const updateDropdownPos = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom,
      bottom: window.innerHeight - rect.top,
      left: rect.left,
      width: rect.width,
    });
  };

  // ResizeObserver: aggiorna sempre le dimensioni del container (anche dopo il layout del CSS Grid)
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(updateDropdownPos);
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Aggiorna posizione sullo scroll quando il dropdown è aperto
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updateDropdownPos, true);
    return () => window.removeEventListener("scroll", updateDropdownPos, true);
  }, [isOpen]);

  const handleOpen = () => {
    if (disabled || (multiple && isMaxReached)) return;
    updateDropdownPos();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleToggle = () => (isOpen ? handleClose() : handleOpen());

  // Chiude il dropdown al click fuori dal container e dal dropdown stesso
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Focus automatico sulla searchbar all'apertura del dropdown
  useEffect(() => {
    if (isOpen && showSearch) {
      setTimeout(() => searchInputRef.current?.focus({ preventScroll: true }), 0);
    }
  }, [isOpen, showSearch]);

  // Aggiunge un'opzione alla selezione
  const handleSelect = (option: AdvancedSelectOption) => {
    if (option.disabled || (multiple && isMaxReached)) return;
    if (multiple) {
      onChange?.([...selectedValues, option.value]);
    } else {
      onChange?.(option.value);
      handleClose();
    }
    setSearchQuery("");
  };

  // Rimuove un'opzione dalla selezione multipla
  const handleRemove = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange?.(selectedValues.filter((v) => v !== optionValue));
  };

  // Svuota completamente la selezione corrente
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : "");
  };

  // Gestisce la ricerca: chiama onSearch se in modalità asincrona, altrimenti filtra client-side
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (isAsyncMode && query.length >= minSearchChars) {
      onSearch!(query);
    }
  };

  // Filtra un array di opzioni: esclude i selezionati (in multi), applica la ricerca e ordina alfabeticamente
  const filterOptions = (opts: AdvancedSelectOption[]) =>
    opts
      .filter((opt) => {
        if (multiple && selectedValues.includes(opt.value)) return false;
        if (!isAsyncMode && searchQuery) {
          return opt.label.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => {
        if (!sortedOptions) return 0;
        // Le opzioni disabilitate restano sempre in fondo
        if (a.disabled && !b.disabled) return 1;
        if (!a.disabled && b.disabled) return -1;
        return a.label.localeCompare(b.label);
      });

  // Verifica se c'è almeno un'opzione visibile nel dropdown (per mostrare il messaggio "nessun risultato")
  const hasVisibleOptions = isGrouped(options)
    ? options.some((g) => filterOptions(g.options).length > 0)
    : filterOptions(options as AdvancedSelectOption[]).length > 0;

  // Renderizza una singola voce del dropdown
  const renderOption = (option: AdvancedSelectOption) => (
    <button
      key={option.value}
      type="button"
      disabled={option.disabled}
      onClick={() => handleSelect(option)}
      className="w-full px-3 py-2 flex items-center gap-2 text-sm text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80"
      style={{ color: "var(--color-foreground)", backgroundColor: "transparent" }}
    >
      {option.icon && <span className="shrink-0">{option.icon}</span>}
      {!labelDisabled && <span className="truncate">{option.label}</span>}
    </button>
  );

  // Renderizza la lista di opzioni (piatta o raggruppata per sezioni)
  const renderOptionList = () => {
    if (isGrouped(options)) {
      return options.map((group) => {
        const filtered = filterOptions(group.options);
        if (filtered.length === 0) return null;
        return (
          <div key={group.label}>
            <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide opacity-50" style={{ color: "var(--color-foreground)" }}>
              {group.label}
            </p>
            {filtered.map((opt) => renderOption(opt))}
          </div>
        );
      });
    }
    return filterOptions(options as AdvancedSelectOption[]).map((opt) =>
      renderOption(opt)
    );
  };

  // Badge riutilizzabile per gli elementi selezionati nell'input
  const renderInputBadge = (option: AdvancedSelectOption, withRemove: boolean, shrinkable = false) => (
    <div
      key={option.value}
      className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${shrinkable ? "min-w-0" : "shrink-0"}`}
      style={{ backgroundColor: "color-mix(in srgb, var(--color-foreground) 12%, transparent)", color: "var(--color-foreground)" }}
    >
      {option.icon && <span className="shrink-0 text-xs">{option.icon}</span>}
      <span className={`truncate ${shrinkable ? "min-w-0" : "max-w-[100px]"}`}>{option.label}</span>
      {withRemove && (
        <button
          type="button"
          onClick={(e) => handleRemove(e, option.value)}
          className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );

  // Contenuto dell'input in modalità multipla
  const renderMultiInput = () => {
    const first = selectedOptions[0];
    const remaining = selectedOptions.length - 1;
    return (
      <>
        {selectedOptions.length === 0 && (
          <span className="text-sm truncate opacity-40" style={{ color: "var(--color-foreground)" }}>{placeholder}</span>
        )}
        {first && renderInputBadge(first, true, true)}
        {remaining > 0 && (
          <div className="px-1.5 py-0.5 rounded text-xs shrink-0" style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)", color: "var(--color-primary)" }}>
            +{remaining}
          </div>
        )}
        {icon && maxItems !== undefined && (
          <div className="ml-auto flex items-center gap-1 text-xs opacity-50 shrink-0" style={{ color: "var(--color-foreground)" }}>
            {icon}
            <span>{selectedValues.length}/{maxItems}</span>
          </div>
        )}
      </>
    );
  };

  // Contenuto dell'input in modalità singola
  const renderSingleInput = () => {
    const selected = selectedOptions[0];
    return (
      <>
        {selected?.icon && <span className="shrink-0">{selected.icon}</span>}
        {!labelDisabled && (
          <span className={`text-sm truncate ${selected ? "" : "opacity-40"}`} style={{ color: "var(--color-foreground)" }}>
            {selected?.label ?? placeholder ?? "Seleziona..."}
          </span>
        )}
      </>
    );
  };

  // Rendering del dropdown (senza framer-motion — transizione CSS)
  const renderDropdown = () => (
    <div
      ref={dropdownRef}
      className={`fixed rounded-lg shadow-lg z-50 overflow-hidden ${direction === "up" ? "mb-1" : "mt-1"}`}
      style={{
        ...(direction === "up"
          ? { bottom: `${dropdownPos.bottom}px` }
          : { top: `${dropdownPos.top}px` }),
        left: `${dropdownPos.left}px`,
        width: `${dropdownPos.width}px`,
        backgroundColor: "var(--color-background)",
        border: "1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent)",
      }}
    >
      {/* Searchbar */}
      {showSearch && (
        <div className="px-2 pt-2 pb-1">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cerca..."
            className="input-base text-sm"
          />
        </div>
      )}

      {/* Lista opzioni e selezionati — unica area scrollabile */}
      <div className="max-h-[200px] overflow-y-auto overflow-x-hidden py-1">

        {/* Sezione elementi selezionati (solo in multiselect con almeno una selezione) */}
        {multiple && selectedOptions.length > 0 && (
          <>
            <div>
              <p className="px-3 pt-1 pb-1 text-xs uppercase tracking-wide opacity-50" style={{ color: "var(--color-foreground)" }}>
                Selezionati
              </p>
              {selectedOptions.map((opt) => (
                <div key={opt.value} className="w-full px-3 py-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                    <span className="truncate" style={{ color: "var(--color-foreground)" }}>{opt.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, opt.value)}
                    className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <hr style={{ borderColor: "color-mix(in srgb, var(--color-foreground) 10%, transparent)" }} className="mx-2 my-1" />
          </>
        )}

        {/* Titolo sezione "da selezionare" */}
        {multiple && selectedOptions.length > 0 && (
          <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide opacity-50" style={{ color: "var(--color-foreground)" }}>
            Da selezionare
          </p>
        )}

        {/* Hint: in modalità asincrona, prima di raggiungere i caratteri minimi */}
        {isAsyncMode && searchQuery.length < minSearchChars && (
          <p className="px-3 py-2 text-xs text-center opacity-50" style={{ color: "var(--color-foreground)" }}>
            Digita almeno {minSearchChars} caratteri
          </p>
        )}

        {/* Spinner: in modalità asincrona, durante il caricamento */}
        {isAsyncMode && loading && searchQuery.length >= minSearchChars && (
          <div className="flex justify-center py-3">
            <div className="w-4 h-4 rounded-full animate-spin border-2" style={{ borderColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)", borderTopColor: "var(--color-primary)" }} />
          </div>
        )}

        {/* Opzioni */}
        {(!isAsyncMode || (searchQuery.length >= minSearchChars && !loading)) && (
          <>
            {renderOptionList()}
            {!hasVisibleOptions && (
              <p className="px-3 py-2 text-sm text-center opacity-50" style={{ color: "var(--color-foreground)" }}>
                Nessun risultato
              </p>
            )}
          </>
        )}

      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={variant === "compact" ? "relative w-auto" : "relative w-full"}
    >
      {/* Trigger: click per aprire/chiudere il dropdown */}
      <div
        onClick={handleToggle}
        className={`input-base flex items-center gap-1 h-[38px] overflow-hidden cursor-pointer ${variant !== "compact" ? "justify-between" : ""} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
      >
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
          {multiple ? renderMultiInput() : renderSingleInput()}
        </div>

        {/* Controlli destra: clear + chevron */}
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {clearable && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              ✕
            </button>
          )}
          {!labelDisabled && (
            <span
              className="text-xs transition-transform duration-150"
              style={{
                color: "var(--color-foreground)",
                opacity: 0.5,
                display: "inline-block",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▾
            </span>
          )}
        </div>
      </div>

      {/* Dropdown reso via portal per evitare problemi di z-index */}
      {typeof window !== "undefined" &&
        createPortal(
          isOpen ? renderDropdown() : null,
          document.body
        )}
    </div>
  );
}
