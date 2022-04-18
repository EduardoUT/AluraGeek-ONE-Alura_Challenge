/**
 * Referencia:
 * https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
 */
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="cabecera container">
        <nav class="cabecera__menu">
            <div class="cabecera__logoBuscador">
                <a class="cabecera__logo" href="index.html" title="Ir a la página principal" tabindex="0">
                    <img class="cabecera__logo" src="./assets/img/iconos/logo-alura-geek.svg" alt="Logo de AluraGeek">
                </a>
                <form action="" class="cabecera__formulario">
                    <input class="cabecera__campo campo--busqueda" type="text" placeholder="¿Qué deseas buscar?"
                        data-form-buscador>
                </form>
            </div>
            <a class="cabecera__boton boton--primario" href="./ventanas/login.html" title="Inicia sesión"
                tabindex="0">Login</a>
            <button class="cabecera__botonBuscarMovil" href="#" title="Buscar productos" tabindex="0">
                <img class="cabecera__iconoMovil" src="./assets/img/iconos/lupa.svg" alt="Icono de Lupa">
            </button>
        </nav>
        </header>
        `
    }
}

customElements.define("header-component", Header);