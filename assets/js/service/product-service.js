const listaProductos = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const crearProducto = (imagen, nombre, precio, categoria, desc) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: uuid.v4(), imagen, nombre, precio, categoria, desc })
    });
}

const eliminarProducto = (id) => {
    console.log("Eliminando el producto: " + id);
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "DELETE"
    });
}

const actualizarProducto = async (id, imagen, nombre, precio, categoria, desc) => {
    try {
        const respuesta = await fetch(`http://localhost:3000/producto/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imagen, nombre, precio, categoria, desc })
            });
        return respuesta;
    } catch (error) {
        return console.log(error);
    }
}

export const productServices = {
    crearProducto,
    listaProductos,
    actualizarProducto,
    eliminarProducto
}