import menu from "./componentes/menu.js";
import buscadorCelular from "./componentes/buscadorCelular.js";
import validarCampos from "./formularios/validarCampos.js";
import { habilitarBtnRodapie } from "./formularios/habilitarBoton.js";

/**Función IIFE */
(() => {
    const btnEnviar = document.getElementById("btn-enviar");
    const formularioRodapie = document.getElementById("formulario-rodapie");

    menu();
    buscadorCelular();
    habilitarBtnRodapie(btnEnviar);
    validarCampos();
    
    const validarBtnRodapie = (event) => {
        const element = event.target;
        if (element && element.tagName == 'INPUT') {
            habilitarBtnRodapie(btnEnviar);
        } else if (element && element.tagName == 'TEXTAREA') {
            habilitarBtnRodapie(btnEnviar);
        }
    }

    const evitarRecarga = (event) => {
        event.preventDefault();
    }

    window.addEventListener("load", evitarRecarga);
    btnEnviar.addEventListener("click", evitarRecarga);
    formularioRodapie.addEventListener("keyup", validarBtnRodapie);
})();
