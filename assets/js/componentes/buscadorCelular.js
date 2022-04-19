import mediaQueryCelular from "./mediaQuery.js";

const buscadorCelular = (logoBuscadorContainer, logoCabecera,
    formularioBusqueda, campoBuscar, botonBuscarMovil, botonLogin) => {

    const mostrarBuscador = () => {
        //Ocultando elementos (logotipo, botón login y lupa) del menú original.
        logoCabecera.classList.add("cabecera__ocultarElemento");
        botonLogin.classList.add("cabecera__ocultarElemento");
        botonBuscarMovil.classList.add("cabecera__ocultarElemento");

        //Mostrando elementos (form, campo de búsqueda y ancho).
        logoBuscadorContainer.classList.add("cabecera__logoBuscador--ancho");
        formularioBusqueda.classList.remove("cabecera__ocultarElemento");
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
        botonLogin.classList.remove("cabecera__ocultarElemento");
        botonBuscarMovil.classList.remove("cabecera__ocultarElemento");

        //Ocultando buscador.
        formularioBusqueda.classList.add("cabecera__ocultarElemento");
        /**Cuando el campo pierde el foco, removemos el estilo
         * asignado en el evento click de arriba.
         */
        formularioBusqueda.removeAttribute("style");
        campoBuscar.classList.add("cabecera__ocultarElemento");
        /**Cuando el campo pierde el foco, removemos el estilo
         * asignado en el evento click de arriba.
         */
        campoBuscar.removeAttribute("style");
    }


    const visualizacionBuscador = () => {
        //Evaluando si el ancho corresponde al tamaño de un dispositivo móvil
        if (mediaQueryCelular()) {
            //Ocultando elementos del header al hacer click en la lupa.
            botonBuscarMovil.addEventListener("click", mostrarBuscador);
            //Mostrando elementos (logotipo, botón login y lupa) cuando el campo pierde el foco.
            campoBuscar.addEventListener("blur", ocultarBuscador);
        } else {
            /**
             * Cuando el dispositivo sea mayor sólo se remueve el foco
             * del campo de búsqueda y volverá el menú original
             */
            campoBuscar.blur();
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

export default buscadorCelular;