import { login } from "./login.js";
import { estaAutenticado } from "./main.js";

const btnIrAgregarProducto = document.querySelector("[data-agregar-producto]");
const btnEliminarProducto = document.querySelector("[data-borrar-boton]");
const btnEditarProducto = document.querySelector("[data-editar-boton]");

const ocultarFuncionesCrud = () => {
    if (!login(estaAutenticado)) {
        btnIrAgregarProducto.style.display = "none";
        btnEliminarProducto.style.display = "none";
        btnEditarProducto.style.display = "none";
    }
}

ocultarFuncionesCrud();