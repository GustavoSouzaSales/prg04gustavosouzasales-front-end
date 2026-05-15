import "../assets/css/style.css";

import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import BackButton from "../components/BackButton";

function Pedido() {

  return (

    <div className="container">

      {/* TOPO */}
      <header>

        <PageTitle
          title="UltraGás - Fazer Pedido"
        />

      </header>

      <main>

        <section>

          <h2>📝 Dados do pedido</h2>

          <form>

            <label>Nome:</label>

            <input
              type="text"
              name="nome"
              required
            />

            <br />
            <br />

            <label>Espécie:</label>

            <select id="especie">

              <option value="">
                Selecione
              </option>

              <option value="p13">
                P13
              </option>

              <option value="p20">
                P20
              </option>

              <option value="p45">
                P45
              </option>

            </select>

            <br />
            <br />

            <label>Tipo de Gás:</label>

            <select id="tipoGas">

              <option value="azul">
                Azul
              </option>

              <option value="cinza">
                Cinza
              </option>

            </select>

            <br />
            <br />

            <button
              type="submit"
              className="btn2"
            >
              Enviar Pedido
            </button>

            <br />
            <br />

          </form>

        </section>

      </main>

      <nav>

        <BackButton />

      </nav>

      <Footer />

    </div>
  );
}

export default Pedido;