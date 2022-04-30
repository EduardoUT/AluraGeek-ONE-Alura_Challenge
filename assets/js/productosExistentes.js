import { login } from "./login.js";
import { estaAutenticado } from "./main.js";

const btnIrAgregarProducto = document.querySelector("[data-agregar-producto]");
const btnEliminarProducto = document.querySelector("[data-borrar-boton]");
const btnEditarProducto = document.querySelector("[data-editar-boton]");

const ocultarBotonAddProduct = () => {
    if (!login(estaAutenticado)) {
        btnIrAgregarProducto.style.display = "none";
    }
}

ocultarBotonAddProduct();