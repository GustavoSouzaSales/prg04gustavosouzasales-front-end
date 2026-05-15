import "../assets/css/style.css";

import Footer from "../components/Footer";
import UserTable from "../components/UserTable";

function Admin() {

  return (

    <div className="container">

      <header>

        <h1>Painel Administrativo</h1>

        <hr />

      </header>

      <main>

        <section>

          <h2 className="usuarios">
            Usuários Cadastrados
          </h2>

          <UserTable />

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Admin;