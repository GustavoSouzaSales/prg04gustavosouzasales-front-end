import { useState } from "react";

/* Ícone de editar */
const IconEdit = ({ size = 16, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

/* Ícone de excluir */
const IconTrash = ({ size = 16, color = "#ef4444" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

function UserTable({ usuarios, setUsuarios }) {
  /* Estados dos filtros */
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  /* Estados do modal */
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState("criar");
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  /* Formulário do usuário */
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    status: "Ativo",
  });

  /* Filtra usuários por busca e status */
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const buscaTexto = busca.toLowerCase();

    const correspondeBusca =
      usuario.nome.toLowerCase().includes(buscaTexto) ||
      usuario.email.toLowerCase().includes(buscaTexto);

    const correspondeStatus =
      filtroStatus === "Todos" || usuario.status === filtroStatus;

    return correspondeBusca && correspondeStatus;
  });

  /* Abre modal para criar usuário */
  const abrirModalCriar = () => {
    setModoModal("criar");
    setUsuarioEditando(null);
    setForm({
      nome: "",
      email: "",
      telefone: "",
      status: "Ativo",
    });
    setModalAberto(true);
  };

  /* Abre modal para editar usuário */
  const abrirModalEditar = (usuario) => {
    setModoModal("editar");
    setUsuarioEditando(usuario);
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      status: usuario.status,
    });
    setModalAberto(true);
  };

  /* Fecha o modal */
  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioEditando(null);
  };

  /* Salva usuário novo ou editado */
  const salvarUsuario = (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.telefone || !form.status) {
      return;
    }

    if (modoModal === "criar") {
      const novoUsuario = {
        id: Date.now(),
        ...form,
      };

      setUsuarios((listaAtual) => [...listaAtual, novoUsuario]);
    } else {
      setUsuarios((listaAtual) =>
        listaAtual.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? { ...usuario, ...form }
            : usuario
        )
      );
    }

    fecharModal();
  };

  /* Exclui usuário */
  const excluirUsuario = (id) => {
    const confirmar = window.confirm("Deseja excluir este usuário?");

    if (!confirmar) {
      return;
    }

    setUsuarios((listaAtual) =>
      listaAtual.filter((usuario) => usuario.id !== id)
    );
  };

  return (
    <>
      {/* Botão novo usuário */}
      <div className="ad-table-actions">
        <button type="button" className="ad-new-user-btn" onClick={abrirModalCriar}>
          + Novo usuário
        </button>
      </div>

      {/* Busca e filtro */}
      <div className="ad-table-controls">
        <input
          type="text"
          className="ad-search-input"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          className="ad-filter-select"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Ativo">Ativos</option>
          <option value="Pendente">Pendentes</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      {/* Tabela de usuários */}
      <div className="ad-table-wrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>#{usuario.id}</td>

                <td>
                  <div className="ad-user-cell">
                    <div className="ad-user-avatar">
                      {usuario.nome.charAt(0)}
                    </div>

                    <span>{usuario.nome}</span>
                  </div>
                </td>

                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>

                <td>
                  <span className={`ad-status ad-status--${usuario.status.toLowerCase()}`}>
                    {usuario.status}
                  </span>
                </td>

                <td>
                  <div className="ad-actions">
                    <button
                      className="ad-edit-btn"
                      onClick={() => abrirModalEditar(usuario)}
                    >
                      <IconEdit size={15} color="#0044e0" />
                      Editar
                    </button>

                    <button
                      className="ad-delete-btn"
                      onClick={() => excluirUsuario(usuario.id)}
                    >
                      <IconTrash size={15} color="#ef4444" />
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Mensagem quando não encontra usuários */}
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan="6">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de criar/editar usuário */}
      {modalAberto && (
        <div className="ad-modal-overlay">
          <div className="ad-modal">
            <div className="ad-modal-header">
              <h3>{modoModal === "criar" ? "Novo usuário" : "Editar usuário"}</h3>
              <button type="button" className="ad-modal-close" onClick={fecharModal}>
                ×
              </button>
            </div>

            <form className="ad-modal-form" onSubmit={salvarUsuario}>
              <div className="ad-modal-field">
                <label>Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Digite o nome"
                />
              </div>

              <div className="ad-modal-field">
                <label>E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Digite o e-mail"
                />
              </div>

              <div className="ad-modal-field">
                <label>Telefone</label>
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  placeholder="Digite o telefone"
                />
              </div>

              <div className="ad-modal-field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              {/* Botões do modal */}
              <div className="ad-modal-actions">
                <button type="button" className="ad-modal-cancel" onClick={fecharModal}>
                  Cancelar
                </button>

                <button type="submit" className="ad-modal-save">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;