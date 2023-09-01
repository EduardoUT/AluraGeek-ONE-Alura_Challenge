const listaUsuario = () => fetch("https://engaged-shiner-37.hasura.app/api/rest/consultarusuarios")
    .then((respuesta) => respuesta.json());

export const userServices = {
    listaUsuario,
};