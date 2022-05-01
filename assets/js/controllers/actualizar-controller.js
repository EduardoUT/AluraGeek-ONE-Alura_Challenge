import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "/ventanas/error.html";
    }

    const nombre = document.querySelector("[data-campo=producto]");
    const precio = document.querySelector("[data-campo=precio]");
    const categoria = document.querySelector("[data-campo=categoria]");
    const descripcion = document.querySelector("[data-campo=descripcion]");
    //console.log(dropBoxArea, nombre, precio, categoria, descripcion);
    try {
        const productoDetalles = await productServices.detalleProducto(id);
        //console.log(productoDetalles);
        //console.log(productoDetalles.imagen);
        const existenValores = (productoDetalles.imagen && productoDetalles.nombre &&
            productoDetalles.precio && productoDetalles.categoria && productoDetalles.desc);
        if (existenValores) {
            producto.img = productoDetalles.imagen;
            obtenerArchivoServer(producto.img);
            nombre.value = productoDetalles.nombre;
            precio.value = productoDetalles.precio;
            categoria.value = productoDetalles.categoria;
            descripcion.value = productoDetalles.desc;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        window.location.href = "/ventanas/error.html";
    }
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    console.log(producto.img);

});

obtenerInformacion();