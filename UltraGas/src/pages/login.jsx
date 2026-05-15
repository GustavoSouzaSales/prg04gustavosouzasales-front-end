import "../assets/css/login.css";
import LoginForm from "../components/LoginForm";

/* ── Ícone principal da marca ── */
const IconFlameLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#1a6aff" opacity="0.15" />
    <circle cx="24" cy="24" r="18" fill="#1a6aff" opacity="0.25" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
  </svg>
);

/* ── Ícones usados no lado esquerdo ── */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="20" height="20">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="20" height="20">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.31 6.31l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00e5b4" strokeWidth="2" width="20" height="20">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

/* ── Ícones da barra inferior ── */
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconTruckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <path d="M12 22V12M12 12C12 7 17 2 22 2c0 5-5 10-10 10zM12 12C12 7 7 2 2 2c0 5 5 10 10 10z" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

function Login() {
  return (
    <>
      {/* Fundo principal da tela */}
      <div className="login-page-bg"></div>

      {/* Linhas verdes decorativas */}
      <div className="green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00e5b4" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.25" />
        </svg>
      </div>

      <div className="green-curve-right">
        <svg viewBox="0 0 120 900" preserveAspectRatio="none">
          <path d="M 120 0 Q -30 300 60 600 Q 150 750 80 900" stroke="#00e5b4" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </div>

      {/* Conteúdo principal da página */}
      <div className="login-page-wrapper">
        <div className="login-main-row">

          {/* Lado esquerdo com logo, texto e benefícios */}
          <div className="login-left">
            <div className="ultragaz-logo">
              <div className="logo-icon">
                <IconFlameLogo />
              </div>

              <div className="logo-text-group">
                <span className="logo-name">ultragaz</span>
                <span className="logo-tagline">somando energias</span>
              </div>
            </div>

            <h1 className="login-headline">
              Energia que move<br />
              sua casa, seu negócio<br />
              e o que <span className="highlight">te conecta.</span>
            </h1>

            <div className="headline-bar"></div>

            {/* Lista de vantagens */}
            <ul className="feature-list">
              <li>
                <div className="feature-icon">
                  <IconShield />
                </div>
                <div className="feature-text">
                  <strong>Segurança garantida</strong>
                  <span>Padrão UltraGás de qualidade</span>
                </div>
              </li>

              <li>
                <div className="feature-icon">
                  <IconTruck />
                </div>
                <div className="feature-text">
                  <strong>Entrega rápida</strong>
                  <span>Mais agilidade para o seu dia</span>
                </div>
              </li>

              <li>
                <div className="feature-icon">
                  <IconPhone />
                </div>
                <div className="feature-text">
                  <strong>Atendimento próximo</strong>
                  <span>Sempre que você precisar</span>
                </div>
              </li>
            </ul>

            {/* Card de destaque */}
            <div className="feature-card-highlight">
              <div className="icon-tag">
                <IconTag />
              </div>
              <div>
                <strong>Facilidade que rende mais</strong>
                <span>Peça seu gás com poucos cliques e acompanhe tudo por aqui!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior com informações rápidas */}
        <div className="bottom-bar">
          <div className="bottom-bar-item">
            <div className="bicon">
              <IconClock />
            </div>
            <div className="btext">
              <strong>Confiança que vem<br />de longe</strong>
              <span>Mais de 85 anos de história</span>
            </div>
          </div>

          <div className="bottom-bar-item">
            <div className="bicon">
              <IconTruckSmall />
            </div>
            <div className="btext">
              <strong>Presente em todo<br />o Brasil</strong>
              <span>Energia para milhões de lares</span>
            </div>
          </div>

          <div className="bottom-bar-item">
            <div className="bicon">
              <IconLeaf />
            </div>
            <div className="btext">
              <strong>Sustentabilidade<br />que transforma</strong>
              <span>Compromisso com o futuro</span>
            </div>
          </div>

          <div className="bottom-bar-item">
            <div className="bicon">
              <IconZap />
            </div>
            <div className="btext">
              <strong>Inovação que<br />facilita sua vida</strong>
              <span>Tecnologia a serviço de você</span>
            </div>
          </div>
        </div>
      </div>

      {/* Caixa branca do formulário */}
      <div className="login-right-panel">
        <div className="mobile-logo">
          <IconFlameLogo />
          <div className="logo-text-group">
            <span className="logo-name">ultragaz</span>
            <span className="logo-tagline">somando energias</span>
          </div>
        </div>

        <h2>
          Bem-vindo <span>de volta!</span>
        </h2>

        <p className="login-subtitle">
          Acesse sua conta para continuar
        </p>

        {/* Formulário separado em componente */}
        <LoginForm />
      </div>
    </>
  );
}

export default Login;