import "../assets/css/NovaSenha.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

const IconFlameLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#00aaff" opacity="0.12" />
    <circle cx="24" cy="24" r="18" fill="#00aaff" opacity="0.20" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
  </svg>
);

const IconLock = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00aaff" strokeWidth="2" width="22" height="22">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" width="14" height="14">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ff4455" strokeWidth="2.5" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* Calcula força: 0 fraca | 1 média | 2 forte */
function senhaForca(s) {
  if (s.length === 0) return -1;
  let score = 0;
  if (s.length >= 8)  score++;
  if (s.length >= 12) score++;
  if (/[A-Z]/.test(s) && /[a-z]/.test(s)) score++;
  if (/[0-9]/.test(s)) score++;
  if (/[^A-Za-z0-9]/.test(s)) score++;
  if (score <= 2) return 0;
  if (score <= 3) return 1;
  return 2;
}

const FORCA_LABEL = ["Fraca", "Média", "Forte"];
const FORCA_CLASS = ["strength-weak", "strength-medium", "strength-strong"];
const FORCA_COLOR = ["#ff4455", "#ffb300", "#00e676"];

const isPassValid    = (v) => v.length >= 8;
const isConfirmValid = (p, c) => c.length > 0 && p === c;

function FieldStatus({ touched, valid }) {
  if (!touched) return null;
  return (
    <span className="field-status-icon">
      {valid ? <IconCheck /> : <IconX />}
    </span>
  );
}

function NovaSenha() {
  const navigate = useNavigate();

  const [senha,          setSenha]          = useState("");
  const [confirmar,      setConfirmar]      = useState("");
  const [showSenha,      setShowSenha]      = useState(false);
  const [showConfirmar,  setShowConfirmar]  = useState(false);
  const [senhaTouched,   setSenhaTouched]   = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [sucesso,        setSucesso]        = useState(false);

  const senhaOk   = isPassValid(senha);
  const confirmOk = isConfirmValid(senha, confirmar);
  const forca     = senhaForca(senha);

  const cls = (touched, valid) =>
    touched ? (valid ? "input-valid" : "input-invalid") : "";

  const salvar = (e) => {
    e.preventDefault();
    setSenhaTouched(true);
    setConfirmTouched(true);
    if (senhaOk && confirmOk) setSucesso(true);
  };

  return (
    <>
      <div className="nova-bg"></div>
      <div className="nova-overlay"></div>

      <div className="nova-green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00aaff" strokeWidth="1.5" fill="none" opacity="0.35" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.18" />
        </svg>
      </div>

      <div className="nova-wrapper">
        <section className="nova-left">
          <div className="nova-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name">ultragaz</span>
              <span className="logo-tagline">somando energias</span>
            </div>
          </div>

          <h1 className="nova-headline">
            Crie uma nova senha<br />
            e volte a acessar<br />
            sua <span className="highlight">conta.</span>
          </h1>

          <div className="headline-bar"></div>

          <p className="nova-desc">
            Escolha uma senha segura para proteger seus dados e continuar usando os serviços da Ultragaz com tranquilidade.
          </p>
        </section>

        <section className="nova-card">
          <div className="nova-mobile-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name mobile">ultragaz</span>
              <span className="logo-tagline mobile">somando energias</span>
            </div>
          </div>

          <div className="nova-card-icon">
            <IconShield />
          </div>

          <h2>Nova <span>senha</span></h2>
          <p className="nova-subtitle">
            Digite sua nova senha e confirme para concluir a redefinição.
          </p>

          <form onSubmit={salvar} noValidate>

            {/* Nova senha */}
            <label className="field-label">Nova senha</label>
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
                aria-label={showSenha ? "Ocultar" : "Mostrar"}>
                {showSenha ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            {/* Barra de força */}
            {senhaTouched && senha.length > 0 && (
              <div className="strength-wrap">
                <div className="strength-bars">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`strength-seg ${forca >= i ? FORCA_CLASS[forca] : ""}`} />
                  ))}
                </div>
                <span className="strength-label" style={{ color: FORCA_COLOR[forca] }}>
                  {FORCA_LABEL[forca]}
                </span>
              </div>
            )}
            {senhaTouched && !senhaOk && senha.length > 0 && (
              <p className="field-hint field-hint--error">Mínimo de 8 caracteres ({senha.length}/8).</p>
            )}

            {/* Confirmar senha */}
            <label className="field-label">Confirmar senha</label>
            <div className={`input-wrapper ${cls(confirmTouched, confirmOk)}`}>
              <IconLock valid={confirmTouched && confirmOk} invalid={confirmTouched && !confirmOk} />
              <input
                type={showConfirmar ? "text" : "password"}
                placeholder="Confirme sua nova senha"
                value={confirmar}
                onChange={(e) => { setConfirmar(e.target.value); setConfirmTouched(true); }}
                onBlur={() => setConfirmTouched(true)}
                autoComplete="new-password"
              />
              <button type="button" className="toggle-password"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowConfirmar((v) => !v)}
                aria-label={showConfirmar ? "Ocultar" : "Mostrar"}>
                {showConfirmar ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {confirmTouched && !confirmOk && confirmar.length > 0 && (
              <p className="field-hint field-hint--error">As senhas não coincidem.</p>
            )}

            {sucesso && (
              <div className="sucesso-nova">
                <IconCheck />
                Senha alterada com sucesso! Agora você já pode fazer login.
              </div>
            )}

            <button type="submit" className="btn-salvar-senha">
              <IconArrowRight />
              Salvar nova senha
            </button>
          </form>

          <div className="divider">ou</div>

          <Link to="/login" className="btn-voltar-login">
            Voltar para login
          </Link>

          <button type="button" className="btn-ir-recuperar"
            onClick={() => navigate("/esqueci-senha")}>
            Recuperar senha novamente
          </button>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default NovaSenha;