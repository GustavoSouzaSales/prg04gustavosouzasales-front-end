import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/perfil.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

/* Ícone de notificação */
const IconBell = ({ size = 20, color = "#374151" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* Ícone de usuário */
const IconUser = ({ size = 22, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* Ícone de endereço */
const IconMap = ({ size = 22, color = "#16a34a" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* Ícone de pedidos */
const IconOrder = ({ size = 22, color = "#7c3aed" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

/* Endereços de exemplo */
const enderecosMock = [
  {
    id: 1,
    titulo: "Casa",
    cep: "01001-000",
    endereco: "Praça da Sé",
    numero: "100",
    bairro: "Sé",
    cidade: "São Paulo",
    uf: "SP",
    principal: true,
  },
  {
    id: 2,
    titulo: "Trabalho",
    cep: "44900-000",
    endereco: "Rua Principal",
    numero: "45",
    bairro: "Centro",
    cidade: "Irecê",
    uf: "BA",
    principal: false,
  },
];

/* Pedidos de exemplo */
const pedidosMock = [
  {
    id: 1,
    codigo: "#001",
    gas: "P13 Azul",
    quantidade: 1,
    total: 108,
    pagamento: "Pix",
    status: "Pendente",
  },
  {
    id: 2,
    codigo: "#002",
    gas: "P13 Cinza",
    quantidade: 2,
    total: 192,
    pagamento: "Cartão de débito",
    status: "Concluído",
  },
  {
    id: 3,
    codigo: "#003",
    gas: "P45 Azul",
    quantidade: 1,
    total: 520,
    pagamento: "Dinheiro",
    status: "Em entrega",
  },
];

function Perfil() {
  /* Controla qual aba aparece */
  const [abaAtiva, setAbaAtiva] = useState("dados");

  /* Dados do perfil */
  const [perfil, setPerfil] = useState({
    nome: "Gustavo Sales",
    email: "gustavo@email.com",
    telefone: "(75) 99999-1002",
    status: "Ativo",
  });

  /* Lista de endereços */
  const [enderecos, setEnderecos] = useState(enderecosMock);

  /* Controle dos modais */
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);

  /* Controle do modal de endereço */
  const [modoEnderecoModal, setModoEnderecoModal] = useState("criar");
  const [enderecoEditando, setEnderecoEditando] = useState(null);
  const [mostrarCamposSenha, setMostrarCamposSenha] = useState(false);

  /* Formulário do perfil */
  const [formPerfil, setFormPerfil] = useState({
    nome: "",
    email: "",
    telefone: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  /* Formulário do endereço */
  const [formEndereco, setFormEndereco] = useState({
    titulo: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    principal: false,
  });

  /* Ajusta o status para virar classe CSS */
  const statusClass = (status) =>
    status.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /* Abre o modal de editar perfil */
  const abrirModalPerfil = () => {
    setFormPerfil({
      nome: perfil.nome,
      email: perfil.email,
      telefone: perfil.telefone,
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    });

    setModalPerfilAberto(true);
    setMostrarCamposSenha(false);
  };

  /* Fecha o modal de perfil */
  const fecharModalPerfil = () => {
    setModalPerfilAberto(false);
  };

  /* Salva as alterações do perfil */
  const salvarPerfil = (e) => {
    e.preventDefault();

    if (!formPerfil.nome || !formPerfil.email || !formPerfil.telefone) {
      return;
    }

    if (mostrarCamposSenha) {
      if (!formPerfil.senhaAtual || !formPerfil.novaSenha || !formPerfil.confirmarSenha) {
        alert("Preencha todos os campos de senha.");
        return;
      }

      if (formPerfil.novaSenha !== formPerfil.confirmarSenha) {
        alert("A nova senha e a confirmação não conferem.");
        return;
      }
    }

    setPerfil({
      ...perfil,
      nome: formPerfil.nome,
      email: formPerfil.email,
      telefone: formPerfil.telefone,
    });

    fecharModalPerfil();
  };

  /* Abre modal para novo endereço */
  const abrirModalNovoEndereco = () => {
    setModoEnderecoModal("criar");
    setEnderecoEditando(null);
    setFormEndereco({
      titulo: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
      principal: false,
    });

    setModalEnderecoAberto(true);
  };

  /* Abre modal para editar endereço */
  const abrirModalEditarEndereco = (endereco) => {
    setModoEnderecoModal("editar");
    setEnderecoEditando(endereco);
    setFormEndereco({
      titulo: endereco.titulo,
      cep: endereco.cep,
      endereco: endereco.endereco,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: endereco.uf,
      principal: endereco.principal,
    });

    setModalEnderecoAberto(true);
  };

  /* Fecha modal de endereço */
  const fecharModalEndereco = () => {
    setModalEnderecoAberto(false);
    setEnderecoEditando(null);
  };

  /* Salva endereço novo ou editado */
  const salvarEndereco = (e) => {
    e.preventDefault();

    if (
      !formEndereco.titulo ||
      !formEndereco.cep ||
      !formEndereco.endereco ||
      !formEndereco.numero ||
      !formEndereco.bairro ||
      !formEndereco.cidade ||
      !formEndereco.uf
    ) {
      return;
    }

    if (modoEnderecoModal === "criar") {
      const novoEndereco = {
        id: Date.now(),
        ...formEndereco,
      };

      if (formEndereco.principal) {
        setEnderecos((listaAtual) =>
          listaAtual
            .map((endereco) => ({
              ...endereco,
              principal: false,
            }))
            .concat(novoEndereco)
        );
      } else {
        setEnderecos((listaAtual) => [...listaAtual, novoEndereco]);
      }
    } else {
      setEnderecos((listaAtual) =>
        listaAtual.map((endereco) => {
          if (formEndereco.principal) {
            return endereco.id === enderecoEditando.id
              ? { ...endereco, ...formEndereco }
              : { ...endereco, principal: false };
          }

          return endereco.id === enderecoEditando.id
            ? { ...endereco, ...formEndereco }
            : endereco;
        })
      );
    }

    fecharModalEndereco();
  };

  /* Define endereço principal */
  const marcarPrincipal = (id) => {
    setEnderecos((listaAtual) =>
      listaAtual.map((endereco) => ({
        ...endereco,
        principal: endereco.id === id,
      }))
    );
  };

  /* Exclui endereço */
  const excluirEndereco = (id) => {
    const confirmar = window.confirm("Deseja excluir este endereço?");

    if (!confirmar) return;

    setEnderecos((listaAtual) =>
      listaAtual.filter((endereco) => endereco.id !== id)
    );
  };

  return (
    <div className="pf-root">
      {/* Menu lateral/inferior */}
      <NavBar page="pf" active="perfil" />

      <main className="pf-main">
        {/* Cabeçalho */}
        <header className="pf-header">
          <div>
            <h1 className="pf-header-title">Meu Perfil</h1>
            <p className="pf-header-sub">
              Gerencie seus dados, endereços e acompanhe seus pedidos.
            </p>
          </div>

          <button className="pf-bell-btn" aria-label="Notificações">
            <IconBell size={20} color="#374151" />
            <span className="pf-bell-badge">2</span>
          </button>
        </header>

        {/* Card principal do perfil */}
        <section className="pf-profile-card">
          <div className="pf-profile-avatar">
            {perfil.nome.charAt(0)}
          </div>

          <div className="pf-profile-info">
            <h2>{perfil.nome}</h2>
            <p>{perfil.email}</p>
          </div>

          <button
            type="button"
            className="pf-edit-profile-btn"
            onClick={abrirModalPerfil}
          >
            Editar perfil
          </button>
        </section>

        {/* Cards de resumo */}
        <section className="pf-stats">
          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--blue">
              <IconUser size={22} color="#0044e0" />
            </div>

            <div>
              <span>Dados pessoais</span>
              <strong>Atualizados</strong>
            </div>
          </div>

          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--green">
              <IconMap size={22} color="#16a34a" />
            </div>

            <div>
              <span>Endereços salvos</span>
              <strong>{enderecos.length}</strong>
            </div>
          </div>

          <div className="pf-stat-card">
            <div className="pf-stat-icon pf-stat-icon--purple">
              <IconOrder size={22} color="#7c3aed" />
            </div>

            <div>
              <span>Pedidos realizados</span>
              <strong>{pedidosMock.length}</strong>
            </div>
          </div>
        </section>

        {/* Card com abas */}
        <section className="pf-card">
          <div className="pf-tabs">
            <button
              type="button"
              className={`pf-tab-btn ${abaAtiva === "dados" ? "pf-tab-btn--active" : ""}`}
              onClick={() => setAbaAtiva("dados")}
            >
              Dados pessoais
            </button>

            <button
              type="button"
              className={`pf-tab-btn ${abaAtiva === "enderecos" ? "pf-tab-btn--active" : ""}`}
              onClick={() => setAbaAtiva("enderecos")}
            >
              Meus endereços
            </button>

            <button
              type="button"
              className={`pf-tab-btn ${abaAtiva === "pedidos" ? "pf-tab-btn--active" : ""}`}
              onClick={() => setAbaAtiva("pedidos")}
            >
              Meus pedidos
            </button>
          </div>

          {/* Aba dados */}
          {abaAtiva === "dados" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div>
                  <h3>Dados pessoais</h3>
                  <p>Informações básicas da sua conta.</p>
                </div>
              </div>

              <div className="pf-form-grid">
                <div className="pf-field">
                  <label>Nome completo</label>
                  <input type="text" value={perfil.nome} readOnly />
                </div>

                <div className="pf-field">
                  <label>E-mail</label>
                  <input type="email" value={perfil.email} readOnly />
                </div>

                <div className="pf-field">
                  <label>Telefone</label>
                  <input type="text" value={perfil.telefone} readOnly />
                </div>

                <div className="pf-field">
                  <label>Status da conta</label>
                  <input type="text" value={perfil.status} readOnly />
                </div>
              </div>
            </div>
          )}

          {/* Aba endereços */}
          {abaAtiva === "enderecos" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div>
                  <h3>Meus endereços</h3>
                  <p>Endereços salvos para entrega dos seus pedidos.</p>
                </div>

                <button
                  type="button"
                  className="pf-add-btn"
                  onClick={abrirModalNovoEndereco}
                >
                  + Novo endereço
                </button>
              </div>

              <div className="pf-address-list">
                {enderecos.map((endereco) => (
                  <div className="pf-address-card" key={endereco.id}>
                    <div>
                      <div className="pf-address-title">
                        {endereco.titulo}

                        {endereco.principal && (
                          <span className="pf-main-badge">Principal</span>
                        )}
                      </div>

                      <p>
                        {endereco.endereco}, {endereco.numero}
                      </p>

                      <p>
                        {endereco.bairro} - {endereco.cidade}/{endereco.uf}
                      </p>

                      <p>CEP: {endereco.cep}</p>
                    </div>

                    <div className="pf-address-actions">
                      {!endereco.principal && (
                        <button
                          type="button"
                          className="pf-outline-btn"
                          onClick={() => marcarPrincipal(endereco.id)}
                        >
                          Tornar principal
                        </button>
                      )}

                      <button
                        type="button"
                        className="pf-outline-btn"
                        onClick={() => abrirModalEditarEndereco(endereco)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="pf-danger-btn"
                        onClick={() => excluirEndereco(endereco.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}

                {enderecos.length === 0 && (
                  <p className="pf-empty-message">
                    Nenhum endereço cadastrado.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Aba pedidos */}
          {abaAtiva === "pedidos" && (
            <div className="pf-section">
              <div className="pf-section-header">
                <div>
                  <h3>Meus pedidos</h3>
                  <p>Acompanhe o histórico e status dos seus pedidos.</p>
                </div>
              </div>

              <div className="pf-table-wrap">
                <table className="pf-table">
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Gás</th>
                      <th>Qtd</th>
                      <th>Pagamento</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pedidosMock.map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.codigo}</td>
                        <td>{pedido.gas}</td>
                        <td>{pedido.quantidade}</td>
                        <td>{pedido.pagamento}</td>
                        <td>
                          R$ {pedido.total.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          <span className={`pf-status pf-status--${statusClass(pedido.status)}`}>
                            {pedido.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Modal de editar perfil */}
        {modalPerfilAberto && (
          <div className="pf-modal-overlay">
            <div className="pf-modal">
              <div className="pf-modal-header">
                <h3>Editar perfil</h3>

                <button
                  type="button"
                  className="pf-modal-close"
                  onClick={fecharModalPerfil}
                >
                  ×
                </button>
              </div>

              <form className="pf-modal-form" onSubmit={salvarPerfil}>
                <div className="pf-modal-field">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    value={formPerfil.nome}
                    onChange={(e) =>
                      setFormPerfil({ ...formPerfil, nome: e.target.value })
                    }
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={formPerfil.email}
                    onChange={(e) =>
                      setFormPerfil({ ...formPerfil, email: e.target.value })
                    }
                    placeholder="Digite seu e-mail"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={formPerfil.telefone}
                    onChange={(e) =>
                      setFormPerfil({ ...formPerfil, telefone: e.target.value })
                    }
                    placeholder="Digite seu telefone"
                  />
                </div>

                {/* Área para alterar senha */}
                <div className="pf-password-box">
                  <div>
                    <strong>Senha da conta</strong>
                    <p>Altere sua senha apenas se desejar atualizar o acesso.</p>
                  </div>

                  <button
                    type="button"
                    className="pf-change-password-btn"
                    onClick={() => setMostrarCamposSenha((valor) => !valor)}
                  >
                    {mostrarCamposSenha ? "Cancelar troca" : "Mudar senha"}
                  </button>
                </div>

                {mostrarCamposSenha && (
                  <>
                    <div className="pf-modal-field">
                      <label>Senha atual</label>

                      <input
                        type="password"
                        value={formPerfil.senhaAtual}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            senhaAtual: e.target.value,
                          })
                        }
                        placeholder="Digite sua senha atual"
                      />
                    </div>

                    <div className="pf-modal-field">
                      <label>Nova senha</label>

                      <input
                        type="password"
                        value={formPerfil.novaSenha}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            novaSenha: e.target.value,
                          })
                        }
                        placeholder="Digite a nova senha"
                      />
                    </div>

                    <div className="pf-modal-field">
                      <label>Confirmar nova senha</label>

                      <input
                        type="password"
                        value={formPerfil.confirmarSenha}
                        onChange={(e) =>
                          setFormPerfil({
                            ...formPerfil,
                            confirmarSenha: e.target.value,
                          })
                        }
                        placeholder="Confirme a nova senha"
                      />
                    </div>

                    <div className="pf-forgot-password-box">
                      <Link to="/esqueci-senha" className="pf-forgot-password-link">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </>
                )}

                <div className="pf-modal-actions">
                  <button
                    type="button"
                    className="pf-modal-cancel"
                    onClick={fecharModalPerfil}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="pf-modal-save">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de endereço */}
        {modalEnderecoAberto && (
          <div className="pf-modal-overlay">
            <div className="pf-modal">
              <div className="pf-modal-header">
                <h3>
                  {modoEnderecoModal === "criar"
                    ? "Novo endereço"
                    : "Editar endereço"}
                </h3>

                <button
                  type="button"
                  className="pf-modal-close"
                  onClick={fecharModalEndereco}
                >
                  ×
                </button>
              </div>

              <form className="pf-modal-form" onSubmit={salvarEndereco}>
                <div className="pf-modal-field">
                  <label>Título</label>
                  <input
                    type="text"
                    value={formEndereco.titulo}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, titulo: e.target.value })
                    }
                    placeholder="Ex: Casa, Trabalho..."
                  />
                </div>

                <div className="pf-modal-field">
                  <label>CEP</label>
                  <input
                    type="text"
                    value={formEndereco.cep}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, cep: e.target.value })
                    }
                    placeholder="00000-000"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>Endereço</label>
                  <input
                    type="text"
                    value={formEndereco.endereco}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, endereco: e.target.value })
                    }
                    placeholder="Rua, avenida..."
                  />
                </div>

                <div className="pf-modal-field">
                  <label>Número</label>
                  <input
                    type="text"
                    value={formEndereco.numero}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, numero: e.target.value })
                    }
                    placeholder="Nº"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>Bairro</label>
                  <input
                    type="text"
                    value={formEndereco.bairro}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, bairro: e.target.value })
                    }
                    placeholder="Digite o bairro"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={formEndereco.cidade}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, cidade: e.target.value })
                    }
                    placeholder="Digite a cidade"
                  />
                </div>

                <div className="pf-modal-field">
                  <label>UF</label>
                  <input
                    type="text"
                    value={formEndereco.uf}
                    onChange={(e) =>
                      setFormEndereco({ ...formEndereco, uf: e.target.value })
                    }
                    placeholder="BA"
                  />
                </div>

                <label className="pf-modal-check">
                  <input
                    type="checkbox"
                    checked={formEndereco.principal}
                    onChange={(e) =>
                      setFormEndereco({
                        ...formEndereco,
                        principal: e.target.checked,
                      })
                    }
                  />
                  Definir como endereço principal
                </label>

                <div className="pf-modal-actions">
                  <button
                    type="button"
                    className="pf-modal-cancel"
                    onClick={fecharModalEndereco}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="pf-modal-save">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Perfil;