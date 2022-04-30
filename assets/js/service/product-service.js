const listaProductos = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const crearProducto = (imagen, nombre, precio, categoria, desc) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: uuid.v4(), imagen, nombre, precio, categoria, desc})
    });
} 

export const productServices = {
    listaProductos,
    crearProducto,
}