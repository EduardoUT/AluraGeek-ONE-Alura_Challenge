import { productServices } from "../service/product-service.js";

const imagenDetalles = document.querySelector("[data-detalles-imagen]");
const nombre = document.querySelector("[data-detalles-nombre]");
const precio = document.querySelector("[data-detalles-precio]");
const descripcion = document.querySelector("[data-detalles-dsc]");

const mostrarImagen = (imagen) => {
    const regexImagen = /^(([a-z\d]+)([-]?[a-z\d]+)+[.](jpeg|jpg|png))$/g;
    const esImagenLocal = regexImagen.test(imagen);
    if (esImagenLocal) {
        imagenDetalles.setAttribute("style", `background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;`)
    } else {
        imagenDetalles.setAttribute("style", `background: url('${imagen}') center / 100% 100% no-repeat;`)
    }
}

const obtenerDetallesProducto = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "/ventanas/error.html";
    }

    try {
        const productoDetalles = await productServices.detalleProducto(id);
        const existenValores = (productoDetalles.imagen && productoDetalles.nombre &&
            productoDetalles.precio && productoDetalles.categoria && productoDetalles.desc);
        if (existenValores) {
            mostrarImagen(productoDetalles.imagen);
            nombre.textContent = productoDetalles.nombre;
            precio.textContent = "$ " + productoDetalles.precio;
            descripcion.textContent = productoDetalles.desc;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
    }

} 

obtenerDetallesProducto();