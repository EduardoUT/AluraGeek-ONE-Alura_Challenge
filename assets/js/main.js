import mostrarOcultarMenu from "./componentes/mostrarOcultarMenu.js";
import mostrarOcultarBuscador from "./componentes/buscadorMovil.js";
import validarCampos from "./formularios/validarCampos.js";
import { habilitarBtnRodapie } from "./formularios/habilitarBoton.js";

/**Función IIFE */
(() => {
    const logoBuscadorContainer = document.querySelector(".cabecera__logoBuscador");
    const logoCabecera = document.querySelector(".cabecera__logo");
    const formularioBusqueda = document.querySelector(".cabecera__formulario");
    const campoBuscar = document.querySelector(".cabecera__campo");
    const btnLoginCabecera = document.querySelector(".cabecera__boton");
    const btnBuscarMovil = document.querySelector(".cabecera__botonBuscarMovil");
    const btnEnviar = document.getElementById("btn-enviar");
    const formularioRodapie = document.getElementById("formulario-rodapie");

    mostrarOcultarMenu();
    mostrarOcultarBuscador(logoBuscadorContainer, logoCabecera,
        formularioBusqueda, campoBuscar, btnBuscarMovil, btnLoginCabecera);
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
