import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/home.css";

import { Link } from "react-router-dom";
import previewImg from "../assets/images/preview.webp";
import NavBar from "../components/NavBar";

/* Ícone de notificações */
const IconBell = ({ size = 22, color = "#374151" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* Ícone de seta */
const IconArrow = ({ size = 16, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" width={size} height={size}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* Ícone de pedido */
const IconOrder = ({ size = 22, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

/* Ícone de entrega */
const IconTruck = ({ size = 22, color = "#16a34a" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* Ícone de endereço */
const IconMap = ({ size = 22, color = "#7c3aed" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* Ícone de repetir pedido */
const IconRepeat = ({ size = 22, color = "#d97706" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

function Home() {
  return (
    <div className="db-root">
      {/* Menu lateral/inferior */}
      <NavBar page="db" active="home" />

      <main className="db-main">
        {/* Cabeçalho */}
        <header className="db-header">
          <div>
            <h1 className="db-header-title">
              Bem-vindo, <span className="db-header-brand">Gustavo!</span> 👋
            </h1>

            <p className="db-header-sub">
              Acompanhe seus pedidos, endereços e peça seu gás com praticidade.
            </p>
          </div>

          {/* Botão de notificações */}
          <button className="db-bell-btn" aria-label="Notificações">
            <IconBell size={20} color="#374151" />
            <span className="db-bell-badge">2</span>
          </button>
        </header>

        {/* Banner principal */}
        <section
          className="db-hero"
          style={{
            backgroundImage: `url(${previewImg})`,
          }}
        >
          <div className="db-hero-text">
            <h2 className="db-hero-title">
              Energia que move<br />
              o que <span className="db-hero-highlight">importa.</span>
            </h2>

            <p className="db-hero-desc">
              Peça seu gás com segurança,<br />
              rapidez e acompanhamento.
            </p>

            <Link to="/pedido" className="db-hero-btn">
              Novo pedido <IconArrow size={15} color="white" />
            </Link>
          </div>
        </section>

        {/* Cards de resumo */}
        <section className="db-stats">
          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--blue">
              <IconOrder size={22} color="#0044e0" />
            </div>

            <div className="db-stat-body">
              <div className="db-stat-label">Último pedido</div>
              <div className="db-stat-value">#003</div>
              <div className="db-stat-period">P45 Azul</div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--green">
              <IconTruck size={22} color="#16a34a" />
            </div>

            <div className="db-stat-body">
              <div className="db-stat-label">Status atual</div>
              <div className="db-stat-value db-stat-value--text">Em entrega</div>
              <div className="db-stat-period">A caminho do endereço</div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--purple">
              <IconMap size={22} color="#7c3aed" />
            </div>

            <div className="db-stat-body">
              <div className="db-stat-label">Endereço principal</div>
              <div className="db-stat-value db-stat-value--text">Casa</div>
              <div className="db-stat-period">Praça da Sé, 100</div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--yellow">
              <IconRepeat size={22} color="#d97706" />
            </div>

            <div className="db-stat-body">
              <div className="db-stat-label">Pedido rápido</div>
              <div className="db-stat-value db-stat-value--text">P13 Azul</div>
              <div className="db-stat-period">Pedir novamente</div>
            </div>
          </div>
        </section>

        {/* Ações rápidas */}
        <section className="db-actions">
          <div className="db-action-card">
            <h3>Meus pedidos</h3>
            <p>Veja seu histórico e acompanhe pedidos em andamento.</p>
            <Link to="/perfil" className="db-action-link">
              Ver pedidos
            </Link>
          </div>

          <div className="db-action-card">
            <h3>Meus endereços</h3>
            <p>Gerencie seus endereços salvos para facilitar entregas futuras.</p>
            <Link to="/perfil" className="db-action-link">
              Ver endereços
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;