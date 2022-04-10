const mostrarOcultarBuscador = (mediaQuery, botonBuscarMovil, logoCabecera, 
    botonLogin, formularioBusqueda, campoBuscar, containerLogoBuscador) => {
    //Especificando comportamiento solo para dispositivos menores que 767px
        if (mediaQuery.matches) {
        //Ocultando elementos del header al hacer click en la lupa.
        botonBuscarMovil.addEventListener("click", () => {
            //Ocultando elementos del menú original.
            containerLogoBuscador.classList.remove("cabecera__logoBuscador");
            logoCabecera.classList.add("cabecera__ocultarElemento");
            formularioBusqueda.classList.remove("cabecera__formulario");
            campoBuscar.classList.remove("cabecera__campo");
            botonLogin.classList.add("cabecera__ocultarElemento");
            botonBuscarMovil.classList.add("cabecera__ocultarElemento");
            //Mostrando buscador.
            containerLogoBuscador.classList.add("cabecera__logoBuscador--movil");
            formularioBusqueda.classList.add("cabecera__formulario--movil");
            campoBuscar.classList.add("cabecera__campo--movil");
            campoBuscar.focus();
        });

        //Mostrando menú original cuando el campo pierde el foco.
        campoBuscar.addEventListener("focusout", () => {
            //Mostrando elementos del menú original.
            containerLogoBuscador.classList.remove("cabecera__logoBuscador--movil");
            logoCabecera.classList.remove("cabecera__ocultarElemento");
            formularioBusqueda.classList.remove("cabecera__formulario--movil");
            campoBuscar.classList.remove("cabecera__campo--movil");
            botonLogin.classList.remove("cabecera__ocultarElemento");
            botonBuscarMovil.classList.remove("cabecera__ocultarElemento");
            //Ocultando buscador.
            containerLogoBuscador.classList.add("cabecera__logoBuscador");
            formularioBusqueda.classList.add("cabecera__formulario");
            campoBuscar.classList.add("cabecera__campo");
        });
    }
}

export default mostrarOcultarBuscador;