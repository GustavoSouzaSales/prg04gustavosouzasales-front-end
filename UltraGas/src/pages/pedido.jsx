import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/pedido.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import gasAzul from "../assets/images/gaspedido.png";
import gasAmarelo from "../assets/images/gasamarelopedido.png";
import gasCinza from "../assets/images/gascinzapedido.png";
import NavBar from "../components/NavBar";
import { apiFetch } from "../services/api";

const IconDados = ({ size = 16, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconShield = ({ size = 20, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconArrowRight = ({ size = 16, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" width={size} height={size}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconLockSmall = ({ size = 14, color = "#6b7280" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconTrash = ({ size = 16, color = "#ef4444" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconCheckToast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconXToast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconWarnToast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const DELIVERY_FEE = 10;

const STEPS = [
  { num: 1, label: "Dados do pedido" },
  { num: 2, label: "Informações do gás" },
  { num: 3, label: "Entrega" },
  { num: 4, label: "Pagamento" },
];

function Pedido() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const navigate = useNavigate();

if (!usuarioLogado?.id) {
  return (
    <div className="pd-root">
      <NavBar page="pd" active="pedido" />
      <main className="pd-main" style={{ alignItems: "center", justifyContent: "center" }}>
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
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f4ff", marginBottom: 12, lineHeight: 1.3 }}>
            Faça login para realizar pedidos
          </h2>
          <p style={{ fontSize: 14, color: "#8ba3c7", lineHeight: 1.7, marginBottom: 32 }}>
            Você precisa estar logado para solicitar botijões de gás,
            acompanhar entregas e visualizar seus pedidos.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, textAlign: "left" }}>
            {[
              ["🔵", "Pedidos rápidos com poucos cliques"],
              ["🟢", "Acompanhe o status da entrega em tempo real"],
              ["🔵", "Endereços salvos para facilitar o próximo pedido"],
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
            className="pd-next-btn"
            style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 0" }}
            onClick={() => navigate("/login")}
          >
            Ir para Login
          </button>
          <p style={{ marginTop: 16, fontSize: 11.5, color: "#4d6a8a" }}>
            Não tem conta?{" "}
            <span style={{ color: "#00aaff", cursor: "pointer", fontWeight: 600 }} onClick={() => navigate("/criar-conta")}>
              Cadastre-se grátis
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

  const [nomeContato, setNomeContato] = useState(usuarioLogado?.nome || "");
  const [telefoneContato, setTelefoneContato] = useState(usuarioLogado?.telefone || "");

  const [currentStep, setCurrentStep] = useState(1);
  const [produtos, setProdutos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  const [especieGas, setEspecieGas] = useState("");
  const [tipoGas, setTipoGas] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [qtdInput, setQtdInput] = useState("1");
  const [itensPedido, setItensPedido] = useState([]);

  const [formaRecebimento, setFormaRecebimento] = useState("Entrega");
  const [formaPagamento, setFormaPagamento] = useState("Pix");
  const [valorTroco, setValorTroco] = useState("");

  const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState("");
  const [usarEnderecoManual, setUsarEnderecoManual] = useState(false);

  /* ── Toast ── */
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await apiFetch("/produtos?page=0&size=100");
        const lista = resposta.content || [];
        const produtosAtivos = lista.filter((p) => p.ativo !== false);
        setProdutos(produtosAtivos);
        if (produtosAtivos.length > 0) {
          const primeiro = produtosAtivos[0];
          setEspecieGas(`${primeiro.nome}|${primeiro.peso}`);
          setTipoGas(primeiro.cor);
        }
      } catch (error) {
        showToast(error.message);
      }
    }
    carregarProdutos();
  }, []);

  useEffect(() => {
    async function carregarEnderecos() {
      try {
        const resposta = await apiFetch(`/enderecos/usuario/${usuarioLogado?.id}?page=0&size=100`);
        const lista = resposta.content || [];
        setEnderecos(lista);
        const principal = lista.find((e) => e.principal);
        setEnderecoSelecionadoId(principal?.id || lista[0]?.id || "");
      } catch (error) {
        showToast(error.message);
      }
    }
    if (usuarioLogado?.id) carregarEnderecos();
  }, [usuarioLogado?.id]);

  const gruposProdutos = useMemo(() => {
    const mapa = {};
    produtos.forEach((p) => {
      const chave = `${p.nome}|${p.peso}`;
      if (!mapa[chave]) mapa[chave] = { chave, nome: p.nome, peso: p.peso, cores: [] };
      mapa[chave].cores.push(p.cor);
    });
    return Object.values(mapa);
  }, [produtos]);

  const produtosDaEspecie = produtos.filter(
    (p) => `${p.nome}|${p.peso}` === especieGas
  );
  const produtoSelecionado = produtosDaEspecie.find((p) => p.cor === tipoGas) || produtosDaEspecie[0];
  const coresDisponiveis = produtosDaEspecie.map((p) => p.cor);
  const gasPrice = produtoSelecionado?.preco || 0;

  const subtotal = itensPedido.reduce((t, i) => t + i.price * i.quantidade, 0);
  const taxaEntrega = formaRecebimento === "Entrega" ? DELIVERY_FEE : 0;
  const total = subtotal + taxaEntrega;

  const enderecoSelecionado = enderecos.find((e) => e.id === Number(enderecoSelecionadoId));

  const getGasImage = (tipo) =>
    tipo === "Amarelo" ? gasAmarelo : tipo === "Cinza" ? gasCinza : gasAzul;

  const handleEspecieChange = (value) => {
    setEspecieGas(value);
    const primeiro = produtos.find((p) => `${p.nome}|${p.peso}` === value);
    setTipoGas(primeiro?.cor || "Azul");
  };

  const adicionarItem = () => {
    if (!produtoSelecionado || !quantidade || quantidade < 1) return;
    const itemExistente = itensPedido.find((i) => i.produtoId === produtoSelecionado.id);
    if (itemExistente) {
      setItensPedido((itens) =>
        itens.map((i) =>
          i.id === itemExistente.id ? { ...i, quantidade: i.quantidade + quantidade } : i
        )
      );
    } else {
      setItensPedido((itens) => [
        ...itens,
        {
          id: Date.now(),
          produtoId: produtoSelecionado.id,
          tipo: produtoSelecionado.cor,
          label: produtoSelecionado.nome,
          weight: produtoSelecionado.peso,
          price: produtoSelecionado.preco,
          quantidade,
        },
      ]);
    }
    setQuantidade(1);
    setQtdInput("1");
  };

  const removerItem = (id) =>
    setItensPedido((itens) => itens.filter((i) => i.id !== id));

  const confirmarPedido = async () => {
    try {
      if (itensPedido.length === 0) {
        showToast("Adicione pelo menos um item ao pedido.", "warning");
        return;
      }
      if (formaRecebimento === "Entrega" && !enderecoSelecionadoId) {
        showToast("Selecione um endereço para entrega.", "warning");
        return;
      }

      const pedidoCriado = await apiFetch("/pedidos", {
        method: "POST",
        body: JSON.stringify({
          usuarioId: usuarioLogado.id,
          enderecoId: formaRecebimento === "Entrega" ? enderecoSelecionadoId : null,
          status: "Pendente",
          valorTotal: total,
          formaPagamento,
          formaRecebimento,
          nomeContato,
          telefoneContato,
        }),
      });

      for (const item of itensPedido) {
        await apiFetch("/itens-pedido", {
          method: "POST",
          body: JSON.stringify({ pedidoId: pedidoCriado.id, produtoId: item.produtoId, quantidade: item.quantidade }),
        });
      }

      showToast("Pedido realizado com sucesso!", "success");
      setItensPedido([]);
      setCurrentStep(1);
    } catch (error) {
      showToast(error.message);
    }
  };

  const avancarEtapa = () => {
    if (currentStep === 1) {
      if (!nomeContato.trim()) {
        showToast("Informe seu nome para identificação.", "warning");
        return;
      }
      if (!telefoneContato.trim()) {
        showToast("Informe seu telefone para contato.", "warning");
        return;
      }
      if (telefoneContato.length < 14) {
        showToast("Digite um telefone válido com DDD.", "warning");
        return;
      }
    }
    if (currentStep === 2 && itensPedido.length === 0) {
      showToast("Adicione pelo menos um item antes de continuar.", "warning");
      return;
    }
    if (currentStep === 3 && formaRecebimento === "Entrega" && !enderecoSelecionadoId) {
      showToast("Selecione um endereço para entrega.", "warning");
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  return (
    <div className="pd-root">
      <NavBar page="pd" active="pedido" />

      <main className="pd-main">
        <header className="pd-header">
          <div>
            <h1 className="pd-header-title">Novo pedido</h1>
            <p className="pd-header-sub">Preencha os dados abaixo para realizar seu pedido de gás.</p>
          </div>
        </header>

        <div className="pd-stepper-card">
          <div className="pd-stepper">
            {STEPS.map((step, index) => {
              const active = step.num === currentStep;
              const done = step.num < currentStep;
              return (
                <div key={step.num} className="pd-step-wrap">
                  {index > 0 && (
                    <div className={`pd-step-line ${done ? "pd-step-line--done" : ""}`} />
                  )}
                  <div className="pd-step">
                    <div className={`pd-step-circle ${active ? "pd-step-circle--active" : ""} ${done ? "pd-step-circle--done" : ""}`}>
                      {done ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : step.num}
                    </div>
                    <span className={`pd-step-label ${active ? "pd-step-label--active" : ""}`}>{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pd-content">
          <div className="pd-form-col">
            <div className="pd-card">

              {currentStep === 1 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon"><IconDados size={16} color="var(--neon, #00aaff)" /></div>
                    <div>
                      <div className="pd-section-title">1. Dados do pedido</div>
                      <div className="pd-section-sub">Informe seus dados para contato.</div>
                    </div>
                  </div>
                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Nome completo</label>
                      <input type="text" className="pd-input" placeholder="Digite o nome para identificação"
                        value={nomeContato} onChange={(e) => setNomeContato(e.target.value)} />
                    </div>
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Telefone</label>
                      <input type="tel" className="pd-input" placeholder="(75) 99999-9999" maxLength={15}
                        value={telefoneContato}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                          v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
                          setTelefoneContato(v);
                        }} />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon"><IconDados size={16} color="var(--neon, #00aaff)" /></div>
                    <div>
                      <div className="pd-section-title">2. Informações do gás</div>
                      <div className="pd-section-sub">Escolha o modelo do gás e quantidade.</div>
                    </div>
                  </div>
                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Espécie do gás</label>
                      <select className="pd-input" value={especieGas} onChange={(e) => handleEspecieChange(e.target.value)}>
                        {gruposProdutos.map((g) => (
                          <option key={g.chave} value={g.chave}>{g.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pd-field pd-field--gas-select">
                      <label className="pd-label">Tipo do gás</label>
                      <select className="pd-input" value={tipoGas}
                        disabled={coresDisponiveis.length <= 1}
                        onChange={(e) => setTipoGas(e.target.value)}>
                        {coresDisponiveis.map((cor) => <option key={cor} value={cor}>{cor}</option>)}
                      </select>
                    </div>
                    <div className="pd-field pd-field--gas-select">
                      <label className="pd-label">Valor unitário</label>
                      <div className="pd-price-display">
                        R$ {gasPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Quantidade</label>
                      <div className="pd-qty-control">
                        <button type="button" className="pd-qty-btn"
                          onClick={() => { const n = Math.max(1, quantidade - 1); setQuantidade(n); setQtdInput(String(n)); }}>−</button>
                        <input type="number" className="pd-qty-input" min="1" value={qtdInput}
                          onChange={(e) => { setQtdInput(e.target.value); const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1) setQuantidade(v); }}
                          onBlur={() => { const v = parseInt(qtdInput, 10); const s = isNaN(v) || v < 1 ? 1 : v; setQuantidade(s); setQtdInput(String(s)); }} />
                        <button type="button" className="pd-qty-btn"
                          onClick={() => { const n = quantidade + 1; setQuantidade(n); setQtdInput(String(n)); }}>+</button>
                        <span className="pd-qty-subtotal">= R$ {(gasPrice * quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="pd-field pd-field--full">
                      <button type="button" className="pd-add-btn2" onClick={adicionarItem}>Adicionar ao pedido</button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon"><IconDados size={16} color="var(--neon, #00aaff)" /></div>
                    <div>
                      <div className="pd-section-title">3. Entrega</div>
                      <div className="pd-section-sub">Escolha se deseja entrega ou retirada.</div>
                    </div>
                  </div>
                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Forma de recebimento</label>
                      <select className="pd-input" value={formaRecebimento} onChange={(e) => setFormaRecebimento(e.target.value)}>
                        <option value="Entrega">Entrega</option>
                        <option value="Retirada">Retirada</option>
                      </select>
                    </div>
                    {formaRecebimento === "Entrega" && (
                      <>
                        <div className="pd-field pd-field--full">
                          <label className="pd-label">Endereço salvo</label>
                          <select className="pd-input" value={enderecoSelecionadoId}
                            onChange={(e) => { setEnderecoSelecionadoId(Number(e.target.value)); setUsarEnderecoManual(false); }}>
                            {enderecos.map((e) => (
                              <option key={e.id} value={e.id}>{e.titulo} - {e.endereco}, {e.numero}</option>
                            ))}
                          </select>
                        </div>
                        {!usarEnderecoManual && enderecoSelecionado && (
                          <div className="pd-address-preview">
                            <strong>
                              {enderecoSelecionado.titulo}
                              {enderecoSelecionado.principal && <span className="pd-address-badge">Principal</span>}
                            </strong>
                            <p>{enderecoSelecionado.endereco}, {enderecoSelecionado.numero}</p>
                            <p>{enderecoSelecionado.bairro} - {enderecoSelecionado.cidade}/{enderecoSelecionado.uf}</p>
                            <p>CEP: {enderecoSelecionado.cep}</p>
                          </div>
                        )}
                        {enderecos.length === 0 && (
                          <div className="pd-address-preview">
                            <p>Nenhum endereço cadastrado. Cadastre um endereço no perfil.</p>
                          </div>
                        )}
                        <div className="pd-field pd-field--full">
                          <label className="pd-label">Horário preferido</label>
                          <select className="pd-input">
                            <option>Manhã</option><option>Tarde</option><option>Noite</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon"><IconShield size={16} color="var(--neon, #00aaff)" /></div>
                    <div>
                      <div className="pd-section-title">4. Forma de pagamento</div>
                      <div className="pd-section-sub">Escolha como deseja pagar o pedido.</div>
                    </div>
                  </div>
                  <div className="pd-confirm-box">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Forma de pagamento</label>
                      <select className="pd-input" value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
                        <option value="Pix">Pix</option>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Cartão de débito">Cartão de débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                      </select>
                    </div>
                    {formaPagamento === "Dinheiro" && (
                      <div className="pd-field pd-field--full">
                        <label className="pd-label">Valor em mãos para troco</label>
                        <input type="number" className="pd-input" placeholder="Ex: 200"
                          value={valorTroco} onChange={(e) => setValorTroco(e.target.value)} />
                      </div>
                    )}
                    {formaPagamento === "Dinheiro" && valorTroco && (
                      <p><strong>Troco para:</strong> R$ {valorTroco}</p>
                    )}
                    <p><strong>Recebimento:</strong> {formaRecebimento}</p>
                  </div>
                </>
              )}

              <div className="pd-step-actions">
                {currentStep > 1 && (
                  <button type="button" className="pd-back-btn" onClick={() => setCurrentStep((s) => s - 1)}>Voltar</button>
                )}
                {currentStep < 4 ? (
                  <button type="button" className="pd-next-btn" onClick={avancarEtapa}>
                    Próximo <IconArrowRight size={16} color="white" />
                  </button>
                ) : (
                  <button type="button" className="pd-next-btn" onClick={confirmarPedido}>Confirmar pedido</button>
                )}
              </div>
            </div>
          </div>

          <aside className="pd-summary">
            <div className="pd-summary-card">
              <h3 className="pd-summary-title">Resumo do pedido</h3>
              {itensPedido.length === 0 ? (
                <div className="pd-summary-empty">Nenhum item adicionado ainda.</div>
              ) : (
                itensPedido.map((item) => (
                  <div className="pd-summary-product" key={item.id}>
                    <img src={getGasImage(item.tipo)} alt="Botija" className="pd-summary-cyl-img" />
                    <div className="pd-summary-info">
                      <span className="pd-summary-ptype">{item.tipo}</span>
                      <span className="pd-summary-pweight">{item.weight}</span>
                      <span className="pd-summary-ptype" style={{ fontSize: 11, fontWeight: 400, color: "var(--text-2)" }}>{item.label}</span>
                    </div>
                    <div className="pd-summary-right">
                      <span className="pd-summary-qty">Qtd: {item.quantidade}</span>
                      <span className="pd-summary-price">R$ {(item.price * item.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button type="button" className="pd-remove-item" onClick={() => removerItem(item.id)}>
                      <IconTrash size={16} color="#ef4444" />
                    </button>
                  </div>
                ))
              )}
              <div className="pd-summary-divider" />
              <div className="pd-summary-row">
                <span>Subtotal</span>
                <span>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pd-summary-row">
                <span>Taxa de entrega</span>
                <span>R$ {taxaEntrega.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pd-summary-divider" />
              <div className="pd-summary-total">
                <span>Total</span>
                <span className="pd-summary-total-val">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pd-secure-card">
                <div className="pd-secure-icon"><IconShield size={18} color="var(--neon, #00aaff)" /></div>
                <div>
                  <div className="pd-secure-title">Compra 100% segura</div>
                  <div className="pd-secure-desc">Seus dados estão protegidos e sua compra é realizada com segurança.</div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="pd-footer-security">
          <IconLockSmall size={14} color="var(--text-3, #4d6a8a)" />
          <span>Seus dados estão protegidos com criptografia de ponta a ponta.</span>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`pd-toast pd-toast--${toast.type}`}>
            <span className="pd-toast-icon">
              {toast.type === "success" ? <IconCheckToast /> : toast.type === "warning" ? <IconWarnToast /> : <IconXToast />}
            </span>
            <span className="pd-toast-msg">{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Pedido;