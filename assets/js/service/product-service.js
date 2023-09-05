const listaProductos = () =>
    fetch("https://engaged-shiner-37.hasura.app/api/rest/consultarproductos").then((respuesta) => respuesta.json());

const crearProducto = (nombre_producto, descripcion_producto, categoria_producto, precio_producto, imagen_producto) => {
    return fetch("https://engaged-shiner-37.hasura.app/api/rest/guardarproducto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_producto: uuid.v4(),
            nombre_producto,
            descripcion_producto,
            categoria_producto,
            precio_producto,
            imagen_producto,
        }),
    });
};

const eliminarProducto = (id) => {
    return fetch(`https://engaged-shiner-37.hasura.app/api/rest/eliminarproducto?id=${id}`, {
        method: "DELETE",
    });
};

const detalleProducto = async (id_producto) => {
    const respuesta = await fetch(`https://engaged-shiner-37.hasura.app/api/rest/consultardetalle?id_producto=${id_producto}`);
    return await respuesta.json();
};

const detalleCategoria = async (categoria) => {
    const respuesta = await fetch(
        `https://engaged-shiner-37.hasura.app/api/rest/consultarcategoria?categoria_producto=${categoria}`
    );
    return await respuesta.json();
};

const actualizarProducto = async (id_producto, nombre_producto, descripcion_producto,
    categoria_producto, precio_producto, imagen_producto) => {

    try {
        const respuesta = await fetch(`https://engaged-shiner-37.hasura.app/api/rest/actualizarproducto?id_producto=${id_producto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                //"X-Hasura-Role": "Invitado"
            },
            body: JSON.stringify({ nombre_producto, descripcion_producto, categoria_producto, precio_producto, imagen_producto }),
        });
        return respuesta;
    } catch (error) {
        return console.log(error);
    }
};

const buscarNombreProducto = async (buscarProducto) => {
    const respuesta = await fetch(`https://engaged-shiner-37.hasura.app/api/rest/buscarproducto?nombre_producto=${buscarProducto}`);
    return await respuesta.json();
};

const buscarCategoriaProducto = async (buscarCategoria) => {
    const respuesta = await fetch(`https://engaged-shiner-37.hasura.app/api/rest/buscarcategoria?categoria_producto=${buscarCategoria}`);
    return await respuesta.json();
}

export const obtenerDatoArrayProducto = (productoObjeto) => {
    const datoArrayProducto = Object.values(productoObjeto.alura_geek_productos);
    return datoArrayProducto;
}

export const obtenerIdentificadorProductoUrl = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    return id;
}

export const comprobarValoresVacios = (datoArrayProducto) => {
    const estaVacio = (valorActual) => valorActual != null;
    const existenValores = datoArrayProducto.every(estaVacio);
    return existenValores;
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