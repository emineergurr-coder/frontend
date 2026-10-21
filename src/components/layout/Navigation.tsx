import { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  const navItems: { name: PageName; label: string }[] = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" },
  ];

  return (
    <nav className="menu">
      {navItems.map((item) => (
        <button
          key={item.name}
          aria-current={current === item.name ? "page" : undefined}
          onClick={() => onNavigate(item.name)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;