import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const IconFlame = () => (
  <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
    <circle cx="24" cy="24" r="24" fill="#00aaff" opacity="0.15" />
    <circle cx="24" cy="24" r="18" fill="#00aaff" opacity="0.22" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.95" />
  </svg>
);

const IconHome = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={active ? "#00aaff" : "rgba(139,163,199,0.7)"}
    strokeWidth="2" width="18" height="18">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconClipboard = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={active ? "#00aaff" : "rgba(139,163,199,0.7)"}
    strokeWidth="2" width="18" height="18">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconProfile = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={active ? "#00aaff" : "rgba(139,163,199,0.7)"}
    strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconUsers = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={active ? "#00aaff" : "rgba(139,163,199,0.7)"}
    strokeWidth="2" width="18" height="18">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconWarning = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

function NavBar({ page = "db", active = "home" }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const estaLogado = !!usuarioLogado?.id;
  const navigate = useNavigate();

  const [temNotificacaoNaoLida, setTemNotificacaoNaoLida] = useState(false);

  // Perfil incompleto = sem telefone
  const perfilIncompleto = !usuarioLogado?.telefone?.trim();

  useEffect(() => {
    async function verificarNotificacoes() {
      if (!usuarioLogado?.id) return;
      try {
        const resp = await apiFetch(`/notificacoes/usuario/${usuarioLogado.id}`);
        const lista = resp || [];
        setTemNotificacaoNaoLida(lista.some((n) => !n.lida));
      } catch {
        setTemNotificacaoNaoLida(false);
      }
    }
    verificarNotificacoes();
  }, [usuarioLogado?.id]);

  function sair() {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  const navItems = [
    { key: "home",   to: "/home",   label: "Home",    Icon: IconHome },
    { key: "pedido", to: "/pedido", label: "Pedidos", Icon: IconClipboard },
    { key: "perfil", to: "/perfil", label: "Perfil",  Icon: IconProfile },
  ];

  if (usuarioLogado?.tipoUsuario === "ADMINISTRADOR") {
    navItems.push({ key: "admin", to: "/admin", label: "Admin", Icon: IconUsers });
  }

  const iniciais = usuarioLogado?.nome
    ? usuarioLogado.nome.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <aside className="nb-sidebar">
      <div className="nb-deco-circle nb-deco-circle--1" />
      <div className="nb-deco-circle nb-deco-circle--2" />

      <div className="nb-top">
        {/* Marca */}
        <div className="nb-brand">
          <div className="nb-brand-icon"><IconFlame /></div>
          <div className="nb-brand-text">
            <span className="nb-brand-name">ultragaz</span>
            <span className="nb-brand-tagline">somando energias</span>
          </div>
        </div>

        {/* Card aviso perfil incompleto — só se logado */}
        {estaLogado && perfilIncompleto && (
          <div className="nb-profile-warning">
            <span className="nb-profile-warning-icon"><IconWarning /></span>
            <div className="nb-profile-warning-text">
              <strong>Complete seu perfil</strong>
              <span>Adicione seu telefone para aproveitar todos os recursos.</span>
            </div>
          </div>
        )}

        <div className="nb-separator" />

        {/* Nav */}
        <nav className="nb-nav">
          {navItems.map(({ key, to, label, Icon }) => {
            const isActive = active === key;
            const showDotHome   = key === "home"   && estaLogado && temNotificacaoNaoLida;
            const showDotPerfil = key === "perfil" && estaLogado && perfilIncompleto;
            return (
              <Link key={key} to={to}
                className={`nb-nav-item ${isActive ? "nb-nav-item--active" : ""}`}>
                {isActive && <span className="nb-nav-pill" />}
                <span className="nb-nav-icon" style={{ position: "relative" }}>
                  <Icon active={isActive} />
                  {(showDotHome || showDotPerfil) && (
                    <span className="nb-alert-dot" />
                  )}
                </span>
                <span className="nb-nav-label">{label}</span>
                {isActive && <span className="nb-nav-dot" />}
              </Link>
            );
          })}

          {/* Botão sair — mobile/tablet */}
          <button
            type="button"
            className={`nb-nav-item nb-login-nav-btn ${estaLogado ? "nb-nav-item--logout" : "nb-nav-item--login"}`}
            onClick={() => estaLogado ? sair() : navigate("/login")}
          >
            <span className="nb-nav-icon"><IconLogout /></span>
            <span className="nb-nav-label">{estaLogado ? "Sair" : "Login"}</span>
          </button>
        </nav>
      </div>

      {/* Card usuário — desktop */}
      <div className="nb-login-card">
  <div className="nb-user-avatar">
    <span className="nb-user-initials">
      {estaLogado ? iniciais : "V"}
    </span>
  </div>

  <div className="nb-user-info">
    <span className="nb-user-name">
      {estaLogado ? usuarioLogado.nome : "Visitante"}
    </span>
    <span className="nb-user-email">
      {estaLogado ? usuarioLogado.email : "Faça login para continuar"}
    </span>
  </div>

  <button
    type="button"
    className={`nb-logout-btn${estaLogado ? "" : " nb-login-variant"}`}
    onClick={() => estaLogado ? sair() : navigate("/login")}
  >
    <IconLogout />
    {estaLogado ? "SAIR" : "LOGIN"}
  </button>
</div>
    </aside>
  );
}

export default NavBar;