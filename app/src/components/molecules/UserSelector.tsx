import { useState, useRef, useEffect } from "react";
import AdvancedSelect from "../atoms/Select";
import { Toggle } from "../atoms/Toggle";
import { Button } from "../atoms/Button";
import type { UserBase } from "../../utils/hooks/useActiveUser";

type UserSelectorProps = {
  users: UserBase[];
  activeUserId: string | null;
  onSelectUser: (id: string, password?: string) => boolean;
  isDark: boolean;
  onToggleDark: () => void;
  loading?: boolean;
  error?: Error;
};

export function UserSelector({
  users,
  activeUserId,
  onSelectUser,
  isDark,
  onToggleDark,
  loading = false,
  error,
}: UserSelectorProps) {
  // Utente in attesa di conferma password
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pendingUser = pendingId ? users.find((u) => u.id === pendingId) : null;

  // Focus automatico sull'input password quando appare
  useEffect(() => {
    if (pendingId) {
      setPwd("");
      setPwdError(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [pendingId]);

  const options = users.map((u) => ({
    value: u.id,
    label: u.nickname ?? `${u.name} ${u.surname}`,
  }));

  const handleChange = (id: string) => {
    const user = users.find((u) => u.id === id);
    console.log("us", user)
    if (!user) return;

    const hasPassword = (user.password ?? "").trim().length > 0;
    if (hasPassword) {
      // Mostra il pannello password inline
      setPendingId(id);
    } else {
      onSelectUser(id);
    }
  };

  const handleConfirmPassword = () => {
    if (!pendingId) return;
    const ok = onSelectUser(pendingId, pwd);
    if (ok) {
      setPendingId(null);
    } else {
      setPwdError(true);
      setPwd("");
      inputRef.current?.focus();
    }
  };

  const handleCancelPassword = () => {
    setPendingId(null);
    setPwd("");
    setPwdError(false);
  };

  return (
    <div
      className="flex flex-col gap-2 px-3 py-3 border-t shrink-0"
      style={{ borderColor: "color-mix(in srgb, var(--color-foreground) 8%, transparent)" }}
    >
      {error && (
        <p className="text-xs" style={{ color: "#ef4444" }}>
          Errore caricamento utenti
        </p>
      )}

      {/* Pannello password inline — reso sopra la select per evitare overflow */}
      {pendingUser && (
        <div
          className="flex flex-col gap-2 p-2 rounded-lg"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-foreground) 6%, transparent)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
            Password per <strong>{pendingUser.nickname ?? pendingUser.name}</strong>
          </p>
          <input
            ref={inputRef}
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setPwdError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleConfirmPassword()}
            placeholder="Password..."
            className="input-base text-sm"
            style={pwdError ? { borderColor: "#ef4444" } : undefined}
          />
          {pwdError && (
            <p className="text-xs" style={{ color: "#ef4444" }}>
              Password errata
            </p>
          )}
          <div className="flex gap-2">
            <Button label="Accedi" onClick={handleConfirmPassword} size="sm" fullWidth />
            <Button label="Annulla" onClick={handleCancelPassword} variant="ghost" size="sm" fullWidth />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <AdvancedSelect
            options={options}
            value={activeUserId ?? ""}
            onChange={(v) => handleChange(v as string)}
            placeholder={loading ? "Caricamento..." : "Utente..."}
            clearable
            loading={loading}
            direction="up"
          />
        </div>
        <Toggle value={isDark} onChange={onToggleDark} />
      </div>
    </div>
  );
}
