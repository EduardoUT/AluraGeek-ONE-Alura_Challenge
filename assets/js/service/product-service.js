const listaProductos = () =>
    fetch("https://alurageekserver.herokuapp.com/producto").then((respuesta) => respuesta.json());

const crearProducto = (imagen, nombre, precio, categoria, desc) => {
    return fetch("https://alurageekserver.herokuapp.com/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: uuid.v4(),
            imagen,
            nombre,
            precio,
            categoria,
            desc,
        }),
    });
};

const eliminarProducto = (id) => {
    return fetch(`https://alurageekserver.herokuapp.com/producto/${id}`, {
        method: "DELETE",
    });
};

const detalleProducto = async (id) => {
    const respuesta = await fetch(`https://alurageekserver.herokuapp.com/producto/${id}`);
    return await respuesta.json();
};

const detalleCategoria = async (categoria) => {
    const respuesta = await fetch(
        `https://alurageekserver.herokuapp.com/producto?categoria=${categoria}`
    );
    return await respuesta.json();
};

const actualizarProducto = async (
    id,
    imagen,
    nombre,
    precio,
    categoria,
    desc
) => {
    try {
        const respuesta = await fetch(`https://alurageekserver.herokuapp.com/producto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imagen, nombre, precio, categoria, desc }),
        });
        return respuesta;
    } catch (error) {
        return console.log(error);
    }
};

const buscarNombreProducto = async (busquedaUsuario) => {
    const respuesta = await fetch(`https://alurageekserver.herokuapp.com/producto?nombre_like=${busquedaUsuario}`);
    return await respuesta.json();
};

const buscarCategoriaProducto = async (busquedaUsuario) => {
    const respuesta = await fetch(`https://alurageekserver.herokuapp.com/producto?categoria_like=${busquedaUsuario}`);
    return await respuesta.json();
}

export const productServices = {
    crearProducto,
    listaProductos,
    actualizarProducto,
    eliminarProducto,
    detalleProducto,
    detalleCategoria,
    buscarNombreProducto,
    buscarCategoriaProducto,
};
