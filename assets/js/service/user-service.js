const listaUsuario = () => fetch("https://alurageekserver.herokuapp.com/usuario").then((respuesta) => respuesta.json());

export const userServices = {
    listaUsuario,
};