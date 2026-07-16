import "../assets/css/EsqueciSenha.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { apiFetch } from "../services/api";

/* ── Ícones ── */
const IconFlameLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
    <circle cx="24" cy="24" r="24" fill="#00aaff" opacity="0.12" />
    <circle cx="24" cy="24" r="18" fill="#00aaff" opacity="0.20" />
    <path d="M24 8C20 15 15 18 15 24a9 9 0 0 0 18 0c0-6-5-9-9-16z" fill="white" />
    <path d="M24 14c-2 4-4.5 6-4.5 9.5a4.5 4.5 0 0 0 9 0C28.5 20 26 18 24 14z" fill="#00e5b4" opacity="0.9" />
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

const IconShieldCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="28"
    height="28"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconRefresh = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="15"
    height="15"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

function EsqueciSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [modalCodigo, setModalCodigo] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [tempoRestante, setTempoRestante] = useState(300);
  const [erroCodigo, setErroCodigo] = useState("");
  const [sucessoCodigo, setSucessoCodigo] = useState("");
  const [verificandoCodigo, setVerificandoCodigo] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailState = emailTouched ? (emailValid ? "valid" : "invalid") : "";

  const enviarEmail = async (e) => {
  e.preventDefault();

  setEmailTouched(true);
  setMensagem("");
  setErro("");

  if (!emailValid) return;

  try {
    setCarregando(true);

    await apiFetch("/auth/esqueci-senha", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setEmailRecuperacao(email);
    setCodigo("");
    setErroCodigo("");
    setSucessoCodigo("");
    setTempoRestante(300);
    setModalCodigo(true);
  } catch (error) {
    setErro(error.message || "Não foi possível verificar o e-mail.");
  } finally {
    setCarregando(false);
  }
};

useEffect(() => {
  if (!modalCodigo || tempoRestante <= 0) return;

  const timer = setInterval(() => {
    setTempoRestante((tempo) => tempo - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [modalCodigo, tempoRestante]);

const verificarCodigoRecuperacao = async () => {
  setErroCodigo("");
  setSucessoCodigo("");

  if (codigo.length !== 6) {
    setErroCodigo("Digite o código completo de 6 dígitos.");
    return;
  }

  try {
    setVerificandoCodigo(true);

    const resposta = await apiFetch(
      "/auth/verificar-codigo-recuperacao",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRecuperacao,
          codigo,
        }),
      }
    );

    if (!resposta?.token) {
      throw new Error("O servidor não retornou o token de recuperação.");
    }

    setSucessoCodigo("E-mail verificado com sucesso!");

    setTimeout(() => {
      navigate(
        `/nova-senha?token=${encodeURIComponent(resposta.token)}`
      );
    }, 1000);
  } catch (error) {
    setErroCodigo(
      error.message || "Código inválido ou expirado."
    );
  } finally {
    setVerificandoCodigo(false);
  }
};

const reenviarCodigoRecuperacao = async () => {
  setErroCodigo("");
  setSucessoCodigo("");

  try {
    await apiFetch("/auth/esqueci-senha", {
      method: "POST",
      body: JSON.stringify({
        email: emailRecuperacao,
      }),
    });

    setCodigo("");
    setTempoRestante(300);
    setSucessoCodigo("Um novo código foi enviado.");
  } catch (error) {
    setErroCodigo(
      error.message || "Não foi possível reenviar o código."
    );
  }
};

  return (
    <>
      {/* Fundo */}
      <div className="esqueci-bg"></div>
      <div className="esqueci-overlay"></div>

      {/* Curva decorativa */}
      <div className="esqueci-green-line">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none">
          <path d="M 0 0 Q 150 200 80 400 Q 10 600 150 900" stroke="#00aaff" strokeWidth="1.5" fill="none" opacity="0.35" />
          <path d="M 40 0 Q 200 250 120 450 Q 40 650 180 900" stroke="#00e5b4" strokeWidth="1" fill="none" opacity="0.18" />
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
  Informe o e-mail cadastrado na sua conta. Enviaremos um código de
  6 dígitos para confirmar sua identidade com segurança.
</p>
        </section>

        {/* Card */}
        <section className="esqueci-card">

          {/* Logo mobile */}
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
            Digite seu e-mail e enviaremos um código para confirmar sua identidade.
          </p>

          <form onSubmit={enviarEmail} noValidate>

            <label className="field-label">E-mail cadastrado</label>

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

            {emailState === "invalid" && (
              <p className="field-hint field-hint--error">Digite um e-mail válido.</p>
            )}

              {erro && (
                <div className="erro-esqueci">
                  <IconX />
                  {erro}
                </div>
              )}

                          <button
                type="submit"
                className="btn-enviar-email"
                disabled={carregando || !emailValid}
              >
                <IconArrowRight />
                {carregando ? "Verificando..." : "Verificar e-mail"}
              </button>
          </form>

          <div className="divider">ou</div>

          <Link to="/login" className="btn-voltar-login">
            Voltar para login
          </Link>

          <button
            type="button"
            className="btn-ir-criar"
            onClick={() => navigate("/criar-conta")}
          >
            Criar nova conta
          </button>

        </section>
      </div>

      {modalCodigo && (
  <div
    className="codigo-overlay"
    onClick={() => setModalCodigo(false)}
  >
    <div
      className="codigo-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="codigo-close"
        onClick={() => setModalCodigo(false)}
        aria-label="Fechar"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          width="16"
          height="16"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="codigo-icon-wrap">
        <div className="codigo-icon-ring">
          <IconShieldCheck />
        </div>
      </div>

      <h2>Verificação de e-mail</h2>

      <p>Enviamos um código de 6 dígitos para</p>

      <strong className="codigo-email">
        {emailRecuperacao}
      </strong>

      {sucessoCodigo && (
        <div className="sucesso-esqueci">
          <IconCheck />
          {sucessoCodigo}
        </div>
      )}

      {erroCodigo && (
        <div className="erro-esqueci">
          <IconX />
          {erroCodigo}
        </div>
      )}

      <input
        className="codigo-input-real"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength="6"
        value={codigo}
        onChange={(e) => {
          setCodigo(e.target.value.replace(/\D/g, ""));
          setErroCodigo("");
        }}
        placeholder="000000"
        autoFocus
      />

      <div className="codigo-timer">
        {tempoRestante > 0
          ? `Código válido por ${Math.floor(
              tempoRestante / 60
            )}:${String(tempoRestante % 60).padStart(2, "0")}`
          : "O código expirou"}
      </div>

      <button
        type="button"
        className="btn-confirmar-codigo"
        onClick={verificarCodigoRecuperacao}
        disabled={verificandoCodigo || codigo.length !== 6}
      >
        {verificandoCodigo
          ? "Verificando..."
          : "Confirmar código"}
      </button>

      <button
        type="button"
        className="btn-reenviar-codigo"
        disabled={tempoRestante > 0}
        onClick={reenviarCodigoRecuperacao}
      >
        <IconRefresh />

        {tempoRestante > 0
          ? `Reenviar em ${tempoRestante}s`
          : "Reenviar código"}
      </button>
    </div>
  </div>
)}

      <Footer />
    </>
  );
}

export default EsqueciSenha;