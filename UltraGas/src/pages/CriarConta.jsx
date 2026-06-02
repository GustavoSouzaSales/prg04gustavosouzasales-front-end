import "../assets/css/criarConta.css";
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

/* Ícone do nome */
const IconUser = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#10b981" : invalid ? "#ef4444" : "#9ca3af"}
    strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

/* Ícone da senha */
const IconLock = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#10b981" : invalid ? "#ef4444" : "#9ca3af"}
    strokeWidth="2" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* Ícone para mostrar senha */
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* Ícone para ocultar senha */
const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* Ícone do botão */
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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

/* Funções simples de validação */
const isEmailValid  = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPassValid   = (v) => v.length >= 8;
const isNomeValid   = (v) => v.trim().length >= 3;
const isConfirmValid = (p, c) => c.length > 0 && p === c;

/* Mostra check ou X depois que o campo foi tocado */
function FieldStatus({ touched, valid }) {
  if (!touched) return null;
  return (
    <span className="field-status-icon">
      {valid ? <IconCheck /> : <IconX />}
    </span>
  );
}

function CriarConta() {
  const navigate = useNavigate();

  /* Estados dos campos */
  const [nome,           setNome]           = useState("");
  const [email,          setEmail]          = useState("");
  const [senha,          setSenha]          = useState("");
  const [confirmar,      setConfirmar]      = useState("");
  const [showSenha,      setShowSenha]      = useState(false);
  const [showConfirmar,  setShowConfirmar]  = useState(false);

  /* Controla se o usuário já mexeu no campo */
  const [nomeTouched,     setNomeTouched]     = useState(false);
  const [emailTouched,    setEmailTouched]    = useState(false);
  const [senhaTouched,    setSenhaTouched]    = useState(false);
  const [confirmTouched,  setConfirmTouched]  = useState(false);

  /* Resultado das validações */
  const nomeOk    = isNomeValid(nome);
  const emailOk   = isEmailValid(email);
  const senhaOk   = isPassValid(senha);
  const confirmOk = isConfirmValid(senha, confirmar);

  /* Define a classe visual do input */
  const cls = (touched, valid) =>
    touched ? (valid ? "input-valid" : "input-invalid") : "";

  /* Valida tudo ao enviar */
  function handleSubmit(e) {
    e.preventDefault();
    setNomeTouched(true);
    setEmailTouched(true);
    setSenhaTouched(true);
    setConfirmTouched(true);
    if (nomeOk && emailOk && senhaOk && confirmOk) navigate("/login");
  }

  return (
    <>
      {/* Fundo da tela */}
      <div className="criar-bg"></div>
      <div className="criar-overlay"></div>

      {/* Linha verde decorativa */}
      <div className="criar-green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00e5b4" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.25" />
        </svg>
      </div>

      <div className="criar-wrapper">

        {/* Lado esquerdo da tela */}
        <section className="criar-left">
          <div className="criar-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name">ultragaz</span>
              <span className="logo-tagline">somando energias</span>
            </div>
          </div>

          <h1 className="criar-headline">
            Crie sua conta<br />
            e peça seu gás<br />
            com mais <span className="highlight">facilidade.</span>
          </h1>

          <div className="headline-bar"></div>

          <p className="criar-desc">
            Cadastre-se para acompanhar seus pedidos,<br />
            salvar seus dados e comprar com mais praticidade.
          </p>
        </section>

        {/* Card branco do cadastro */}
        <section className="criar-card">

          {/* Logo exibida no mobile */}
          <div className="criar-mobile-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name mobile">ultragaz</span>
              <span className="logo-tagline mobile">somando energias</span>
            </div>
          </div>

          <h2>Criar <span>conta</span></h2>
          <p className="criar-subtitle">
            Preencha seus dados para começar
          </p>

          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Campo nome */}
            <label className="field-label">Nome completo</label>
            <div className={`input-wrapper ${cls(nomeTouched, nomeOk)}`}>
              <IconUser valid={nomeTouched && nomeOk} invalid={nomeTouched && !nomeOk} />
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => { setNome(e.target.value); setNomeTouched(true); }}
                onBlur={() => setNomeTouched(true)}
              />
              <FieldStatus touched={nomeTouched} valid={nomeOk} />
            </div>
            {nomeTouched && !nomeOk && (
              <p className="field-hint field-hint--error">Digite seu nome completo.</p>
            )}

            {/* Campo e-mail */}
            <label className="field-label">E-mail</label>
            <div className={`input-wrapper ${cls(emailTouched, emailOk)}`}>
              <IconMail valid={emailTouched && emailOk} invalid={emailTouched && !emailOk} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailTouched(true); }}
                onBlur={() => setEmailTouched(true)}
                autoComplete="email"
              />
              <FieldStatus touched={emailTouched} valid={emailOk} />
            </div>
            {emailTouched && !emailOk && (
              <p className="field-hint field-hint--error">Digite um e-mail válido.</p>
            )}

            {/* Campo senha */}
            <label className="field-label">Senha</label>
            <div className={`input-wrapper ${cls(senhaTouched, senhaOk)}`}>
              <IconLock valid={senhaTouched && senhaOk} invalid={senhaTouched && !senhaOk} />
              <input
                type={showSenha ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setSenhaTouched(true); }}
                onBlur={() => setSenhaTouched(true)}
                autoComplete="new-password"
              />
              <button type="button" className="toggle-password"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowSenha((v) => !v)}
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}>
                {showSenha ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {senhaTouched && (
              <div className="password-strength">
                <div className={`password-strength-bar ${
                  senha.length === 0 ? "" : senha.length < 8 ? "strength-weak" : "strength-ok"
                }`} />
              </div>
            )}
            {senhaTouched && !senhaOk && senha.length > 0 && (
              <p className="field-hint field-hint--error">
                Mínimo de 8 caracteres ({senha.length}/8).
              </p>
            )}

            {/* Campo confirmar senha */}
            <label className="field-label">Confirmar senha</label>
            <div className={`input-wrapper ${cls(confirmTouched, confirmOk)}`}>
              <IconLock valid={confirmTouched && confirmOk} invalid={confirmTouched && !confirmOk} />
              <input
                type={showConfirmar ? "text" : "password"}
                placeholder="Digite a senha novamente"
                value={confirmar}
                onChange={(e) => { setConfirmar(e.target.value); setConfirmTouched(true); }}
                onBlur={() => setConfirmTouched(true)}
                autoComplete="new-password"
              />
              <button type="button" className="toggle-password"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowConfirmar((v) => !v)}
                aria-label={showConfirmar ? "Ocultar senha" : "Mostrar senha"}>
                {showConfirmar ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {confirmTouched && !confirmOk && confirmar.length > 0 && (
              <p className="field-hint field-hint--error">As senhas não conferem.</p>
            )}

            {/* Botão de envio */}
            <button type="submit" className="btn-criar-conta">
              <IconArrowRight />
              Criar conta
            </button>
          </form>

          <div className="divider">ou</div>

          {/* Volta para login */}
          <Link to="/login" className="btn-voltar-login">
            Já tenho uma conta
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default CriarConta;