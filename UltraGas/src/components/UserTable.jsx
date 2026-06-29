import { useState } from "react";
import { apiFetch } from "../services/api";

const IconEdit = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const IconTrash = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
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

/* ─── Força da senha ─── */
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
const FORCA_COLOR = ["#ff4444", "#ffb300", "#00e676"];
const FORCA_CLASS = ["ut-strength-weak", "ut-strength-medium", "ut-strength-strong"];

function UserTable({ usuarios, setUsuarios, showToast }) {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState("criar");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [showSenha, setShowSenha] = useState(false);
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", senha: "", tipoUsuario: "CLIENTE", status: "Ativo",
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    const t = busca.toLowerCase();
    return (u.nome.toLowerCase().includes(t) || u.email.toLowerCase().includes(t)) &&
      (filtroStatus === "Todos" || u.status === filtroStatus);
  });

  const abrirModalCriar = () => {
    setModoModal("criar"); setUsuarioEditando(null); setShowSenha(false);
    setForm({ nome: "", email: "", telefone: "", senha: "", tipoUsuario: "CLIENTE", status: "Ativo" });
    setModalAberto(true);
  };

  const abrirModalEditar = (u) => {
    setModoModal("editar"); setUsuarioEditando(u); setShowSenha(false);
    setForm({ nome: u.nome || "", email: u.email || "", telefone: u.telefone || "",
      senha: "", tipoUsuario: u.tipoUsuario || "CLIENTE", status: u.status || "Ativo" });
    setModalAberto(true);
  };

  const fecharModal = () => { setModalAberto(false); setUsuarioEditando(null); };

  const salvarUsuario = async (e) => {
    e.preventDefault();

    // Validações com mensagens específicas
    if (!form.nome.trim()) {
      showToast("Informe o nome do usuário.", "warning"); return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast("Informe um e-mail válido.", "warning"); return;
    }
    if (!form.status) {
      showToast("Selecione o status do usuário.", "warning"); return;
    }
    if (modoModal === "criar") {
      if (!form.senha) {
        showToast("Defina uma senha para o novo usuário.", "warning"); return;
      }
      if (form.senha.length < 8) {
        showToast(`Senha muito curta — mínimo 8 caracteres (${form.senha.length}/8).`, "warning"); return;
      }
    }

    try {
      if (modoModal === "criar") {
        const novoUsuario = await apiFetch("/usuarios", {
          method: "POST",
          body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone || "",
            status: form.status, tipoUsuario: form.tipoUsuario, senha: form.senha }),
        });
        setUsuarios((lista) => [...lista, novoUsuario]);
        showToast(`Usuário "${novoUsuario.nome}" criado com sucesso!`, "success");
      } else {
        const usuarioAtualizado = await apiFetch(`/usuarios/${usuarioEditando.id}`, {
          method: "PUT",
          body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone || "",
            status: form.status, tipoUsuario: form.tipoUsuario, senhaAtual: "", novaSenha: "" }),
        });
        setUsuarios((lista) => lista.map((u) => u.id === usuarioEditando.id ? usuarioAtualizado : u));
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuarioLogado?.id === usuarioAtualizado.id) localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
        showToast(`Usuário "${usuarioAtualizado.nome}" atualizado!`, "success");
      }
      fecharModal();
    } catch (error) { showToast(error.message || "Erro ao salvar usuário."); }
  };

  const excluirUsuario = async (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (!window.confirm(`Deseja excluir o usuário "${usuario?.nome}"?`)) return;
    try {
      await apiFetch(`/usuarios/${id}`, { method: "DELETE" });
      setUsuarios((lista) => lista.filter((u) => u.id !== id));
      showToast(`Usuário "${usuario?.nome}" excluído.`, "success");
    } catch (error) { showToast(error.message || "Erro ao excluir usuário."); }
  };

  const forca = senhaForca(form.senha);

  return (
    <>
      <div className="ad-table-controls">
        <input type="text" className="ad-search-input" placeholder="Buscar por nome ou e-mail..."
          value={busca} onChange={(e) => setBusca(e.target.value)} />
        <select className="ad-filter-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Ativo">Ativos</option>
          <option value="Pendente">Pendentes</option>
          <option value="Inativo">Inativos</option>
        </select>
        <button type="button" className="ad-new-user-btn" onClick={abrirModalCriar}>+ Novo usuário</button>
      </div>

      <div className="ad-table-wrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th>ID</th><th>Usuário</th><th>E-mail</th><th>Telefone</th><th>Tipo</th><th>Status</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id}>
                <td>#{u.id}</td>
                <td>
                  <div className="ad-user-cell">
                    <div className="ad-user-avatar">{u.nome.charAt(0)}</div>
                    <span style={{ color: "var(--text-1)", fontWeight: 500 }}>{u.nome}</span>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>{u.telefone || "—"}</td>
                <td>{u.tipoUsuario === "ADMINISTRADOR" ? "Administrador" : "Cliente"}</td>
                <td><span className={`ad-status ad-status--${u.status.toLowerCase()}`}>{u.status}</span></td>
                <td>
                  <div className="ad-actions">
                    <button className="ad-edit-btn" onClick={() => abrirModalEditar(u)}><IconEdit size={14} /> Editar</button>
                    <button className="ad-delete-btn" onClick={() => excluirUsuario(u.id)}><IconTrash size={14} /> Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: "center", color: "var(--text-3)", padding: "28px" }}>Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="ad-modal-overlay">
          <div className="ad-modal ad-modal--neon">
            <div className="ad-modal-header">
              <h3>{modoModal === "criar" ? "Novo usuário" : "Editar usuário"}</h3>
              <button type="button" className="ad-modal-close" onClick={fecharModal}>×</button>
            </div>
            <form className="ad-modal-form" onSubmit={salvarUsuario}>

              {[["Nome", "nome", "text", "Digite o nome completo"],
                ["E-mail", "email", "email", "Digite o e-mail"],
                ["Telefone", "telefone", "text", "(75) 99999-9999"]
              ].map(([lbl, key, type, ph]) => (
                <div className="ad-modal-field" key={key}>
                  <label>{lbl}</label>
                  <input type={type} value={form[key]} placeholder={ph}
                    maxLength={key === "telefone" ? 15 : undefined}
                    onChange={(e) => {
                      let valor = e.target.value;
                      if (key === "telefone") {
                        valor = valor.replace(/\D/g, "").slice(0, 11)
                          .replace(/^(\d{2})(\d)/g, "($1) $2")
                          .replace(/(\d{5})(\d)/, "$1-$2");
                      }
                      setForm({ ...form, [key]: valor });
                    }} />
                </div>
              ))}

              {/* Senha com olho + barra de força — só no modo criar */}
              {modoModal === "criar" && (
                <div className="ad-modal-field">
                  <label>Senha</label>
                  <div className="ut-password-wrap">
                    <input
                      type={showSenha ? "text" : "password"}
                      value={form.senha}
                      placeholder="Mínimo 8 caracteres"
                      onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />
                    <button type="button" className="ut-eye-btn"
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => setShowSenha(v => !v)}>
                      {showSenha ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>

                  {/* Hint de comprimento */}
                  {form.senha.length > 0 && form.senha.length < 8 && (
                    <p className="ut-hint ut-hint--error">
                      Mínimo 8 caracteres ({form.senha.length}/8).
                    </p>
                  )}

                  {/* Barra de força */}
                  {form.senha.length > 0 && (
                    <div className="ut-strength-wrap">
                      <div className="ut-strength-bars">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className={`ut-strength-seg ${forca >= i ? FORCA_CLASS[forca] : ""}`} />
                        ))}
                      </div>
                      <span className="ut-strength-label" style={{ color: FORCA_COLOR[forca] }}>
                        {FORCA_LABEL[forca]}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="ad-modal-field">
                <label>Tipo do usuário</label>
                <select value={form.tipoUsuario} onChange={(e) => setForm({ ...form, tipoUsuario: e.target.value })}>
                  <option value="CLIENTE">Cliente</option>
                  <option value="ADMINISTRADOR">Administrador</option>
                </select>
              </div>

              <div className="ad-modal-field">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="Ativo">Ativo</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="ad-modal-actions">
                <button type="button" className="ad-modal-cancel" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="ad-modal-save">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;