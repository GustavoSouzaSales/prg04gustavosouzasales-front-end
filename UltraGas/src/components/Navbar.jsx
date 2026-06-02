import { Link } from "react-router-dom";
import "./NavBar.css";

/* Ícone da marca */
const IconFlame = () => (
  <svg viewBox="0 0 48 48" fill="none" width="28" height="28">
    <circle cx="24" cy="24" r="24" fill="#1a6aff" opacity="0.2" />
    <circle cx="24" cy="24" r="18" fill="#1a6aff" opacity="0.3" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
  </svg>
);

/* Ícone Home */
const IconHome = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.55)"} strokeWidth="2" width="18" height="18">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

/* Ícone Pedidos */
const IconClipboard = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.55)"} strokeWidth="2" width="18" height="18">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

/* Ícone Perfil */
const IconProfile = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.55)"} strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* Ícone Admin */
const IconUsers = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.55)"} strokeWidth="2" width="18" height="18">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* Ícone do botão login */
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="13" height="13">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* Links do menu */
const navItems = [
  { key: "home",   to: "/home",   label: "Home",    Icon: IconHome },
  { key: "pedido", to: "/pedido", label: "Pedidos", Icon: IconClipboard },
  { key: "perfil", to: "/perfil", label: "Perfil",  Icon: IconProfile },
  { key: "admin",  to: "/admin",  label: "Admin",   Icon: IconUsers },
];

function NavBar({ page = "db", active = "home" }) {
  return (
    <aside className="nb-sidebar">

      {/* Círculos decorativos */}
      <div className="nb-deco-circle nb-deco-circle--1" />
      <div className="nb-deco-circle nb-deco-circle--2" />

      <div className="nb-top">
        {/* Marca */}
        <div className="nb-brand">
          <div className="nb-brand-icon">
            <IconFlame />
          </div>
          <div className="nb-brand-text">
            <span className="nb-brand-name">ultragaz</span>
            <span className="nb-brand-tagline">somando energias</span>
          </div>
        </div>

        {/* Linha separadora */}
        <div className="nb-separator" />

        {/* Links de navegação */}
        <nav className="nb-nav">
          {navItems.map(({ key, to, label, Icon }) => {
            const isActive = active === key;

            return (
              <Link
                key={key}
                to={to}
                className={`nb-nav-item ${isActive ? "nb-nav-item--active" : ""}`}
              >
                {isActive && <span className="nb-nav-pill" />}

                <span className="nb-nav-icon">
                  <Icon active={isActive} />
                </span>

                <span className="nb-nav-label">{label}</span>

                {isActive && <span className="nb-nav-dot" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Card de login */}
      <div className="nb-login-card">
        <div className="nb-login-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="1.5" width="28" height="28">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div className="nb-login-info">
          <span className="nb-login-label">Acesse sua conta</span>
          <span className="nb-login-sub">Faça login para continuar</span>
        </div>

        <Link to="/login" className="nb-login-btn">
          <IconLock />
          LOGIN
        </Link>
      </div>

    </aside>
  );
}

export default NavBar;