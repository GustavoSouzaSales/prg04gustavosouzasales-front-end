import { useEffect, useState } from "react";
import "../assets/css/notificacao.css";
import { apiFetch } from "../services/api";

const IconBell = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

function Notificacao() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [aberto, setAberto] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  async function carregarNotificacoes() {
    if (!usuarioLogado?.id) return;

    try {
      const resposta = await apiFetch(`/notificacoes/usuario/${usuarioLogado.id}`);
      setNotificacoes(resposta || []);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const abrirNotificacoes = async () => {
    await carregarNotificacoes();
    setAberto(true);
  };

  const fechar = () => {
    setAberto(false);
  };

  const marcarComoLida = async (id) => {
    try {
      await apiFetch(`/notificacoes/${id}/lida`, {
        method: "PUT",
      });

      const atualizadas = notificacoes.map((n) =>
        n.id === id ? { ...n, lida: true } : n
      );

      setNotificacoes(atualizadas);

      const aindaTemNaoLida = atualizadas.some((n) => !n.lida);
      if (!aindaTemNaoLida) {
        setAberto(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const marcarTodasComoLidas = async () => {
    try {
      await apiFetch(`/notificacoes/usuario/${usuarioLogado.id}/marcar-todas`, {
        method: "PUT",
      });

      setNotificacoes((lista) =>
        lista.map((n) => ({ ...n, lida: true }))
      );

      setAberto(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    return new Date(data).toLocaleString("pt-BR");
  };

  return (
    <>
      <button type="button" className="nt-bell-btn" onClick={abrirNotificacoes}>
        <IconBell size={20} />

        {naoLidas > 0 && (
          <span className="nt-bell-badge">
            {naoLidas > 9 ? "9+" : naoLidas}
          </span>
        )}
      </button>

      {aberto && (
        <div className="nt-overlay" onClick={fechar}>
          <div className="nt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nt-header">
              <div>
                <h3>Notificações</h3>
                <p>
                  {naoLidas > 0
                    ? `${naoLidas} não lida${naoLidas > 1 ? "s" : ""}`
                    : "Tudo lido"}
                </p>
              </div>

              <button type="button" className="nt-close" onClick={fechar}>
                ×
              </button>
            </div>

            <div className="nt-actions">
              <button
                type="button"
                className="nt-mark-all"
                onClick={marcarTodasComoLidas}
                disabled={naoLidas === 0}
              >
                Marcar todas como lidas
              </button>
            </div>

            <div className="nt-list">
              {notificacoes.length === 0 ? (
                <div className="nt-empty">
                  Nenhuma notificação encontrada.
                </div>
              ) : (
                notificacoes.map((n) => (
                  <div
                    key={n.id}
                    className={`nt-item ${!n.lida ? "nt-item--unread" : ""}`}
                  >
                    <div className="nt-item-top">
                      <strong>{n.titulo}</strong>
                      {!n.lida && <span className="nt-dot" />}
                    </div>

                    <p>{n.mensagem}</p>

                    <div className="nt-item-footer">
                      <span>{formatarData(n.dataCriacao)}</span>

                      {!n.lida && (
                        <button
                          type="button"
                          className="nt-read-one"
                          onClick={() => marcarComoLida(n.id)}
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notificacao;