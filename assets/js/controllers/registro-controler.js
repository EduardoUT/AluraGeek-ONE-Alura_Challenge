import { precio } from "../formularios/agregarProducto.js";
import { producto } from "../formularios/imagenDropBoxArea.js";

const formAgregarProducto = document.querySelector("[data-form-add-product]");
const nombreProducto = document.querySelector("[data-campo=producto]");
const categoria = document.querySelector("[data-campo=categoria]");
const descripcion = document.querySelector("[data-campo=descripcion]");

const guardarProducto = (event) => {
    event.preventDefault();
    const valorImagen = producto.img;
    const valorNombreProducto = nombreProducto.value;
    const valorPrecio = precio.value;
    const valorCategoria = categoria.value;
    const valorDescripcion = descripcion.value;
    console.log(valorImagen);
    console.log(valorNombreProducto);
    console.log(valorPrecio);
    console.log(valorCategoria);
    console.log(valorDescripcion);
}

formAgregarProducto.addEventListener("submit", guardarProducto);