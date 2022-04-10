const mostrarOcultarBuscador = (logoBuscadorContainer, logoCabecera,
    formularioBusqueda, campoBuscar, botonBuscarMovil, botonLogin) => {
    //Especificando comportamiento solo para dispositivos menores que 767px
    //Capturando ancho de pantalla.
    const anchoVentana = window.innerWidth;
    //Evaluando si corresponde al tamaño para celulares
    const rangoAncho = (anchoVentana >= 0 && anchoVentana <= 767);
    if (rangoAncho) {
        //Ocultando elementos del header al hacer click en la lupa.
        botonBuscarMovil.addEventListener("click", () => {
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
        });

        //Mostrando elementos (logotipo, botón login y lupa) cuando el campo pierde el foco.
        campoBuscar.addEventListener("blur", () => {
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
        });
    }
}

export default mostrarOcultarBuscador;