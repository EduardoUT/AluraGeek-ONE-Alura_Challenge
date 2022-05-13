const listaUsuario = () => fetch("http://localhost:3000/usuario").then((respuesta) => respuesta.json());

export const userServices = {
    listaUsuario,
};