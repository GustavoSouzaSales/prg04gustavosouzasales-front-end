import { Link } from "react-router-dom";

function BackButton() {

    return (

        <Link
            to="/home"
            className="btn"
        >
            Voltar
        </Link>

    );
}

export default BackButton;