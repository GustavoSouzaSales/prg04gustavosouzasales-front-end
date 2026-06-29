import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/perfil.css";

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiFetch } from "../services/api";
import NavBar from "../components/NavBar";

const IconBell = ({ size = 20, color = "#374151" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconUser = ({ size = 22, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMap = ({ size = 22, color = "#16a34a" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconOrder = ({ size = 22, color = "#7c3aed" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
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

const IconToastCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconToastX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconToastWarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

function senhaForca(s) {
  if (!s) return -1;
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
const FORCA_COR   = ["#ff4444", "#ffb300", "#00e676"];
const FORCA_CLASS = ["pf-strength-weak", "pf-strength-medium", "pf-strength-strong"];

const enderecosMock = [
  { id: 1, titulo: "Casa", cep: "01001-000", endereco: "Praça da Sé", numero: "100", bairro: "Sé", cidade: "São Paulo", uf: "SP", principal: true },
  { id: 2, titulo: "Trabalho", cep: "44900-000", endereco: "Rua Principal", numero: "45", bairro: "Centro", cidade: "Irecê", uf: "BA", principal: false },
];

const pedidosMock = [
  { id: 1, codigo: "#001", gas: "P13 Azul",  quantidade: 1, total: 108, pagamento: "Pix",              status: "Pendente" },
  { id: 2, codigo: "#002", gas: "P13 Cinza", quantidade: 2, total: 192, pagamento: "Cartão de débito", status: "Concluído" },
  { id: 3, codigo: "#003", gas: "P45 Azul",  quantidade: 1, total: 520, pagamento: "Dinheiro",         status: "Em entrega" },
];

function Perfil() {
  const location = useLocation();
  const [abaAtiva, setAbaAtiva] = useState(
  location.state?.abaInicial || "dados"
);
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const navigate = useNavigate();

  
  const [perfil, setPerfil] = useState({
    id: usuarioLogado?.id,
    nome: usuarioLogado?.nome || "",
    email: usuarioLogado?.email || "",
    telefone: usuarioLogado?.telefone || "",
    status: usuarioLogado?.status || "Ativo",
    tipoUsuario: usuarioLogado?.tipoUsuario || "CLIENTE",
  });

  const [enderecos, setEnderecos] = useState([]);
  const [modalPerfilAberto,   setModalPerfilAberto]   = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);
  const [modoEnderecoModal,   setModoEnderecoModal]   = useState("criar");
  const [enderecoEditando,    setEnderecoEditando]    = useState(null);
  const [mostrarCamposSenha,  setMostrarCamposSenha]  = useState(false);
  const [showSenhaAtual,      setShowSenhaAtual]      = useState(false);
  const [showNovaSenha,       setShowNovaSenha]       = useState(false);
  const [showConfirmar,       setShowConfirmar]       = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoDetalhe,   setPedidoDetalhe]   = useState(null);
  const [enderecoDetalhe, setEnderecoDetalhe] = useState(null);
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const [formPerfil, setFormPerfil] = useState({
    nome: "", email: "", telefone: "",
    senhaAtual: "", novaSenha: "", confirmarSenha: "",
  });

  const [formEndereco, setFormEndereco] = useState({
    titulo: "", cep: "", endereco: "", numero: "",
    bairro: "", cidade: "", uf: "", principal: false,
  });

  useEffect(() => {
    async function carregarEnderecos() {
      try {
        const resposta = await apiFetch(`/enderecos/usuario/${perfil.id}?page=0&size=100`);
        setEnderecos(resposta.content || []);
      } catch (error) { showToast(error.message); }
    }
    if (perfil.id) carregarEnderecos();
  }, [perfil.id]);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const resposta = await apiFetch(`/pedidos/usuario/${perfil.id}?page=0&size=100`);
        const pedidosComItens = await Promise.all(
          (resposta.content || []).map(async (pedido) => {
            const itensResposta = await apiFetch(`/itens-pedido/pedido/${pedido.id}?page=0&size=100`);
            return { ...pedido, itens: itensResposta.content || [] };
          })
        );
        setPedidos(pedidosComItens);
      } catch (error) { showToast(error.message); }
    }
    if (perfil.id) carregarPedidos();
  }, [perfil.id]);

  const statusClass = (s) =>
    s.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const abrirModalPerfil = () => {
    setFormPerfil({ nome: perfil.nome, email: perfil.email, telefone: perfil.telefone,
      senhaAtual: "", novaSenha: "", confirmarSenha: "" });
    setModalPerfilAberto(true);
    setMostrarCamposSenha(false);
  };

  const fecharModalPerfil = () => setModalPerfilAberto(false);

  const salvarPerfil = async (e) => {
    e.preventDefault();
    if (!formPerfil.nome || !formPerfil.email) {
      showToast("Preencha nome e e-mail.", "warning"); return;
    }
    if (mostrarCamposSenha) {
      if (!formPerfil.senhaAtual || !formPerfil.novaSenha || !formPerfil.confirmarSenha) {
        showToast("Preencha todos os campos de senha.", "warning"); return;
      }
      if (formPerfil.novaSenha !== formPerfil.confirmarSenha) {
        showToast("A nova senha e a confirmação não conferem.", "warning"); return;
      }
    }
    try {
      const usuarioAtualizado = await apiFetch(`/usuarios/${perfil.id}`, {
        method: "PUT",
        body: JSON.stringify({
          nome: formPerfil.nome, email: formPerfil.email, telefone: formPerfil.telefone,
          status: perfil.status, tipoUsuario: perfil.tipoUsuario,
          senhaAtual: mostrarCamposSenha ? formPerfil.senhaAtual : "",
          novaSenha:  mostrarCamposSenha ? formPerfil.novaSenha  : "",
        }),
      });
      setPerfil({ ...perfil, nome: usuarioAtualizado.nome, email: usuarioAtualizado.email,
        telefone: usuarioAtualizado.telefone, status: usuarioAtualizado.status,
        tipoUsuario: usuarioAtualizado.tipoUsuario });
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
      showToast("Perfil atualizado com sucesso!", "success");
      fecharModalPerfil();
    } catch (error) { showToast(error.message); }
  };

  const abrirModalNovoEndereco = () => {
    setModoEnderecoModal("criar"); setEnderecoEditando(null);
    setFormEndereco({ titulo: "", cep: "", endereco: "", numero: "", bairro: "", cidade: "", uf: "", principal: false });
    setModalEnderecoAberto(true);
  };

  const abrirModalEditarEndereco = (e) => {
    setModoEnderecoModal("editar"); setEnderecoEditando(e);
    setFormEndereco({ titulo: e.titulo, cep: e.cep, endereco: e.endereco, numero: e.numero,
      bairro: e.bairro, cidade: e.cidade, uf: e.uf, principal: e.principal });
    setModalEnderecoAberto(true);
  };

  const fecharModalEndereco = () => { setModalEnderecoAberto(false); setEnderecoEditando(null); };

  const salvarEndereco = async (e) => {
    e.preventDefault();
    const camposFaltando = [
      !formEndereco.titulo   && "Título",
      !formEndereco.cep      && "CEP",
      !formEndereco.endereco && "Endereço",
      !formEndereco.numero   && "Número",
      !formEndereco.bairro   && "Bairro",
      !formEndereco.cidade   && "Cidade",
      !formEndereco.uf       && "UF",
    ].filter(Boolean);
    if (camposFaltando.length > 0) {
      showToast(`Preencha os campos: ${camposFaltando.join(", ")}.`, "warning"); return;
    }
    try {
      if (modoEnderecoModal === "criar") {
        const novoEndereco = await apiFetch("/enderecos", {
          method: "POST",
          body: JSON.stringify({ ...formEndereco, principal: formEndereco.principal || enderecos.length === 0, usuarioId: perfil.id }),
        });
        setEnderecos((l) => [...l, novoEndereco]);
        showToast("Endereço adicionado com sucesso!", "success");
      } else {
        const enderecoAtualizado = await apiFetch(`/enderecos/${enderecoEditando.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...formEndereco, usuarioId: perfil.id }),
        });
        setEnderecos((l) => l.map((x) => x.id === enderecoAtualizado.id ? enderecoAtualizado : x));
        showToast("Endereço atualizado!", "success");
      }
      fecharModalEndereco();
    } catch (error) { showToast(error.message); }
  };

  const marcarPrincipal = (id) =>
    setEnderecos((l) => l.map((x) => ({ ...x, principal: x.id === id })));

  const excluirEndereco = async (id) => {
    if (!window.confirm("Deseja excluir este endereço?")) return;
    try {
      await apiFetch(`/enderecos/${id}`, { method: "DELETE" });
      setEnderecos((l) => l.filter((x) => x.id !== id));
      showToast("Endereço excluído.", "success");
    } catch (error) { showToast(error.message); }
  };

  const camposPreenchidos = [perfil.nome?.trim(), perfil.email?.trim(), perfil.telefone?.trim()].filter(Boolean).length;
  const porcentagemPerfil = Math.round((camposPreenchidos / 3) * 100);
  const perfilCompleto = porcentagemPerfil === 100;

  const abrirDetalhesPedido = async (pedido) => {
    setPedidoDetalhe(pedido); setMostrarEndereco(false);
    try {
      if (pedido.enderecoId) {
        const endereco = await apiFetch(`/enderecos/${pedido.enderecoId}`);
        setEnderecoDetalhe(endereco);
      } else { setEnderecoDetalhe(null); }
    } catch { setEnderecoDetalhe(null); }
  };

  const fecharDetalhesPedido = () => { setPedidoDetalhe(null); setEnderecoDetalhe(null); setMostrarEndereco(false); };

  if (!usuarioLogado?.id) {
    return (
      <div className="pf-root">
        <NavBar page="pf" active="perfil" />
        <main className="pf-main" style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{
            maxWidth: 520, width: "100%",
            background: "linear-gradient(160deg, #0d1f3c 0%, #07111e 100%)",
            border: "1px solid rgba(0,170,255,0.22)",
            borderRadius: 24, padding: "48px 40px 40px",
            textAlign: "center",
            boxShadow: "0 0 60px rgba(0,170,255,0.14), 0 32px 80px rgba(0,0,0,0.60)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
              background: "linear-gradient(90deg, transparent, #00aaff, transparent)", opacity: 0.75,
            }} />

            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(0,170,255,0.10)", border: "1.5px solid rgba(0,170,255,0.30)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", boxShadow: "0 0 28px rgba(0,170,255,0.25)",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00aaff" strokeWidth="1.8" width="32" height="32">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f4ff", marginBottom: 12, lineHeight: 1.3 }}>
              Faça login para acessar seu perfil
            </h2>
            <p style={{ fontSize: 14, color: "#8ba3c7", lineHeight: 1.7, marginBottom: 32 }}>
              Entre na sua conta para visualizar seus dados,
              endereços salvos e histórico de pedidos.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, textAlign: "left" }}>
              {[
                ["🔵", "Veja e edite seus dados pessoais"],
                ["🟢", "Gerencie seus endereços de entrega"],
                ["🟣", "Acompanhe o histórico completo de pedidos"],
              ].map(([emoji, text]) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(0,170,255,0.05)", border: "1px solid rgba(0,170,255,0.12)",
                  borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#8ba3c7",
                }}>
                  <span style={{ fontSize: 14 }}>{emoji}</span>{text}
                </div>
              ))}
            </div>

            <button
              className="pf-modal-save"
              style={{ width: "100%", fontSize: 15, padding: "14px 0", height: "auto" }}
              onClick={() => navigate("/login")}
            >
              Ir para Login
            </button>

            <p style={{ marginTop: 16, fontSize: 11.5, color: "#4d6a8a" }}>
              Não tem conta?{" "}
              <span
                style={{ color: "#00aaff", cursor: "pointer", fontWeight: 600 }}
                onClick={() => navigate("/criar-conta")}
              >
                Cadastre-se grátis
              </span>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pf-root">
      <NavBar page="pf" active="perfil" />

      <main className="pf-main">
        <header className="pf-header">
          <div>
            <h1 className="pf-header-title">Meu Perfil</h1>
            <p className="pf-header-sub">Gerencie seus dados, endereços e acompanhe seus pedidos.</p>
          </div>
        </header>

        {/* Profile hero */}
        <section className="pf-profile-card">
          <div className="pf-profile-banner" />
          <div className="pf-profile-body">
            <div className="pf-profile-avatar">{perfil.nome.charAt(0)}</div>
            <div className="pf-profile-text">
              <h2>{perfil.nome}</h2>
              <p>{perfil.email}</p>
              <span className="pf-user-role">
                {perfil.tipoUsuario === "ADMINISTRADOR" ? "Administrador" : "Cliente"}
              </span>
            </div>
            <button type="button" className="pf-edit-profile-btn" onClick={abrirModalPerfil}>
              Editar perfil
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="pf-stats">
          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--blue"><IconUser size={22} color="#0044e0" /></div>
            <div>
              <span>Dados pessoais</span>
              <strong style={{ color: perfilCompleto ? "#16a34a" : "#f59e0b" }}>
                {perfilCompleto ? "Atualizados" : `${porcentagemPerfil}% completo`}
              </strong>
            </div>
          </div>
          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--green"><IconMap size={22} color="#16a34a" /></div>
            <div><span>Endereços salvos</span><strong>{enderecos.length}</strong></div>
          </div>
          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--purple"><IconOrder size={22} color="#7c3aed" /></div>
            <div><span>Pedidos realizados</span><strong>{pedidos.length}</strong></div>
          </div>
        </section>

        {/* Card com abas */}
        <section className="pf-card">
          <div className="pf-tabs">
            {[["dados","Dados pessoais"],["enderecos","Meus endereços"],["pedidos","Meus pedidos"]].map(([key,label]) => (
              <button key={key} type="button"
                className={`pf-tab-btn ${abaAtiva === key ? "pf-tab-btn--active" : ""}`}
                onClick={() => setAbaAtiva(key)}>{label}</button>
            ))}
          </div>

          {abaAtiva === "dados" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div><h3>Dados pessoais</h3><p>Informações básicas da sua conta.</p></div>
              </div>
              <div className="pf-form-grid">
                {[["Nome completo", perfil.nome, "text"],["E-mail", perfil.email, "email"],
                  ["Telefone", perfil.telefone, "text"],["Status da conta", perfil.status, "text"]].map(([lbl,val,type]) => (
                  <div className="pf-field" key={lbl}>
                    <label>{lbl}</label>
                    <input type={type} value={val} readOnly />
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "enderecos" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div><h3>Meus endereços</h3><p>Endereços salvos para entrega dos seus pedidos.</p></div>
                <button type="button" className="pf-add-btn" onClick={abrirModalNovoEndereco}>+ Novo endereço</button>
              </div>
              <div className="pf-address-list">
                {enderecos.map((e) => (
                  <div className="pf-address-card" key={e.id}>
                    <div>
                      <div className="pf-address-title">
                        {e.titulo}
                        {e.principal && <span className="pf-main-badge">Principal</span>}
                      </div>
                      <p>{e.endereco}, {e.numero}</p>
                      <p>{e.bairro} - {e.cidade}/{e.uf}</p>
                      <p>CEP: {e.cep}</p>
                    </div>
                    <div className="pf-address-actions">
                      {!e.principal && (
                        <button type="button" className="pf-outline-btn" onClick={() => marcarPrincipal(e.id)}>Tornar principal</button>
                      )}
                      <button type="button" className="pf-outline-btn" onClick={() => abrirModalEditarEndereco(e)}>Editar</button>
                      <button type="button" className="pf-danger-btn" onClick={() => excluirEndereco(e.id)}>Excluir</button>
                    </div>
                  </div>
                ))}
                {enderecos.length === 0 && <p className="pf-empty-message">Nenhum endereço cadastrado.</p>}
              </div>
            </div>
          )}

          {abaAtiva === "pedidos" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div><h3>Meus pedidos</h3><p>Acompanhe o histórico e status dos seus pedidos.</p></div>
              </div>
              <div className="pf-table-wrap">
                <table className="pf-table">
                  <thead>
                    <tr><th>Pedido</th><th>Gás</th><th>Qtd</th><th>Pagamento</th><th>Total</th><th>Status</th><th>Detalhes</th></tr>
                  </thead>
                  <tbody>
                    {pedidos.map((p) => (
                      <tr key={p.id}>
                        <td>{p.codigo}</td>
                        <td>{p.itens?.map((item) => <div key={item.id}>{item.nomeProduto} {item.corProduto}</div>)}</td>
                        <td>{p.itens?.map((item) => <div key={item.id}>{item.quantidade}</div>)}</td>
                        <td>{p.formaPagamento}</td>
                        <td>R$ {p.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                        <td><span className={`pf-status pf-status--${statusClass(p.status)}`}>{p.status}</span></td>
                        <td><button type="button" className="pf-details-btn" onClick={() => abrirDetalhesPedido(p)}>Detalhes</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Modal detalhes pedido */}
        {pedidoDetalhe && (
          <div className="pf-modal-overlay">
            <div className="pf-modal pf-details-modal">
              <div className="pf-modal-header">
                <h3>{pedidoDetalhe.codigo}</h3>
                <button type="button" className="pf-modal-close" onClick={fecharDetalhesPedido}>×</button>
              </div>
              <div className="pf-details-grid">
                <div className="pf-detail-field"><label>Nome para contato</label><input value={pedidoDetalhe.nomeContato || perfil.nome || "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Telefone</label><input value={pedidoDetalhe.telefoneContato || perfil.telefone || "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Pagamento</label><input value={pedidoDetalhe.formaPagamento || "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Recebimento</label><input value={pedidoDetalhe.formaRecebimento || "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Status</label><input value={pedidoDetalhe.status || "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Data</label><input value={pedidoDetalhe.dataPedido ? new Date(pedidoDetalhe.dataPedido).toLocaleString("pt-BR") : "-"} readOnly /></div>
                <div className="pf-detail-field"><label>Total</label><input value={`R$ ${Number(pedidoDetalhe.valorTotal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} readOnly /></div>
              </div>
              <div className="pf-detail-section">
                <h4>Produtos</h4>
                {pedidoDetalhe.itens?.map((item) => (
                  <div className="pf-detail-product" key={item.id}>
                    <span>{item.nomeProduto} {item.corProduto}</span>
                    <span>{item.pesoProduto}</span>
                    <span>Qtd: {item.quantidade}</span>
                    <span>R$ {Number(item.subtotal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
              {pedidoDetalhe.formaRecebimento === "Entrega" && (
                <div className="pf-detail-section">
                  <button type="button" className="pf-details-btn" onClick={() => setMostrarEndereco((v) => !v)}>
                    {mostrarEndereco ? "Ocultar endereço" : "Ver endereço"}
                  </button>
                  {mostrarEndereco && enderecoDetalhe && (
                    <div className="pf-address-detail">
                      <p><strong>Título:</strong> {enderecoDetalhe.titulo}</p>
                      <p><strong>CEP:</strong> {enderecoDetalhe.cep}</p>
                      <p><strong>Endereço:</strong> {enderecoDetalhe.endereco}, {enderecoDetalhe.numero}</p>
                      <p><strong>Bairro:</strong> {enderecoDetalhe.bairro}</p>
                      <p><strong>Cidade/UF:</strong> {enderecoDetalhe.cidade}/{enderecoDetalhe.uf}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="pf-modal-actions">
                <button type="button" className="pf-modal-cancel" onClick={fecharDetalhesPedido}>Fechar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal perfil */}
        {modalPerfilAberto && (
          <div className="pf-modal-overlay">
            <div className="pf-modal">
              <div className="pf-modal-header">
                <h3>Editar perfil</h3>
                <button type="button" className="pf-modal-close" onClick={fecharModalPerfil}>×</button>
              </div>
              <form className="pf-modal-form" onSubmit={salvarPerfil}>
                <div className="pf-modal-field">
                  <label>Nome completo</label>
                  <input type="text" value={formPerfil.nome} placeholder="Digite seu nome"
                    onChange={(e) => setFormPerfil({ ...formPerfil, nome: e.target.value })} />
                </div>
                <div className="pf-modal-field">
                  <label>E-mail</label>
                  <input type="email" value={formPerfil.email} placeholder="Digite seu e-mail"
                    onChange={(e) => setFormPerfil({ ...formPerfil, email: e.target.value })} />
                </div>
                <div className="pf-modal-field">
                  <label>Telefone</label>
                  <input type="text" value={formPerfil.telefone} placeholder="(75) 99999-9999" maxLength={15}
                    onChange={(e) => {
                      let valor = e.target.value.replace(/\D/g, "");
                      valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
                      setFormPerfil({ ...formPerfil, telefone: valor });
                    }} />
                </div>

                <div className="pf-password-box" style={{ gridColumn: "1 / -1" }}>
                  <div className="pf-password-box-info">
                    <strong>Senha da conta</strong>
                    <p>Altere sua senha apenas se desejar atualizar o acesso.</p>
                  </div>
                  <button type="button" className="pf-change-password-btn" onClick={() => setMostrarCamposSenha((v) => !v)}>
                    {mostrarCamposSenha ? "Cancelar" : "Mudar senha"}
                  </button>
                </div>

                {mostrarCamposSenha && (
                  <>
                    <div className="pf-modal-field" style={{ gridColumn: "1 / -1" }}>
                      <label>Senha atual</label>
                      <div className="pf-password-input-wrap">
                        <input type={showSenhaAtual ? "text" : "password"} value={formPerfil.senhaAtual} placeholder="Digite sua senha atual"
                          onChange={(e) => setFormPerfil({ ...formPerfil, senhaAtual: e.target.value })} />
                        <button type="button" className="pf-eye-btn" onPointerDown={(e) => e.preventDefault()} onClick={() => setShowSenhaAtual(v => !v)}>
                          {showSenhaAtual ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                    </div>
                    <div className="pf-modal-field" style={{ gridColumn: "1 / -1" }}>
                      <label>Nova senha</label>
                      <div className="pf-password-input-wrap">
                        <input type={showNovaSenha ? "text" : "password"} value={formPerfil.novaSenha} placeholder="Mínimo 8 caracteres"
                          onChange={(e) => setFormPerfil({ ...formPerfil, novaSenha: e.target.value })} />
                        <button type="button" className="pf-eye-btn" onPointerDown={(e) => e.preventDefault()} onClick={() => setShowNovaSenha(v => !v)}>
                          {showNovaSenha ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                      {formPerfil.novaSenha.length > 0 && (() => {
                        const f = senhaForca(formPerfil.novaSenha);
                        return (
                          <div className="pf-strength-wrap">
                            <div className="pf-strength-bars">
                              {[0,1,2].map(i => <div key={i} className={`pf-strength-seg ${f >= i ? FORCA_CLASS[f] : ""}`} />)}
                            </div>
                            <span className="pf-strength-label" style={{ color: FORCA_COR[f] }}>{FORCA_LABEL[f]}</span>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="pf-modal-field" style={{ gridColumn: "1 / -1" }}>
                      <label>Confirmar nova senha</label>
                      <div className={`pf-password-input-wrap ${
                        formPerfil.confirmarSenha && formPerfil.novaSenha !== formPerfil.confirmarSenha ? "pf-input-mismatch"
                        : formPerfil.confirmarSenha && formPerfil.novaSenha === formPerfil.confirmarSenha ? "pf-input-match" : ""
                      }`}>
                        <input type={showConfirmar ? "text" : "password"} value={formPerfil.confirmarSenha} placeholder="Confirme a nova senha"
                          onChange={(e) => setFormPerfil({ ...formPerfil, confirmarSenha: e.target.value })} />
                        <button type="button" className="pf-eye-btn" onPointerDown={(e) => e.preventDefault()} onClick={() => setShowConfirmar(v => !v)}>
                          {showConfirmar ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                      {formPerfil.confirmarSenha && formPerfil.novaSenha !== formPerfil.confirmarSenha && (
                        <span className="pf-confirm-hint pf-confirm-hint--err">As senhas não coincidem</span>
                      )}
                      {formPerfil.confirmarSenha && formPerfil.novaSenha === formPerfil.confirmarSenha && (
                        <span className="pf-confirm-hint pf-confirm-hint--ok">Senhas coincidem ✓</span>
                      )}
                    </div>
                    <div className="pf-forgot-password-box" style={{ gridColumn: "1 / -1" }}>
                      <Link to="/esqueci-senha" className="pf-forgot-password-link">Esqueceu sua senha?</Link>
                    </div>
                  </>
                )}

                <div className="pf-modal-actions">
                  <button type="button" className="pf-modal-cancel" onClick={fecharModalPerfil}>Cancelar</button>
                  <button type="submit" className="pf-modal-save">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal endereço */}
        {modalEnderecoAberto && (
          <div className="pf-modal-overlay">
            <div className="pf-modal">
              <div className="pf-modal-header">
                <h3>{modoEnderecoModal === "criar" ? "Novo endereço" : "Editar endereço"}</h3>
                <button type="button" className="pf-modal-close" onClick={fecharModalEndereco}>×</button>
              </div>
              <form className="pf-modal-form" onSubmit={salvarEndereco}>
                {[["Título","titulo","text","Ex: Casa, Trabalho..."],
                  ["CEP","cep","text","00000-000"],
                  ["Endereço","endereco","text","Rua, avenida..."],
                  ["Número","numero","text","Nº"],
                  ["Bairro","bairro","text","Digite o bairro"],
                  ["Cidade","cidade","text","Digite a cidade"],
                  ["UF","uf","text","BA"]].map(([lbl,key,type,ph]) => (
                  <div className="pf-modal-field" key={key}>
                    <label>{lbl}</label>
                    <input type={type} value={formEndereco[key]} placeholder={ph}
                      maxLength={key === "cep" ? 9 : undefined}
                      onChange={(e) => {
                        let valor = e.target.value;
                        if (key === "cep") valor = valor.replace(/\D/g,"").replace(/^(\d{5})(\d)/,"$1-$2").slice(0,9);
                        setFormEndereco({ ...formEndereco, [key]: valor });
                      }} />
                  </div>
                ))}
                <label className="pf-modal-check" style={{ gridColumn: "1 / -1" }}>
                  <input type="checkbox" checked={formEndereco.principal}
                    onChange={(e) => setFormEndereco({ ...formEndereco, principal: e.target.checked })} />
                  Definir como endereço principal
                </label>
                <div className="pf-modal-actions">
                  <button type="button" className="pf-modal-cancel" onClick={fecharModalEndereco}>Cancelar</button>
                  <button type="submit" className="pf-modal-save">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`pf-toast pf-toast--${toast.type}`}>
            <span className="pf-toast-icon">
              {toast.type === "success" ? <IconToastCheck /> : toast.type === "warning" ? <IconToastWarn /> : <IconToastX />}
            </span>
            <span className="pf-toast-msg">{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Perfil;