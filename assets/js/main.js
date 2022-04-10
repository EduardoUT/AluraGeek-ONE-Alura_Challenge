import mostrarOcultarMenu from "./componentes/mostrarOcultarMenu.js";
import mostrarOcultarBuscador from "./componentes/buscadorMovil.js";

/**Función IIFE */
(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const botonBuscarMovil = document.querySelector(".cabecera__botonBuscarMovil");
    const logoCabecera = document.querySelector(".cabecera__logo");
    const botonLogin = document.querySelector(".cabecera__boton");
    const formularioBusqueda = document.querySelector(".cabecera__formulario");
    const campoBuscar = document.querySelector(".cabecera__campo");
    const containerLogoBuscador = document.querySelector(".cabecera__logoBuscador");
    mostrarOcultarMenu();
    mostrarOcultarBuscador(mediaQuery, botonBuscarMovil, logoCabecera,
        botonLogin, formularioBusqueda, campoBuscar, containerLogoBuscador);
})();

window.addEventListener("load", (event) => {
    event.preventDefault();
});
