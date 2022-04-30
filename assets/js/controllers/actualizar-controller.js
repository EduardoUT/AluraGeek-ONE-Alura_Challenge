import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "/ventanas/error.html";
    }

    const dropBoxArea = document.querySelector("[data-dropbox-area]");
    const nombre = document.querySelector("[data-campo=producto]");
    const precio = document.querySelector("[data-campo=precio]");
    const categoria = document.querySelector("[data-campo=categoria]");
    const descripcion = document.querySelector("[data-campo=descripcion]");
    console.log(dropBoxArea,nombre,precio,categoria,descripcion);
    try {
        const producto = await productServices.detalleProducto(id);
        console.log(producto);
    } catch (error) {
        
    }
}

obtenerInformacion();