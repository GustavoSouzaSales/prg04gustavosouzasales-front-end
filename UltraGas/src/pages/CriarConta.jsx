import "../assets/css/CriarConta.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { apiFetch } from "../services/api";

const IconFlameLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#00aaff" opacity="0.12" />
    <circle cx="24" cy="24" r="18" fill="#00aaff" opacity="0.20" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
  </svg>
);

const IconUser = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
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

const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

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

const isEmailValid   = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPassValid    = (v) => v.length >= 8;
const isNomeValid    = (v) => v.trim().length >= 3;
const isConfirmValid = (p, c) => c.length > 0 && p === c;

function FieldStatus({ touched, valid }) {
  if (!touched) return null;
  return (
    <span className="field-status-icon">
      {valid ? <IconCheck /> : <IconX />}
    </span>
  );
}

/* ─── Toast inline ─── */
const Toast = ({ msg, type }) => {
  const styles = {
    success: { bg: "rgba(0,230,118,0.12)", border: "rgba(0,230,118,0.35)", color: "#00e676" },
    error:   { bg: "rgba(255,68,85,0.12)", border: "rgba(255,68,85,0.35)",  color: "#ff4455" },
    warning: { bg: "rgba(255,179,0,0.12)", border: "rgba(255,179,0,0.35)",  color: "#ffb300" },
  };
  const s = styles[type] || styles.error;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      borderRadius: 10, padding: "10px 14px", marginBottom: 12,
      fontSize: 13, fontWeight: 600,
      animation: "ccToastIn 0.3s ease",
    }}>
      {type === "success"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
        : type === "warning"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      }
      {msg}
    </div>
  );
};

function CriarConta() {
  const navigate = useNavigate();

  const [nome,          setNome]          = useState("");
  const [email,         setEmail]         = useState("");
  const [senha,         setSenha]         = useState("");
  const [confirmar,     setConfirmar]     = useState("");
  const [showSenha,     setShowSenha]     = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [nomeTouched,    setNomeTouched]    = useState(false);
  const [emailTouched,   setEmailTouched]   = useState(false);
  const [senhaTouched,   setSenhaTouched]   = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [modalCodigo,   setModalCodigo]   = useState(false);
  const [codigo,        setCodigo]        = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [tempoRestante, setTempoRestante] = useState(60);
  const [toast,         setToast]         = useState(null);
  const [modalToast,    setModalToast]    = useState(null);

  const showToast      = (msg, type = "error") => setToast({ msg, type });
  const showModalToast = (msg, type = "error") => setModalToast({ msg, type });

  const nomeOk    = isNomeValid(nome);
  const emailOk   = isEmailValid(email);
  const senhaOk   = isPassValid(senha);
  const confirmOk = isConfirmValid(senha, confirmar);
  const forca     = senhaForca(senha);

  const cls = (touched, valid) =>
    touched ? (valid ? "input-valid" : "input-invalid") : "";

  async function handleSubmit(e) {
    e.preventDefault();
    setNomeTouched(true);
    setEmailTouched(true);
    setSenhaTouched(true);
    setConfirmTouched(true);
    if (!nomeOk || !emailOk || !senhaOk || !confirmOk) {
      showToast("Preencha todos os campos corretamente.", "warning");
      return;
    }
    try {
      await apiFetch("/auth/cadastrar", {
        method: "POST",
        body: JSON.stringify({ nome, email, senha }),
      });
      setEmailCadastro(email);
      setTempoRestante(60);
      setModalCodigo(true);
    } catch (error) {
      showToast(error.message || "Erro ao criar conta.", "error");
    }
  }

  useEffect(() => {
    if (!modalCodigo || tempoRestante <= 0) return;
    const timer = setInterval(() => setTempoRestante((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [modalCodigo, tempoRestante]);

  async function verificarCodigo() {
    try {
      await apiFetch("/auth/verificar-codigo", {
        method: "POST",
        body: JSON.stringify({ email: emailCadastro, codigo }),
      });
      showModalToast("Conta verificada com sucesso!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showModalToast(error.message || "Código inválido ou expirado.", "error");
    }
  }

  async function reenviarCodigo() {
    try {
      await apiFetch("/auth/reenviar-codigo", {
        method: "POST",
        body: JSON.stringify({ email: emailCadastro }),
      });
      setTempoRestante(60);
      showModalToast("Novo código enviado para seu e-mail!", "success");
    } catch (error) {
      showModalToast(error.message || "Erro ao reenviar código.", "error");
    }
  }

  return (
    <>
      <div className="criar-bg"></div>
      <div className="criar-overlay"></div>

      <div className="criar-green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00e5b4" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.25" />
        </svg>
      </div>

      <div className="criar-wrapper">
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

        <section className="criar-card">
          <div className="criar-mobile-logo">
            <IconFlameLogo />
            <div className="logo-text-group">
              <span className="logo-name mobile">ultragaz</span>
              <span className="logo-tagline mobile">somando energias</span>
            </div>
          </div>

          <h2>Criar <span>conta</span></h2>
          <p className="criar-subtitle">Preencha seus dados para começar</p>

          {/* Toast formulário */}
          {toast && <Toast msg={toast.msg} type={toast.type} />}

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <label className="field-label">Nome completo</label>
            <div className={`input-wrapper ${cls(nomeTouched, nomeOk)}`}>
              <IconUser valid={nomeTouched && nomeOk} invalid={nomeTouched && !nomeOk} />
              <input type="text" placeholder="Digite seu nome" value={nome}
                onChange={(e) => { setNome(e.target.value); setNomeTouched(true); }}
                onBlur={() => setNomeTouched(true)} />
              <FieldStatus touched={nomeTouched} valid={nomeOk} />
            </div>
            {nomeTouched && !nomeOk && (
              <p className="field-hint field-hint--error">Digite seu nome completo (mín. 3 letras).</p>
            )}

            {/* E-mail */}
            <label className="field-label">E-mail</label>
            <div className={`input-wrapper ${cls(emailTouched, emailOk)}`}>
              <IconMail valid={emailTouched && emailOk} invalid={emailTouched && !emailOk} />
              <input type="email" placeholder="seu@email.com" value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailTouched(true); }}
                onBlur={() => setEmailTouched(true)} autoComplete="email" />
              <FieldStatus touched={emailTouched} valid={emailOk} />
            </div>
            {emailTouched && !emailOk && (
              <p className="field-hint field-hint--error">Digite um e-mail válido.</p>
            )}

            {/* Senha */}
            <label className="field-label">Senha</label>
            <div className={`input-wrapper ${cls(senhaTouched, senhaOk)}`}>
              <IconLock valid={senhaTouched && senhaOk} invalid={senhaTouched && !senhaOk} />
              <input type={showSenha ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={senha}
                onChange={(e) => { setSenha(e.target.value); setSenhaTouched(true); }}
                onBlur={() => setSenhaTouched(true)} autoComplete="new-password" />
              <button type="button" className="toggle-password"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowSenha((v) => !v)}>
                {showSenha ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {senhaTouched && senha.length > 0 && (
              <div className="strength-wrap">
                <div className="strength-bars">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`strength-seg ${forca >= i ? FORCA_CLASS[forca] : ""}`} />
                  ))}
                </div>
                <span className="strength-label" style={{ color: FORCA_COLOR[forca] }}>{FORCA_LABEL[forca]}</span>
              </div>
            )}
            {senhaTouched && !senhaOk && senha.length > 0 && (
              <p className="field-hint field-hint--error">Mínimo de 8 caracteres ({senha.length}/8).</p>
            )}

            {/* Confirmar senha */}
            <label className="field-label">Confirmar senha</label>
            <div className={`input-wrapper ${cls(confirmTouched, confirmOk)}`}>
              <IconLock valid={confirmTouched && confirmOk} invalid={confirmTouched && !confirmOk} />
              <input type={showConfirmar ? "text" : "password"} placeholder="Digite a senha novamente" value={confirmar}
                onChange={(e) => { setConfirmar(e.target.value); setConfirmTouched(true); }}
                onBlur={() => setConfirmTouched(true)} autoComplete="new-password" />
              <button type="button" className="toggle-password"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setShowConfirmar((v) => !v)}>
                {showConfirmar ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {confirmTouched && !confirmOk && confirmar.length > 0 && (
              <p className="field-hint field-hint--error">As senhas não conferem.</p>
            )}

            <button type="submit" className="btn-criar-conta">
              <IconArrowRight />
              Criar conta
            </button>
          </form>

          <div className="divider">ou</div>

          <Link to="/login" className="btn-voltar-login">
            Já tenho uma conta
          </Link>
        </section>
      </div>

      {/* ─── Modal verificação de código ─── */}
      {modalCodigo && (
        <div className="codigo-overlay" onClick={() => setModalCodigo(false)}>
          <div className="codigo-modal" onClick={(e) => e.stopPropagation()}>

            {/* Botão fechar */}
            <button className="codigo-close" onClick={() => setModalCodigo(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Ícone topo */}
            <div className="codigo-icon-wrap">
              <div className="codigo-icon-ring">
                <IconShieldCheck />
              </div>
            </div>

            <h2>Verificação de E-mail</h2>
            <p>Enviamos um código de 6 dígitos para</p>
            <strong className="codigo-email">{emailCadastro}</strong>

            {/* Toast do modal */}
            {modalToast && <Toast msg={modalToast.msg} type={modalToast.type} />}

            {/* Input único estilizado */}
            <input
              className="codigo-input-real"
              type="text"
              inputMode="numeric"
              maxLength="6"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              autoFocus
            />

            <button className="btn-confirmar-codigo" onClick={verificarCodigo}>
              Confirmar código
            </button>

            <button
              className="btn-reenviar-codigo"
              disabled={tempoRestante > 0}
              onClick={reenviarCodigo}
            >
              <IconRefresh />
              {tempoRestante > 0 ? `Reenviar em ${tempoRestante}s` : "Reenviar código"}
            </button>

          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes ccToastIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default CriarConta;