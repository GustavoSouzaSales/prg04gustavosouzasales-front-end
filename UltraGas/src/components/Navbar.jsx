import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold"
                    to="/home"
                >
                    UltraGás
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuBootstrap"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menuBootstrap"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/pedido"
                            >
                                Pedido
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/admin"
                            >
                                Admin
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/login"
                            >
                                Login
                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;