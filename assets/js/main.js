import mostrarOcultarMenu from "./componentes/mostrarOcultarMenu.js";
import mostrarOcultarBuscador from "./componentes/buscadorMovil.js";

/**Función IIFE */
(() => {
    const logoBuscadorContainer = document.querySelector(".cabecera__logoBuscador");
    const logoCabecera = document.querySelector(".cabecera__logo");
    const formularioBusqueda = document.querySelector(".cabecera__formulario");
    const campoBuscar = document.querySelector(".cabecera__campo");
    const botonLogin = document.querySelector(".cabecera__boton");
    const botonBuscarMovil = document.querySelector(".cabecera__botonBuscarMovil");
    mostrarOcultarMenu();
    mostrarOcultarBuscador(logoBuscadorContainer, logoCabecera,
        formularioBusqueda, campoBuscar, botonBuscarMovil, botonLogin);
    window.addEventListener("load", (event) => {
        event.preventDefault();
    });
})();
