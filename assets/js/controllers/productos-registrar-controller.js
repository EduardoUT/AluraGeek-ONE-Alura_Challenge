import { producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formAgregarProducto = document.querySelector("[data-form-add-product]");
const nombreProducto = document.querySelector("[data-campo=producto]");
const precio = document.querySelector("[data-campo=precio]");
const categoria = document.querySelector("[data-campo=categoria]");
const descripcion = document.querySelector("[data-campo=descripcion]");

const limpiarValores = () => {
    producto.img = null;
    nombreProducto.value = "";
    precio.value = "";
    descripcion.value = "";
}

formAgregarProducto.addEventListener("submit", (event) => {
    event.preventDefault();
    const valorImagen = producto.img;
    const valorNombreProducto = nombreProducto.value;
    const valorPrecio = precio.value;
    const valorCategoria = categoria.value;
    const valorDescripcion = descripcion.value;
    productServices
        .crearProducto(valorNombreProducto,
            valorDescripcion, valorCategoria, valorPrecio, valorImagen)
        .then((respuesta) => {
            if (respuesta != null) { 
                window.location.href = "./mensajes/guardado_exitosamente.html";
            }
        }).catch((error) => {
            window.location.href = "./mensajes/error.html";
        });
});