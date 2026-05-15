import { Link } from "react-router-dom";

function CardItem({
    titulo,
    descricao,
    link,
    botao,
    cor
}) {

    return (

        <div className="col-md-4 mb-3">

            <div className="card shadow text-center h-100">

                <div className="card-body">

                    <h5 className="card-title fw-bold">
                        {titulo}
                    </h5>

                    <p className="card-text fst-italic small">
                        {descricao}
                    </p>

                    <Link
                        to={link}
                        className={`btnindex btn-${cor} mt-1`}
                    >
                        {botao}
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default CardItem;