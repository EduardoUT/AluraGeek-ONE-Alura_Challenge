import { valida } from "./validaciones.js";

const validarCampos = () => {
    const campos = document.querySelectorAll("[data-contacto]");
    campos.forEach((campo) => {
        campo.addEventListener("blur", (campo) => {
            valida(campo.target);
        });
    });
}

export default validarCampos;