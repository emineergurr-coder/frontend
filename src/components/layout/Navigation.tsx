import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <button
        type="button"
        aria-current={current === "home" ? "page" : undefined}
        onClick={() => onNavigate("home")}
      >
        Ana Sayfa
      </button>
      <button
        type="button"
        aria-current={current === "events" ? "page" : undefined}
        onClick={() => onNavigate("events")}
      >
        Etkinlikler
      </button>
      <button
        type="button"
        aria-current={current === "admin" ? "page" : undefined}
        onClick={() => onNavigate("admin")}
      >
        Yönetim
      </button>
      <button
        type="button"
        aria-current={current === "login" || current === "register" ? "page" : undefined}
        onClick={() => onNavigate("login")}
      >
        Giriş
      </button>
    </nav>
  );
}

export default Navigation;