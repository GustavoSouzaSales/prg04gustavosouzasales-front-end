import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useGoogleLogin } from "@react-oauth/google";

const IconMail = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="17" height="17">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = ({ valid, invalid }) => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke={valid ? "#00e676" : invalid ? "#ff4455" : "#3d5a7a"}
    strokeWidth="2" width="17" height="17">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconShieldSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" width="13" height="13">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ff4455" strokeWidth="2.5" width="13" height="13">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconGoogle = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ─── Toast inline ─── */
const ToastLogin = ({ msg, type }) => {
  const styles = {
    success: { bg: "rgba(0,230,118,0.12)", border: "rgba(0,230,118,0.35)", color: "#00e676" },
    error:   { bg: "rgba(255,68,85,0.12)", border: "rgba(255,68,85,0.35)",  color: "#ff4455" },
  };
  const s = styles[type] || styles.error;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      borderRadius: 10, padding: "10px 14px",
      fontSize: 13, fontWeight: 600,
      animation: "lf-toastIn 0.3s ease",
    }}>
      {type === "success"
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      }
      {msg}
    </div>
  );
};

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passTouched,  setPassTouched]  = useState(false);
  const [toast,        setToast]        = useState(null); // { msg, type }

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const respostaGoogle = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const dadosGoogle = await respostaGoogle.json();
        const usuario = await apiFetch("/auth/google", {
          method: "POST",
          body: JSON.stringify({ nome: dadosGoogle.name, email: dadosGoogle.email }),
        });
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        setToast({ msg: `Bem-vindo, ${usuario.nome?.split(" ")[0]}! 🎉`, type: "success" });
        setTimeout(() => navigate("/home"), 1500);
      } catch {
        setToast({ msg: "Erro ao entrar com Google.", type: "error" });
      }
    },
    onError: () => {
      setToast({ msg: "Login com Google cancelado.", type: "error" });
    },
  });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passValid  = password.length >= 8;

  const emailState = emailTouched ? (emailValid ? "valid" : "invalid") : "";
  const passState  = passTouched  ? (passValid  ? "valid" : "invalid") : "";

  async function entrar() {
    setEmailTouched(true);
    setPassTouched(true);
    if (!emailValid || !passValid) return;
    try {
      const usuario = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, senha: password }),
      });
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      setToast({ msg: `Bem-vindo de volta, ${usuario.nome?.split(" ")[0]}! 🎉`, type: "success" });
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setToast({ msg: error.message || "E-mail ou senha incorretos.", type: "error" });
    }
  }

  return (
    <>
      {/* Toast */}
      {toast && <ToastLogin msg={toast.msg} type={toast.type} />}

      {/* E-mail */}
      <label className="field-label">E-mail</label>
      <div className={`input-wrapper ${emailState ? `input-${emailState}` : ""}`}>
        <IconMail valid={emailState === "valid"} invalid={emailState === "invalid"} />
        <input
          type="email" placeholder="seu@email.com" value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailTouched(true); }}
          onBlur={() => setEmailTouched(true)} autoComplete="email"
        />
        {emailTouched && (
          <span className="field-status-icon">
            {emailValid ? <IconCheck /> : <IconX />}
          </span>
        )}
      </div>
      {emailState === "invalid" && (
        <p className="field-hint field-hint--error">Digite um e-mail válido.</p>
      )}

      {/* Senha */}
      <label className="field-label">Senha</label>
      <div className={`input-wrapper ${passState ? `input-${passState}` : ""}`}>
        <IconLock valid={passState === "valid"} invalid={passState === "invalid"} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mínimo 8 caracteres" value={password}
          onChange={(e) => { setPassword(e.target.value); setPassTouched(true); }}
          onBlur={() => setPassTouched(true)} autoComplete="current-password"
        />
        <button type="button" className="toggle-password"
          onPointerDown={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => { e.preventDefault(); setShowPassword(v => !v); }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      {passState === "invalid" && (
        <p className="field-hint field-hint--error">Mínimo de 8 caracteres ({password.length}/8).</p>
      )}

      <Link to="/esqueci-senha" className="forgot-link">Esqueci minha senha</Link>

      <button type="button" className="btn-entrar" onClick={entrar}>
        <IconArrowRight />
        Entrar
      </button>

      <div className="lf-divider"><span>ou continue com</span></div>

      <div className="lf-secondary-row">
        <button type="button" className="btn-google" onClick={() => loginGoogle()}>
          <IconGoogle />
          Google
        </button>
        <Link to="/criar-conta" className="btn-criar-conta-sm">
          Criar conta
        </Link>
      </div>

      <div className="security-note">
        <IconShieldSmall />
        Seus dados estão protegidos com segurança
      </div>

      <style>{`
        @keyframes lf-toastIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default LoginForm;