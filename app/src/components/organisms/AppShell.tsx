import { NavMenu } from "./NavMenu";
import { Dashboard } from "./Dashboard";
import { Diary } from "./Diary";
import { Foods } from "./Foods";
import { UserDetails } from "./UserDetails";
import { UserSelector } from "../molecules/UserSelector";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { useActiveUser } from "../../utils/hooks/useActiveUser";
import { useDarkMode } from "../../utils/hooks/useDarkMode";
import type { NavSection } from "../../types/navigation.types";
import freedihare from "./../../../public/freedihare_logo.svg";

const sectionComponents: Record<NavSection, React.ReactNode> = {
  dashboard: <Dashboard />,
  diary: <Diary />,
  foods: <Foods />,
  user: <UserDetails />,
};

const NAV_ICONS: Record<NavSection, string> = {
  dashboard: "⊞",
  diary: "📅",
  foods: "🥗",
  user: "👤",
};

const NAV_LABELS: Record<NavSection, string> = {
  dashboard: "Home",
  diary: "Diario",
  foods: "Alimenti",
  user: "Profilo",
};

export function AppShell() {
  const { activeSection, navigate } = useNavigation();
  const { users, activeUserId, selectUser, loading: usersLoading, error: usersError } = useActiveUser();
  const activeUser = users.find((u) => u.id === activeUserId) ?? null;
  const { isDark, toggle: toggleDark } = useDarkMode();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-background)", color: "var(--color-foreground)" }}
    >
      {/* Topbar */}
      <header
        className="flex items-center gap-3 px-4 py-3 shadow-sm"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-foreground) 4%, var(--color-background))",
          borderBottom: "1px solid color-mix(in srgb, var(--color-foreground) 8%, transparent)",
        }}
      >
        <img src={freedihare} className="w-8 h-8" alt="Freedihare logo" />
        <h1 className="text-lg font-bold" style={{ color: "var(--color-foreground)" }}>
          Freedihare
        </h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="ml-auto p-1.5 rounded-lg cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "var(--color-foreground)", opacity: 0.5 }}
          title="Aggiorna"
        >
          ↺
        </button>

        {activeUser && (
          <p className="text-sm" style={{ color: "var(--color-foreground)", opacity: 0.6 }}>
            Benvenuto, <span className="font-semibold" style={{ opacity: 1 }}>
              {activeUser.nickname ?? activeUser.name}
            </span>
          </p>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        <aside
          className="hidden md:flex flex-col w-52 shrink-0 border-r"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-foreground) 3%, var(--color-background))",
            borderColor: "color-mix(in srgb, var(--color-foreground) 8%, transparent)",
          }}
        >
          {/* Navigazione — si espande per occupare lo spazio disponibile */}
          <div className="flex-1 overflow-y-auto">
            <NavMenu activeSection={activeSection} onNavigate={navigate} />
          </div>

          {/* Selettore utente + dark mode — fisso in fondo alla sidebar */}
          <UserSelector
            users={users}
            activeUserId={activeUserId}
            onSelectUser={selectUser}
            isDark={isDark}
            onToggleDark={toggleDark}
            loading={usersLoading}
            error={usersError}
          />
        </aside>

        {/* Area contenuto principale — key forza il remount quando cambia utente */}
        <main key={activeUserId ?? "__no_user__"} className="flex-1 overflow-y-auto">
          {sectionComponents[activeSection]}
        </main>
      </div>

      {/* Bottom navigation (mobile) */}
      <nav
        className="flex flex-col md:hidden border-t"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-foreground) 3%, var(--color-background))",
          borderColor: "color-mix(in srgb, var(--color-foreground) 8%, transparent)",
        }}
      >
        {/* Selettore utente + dark mode anche su mobile */}
        <UserSelector
          users={users}
          activeUserId={activeUserId}
          onSelectUser={selectUser}
          isDark={isDark}
          onToggleDark={toggleDark}
        />

        {/* Tab bar */}
        <div className="flex">
          {(["dashboard", "diary", "foods", "user"] as NavSection[]).map((section) => {
            const isActive = section === activeSection;
            return (
              <button
                key={section}
                type="button"
                onClick={() => navigate(section)}
                className="flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium cursor-pointer transition-colors"
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-foreground)" }}
              >
                <span className="text-lg">{NAV_ICONS[section]}</span>
                <span>{NAV_LABELS[section]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
