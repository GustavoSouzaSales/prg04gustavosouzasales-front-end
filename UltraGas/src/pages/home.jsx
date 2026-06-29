import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/home.css";
import Notificacao from "../components/Notificacao";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import previewImg from "../assets/images/preview.webp";
import NavBar from "../components/NavBar";
import { apiFetch } from "../services/api";

const IconArrow = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width={size} height={size}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconOrder = ({ size = 22, color = "#00aaff" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconTruck = ({ size = 22, color = "#00e676" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconMap = ({ size = 22, color = "#9c5fff" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconRepeat = ({ size = 22, color = "#ffb300" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Home() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const estaLogado = !!usuarioLogado?.id;

  const [ultimoPedido, setUltimoPedido] = useState(null);
  const [itensUltimoPedido, setItensUltimoPedido] = useState([]);
  const [enderecoPrincipal, setEnderecoPrincipal] = useState(null);
  const [enderecoUltimoPedido, setEnderecoUltimoPedido] = useState(null);

  const [modalPedidoRapido, setModalPedidoRapido] = useState(false);
  const [carregandoPedidoRapido, setCarregandoPedidoRapido] = useState(false);

  const [toast, setToast] = useState(null); // { msg, type: 'success'|'error' }

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  async function carregarDadosHome() {
    try {
      const pedidosResp = await apiFetch(`/pedidos/usuario/${usuarioLogado.id}?page=0&size=100`);
      const pedidos = pedidosResp.content || [];

      const ultimo = pedidos[pedidos.length - 1];
      setUltimoPedido(ultimo || null);

      if (ultimo) {
        const itensResp = await apiFetch(`/itens-pedido/pedido/${ultimo.id}?page=0&size=100`);
        setItensUltimoPedido(itensResp.content || []);

        if (ultimo.enderecoId) {
          const enderecoPedidoResp = await apiFetch(`/enderecos/${ultimo.enderecoId}`);
          setEnderecoUltimoPedido(enderecoPedidoResp);
        } else {
          setEnderecoUltimoPedido(null);
        }
      } else {
        setItensUltimoPedido([]);
        setEnderecoUltimoPedido(null);
      }

      const enderecosResp = await apiFetch(`/enderecos/usuario/${usuarioLogado.id}?page=0&size=100`);
      const enderecos = enderecosResp.content || [];

      setEnderecoPrincipal(
        enderecos.find((e) => e.principal) || enderecos[0] || null
      );
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  useEffect(() => {
    if (usuarioLogado?.id) {
      carregarDadosHome();
    }
  }, [usuarioLogado?.id]);

  const confirmarPedidoRapido = async () => {
    if (!ultimoPedido || itensUltimoPedido.length === 0) return;

    try {
      setCarregandoPedidoRapido(true);

      const novoPedido = await apiFetch("/pedidos", {
        method: "POST",
        body: JSON.stringify({
          usuarioId: usuarioLogado.id,
          enderecoId: ultimoPedido.enderecoId,
          status: "Pendente",
          valorTotal: ultimoPedido.valorTotal,
          formaPagamento: ultimoPedido.formaPagamento,
          formaRecebimento: ultimoPedido.formaRecebimento,
          nomeContato: ultimoPedido.nomeContato,
          telefoneContato: ultimoPedido.telefoneContato,
        }),
      });

      await Promise.all(
        itensUltimoPedido.map((item) =>
          apiFetch("/itens-pedido", {
            method: "POST",
            body: JSON.stringify({
              pedidoId: novoPedido.id,
              produtoId: item.produtoId,
              quantidade: item.quantidade,
            }),
          })
        )
      );

      setModalPedidoRapido(false);
      showToast("Pedido rápido realizado com sucesso!");
      await carregarDadosHome();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setCarregandoPedidoRapido(false);
    }
  };

  return (
    <div className="db-root">
      <NavBar page="db" active="home" />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-header-title">
              Bem-vindo,{" "}
              <span className="db-header-brand">
                {estaLogado ? usuarioLogado?.nome : "à Ultragaz"}!
              </span>{" "}
              👋
            </h1>
            <p className="db-header-sub">
              Acompanhe seus pedidos, endereços e peça seu gás com praticidade.
            </p>
          </div>

          <Notificacao />
        </header>

        <section className="db-hero" style={{ backgroundImage: `url(${previewImg})` }}>
          <div className="db-hero-text">
            <h2 className="db-hero-title">
              Energia que move<br />
              o que <span className="db-hero-highlight">importa.</span>
            </h2>
            <p className="db-hero-desc">
              Peça seu gás com segurança,<br />
              rapidez e acompanhamento.
            </p>
            <Link to="/pedido" className="db-hero-btn">
              Novo pedido <IconArrow size={15} />
            </Link>
          </div>
        </section>

        <section className="db-stats">
          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--blue">
              <IconOrder size={22} color="#00aaff" />
            </div>
            <div className="db-stat-body">
              <div className="db-stat-label">Último pedido</div>
              <div className="db-stat-value" style={{ fontSize: "16px", lineHeight: "1.25" }}>
                {ultimoPedido ? ultimoPedido.codigo : "Nenhum"}
              </div>
              <div className="db-stat-period">
                {ultimoPedido?.dataPedido
                  ? new Date(ultimoPedido.dataPedido).toLocaleString("pt-BR")
                  : "Sem pedido recente"}
              </div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--green">
              <IconTruck size={22} color="#00e676" />
            </div>
            <div className="db-stat-body">
              <div className="db-stat-label">Status atual</div>
              <div className="db-stat-value db-stat-value--text">
                {ultimoPedido ? ultimoPedido.status : "Sem pedido"}
              </div>
              <div className="db-stat-period">
                {ultimoPedido?.status === "Em entrega"
                  ? "A caminho do endereço"
                  : ultimoPedido?.status || "Nenhum pedido em andamento"}
              </div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon db-stat-icon--purple">
              <IconMap size={22} color="#9c5fff" />
            </div>
            <div className="db-stat-body">
              <div className="db-stat-label">Endereço principal</div>
              <div className="db-stat-value db-stat-value--text">
                {enderecoPrincipal ? enderecoPrincipal.titulo : "Nenhum"}
              </div>
              <div className="db-stat-period">
                {enderecoPrincipal
                  ? `${enderecoPrincipal.endereco}, ${enderecoPrincipal.numero}`
                  : "Cadastre um endereço"}
              </div>
            </div>
          </div>

          <div
            className="db-stat-card db-fast-order-card"
            onClick={() => {
              if (ultimoPedido && itensUltimoPedido.length > 0) {
                setModalPedidoRapido(true);
              }
            }}
          >
            <div className="db-stat-icon db-stat-icon--yellow">
              <IconRepeat size={22} color="#ffb300" />
            </div>
            <div className="db-stat-body">
              <div className="db-stat-label">Pedido rápido</div>
              <div className="db-stat-value db-stat-value--text">
                {itensUltimoPedido[0]
                  ? `${itensUltimoPedido[0].pesoProduto} ${itensUltimoPedido[0].corProduto}`
                  : "Indisponível"}
              </div>
              <div className="db-stat-period">
                {itensUltimoPedido[0]
                  ? "Clique para repetir"
                  : "Faça seu primeiro pedido"}
              </div>
            </div>
          </div>
        </section>

        <section className="db-actions">
          <div className="db-action-card">
            <h3>Meus pedidos</h3>
            <p>Veja seu histórico e acompanhe pedidos em andamento.</p>
            <Link
  to="/perfil"
  state={{ abaInicial: "pedidos" }}
  className="db-action-link"
>
  Ver pedidos →
</Link>
          </div>
          <div className="db-action-card">
            <h3>Meus endereços</h3>
            <p>Gerencie seus endereços salvos para facilitar entregas futuras.</p>
            <Link
  to="/perfil"
  state={{ abaInicial: "enderecos" }}
  className="db-action-link"
>
  Ver endereços →
</Link>
          </div>
        </section>

        {modalPedidoRapido && (
          <div className="db-fast-modal-overlay">
            <div className="db-fast-modal">
              <div className="db-fast-modal-header">
                <h3>Confirmar pedido rápido</h3>
                <button type="button" onClick={() => setModalPedidoRapido(false)}>×</button>
              </div>

              <div className="db-fast-modal-body">
                <p><strong>Pedido base:</strong> {ultimoPedido.codigo}</p>
                <p><strong>Nome:</strong> {ultimoPedido.nomeContato || usuarioLogado?.nome || "-"}</p>
                <p><strong>Telefone:</strong> {ultimoPedido.telefoneContato || usuarioLogado?.telefone || "-"}</p>
                <p><strong>Pagamento:</strong> {ultimoPedido.formaPagamento || "-"}</p>
                <p><strong>Recebimento:</strong> {ultimoPedido.formaRecebimento || "-"}</p>
                <p><strong>Status do novo pedido:</strong> Pendente</p>

                {ultimoPedido.formaRecebimento === "Entrega" && enderecoUltimoPedido && (
                  <div className="db-fast-address">
                    <h4>Endereço de entrega</h4>
                    <p><strong>Título:</strong> {enderecoUltimoPedido.titulo}</p>
                    <p><strong>CEP:</strong> {enderecoUltimoPedido.cep}</p>
                    <p><strong>Endereço:</strong> {enderecoUltimoPedido.endereco}, {enderecoUltimoPedido.numero}</p>
                    <p><strong>Bairro:</strong> {enderecoUltimoPedido.bairro}</p>
                    <p><strong>Cidade/UF:</strong> {enderecoUltimoPedido.cidade}/{enderecoUltimoPedido.uf}</p>
                  </div>
                )}

                <div className="db-fast-products">
                  {itensUltimoPedido.map((item) => (
                    <div className="db-fast-product" key={item.id}>
                      <span>{item.nomeProduto} {item.corProduto}</span>
                      <span>{item.pesoProduto}</span>
                      <span>Qtd: {item.quantidade}</span>
                    </div>
                  ))}
                </div>

                <p className="db-fast-total">
                  Total: R$ {Number(ultimoPedido.valorTotal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="db-fast-modal-actions">
                <button type="button" className="db-fast-cancel" onClick={() => setModalPedidoRapido(false)}>
                  Cancelar
                </button>
                <button type="button" className="db-fast-confirm" onClick={confirmarPedidoRapido} disabled={carregandoPedidoRapido}>
                  {carregandoPedidoRapido ? "Criando..." : "Confirmar pedido"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast personalizado */}
        {toast && (
          <div className={`db-toast db-toast--${toast.type}`}>
            <span className="db-toast-icon">
              {toast.type === 'success' ? <IconCheck /> : <IconX />}
            </span>
            <span className="db-toast-msg">{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;