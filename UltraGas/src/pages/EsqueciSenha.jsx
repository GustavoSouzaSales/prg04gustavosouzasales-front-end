import "../assets/css/EsqueciSenha.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

/* Ícone principal da marca */
const IconFlameLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#1a6aff" opacity="0.15" />
    <circle cx="24" cy="24" r="18" fill="#1a6aff" opacity="0.25" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
  </svg>
);

/* Ícone do e-mail */
const IconMail = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#10b981" : invalid ? "#ef4444" : "#9ca3af"}
    strokeWidth="2" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* Ícone do botão */
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* Ícone de segurança */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="22" height="22">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/* Ícone de campo válido */
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" width="14" height="14">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* Ícone de campo inválido */
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function EsqueciSenha() {
  const navigate = useNavigate();

  /* Estados do formulário */
  const [email,        setEmail]        = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [enviado,      setEnviado]      = useState(false);

  /* Validação do e-mail */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailState = emailTouched ? (emailValid ? "valid" : "invalid") : "";

  /* Envia o formulário e navega */
  const enviarEmail = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!emailValid) return;
    setEnviado(true);
    navigate("/nova-senha");
  };

  return (
    <>
      {/* Fundo da tela */}
      <div className="esqueci-bg"></div>
      <div className="esqueci-overlay"></div>

      {/* Linha verde decorativa */}
      <div className="esqueci-green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00e5b4" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.25" />
        </svg>
      </div>

      <div className="esqueci-wrapper">

        {/* Lado esquerdo */}
        <section className="esqueci-left">
          <div className="esqueci-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name">ultragaz</span>
              <span className="logo-tagline">somando energias</span>
            </div>
          </div>

          <h1 className="esqueci-headline">
            Esqueceu sua senha?<br />
            A gente te ajuda<br />
            a <span className="highlight">recuperar.</span>
          </h1>

          <div className="headline-bar"></div>

          <p className="esqueci-desc">
            Informe o e-mail cadastrado na sua conta para receber as instruções de redefinição de senha com segurança.
          </p>
        </section>

        {/* Card principal */}
        <section className="esqueci-card">

          {/* Logo exibida no mobile */}
          <div className="esqueci-mobile-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name mobile">ultragaz</span>
              <span className="logo-tagline mobile">somando energias</span>
            </div>
          </div>

          {/* Ícone de destaque */}
          <div className="esqueci-card-icon">
            <IconShield />
          </div>

          <h2>Recuperar <span>senha</span></h2>

          <p className="esqueci-subtitle">
            Digite seu e-mail e enviaremos as instruções para redefinir sua senha.
          </p>

          {/* Formulário */}
          <form onSubmit={enviarEmail} noValidate>

            <label className="field-label">E-mail cadastrado</label>

            {/* Campo de e-mail */}
            <div className={`input-wrapper ${emailState ? `input-${emailState}` : ""}`}>
              <IconMail valid={emailState === "valid"} invalid={emailState === "invalid"} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailTouched(true); }}
                onBlur={() => setEmailTouched(true)}
                autoComplete="email"
              />
              {emailTouched && (
                <span className="field-status-icon">
                  {emailValid ? <IconCheck /> : <IconX />}
                </span>
              )}
            </div>

            {/* Mensagem de erro */}
            {emailState === "invalid" && (
              <p className="field-hint field-hint--error">Digite um e-mail válido.</p>
            )}

            {/* Mensagem de sucesso */}
            {enviado && (
              <div className="sucesso-esqueci">
                <IconCheck />
                Pronto! Enviamos as instruções para o seu e-mail.
              </div>
            )}

            {/* Botão de envio */}
            <button type="submit" className="btn-enviar-email">
              <IconArrowRight />
              Enviar instruções
            </button>
          </form>

          <div className="divider">ou</div>

          {/* Volta para login */}
          <Link to="/login" className="btn-voltar-login">
            Voltar para login
          </Link>

          {/* Vai para criar conta */}
          <button
            type="button"
            className="btn-ir-criar"
            onClick={() => navigate("/criar-conta")}
          >
            Criar nova conta
          </button>

        </section>
      </div>

      <Footer />
    </>
  );
}

export default EsqueciSenha;