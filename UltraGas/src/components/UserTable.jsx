function UserTable() {

    const usuarios = [
        {
            id: 1,
            nome: "Jonatas",
            email: "Jonatas@email.com"
        },

        {
            id: 2,
            nome: "Gustavo Sales",
            email: "gustavo@email.com"
        },

        {
            id: 3,
            nome: "Carlos Lima",
            email: "carlos@email.com"
        },

        {
            id: 4,
            nome: "Ana Costa",
            email: "ana@email.com"
        },

        {
            id: 5,
            nome: "Pedro Rocha",
            email: "pedro@email.com"
        }
    ];

    return (

        <table className="tabela">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody>

                {usuarios.map((usuario) => (

                    <tr key={usuario.id}>

                        <td>{usuario.id}</td>

                        <td>{usuario.nome}</td>

                        <td>{usuario.email}</td>

                        <td>

                            <button className="btn-editar">
                                Editar
                            </button>

                            <button className="btn-excluir">
                                Excluir
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default UserTable;