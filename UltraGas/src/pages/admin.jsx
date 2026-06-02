import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/admin.css";

import { useState } from "react";
import UserTable from "../components/UserTable";
import NavBar from "../components/NavBar";

/* Ícone de notificação */
const IconBell = ({ size = 20, color = "#374151" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* Usuários de exemplo */
const usuariosMock = [
  { id: 1, nome: "Jonatas", email: "jonatas@email.com", telefone: "(75) 99999-1001", status: "Ativo" },
  { id: 2, nome: "Gustavo Sales", email: "gustavo@email.com", telefone: "(75) 99999-1002", status: "Ativo" },
  { id: 3, nome: "Carlos Lima", email: "carlos@email.com", telefone: "(75) 99999-1003", status: "Pendente" },
  { id: 4, nome: "Ana Costa", email: "ana@email.com", telefone: "(75) 99999-1004", status: "Ativo" },
  { id: 5, nome: "Pedro Rocha", email: "pedro@email.com", telefone: "(75) 99999-1005", status: "Inativo" },
];

/* Pedidos de exemplo */
const pedidosMock = [
  { id: 1, cliente: "Jonatas", gas: "P13 Azul", quantidade: 1, pagamento: "Pix", total: 108, status: "Pendente" },
  { id: 2, cliente: "Gustavo Sales", gas: "P45 Azul", quantidade: 1, pagamento: "Dinheiro", total: 520, status: "Em entrega" },
  { id: 3, cliente: "Ana Costa", gas: "P13 Cinza", quantidade: 2, pagamento: "Cartão de débito", total: 192, status: "Concluído" },
  { id: 4, cliente: "Pedro Rocha", gas: "P20 Azul", quantidade: 1, pagamento: "Pix", total: 220, status: "Cancelado" },
];

function Admin() {
  /* Controla qual aba está aberta */
  const [abaAtiva, setAbaAtiva] = useState("usuarios");

  /* Listas do painel */
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [pedidos, setPedidos] = useState(pedidosMock);

  /* Contadores dos cards */
  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter((u) => u.status === "Ativo").length;
  const usuariosPendentes = usuarios.filter((u) => u.status === "Pendente").length;
  const totalPedidos = pedidos.length;

  /* Transforma status em classe CSS */
  const statusClass = (status) =>
    status.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /* Avança o status do pedido */
  const alterarStatusPedido = (id) => {
    setPedidos((listaAtual) =>
      listaAtual.map((pedido) => {
        if (pedido.id !== id) return pedido;

        if (pedido.status === "Pendente") {
          return { ...pedido, status: "Em entrega" };
        }

        if (pedido.status === "Em entrega") {
          return { ...pedido, status: "Concluído" };
        }

        return pedido;
      })
    );
  };

  /* Cancela um pedido */
  const cancelarPedido = (id) => {
    const confirmar = window.confirm("Deseja cancelar este pedido?");

    if (!confirmar) return;

    setPedidos((listaAtual) =>
      listaAtual.map((pedido) =>
        pedido.id === id ? { ...pedido, status: "Cancelado" } : pedido
      )
    );
  };

  return (
    <div className="ad-root">
      {/* Menu lateral/inferior */}
      <NavBar page="ad" active="admin" />

      <main className="ad-main">
        {/* Cabeçalho */}
        <header className="ad-header">
          <div>
            <h1 className="ad-header-title">Painel Administrativo</h1>
            <p className="ad-header-sub">
              Gerencie usuários e pedidos cadastrados no sistema.
            </p>
          </div>

          <div className="ad-bell-btn">
            <IconBell size={20} color="#374151" />
            <span className="ad-bell-badge">2</span>
          </div>
        </header>

        {/* Cards de resumo */}
        <section className="ad-stats">
          <div className="ad-stat-card">
            <span>Total de usuários</span>
            <strong>{totalUsuarios}</strong>
          </div>

          <div className="ad-stat-card">
            <span>Usuários ativos</span>
            <strong>{usuariosAtivos}</strong>
          </div>

          <div className="ad-stat-card">
            <span>Pendentes</span>
            <strong>{usuariosPendentes}</strong>
          </div>

          <div className="ad-stat-card">
            <span>Total de pedidos</span>
            <strong>{totalPedidos}</strong>
          </div>
        </section>

        {/* Card principal */}
        <section className="ad-card">
          <div className="ad-card-header ad-card-header-row">
            <div>
              <h2>{abaAtiva === "usuarios" ? "Usuários Cadastrados" : "Pedidos Realizados"}</h2>
              <p>
                {abaAtiva === "usuarios"
                  ? "Lista de usuários cadastrados no sistema."
                  : "Lista de pedidos mockados para visualização administrativa."}
              </p>
            </div>

            {/* Abas */}
            <div className="ad-tabs">
              <button
                type="button"
                className={`ad-tab-btn ${abaAtiva === "usuarios" ? "ad-tab-btn--active" : ""}`}
                onClick={() => setAbaAtiva("usuarios")}
              >
                Usuários
              </button>

              <button
                type="button"
                className={`ad-tab-btn ${abaAtiva === "pedidos" ? "ad-tab-btn--active" : ""}`}
                onClick={() => setAbaAtiva("pedidos")}
              >
                Pedidos
              </button>
            </div>
          </div>

          {/* Tabela de usuários ou pedidos */}
          {abaAtiva === "usuarios" ? (
            <UserTable usuarios={usuarios} setUsuarios={setUsuarios} />
          ) : (
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Gás</th>
                    <th>Qtd</th>
                    <th>Pagamento</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{String(pedido.id).padStart(3, "0")}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.gas}</td>
                      <td>{pedido.quantidade}</td>
                      <td>{pedido.pagamento}</td>
                      <td>
                        R$ {pedido.total.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td>
                        <span className={`ad-order-status ad-order-status--${statusClass(pedido.status)}`}>
                          {pedido.status}
                        </span>
                      </td>

                      <td>
                        <div className="ad-actions">
                          {(pedido.status === "Pendente" || pedido.status === "Em entrega") && (
                            <button
                              type="button"
                              className="ad-edit-btn"
                              onClick={() => alterarStatusPedido(pedido.id)}
                            >
                              {pedido.status === "Pendente" ? "Enviar" : "Concluir"}
                            </button>
                          )}

                          {(pedido.status === "Pendente" || pedido.status === "Em entrega") && (
                            <button
                              type="button"
                              className="ad-delete-btn"
                              onClick={() => cancelarPedido(pedido.id)}
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;