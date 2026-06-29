import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/admin.css";

import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import NavBar from "../components/NavBar";
import { apiFetch } from "../services/api";

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

function Admin() {
  const [abaAtiva, setAbaAtiva] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
  const [modoProdutoModal, setModoProdutoModal] = useState("criar");
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [pedidoDetalhe, setPedidoDetalhe] = useState(null);
  const [enderecoDetalhe, setEnderecoDetalhe] = useState(null);
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const [formProduto, setFormProduto] = useState({
    nome: "", peso: "", cor: "Azul", preco: "", estoque: "", ativo: true,
  });

  useEffect(() => {
    carregarUsuarios();
    carregarPedidos();
    carregarProdutos();
  }, []);

  async function carregarUsuarios() {
    try {
      const resposta = await apiFetch("/usuarios?page=0&size=100");
      setUsuarios(resposta.content || []);
    } catch (error) { showToast(error.message); }
  }

  async function carregarPedidos() {
    try {
      const resposta = await apiFetch("/pedidos?page=0&size=100");
      const listaPedidos = resposta.content || [];
      const pedidosComItens = await Promise.all(
        listaPedidos.map(async (pedido) => {
          const itensResposta = await apiFetch(`/itens-pedido/pedido/${pedido.id}?page=0&size=100`);
          const cliente = await apiFetch(`/usuarios/${pedido.usuarioId}`);
          return {
            ...pedido,
            cliente: pedido.nomeContato || cliente?.nome || `Usuário ${pedido.usuarioId}`,
            telefoneCliente: pedido.telefoneContato || cliente?.telefone || "-",
            tipoUsuarioCliente: cliente?.tipoUsuario || "-",
            itens: itensResposta.content || [],
          };
        })
      );
      setPedidos(pedidosComItens);
    } catch (error) { showToast(error.message); }
  }

  async function carregarProdutos() {
    try {
      const resposta = await apiFetch("/produtos?page=0&size=100");
      setProdutos(resposta.content || []);
    } catch (error) { showToast(error.message); }
  }

  const totalUsuarios     = usuarios.length;
  const usuariosAtivos    = usuarios.filter((u) => u.status === "Ativo").length;
  const usuariosPendentes = usuarios.filter((u) => u.status === "Pendente").length;
  const totalProdutos     = produtos.length;

  const statusClass = (s) =>
    s.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const atualizarStatusPedido = async (pedido, novoStatus) => {
    try {
      const pedidoAtualizado = await apiFetch(`/pedidos/${pedido.id}`, {
        method: "PUT",
        body: JSON.stringify({
          usuarioId: pedido.usuarioId, enderecoId: pedido.enderecoId,
          valorTotal: pedido.valorTotal, formaPagamento: pedido.formaPagamento,
          formaRecebimento: pedido.formaRecebimento, status: novoStatus,
        }),
      });
      setPedidos((lista) => lista.map((p) => p.id === pedido.id ? { ...p, status: pedidoAtualizado.status } : p));
      showToast(`Status atualizado para "${novoStatus}".`, "success");
    } catch (error) { showToast(error.message); }
  };

  const alterarStatusPedido = (pedido) => {
    if (pedido.status === "Pendente") atualizarStatusPedido(pedido, "Em entrega");
    else if (pedido.status === "Em entrega") atualizarStatusPedido(pedido, "Concluído");
  };

  const cancelarPedido = (pedido) => {
    if (!window.confirm("Deseja cancelar este pedido?")) return;
    atualizarStatusPedido(pedido, "Cancelado");
  };

  const abrirModalCriarProduto = () => {
    setModoProdutoModal("criar"); setProdutoEditando(null);
    setFormProduto({ nome: "", peso: "", cor: "Azul", preco: "", estoque: "", ativo: true });
    setModalProdutoAberto(true);
  };

  const abrirModalEditarProduto = (produto) => {
    setModoProdutoModal("editar"); setProdutoEditando(produto);
    setFormProduto({ nome: produto.nome || "", peso: produto.peso || "", cor: produto.cor || "Azul",
      preco: produto.preco ?? "", estoque: produto.estoque ?? "", ativo: produto.ativo !== false });
    setModalProdutoAberto(true);
  };

  const fecharModalProduto = () => { setModalProdutoAberto(false); setProdutoEditando(null); };

  const salvarProduto = async (e) => {
    e.preventDefault();
    if (!formProduto.nome || !formProduto.peso || !formProduto.cor || formProduto.preco === "" || formProduto.estoque === "") {
      showToast("Preencha todos os campos do produto.", "warning");
      return;
    }
    const produtoPayload = {
      nome: formProduto.nome, peso: formProduto.peso, cor: formProduto.cor,
      preco: Number(formProduto.preco), estoque: Number(formProduto.estoque), ativo: formProduto.ativo,
    };
    try {
      if (modoProdutoModal === "criar") {
        const novoProduto = await apiFetch("/produtos", { method: "POST", body: JSON.stringify(produtoPayload) });
        setProdutos((lista) => [...lista, novoProduto]);
        showToast("Produto criado com sucesso!", "success");
      } else {
        const produtoAtualizado = await apiFetch(`/produtos/${produtoEditando.id}`, { method: "PUT", body: JSON.stringify(produtoPayload) });
        setProdutos((lista) => lista.map((p) => p.id === produtoEditando.id ? produtoAtualizado : p));
        showToast("Produto atualizado!", "success");
      }
      fecharModalProduto();
    } catch (error) { showToast(error.message); }
  };

  const excluirProduto = async (id) => {
    if (!window.confirm("Deseja excluir este produto?")) return;
    try {
      await apiFetch(`/produtos/${id}`, { method: "DELETE" });
      setProdutos((lista) => lista.filter((produto) => produto.id !== id));
      showToast("Produto excluído.", "success");
    } catch (error) { showToast(error.message); }
  };

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

  const stats = [
    { label: "Total de usuários", value: totalUsuarios },
    { label: "Usuários ativos",   value: usuariosAtivos },
    { label: "Pendentes",         value: usuariosPendentes },
    { label: "Produtos",          value: totalProdutos },
  ];

  return (
    <div className="ad-root">
      <NavBar page="ad" active="admin" />
      <main className="ad-main">
        <header className="ad-header">
          <div>
            <h1 className="ad-header-title">Painel Administrativo</h1>
            <p className="ad-header-sub">Gerencie usuários, pedidos e produtos cadastrados no sistema.</p>
          </div>
        </header>

        <section className="ad-stats">
          {stats.map((s, i) => (
            <div className="ad-stat-card" key={i} data-num={s.value}>
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </section>

        <section className="ad-card">
          <div className="ad-card-header ad-card-header-row">
            <div>
              <h2>{abaAtiva === "usuarios" ? "Usuários Cadastrados" : abaAtiva === "pedidos" ? "Pedidos Realizados" : "Produtos Cadastrados"}</h2>
              <p>{abaAtiva === "usuarios" ? "Lista de usuários cadastrados no sistema." : abaAtiva === "pedidos" ? "Lista de pedidos para visualização administrativa." : "Cadastre, edite e remova produtos disponíveis para pedido."}</p>
            </div>
            <div className="ad-tabs">
              {[["usuarios","Usuários"],["pedidos","Pedidos"],["produtos","Produtos"]].map(([key,label]) => (
                <button key={key} type="button"
                  className={`ad-tab-btn ${abaAtiva === key ? "ad-tab-btn--active" : ""}`}
                  onClick={() => setAbaAtiva(key)}>{label}</button>
              ))}
            </div>
          </div>

          {abaAtiva === "usuarios" && <UserTable usuarios={usuarios} setUsuarios={setUsuarios} showToast={showToast} />}

          {abaAtiva === "pedidos" && (
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead>
                  <tr><th>Pedido</th><th>Cliente</th><th>Pagamento</th><th>Entrega</th><th>Data</th><th>Status</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.codigo}</td>
                      <td>{p.cliente}</td>
                      <td>{p.formaPagamento}</td>
                      <td>{p.formaRecebimento || "-"}</td>
                      <td>{p.dataPedido ? new Date(p.dataPedido).toLocaleDateString("pt-BR") : "-"}</td>
                      <td><span className={`ad-order-status ad-order-status--${statusClass(p.status)}`}>{p.status}</span></td>
                      <td>
                        <div className="ad-actions">
                          <button type="button" className="ad-details-btn" onClick={() => abrirDetalhesPedido(p)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            Detalhes
                          </button>
                          {p.formaRecebimento === "Retirada" && p.status === "Pendente" && (
                            <button type="button" className="ad-edit-btn" onClick={() => atualizarStatusPedido(p, "Concluído")}>Retirado</button>
                          )}
                          {p.formaRecebimento !== "Retirada" && (p.status === "Pendente" || p.status === "Em entrega") && (
                            <button type="button" className="ad-edit-btn" onClick={() => alterarStatusPedido(p)}>
                              {p.status === "Pendente" ? "Enviar" : "Concluir"}
                            </button>
                          )}
                          {(p.status === "Pendente" || p.status === "Em entrega") && (
                            <button type="button" className="ad-delete-btn" onClick={() => cancelarPedido(p)}>Cancelar</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pedidos.length === 0 && <tr><td colSpan="7" style={{textAlign:"center",color:"var(--text-3)",padding:"28px"}}>Nenhum pedido encontrado.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {abaAtiva === "produtos" && (
            <>
              <div className="ad-table-controls">
                <button type="button" className="ad-new-user-btn" onClick={abrirModalCriarProduto}>+ Novo produto</button>
              </div>
              <div className="ad-table-wrap">
                <table className="ad-table ad-products-table">
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>Peso</th><th>Cor</th><th>Preço</th><th>Estoque</th><th>Status</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto) => (
                      <tr key={produto.id}>
                        <td>#{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.peso}</td>
                        <td>{produto.cor}</td>
                        <td>R$ {Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                        <td>{produto.estoque}</td>
                        <td><span className={`ad-status ${produto.ativo ? "ad-status--ativo" : "ad-status--inativo"}`}>{produto.ativo ? "Ativo" : "Inativo"}</span></td>
                        <td>
                          <div className="ad-actions">
                            <button type="button" className="ad-edit-btn" onClick={() => abrirModalEditarProduto(produto)}>Editar</button>
                            <button type="button" className="ad-delete-btn" onClick={() => excluirProduto(produto.id)}>Excluir</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {produtos.length === 0 && <tr><td colSpan="8" style={{textAlign:"center",color:"var(--text-3)",padding:"28px"}}>Nenhum produto encontrado.</td></tr>}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        {/* Modal detalhes pedido */}
        {pedidoDetalhe && (
          <div className="ad-modal-overlay">
            <div className="ad-modal ad-details-modal">
              <div className="ad-modal-header">
                <h3>{pedidoDetalhe.codigo}</h3>
                <button type="button" className="ad-modal-close" onClick={fecharDetalhesPedido}>×</button>
              </div>
              <div className="ad-details-grid">
                <div className="ad-detail-field"><label>Cliente</label><input value={pedidoDetalhe.nomeContato || pedidoDetalhe.cliente || "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Telefone</label><input value={pedidoDetalhe.telefoneContato || "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Pagamento</label><input value={pedidoDetalhe.formaPagamento || "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Recebimento</label><input value={pedidoDetalhe.formaRecebimento || "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Status</label><input value={pedidoDetalhe.status || "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Tipo de usuário</label><input value={pedidoDetalhe.tipoUsuarioCliente === "ADMINISTRADOR" ? "Administrador" : "Cliente"} readOnly /></div>
                <div className="ad-detail-field"><label>Data</label><input value={pedidoDetalhe.dataPedido ? new Date(pedidoDetalhe.dataPedido).toLocaleString("pt-BR") : "-"} readOnly /></div>
                <div className="ad-detail-field"><label>Total</label><input value={`R$ ${Number(pedidoDetalhe.valorTotal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} readOnly /></div>
              </div>
              <div className="ad-detail-section">
                <h4>Produtos</h4>
                {pedidoDetalhe.itens?.map((item) => (
                  <div className="ad-detail-product" key={item.id}>
                    <span>{item.nomeProduto} {item.corProduto}</span>
                    <span>{item.pesoProduto}</span>
                    <span>Qtd: {item.quantidade}</span>
                    <span>R$ {Number(item.subtotal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
              {pedidoDetalhe.formaRecebimento === "Entrega" && (
                <div className="ad-detail-section">
                  <button type="button" className="ad-details-btn" onClick={() => setMostrarEndereco((v) => !v)}>
                    {mostrarEndereco ? "Ocultar endereço" : "Ver endereço"}
                  </button>
                  {mostrarEndereco && enderecoDetalhe && (
                    <div className="ad-address-detail">
                      <p><strong>Título:</strong> {enderecoDetalhe.titulo}</p>
                      <p><strong>CEP:</strong> {enderecoDetalhe.cep}</p>
                      <p><strong>Endereço:</strong> {enderecoDetalhe.endereco}, {enderecoDetalhe.numero}</p>
                      <p><strong>Bairro:</strong> {enderecoDetalhe.bairro}</p>
                      <p><strong>Cidade/UF:</strong> {enderecoDetalhe.cidade}/{enderecoDetalhe.uf}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="ad-modal-actions">
                <button type="button" className="ad-modal-cancel" onClick={fecharDetalhesPedido}>Fechar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal produto neon */}
        {modalProdutoAberto && (
          <div className="ad-modal-overlay">
            <div className="ad-modal ad-modal--produto">
              <div className="ad-modal-header">
                <h3>{modoProdutoModal === "criar" ? "Novo produto" : "Editar produto"}</h3>
                <button type="button" className="ad-modal-close" onClick={fecharModalProduto}>×</button>
              </div>
              <form className="ad-modal-form" onSubmit={salvarProduto}>
                <div className="ad-modal-field">
                  <label>Nome</label>
                  <input type="text" value={formProduto.nome} placeholder="Ex: GLP Envasado P13"
                    onChange={(e) => setFormProduto({ ...formProduto, nome: e.target.value })} />
                </div>
                <div className="ad-modal-field">
                  <label>Peso</label>
                  <select value={formProduto.peso} onChange={(e) => setFormProduto({ ...formProduto, peso: e.target.value })}>
                    <option value="">Selecione</option>
                    <option value="13kg">13kg</option><option value="20kg">20kg</option><option value="45kg">45kg</option>
                  </select>
                </div>
                <div className="ad-modal-field">
                  <label>Cor</label>
                  <select value={formProduto.cor} onChange={(e) => setFormProduto({ ...formProduto, cor: e.target.value })}>
                    <option value="Azul">Azul</option><option value="Cinza">Cinza</option><option value="Amarelo">Amarelo</option>
                  </select>
                </div>
                <div className="ad-modal-field">
                  <label>Preço</label>
                  <input type="number" min="0" step="0.01" value={formProduto.preco} placeholder="Ex: 108.00"
                    onChange={(e) => setFormProduto({ ...formProduto, preco: e.target.value })} />
                </div>
                <div className="ad-modal-field">
                  <label>Estoque</label>
                  <input type="number" min="0" value={formProduto.estoque} placeholder="Ex: 20"
                    onChange={(e) => setFormProduto({ ...formProduto, estoque: e.target.value })} />
                </div>
                <div className="ad-modal-field">
                  <label>Status</label>
                  <select value={formProduto.ativo ? "true" : "false"}
                    onChange={(e) => setFormProduto({ ...formProduto, ativo: e.target.value === "true" })}>
                    <option value="true">Ativo</option><option value="false">Inativo</option>
                  </select>
                </div>
                <div className="ad-modal-actions">
                  <button type="button" className="ad-modal-cancel" onClick={fecharModalProduto}>Cancelar</button>
                  <button type="submit" className="ad-modal-save">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && (
          <div className={`ad-toast ad-toast--${toast.type}`}>
            <span className="ad-toast-icon">
              {toast.type === "success" ? <IconToastCheck /> : toast.type === "warning" ? <IconToastWarn /> : <IconToastX />}
            </span>
            <span className="ad-toast-msg">{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;