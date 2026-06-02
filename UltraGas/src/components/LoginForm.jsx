import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* ── Ícones do formulário ── */
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
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

const IconUserPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0044e0" strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </svg>
);

const IconShieldSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="13" height="13">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* Ícone de check para campo válido */
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* Ícone de X para campo inválido */
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;

  const emailState = emailTouched ? (emailValid ? "input-valid" : "input-invalid") : "";
  const passwordState = passwordTouched ? (passwordValid ? "input-valid" : "input-invalid") : "";

  function entrar() {
    setEmailTouched(true);
    setPasswordTouched(true);
    if (emailValid && passwordValid) navigate("/home");
  }

  return (
    <>
      {/* ── E-mail ── */}
      <label className="field-label">E-mail</label>

      <div className={`input-wrapper ${emailState}`}>
        <IconMail />
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          autoComplete="email"
        />
        {/* Ícone de feedback no lugar do toggle de senha */}
        {emailTouched && (
          <span className="field-feedback-icon">
            {emailValid ? <IconCheck /> : <IconX />}
          </span>
        )}
      </div>

      {/* Mensagem de erro do e-mail */}
      {emailTouched && !emailValid && (
        <p className="field-error-msg">Digite um e-mail válido.</p>
      )}

      {/* ── Senha ── */}
      <label className="field-label" style={{ marginTop: emailTouched && !emailValid ? 0 : undefined }}>
        Senha
      </label>

      <div className={`input-wrapper ${passwordState}`}>
        <IconLock />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          autoComplete="current-password"
        />
        <button
          type="button"
          className="toggle-password"
          onPointerDown={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((v) => !v);
          }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>

      {/* Mensagem de erro da senha + indicador de força */}
      {passwordTouched && !passwordValid && (
        <p className="field-error-msg">A senha deve ter pelo menos 8 caracteres.</p>
      )}

      {/* Barra de força da senha */}
      {passwordTouched && password.length > 0 && (
        <div className="password-strength">
          <div
            className={`password-strength-bar ${
              password.length < 8
                ? "strength-weak"
                : password.length < 12
                ? "strength-medium"
                : "strength-strong"
            }`}
          />
          <span className="password-strength-label">
            {password.length < 8 ? "Fraca" : password.length < 12 ? "Média" : "Forte"}
          </span>
        </div>
      )}

      {/* Link de recuperação */}
      <Link to="/esqueci-senha" className="forgot-link">
        Esqueci minha senha
      </Link>

      {/* Botão principal */}
      <button type="button" className="btn-entrar" onClick={entrar}>
        <IconArrowRight />
        Entrar
      </button>

      <div className="divider">ou</div>

      {/* Criar conta */}
      <Link to="/criar-conta" className="btn-criar">
        <IconUserPlus />
        Criar conta
      </Link>

      {/* Nota de segurança */}
      <div className="security-note">
        <IconShieldSmall />
        Seus dados estão protegidos com segurança
      </div>
    </>
  );
}

export default LoginForm;