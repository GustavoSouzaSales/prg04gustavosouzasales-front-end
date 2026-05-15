import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/home.css";

import { Link } from "react-router-dom";
import fundogas from "../assets/images/fundogas.webp";

/* ── Ícones SVG inline ─────────────────────── */
const IconFlame = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M12 2C9 7 6 9 6 13a6 6 0 0 0 12 0c0-4-3-6-6-11z" fill="#1a6aff"/>
    <path d="M12 6c-1.5 3-3 4.5-3 6.5a3 3 0 0 0 6 0C15 10.5 13.5 9 12 6z" fill="#00e5b4" opacity="0.85"/>
  </svg>
);

const IconShield = ({ color = "#0044e0", size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const IconUsers = ({ color = "#0044e0", size = 36 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" width={size} height={size}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCart = ({ color = "#16a34a", size = 36 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" width={size} height={size}>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const IconLock = ({ color = "#dc2626", size = 36 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" width={size} height={size}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconClock = ({ color = "#0044e0", size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconBadgeCheck = ({ color = "#0044e0", size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const IconHeadphones = ({ color = "#0044e0", size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const IconGas = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width={size} height={size}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <circle cx="12" cy="14" r="3"/>
  </svg>
);

const IconUser = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width={size} height={size}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ── Componente principal ───────────────────── */
function Home() {
  return (
    <div className="home-root">

      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="home-navbar-inner">
          <Link to="/home" className="home-nav-brand">
            <IconFlame />
            <span>Ultra<span className="brand-blue">Gás</span></span>
          </Link>
          <div className="home-nav-links">
            <Link to="/pedido" className="home-nav-link">Pedido</Link>
            <Link to="/admin" className="home-nav-link">Admin</Link>
            <Link to="/login" className="home-nav-btn">
              <IconUser size={16} />
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — fundo completo com a imagem da botija */}
      <section
        className="home-hero"
        style={{
          backgroundImage: `url(${fundogas})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* overlay suave só do lado esquerdo para manter legibilidade do texto */}
        <div className="home-hero-overlay">
          <div className="home-hero-inner">
            <div className="home-hero-text">
              <h1 className="home-hero-title">
                A solução completa<br/>
                para o <span className="hero-highlight">seu gás</span>
              </h1>
              <p className="home-hero-desc">
                Peça seu gás de forma rápida e segura.<br/>
                Qualidade, confiança e praticidade que<br/>
                cabem no seu dia a dia.
              </p>
              <Link to="/pedido" className="home-hero-btn">
                <IconGas size={18} />
                Fazer pedido agora
              </Link>
            </div>

            {/* Card flutuante — lado direito sobre a imagem */}
            <div className="home-hero-right">
              <div className="hero-float-card">
                <div className="hero-float-icon">
                  <IconShield color="#0044e0" size={28} />
                </div>
                <div>
                  <strong>Segurança e qualidade<br/>em cada entrega</strong>
                  <span>Produto certificado e<br/>entrega garantida.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS DE SEÇÕES */}
      <section className="home-cards-section">
        <div className="home-cards-grid">

          {/* Admin */}
          <div className="home-card">
            <div className="home-card-icon home-card-icon--blue">
              <IconUsers color="#0044e0" size={36} />
            </div>
            <div className="home-card-body">
              <h3 className="home-card-title">Admin</h3>
              <p className="home-card-desc">Visualize e gerencie usuários cadastrados no sistema.</p>
              <Link to="/admin" className="home-card-btn home-card-btn--blue">
                Acessar
              </Link>
            </div>
          </div>

          {/* Pedido */}
          <div className="home-card">
            <div className="home-card-icon home-card-icon--green">
              <IconCart color="#16a34a" size={36} />
            </div>
            <div className="home-card-body">
              <h3 className="home-card-title">Pedido</h3>
              <p className="home-card-desc">Faça seu pedido de gás de forma rápida e prática.</p>
              <Link to="/pedido" className="home-card-btn home-card-btn--green">
                Acesse aqui
              </Link>
            </div>
          </div>

          {/* Login */}
          <div className="home-card">
            <div className="home-card-icon home-card-icon--red">
              <IconLock color="#dc2626" size={36} />
            </div>
            <div className="home-card-body">
              <h3 className="home-card-title">Login</h3>
              <p className="home-card-desc">Acesse sua conta ou cadastre-se para continuar.</p>
              <Link to="/login" className="home-card-btn home-card-btn--red">
                Entrar
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* BARRA DE DIFERENCIAIS */}
      <section className="home-features-bar">
        <div className="home-features-grid">
          <div className="home-feature-item">
            <IconShield color="#0044e0" size={24} />
            <div>
              <strong>Segurança</strong>
              <span>Entrega segura e profissional</span>
            </div>
          </div>
          <div className="home-feature-item">
            <IconClock color="#0044e0" size={24} />
            <div>
              <strong>Agilidade</strong>
              <span>Pedido rápido e sem complicação</span>
            </div>
          </div>
          <div className="home-feature-item">
            <IconBadgeCheck color="#0044e0" size={24} />
            <div>
              <strong>Qualidade</strong>
              <span>Produto de qualidade com garantia</span>
            </div>
          </div>
          <div className="home-feature-item">
            <IconHeadphones color="#0044e0" size={24} />
            <div>
              <strong>Suporte</strong>
              <span>Atendimento rápido e humanizado</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-footer-logo">
          <IconFlame />
          <span>Ultra<span className="brand-blue">Gás</span></span>
        </div>
        <p>© 2024 UltraGás. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}

export default Home;