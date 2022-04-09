import mostrarOcultarMenu from "./componentes/mostrarOcultarMenu.js";

/**Función IIFE */
(() => {
    mostrarOcultarMenu();
})();

window.addEventListener("load", (event) => {
    event.preventDefault();
});
