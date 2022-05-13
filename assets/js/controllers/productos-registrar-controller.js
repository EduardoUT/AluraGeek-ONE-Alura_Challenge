import { precio } from "../formularios/agregarProducto.js";
import { producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formAgregarProducto = document.querySelector("[data-form-add-product]");
const nombreProducto = document.querySelector("[data-campo=producto]");
const categoria = document.querySelector("[data-campo=categoria]");
const descripcion = document.querySelector("[data-campo=descripcion]");

const limpiarValores = () => {
    producto.img = null;
    nombreProducto.value = "";
    precio.value = "";
    descripcion.value = "";
}

const guardarProducto = (event) => {
    event.preventDefault();
    const valorImagen = producto.img;
    const valorNombreProducto = nombreProducto.value;
    const valorPrecio = precio.value;
    const valorCategoria = categoria.value;
    const valorDescripcion = descripcion.value;
    productServices.crearProducto(valorImagen, valorNombreProducto,
        valorPrecio, valorCategoria, valorDescripcion)
        .then((respuesta) => {
            limpiarValores();
            const redir = window.location.href = "../../../ventanas/mensajes/guardado_exitosamente.html";
            setTimeout(redir, 3000);
        }).catch((error) => {
            console.log(error);
            const redir = window.location.href = "../../../ventanas/mensajes/error.html";
            setTimeout(redir, 3000);
        });
}

formAgregarProducto.addEventListener("submit", guardarProducto);