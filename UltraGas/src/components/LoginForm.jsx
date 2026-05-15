import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Ícones usados no formulário. */
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

function LoginForm() {
  const navigate = useNavigate();

  /* States do formulário. */
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  /* Validação dos campos. */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;

  /* Classes que controlam as bordas. */
  const emailBorder = emailTouched
    ? emailValid
      ? "input-valid"
      : "input-invalid"
    : "";

  const passwordBorder = passwordTouched
    ? passwordValid
      ? "input-valid"
      : "input-invalid"
    : "";

  /* Valida antes de entrar. */
  function entrar() {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (emailValid && passwordValid) {
      navigate("/home");
    }
  }

  return (
    <>
      {/* Campo de e-mail. */}
      <label className="field-label">E-mail</label>

      <div className={`input-wrapper ${emailBorder}`}>
        <IconMail />

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          autoComplete="email"
        />
      </div>

      {/* Campo de senha. */}
      <label className="field-label">Senha</label>

      <div className={`input-wrapper ${passwordBorder}`}>
        <IconLock />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          autoComplete="current-password"
        />

        {/* Botão de mostrar ou ocultar senha. */}
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

      {/* Link auxiliar. */}
      <a href="#" className="forgot-link">
        Esqueci minha senha
      </a>

      {/* Botão principal. */}
      <button type="button" className="btn-entrar" onClick={entrar}>
        <IconArrowRight />
        Entrar
      </button>

      <div className="divider">ou</div>

      {/* Botão de cadastro. */}
      <button type="button" className="btn-criar">
        <IconUserPlus />
        Criar nova conta
      </button>

      {/* Aviso de segurança. */}
      <div className="security-note">
        <IconShieldSmall />
        Seus dados estão protegidos com segurança
      </div>
    </>
  );
}

export default LoginForm;