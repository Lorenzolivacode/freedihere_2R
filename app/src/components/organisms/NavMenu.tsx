import type { NavSection } from "../../types/navigation.types";

type NavMenuProps = {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
};

type NavItem = {
  section: NavSection;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { section: "dashboard", label: "Dashboard", icon: "⊞" },
  { section: "diary", label: "Diario", icon: "📅" },
  { section: "foods", label: "Alimenti", icon: "🥗" },
  { section: "user", label: "Profilo", icon: "👤" },
];

export function NavMenu({ activeSection, onNavigate }: NavMenuProps) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive = item.section === activeSection;
        return (
          <button
            key={item.section}
            type="button"
            onClick={() => onNavigate(item.section)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left"
            style={{
              backgroundColor: isActive
                ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
                : "transparent",
              color: isActive ? "var(--color-primary)" : "var(--color-foreground)",
            }}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
