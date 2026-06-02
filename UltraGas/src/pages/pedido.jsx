import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/pedido.css";

import { useState } from "react";
import gasAzul from "../assets/images/gaspedido.png";
import gasAmarelo from "../assets/images/gasamarelopedido.png";
import gasCinza from "../assets/images/gascinzapedido.png";
import NavBar from "../components/NavBar";

/* Ícone de notificação */
const IconBell = ({ size = 20, color = "#374151" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* Ícone usado nas seções */
const IconDados = ({ size = 16, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

/* Ícone de segurança */
const IconShield = ({ size = 20, color = "#0044e0" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/* Ícone de avançar */
const IconArrowRight = ({ size = 16, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" width={size} height={size}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* Ícone pequeno de cadeado */
const IconLockSmall = ({ size = 14, color = "#6b7280" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* Ícone de remover item */
const IconTrash = ({ size = 16, color = "#ef4444" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

/* Tipos e preços dos gases */
const GAS_TYPES = {
  P13: {
    label: "P13",
    weight: "13kg",
    prices: {
      Azul: 108,
      Cinza: 96,
      Amarelo: 96,
    },
  },
  P20: {
    label: "P20",
    weight: "20kg",
    prices: {
      Azul: 220,
    },
  },
  P45: {
    label: "P45",
    weight: "45kg",
    prices: {
      Azul: 520,
    },
  },
};

/* Taxa fixa de entrega */
const DELIVERY_FEE = 10;

/* Etapas do pedido */
const STEPS = [
  { num: 1, label: "Dados do pedido" },
  { num: 2, label: "Informações do gás" },
  { num: 3, label: "Entrega" },
  { num: 4, label: "Pagamento" },
];

/* Endereços salvos de exemplo */
const ENDERECOS_SALVOS = [
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

function Pedido() {
  /* Controla a etapa atual */
  const [currentStep, setCurrentStep] = useState(1);

  /* Estados do gás escolhido */
  const [especieGas, setEspecieGas] = useState("P13");
  const [tipoGas, setTipoGas] = useState("Azul");
  const [quantidade, setQuantidade] = useState("");

  /* Lista de itens adicionados */
  const [itensPedido, setItensPedido] = useState([]);

  /* Estados de entrega e pagamento */
  const [formaRecebimento, setFormaRecebimento] = useState("Entrega");
  const [formaPagamento, setFormaPagamento] = useState("Pix");
  const [valorTroco, setValorTroco] = useState("");

  /* Pega o endereço principal */
  const enderecoPrincipal = ENDERECOS_SALVOS.find((endereco) => endereco.principal);

  /* Endereço selecionado */
  const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState(
    enderecoPrincipal?.id || ENDERECOS_SALVOS[0]?.id
  );

  /* Controla se vai usar endereço manual */
  const [usarEnderecoManual, setUsarEnderecoManual] = useState(false);

  /* Escolhe a imagem conforme o tipo do gás */
  const getGasImage = (tipo) => {
    switch (tipo) {
      case "Amarelo":
        return gasAmarelo;

      case "Cinza":
        return gasCinza;

      default:
        return gasAzul;
    }
  };

  /* Altera espécie e força Azul para P20/P45 */
  const handleEspecieChange = (value) => {
    setEspecieGas(value);

    if (value === "P20" || value === "P45") {
      setTipoGas("Azul");
    }
  };

  /* Dados do gás atual */
  const gas = GAS_TYPES[especieGas] || GAS_TYPES.P13;
  const gasPrice = gas.prices[tipoGas];

  /* Soma todos os itens */
  const subtotal = itensPedido.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );

  /* Retirada não cobra taxa */
  const taxaEntrega = formaRecebimento === "Entrega" ? DELIVERY_FEE : 0;
  const total = subtotal + taxaEntrega;

  /* Endereço selecionado no select */
  const enderecoSelecionado = ENDERECOS_SALVOS.find(
    (endereco) => endereco.id === Number(enderecoSelecionadoId)
  );

  /* Adiciona item no resumo */
  const adicionarItem = () => {
    if (!quantidade || Number(quantidade) < 1) {
      return;
    }

    const qtd = Number(quantidade);

    const itemExistente = itensPedido.find(
      (item) => item.especie === especieGas && item.tipo === tipoGas
    );

    if (itemExistente) {
      setItensPedido((itens) =>
        itens.map((item) =>
          item.id === itemExistente.id
            ? { ...item, quantidade: item.quantidade + qtd }
            : item
        )
      );
    } else {
      const novoItem = {
        id: Date.now(),
        especie: especieGas,
        tipo: tipoGas,
        label: gas.label,
        weight: gas.weight,
        price: gasPrice,
        quantidade: qtd,
      };

      setItensPedido((itens) => [...itens, novoItem]);
    }

    setQuantidade("");
  };

  /* Remove item do resumo */
  const removerItem = (id) => {
    setItensPedido((itens) => itens.filter((item) => item.id !== id));
  };

  return (
    <div className="pd-root">
      {/* Menu lateral/inferior */}
      <NavBar page="pd" active="pedido" />

      <main className="pd-main">
        {/* Cabeçalho */}
        <header className="pd-header">
          <div>
            <h1 className="pd-header-title">Novo pedido</h1>
            <p className="pd-header-sub">
              Preencha os dados abaixo para realizar seu pedido de gás.
            </p>
          </div>

          <div className="pd-bell-btn">
            <IconBell size={20} color="#374151" />
            <span className="pd-bell-badge">2</span>
          </div>
        </header>

        {/* Etapas do pedido */}
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
                    <div
                      className={`pd-step-circle ${
                        active ? "pd-step-circle--active" : ""
                      } ${done ? "pd-step-circle--done" : ""}`}
                    >
                      {step.num}
                    </div>

                    <span className={`pd-step-label ${active ? "pd-step-label--active" : ""}`}>
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="pd-content">
          <div className="pd-form-col">
            <div className="pd-card">
              {/* Etapa 1 */}
              {currentStep === 1 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon">
                      <IconDados size={16} color="#0044e0" />
                    </div>

                    <div>
                      <div className="pd-section-title">1. Dados do pedido</div>
                      <div className="pd-section-sub">
                        Informe seus dados para contato.
                      </div>
                    </div>
                  </div>

                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Nome completo</label>
                      <input
                        type="text"
                        className="pd-input"
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Telefone</label>
                      <input
                        type="tel"
                        className="pd-input"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Etapa 2 */}
              {currentStep === 2 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon">
                      <IconDados size={16} color="#0044e0" />
                    </div>

                    <div>
                      <div className="pd-section-title">2. Informações do gás</div>
                      <div className="pd-section-sub">
                        Escolha o modelo do gás e quantidade.
                      </div>
                    </div>
                  </div>

                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--gas-select">
                      <label className="pd-label">Espécie do gás</label>

                      <select
                        className="pd-input"
                        value={especieGas}
                        onChange={(e) => handleEspecieChange(e.target.value)}
                      >
                        <option value="P13">P13</option>
                        <option value="P20">P20</option>
                        <option value="P45">P45</option>
                      </select>
                    </div>

                    <div className="pd-field pd-field--gas-select">
                      <label className="pd-label">Tipo do gás</label>

                      <select
                        className="pd-input"
                        value={tipoGas}
                        disabled={especieGas === "P20" || especieGas === "P45"}
                        onChange={(e) => setTipoGas(e.target.value)}
                      >
                        <option value="Azul">Azul</option>

                        {especieGas === "P13" && (
                          <>
                            <option value="Cinza">Cinza</option>
                            <option value="Amarelo">Amarelo</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Quantidade</label>

                      <input
                        type="number"
                        className="pd-input"
                        min="1"
                        value={quantidade}
                        onChange={(e) => {
                          const valor = e.target.value;

                          if (valor === "") {
                            setQuantidade("");
                            return;
                          }

                          if (Number(valor) >= 1) {
                            setQuantidade(valor);
                          }
                        }}
                        placeholder="Digite a quantidade"
                      />
                    </div>

                    <div className="pd-field pd-field--full">
                      <button
                        type="button"
                        className="pd-add-btn2"
                        onClick={adicionarItem}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Etapa 3 */}
              {currentStep === 3 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon">
                      <IconDados size={16} color="#0044e0" />
                    </div>

                    <div>
                      <div className="pd-section-title">3. Entrega</div>
                      <div className="pd-section-sub">
                        Escolha se deseja entrega ou retirada.
                      </div>
                    </div>
                  </div>

                  <div className="pd-form-grid">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Forma de recebimento</label>

                      <select
                        className="pd-input"
                        value={formaRecebimento}
                        onChange={(e) => setFormaRecebimento(e.target.value)}
                      >
                        <option value="Entrega">Entrega</option>
                        <option value="Retirada">Retirada</option>
                      </select>
                    </div>

                    {/* Campos de entrega */}
                    {formaRecebimento === "Entrega" && (
                      <>
                        <div className="pd-field pd-field--full">
                          <label className="pd-label">Endereço salvo</label>

                          <select
                            className="pd-input"
                            value={enderecoSelecionadoId}
                            onChange={(e) => {
                              setEnderecoSelecionadoId(Number(e.target.value));
                              setUsarEnderecoManual(false);
                            }}
                          >
                            {ENDERECOS_SALVOS.map((endereco) => (
                              <option key={endereco.id} value={endereco.id}>
                                {endereco.titulo} - {endereco.endereco}, {endereco.numero}
                              </option>
                            ))}
                          </select>
                        </div>

                        {!usarEnderecoManual && enderecoSelecionado && (
                          <div className="pd-address-preview">
                            <div>
                              <strong>
                                {enderecoSelecionado.titulo}

                                {enderecoSelecionado.principal && (
                                  <span className="pd-address-badge">Principal</span>
                                )}
                              </strong>

                              <p>
                                {enderecoSelecionado.endereco}, {enderecoSelecionado.numero}
                              </p>

                              <p>
                                {enderecoSelecionado.bairro} - {enderecoSelecionado.cidade}/{enderecoSelecionado.uf}
                              </p>

                              <p>CEP: {enderecoSelecionado.cep}</p>
                            </div>
                          </div>
                        )}

                        <div className="pd-field pd-field--full">
                          <button
                            type="button"
                            className="pd-use-manual-address-btn"
                            onClick={() => setUsarEnderecoManual((valor) => !valor)}
                          >
                            {usarEnderecoManual ? "Usar endereço salvo" : "Usar outro endereço"}
                          </button>
                        </div>

                        {usarEnderecoManual && (
                          <>
                            <div className="pd-field pd-field--cep">
                              <label className="pd-label">CEP</label>
                              <input
                                type="text"
                                className="pd-input"
                                placeholder="00000-000"
                              />
                            </div>

                            <div className="pd-field pd-field--grow">
                              <label className="pd-label">Endereço</label>
                              <input
                                type="text"
                                className="pd-input"
                                placeholder="Rua, bairro"
                              />
                            </div>

                            <div className="pd-field pd-field--small">
                              <label className="pd-label">Número</label>
                              <input
                                type="text"
                                className="pd-input"
                                placeholder="Nº"
                              />
                            </div>

                            <div className="pd-field pd-field--full">
                              <label className="pd-label">Complemento (opcional)</label>
                              <input
                                type="text"
                                className="pd-input"
                                placeholder="Apartamento, bloco, referência..."
                              />
                            </div>
                          </>
                        )}

                        <div className="pd-field pd-field--full">
                          <label className="pd-label">Horário preferido</label>

                          <select className="pd-input">
                            <option>Manhã</option>
                            <option>Tarde</option>
                            <option>Noite</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Etapa 4 */}
              {currentStep === 4 && (
                <>
                  <div className="pd-section-header">
                    <div className="pd-section-icon">
                      <IconShield size={16} color="#0044e0" />
                    </div>

                    <div>
                      <div className="pd-section-title">4. Forma de pagamento</div>
                      <div className="pd-section-sub">
                        Escolha como deseja pagar o pedido.
                      </div>
                    </div>
                  </div>

                  <div className="pd-confirm-box">
                    <div className="pd-field pd-field--full">
                      <label className="pd-label">Forma de pagamento</label>

                      <select
                        className="pd-input"
                        value={formaPagamento}
                        onChange={(e) => setFormaPagamento(e.target.value)}
                      >
                        <option value="Pix">Pix</option>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Cartão de débito">Cartão de débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                      </select>
                    </div>

                    {formaPagamento === "Dinheiro" && (
                      <div className="pd-field pd-field--full">
                        <label className="pd-label">Valor em mãos para troco</label>

                        <input
                          type="number"
                          className="pd-input"
                          placeholder="Ex: 200"
                          value={valorTroco}
                          onChange={(e) => setValorTroco(e.target.value)}
                        />
                      </div>
                    )}

                    {formaPagamento === "Dinheiro" && valorTroco && (
                      <p>
                        <strong>Troco para:</strong> R$ {valorTroco}
                      </p>
                    )}

                    <p>
                      <strong>Recebimento:</strong> {formaRecebimento}
                    </p>
                  </div>
                </>
              )}

              {/* Botões de navegação */}
              <div className="pd-step-actions">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="pd-back-btn"
                    onClick={() => setCurrentStep((s) => s - 1)}
                  >
                    Voltar
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="pd-next-btn"
                    onClick={() => setCurrentStep((s) => s + 1)}
                  >
                    Próximo
                    <IconArrowRight size={16} color="white" />
                  </button>
                ) : (
                  <button type="button" className="pd-next-btn">
                    Confirmar pedido
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Resumo do pedido */}
          <aside className="pd-summary">
            <div className="pd-summary-card">
              <h3 className="pd-summary-title">Resumo do pedido</h3>

              {itensPedido.length === 0 ? (
                <div className="pd-summary-empty">Nenhum item adicionado ainda.</div>
              ) : (
                itensPedido.map((item) => (
                  <div className="pd-summary-product" key={item.id}>
                    <img
                      src={getGasImage(item.tipo)}
                      alt="Botija de gás"
                      className="pd-summary-cyl-img"
                    />

                    <div className="pd-summary-info">
                      <span className="pd-summary-ptype">
                        {item.label} {item.tipo}
                      </span>
                      <span className="pd-summary-pweight">{item.weight}</span>
                    </div>

                    <div className="pd-summary-right">
                      <span className="pd-summary-qty">Qtd: {item.quantidade}</span>

                      <span className="pd-summary-price">
                        R$ {(item.price * item.quantidade).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="pd-remove-item"
                      onClick={() => removerItem(item.id)}
                    >
                      <IconTrash size={16} color="#ef4444" />
                    </button>
                  </div>
                ))
              )}

              <div className="pd-summary-divider" />

              <div className="pd-summary-row">
                <span>Subtotal</span>
                <span>
                  R$ {subtotal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="pd-summary-row">
                <span>Taxa de entrega</span>
                <span>
                  R$ {taxaEntrega.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="pd-summary-divider" />

              <div className="pd-summary-total">
                <span>Total</span>

                <span className="pd-summary-total-val">
                  R$ {total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Card de segurança */}
              <div className="pd-secure-card">
                <div className="pd-secure-icon">
                  <IconShield size={18} color="#0044e0" />
                </div>

                <div>
                  <div className="pd-secure-title">Compra 100% segura</div>

                  <div className="pd-secure-desc">
                    Seus dados estão protegidos e sua compra é realizada com segurança.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Aviso inferior */}
        <div className="pd-footer-security">
          <IconLockSmall size={14} color="#9ca3af" />
          <span>Seus dados estão protegidos com criptografia de ponta a ponta.</span>
        </div>
      </main>
    </div>
  );
}

export default Pedido;