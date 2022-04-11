import mostrarOcultarMenu from "./componentes/mostrarOcultarMenu.js";
import mostrarOcultarBuscador from "./componentes/buscadorMovil.js";
import { valida } from "./formularios/validaciones.js";
import habilitarBtnRodapie from "./componentes/habilitarBoton.js";

/**Función IIFE */
(() => {
    const logoBuscadorContainer = document.querySelector(".cabecera__logoBuscador");
    const logoCabecera = document.querySelector(".cabecera__logo");
    const formularioBusqueda = document.querySelector(".cabecera__formulario");
    const campoBuscar = document.querySelector(".cabecera__campo");
    const botonLogin = document.querySelector(".cabecera__boton");
    const botonBuscarMovil = document.querySelector(".cabecera__botonBuscarMovil");
    const campos = document.querySelectorAll("[data-contacto]");
    const btnEnviar = document.getElementById("btn-enviar");
    const formularioRodapie = document.getElementById("formulario-rodapie");

    mostrarOcultarMenu();
    mostrarOcultarBuscador(logoBuscadorContainer, logoCabecera,
        formularioBusqueda, campoBuscar, botonBuscarMovil, botonLogin);
    habilitarBtnRodapie(btnEnviar);

    const validarCampos = (campos) => {
        campos.forEach((campo) => {
            campo.addEventListener("blur", (campo) => {
                valida(campo.target);
                habilitarBtnRodapie(btnEnviar);
            });
        });
    }

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
    validarCampos(campos);
})();
