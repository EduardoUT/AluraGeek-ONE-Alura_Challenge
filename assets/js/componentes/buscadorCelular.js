import mediaQueryCelular from "./mediaQuery.js";

const logoBuscadorContainer = document.querySelector(".cabecera__logoBuscador");
const logoCabecera = document.querySelector(".cabecera__logo");
const formularioBusqueda = document.querySelector(".cabecera__formulario");
const campoBuscar = document.querySelector(".cabecera__campo");
const btnLogin = document.querySelector(".cabecera__boton");
const btnBuscarMovil = document.querySelector(".cabecera__botonBuscarMovil");
const btnClose = document.querySelector(".cabecera__botonClose");

const buscadorCelular = () => {
    const visualizacionBuscador = () => {
        const anchoValido = mediaQueryCelular();
        //Evaluando si el ancho corresponde al tamaño de un dispositivo móvil
        if (anchoValido) {
            //Ocultando elementos del header al hacer click en la lupa.
            btnBuscarMovil.addEventListener("click", mostrarBuscador);
            //Mostrando elementos (logotipo, botón login y lupa) cuando el campo pierde el foco.
            //campoBuscar.addEventListener("blur", ocultarBuscador);
            btnClose.addEventListener("click", ocultarBuscador);
        } else {
            /**
             * Cuando la ventana cambie de tamaño mayor al mediaQuery
             * el buscador se ocultará.
             */
            ocultarBuscador();
        }
    }

    /**
     * Ejecutando función para capturar ancho según
     * se aumente o disminuya la ventana.
     */
    window.addEventListener("resize", visualizacionBuscador);
    /**
     * Ejecutando misma función, sólo para dispositivos 
     * móviles, al cargar la página se captura el ancho una
     * sóla vez.
     */
    visualizacionBuscador();
}

const mostrarBuscador = () => {
    //Ocultando elementos (logotipo, botón login y lupa) del menú original.
    logoCabecera.classList.add("cabecera__ocultarElemento");
    btnLogin.classList.add("cabecera__ocultarElemento");
    btnBuscarMovil.classList.add("cabecera__ocultarElemento");

    //Mostrando elementos (form, campo de búsqueda y ancho).
    logoBuscadorContainer.classList.add("cabecera__logoBuscador--ancho");
    formularioBusqueda.classList.remove("cabecera__ocultarElemento");
    btnClose.classList.remove("cabecera__ocultarElemento");
    /**En CSS la propiedad padron asignada para dispositivos
     * móviles es display: none; la cambio a flex para que
     * pueda mostrarse.
     */
    formularioBusqueda.style.display = "flex";
    campoBuscar.classList.remove("cabecera__ocultarElemento");
    /**En CSS la propiedad padron asignada para dispositivos
     * móviles es display: none; la cambio a block para que
     * pueda mostrarse.
     */
    campoBuscar.style.display = "block";
    formularioBusqueda.classList.add("cabecera__formulario");
    campoBuscar.classList.add("cabecera__campo");
    campoBuscar.focus();
}

const ocultarBuscador = () => {
    //Mostrando elementos del menú original.
    logoBuscadorContainer.classList.remove("cabecera__logoBuscador--ancho");
    logoCabecera.classList.remove("cabecera__ocultarElemento");
    btnLogin.classList.remove("cabecera__ocultarElemento");
    btnBuscarMovil.classList.remove("cabecera__ocultarElemento");

    //Ocultando buscador.
    formularioBusqueda.classList.add("cabecera__ocultarElemento");
    /**Cuando el campo pierde el foco, removemos el estilo
     * asignado en el evento click de arriba.
     */
    formularioBusqueda.removeAttribute("style");
    campoBuscar.classList.add("cabecera__ocultarElemento");
    btnClose.classList.add("cabecera__ocultarElemento");
    /**Cuando el campo pierde el foco, removemos el estilo
     * asignado en el evento click de arriba.
     */
    campoBuscar.removeAttribute("style");
}

export default buscadorCelular;