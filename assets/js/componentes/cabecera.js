import rutaRelativaCabeceraRodapie from "./rutaRelativaCabeceraRodapie.js";

const ruta = rutaRelativaCabeceraRodapie();

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
                        <a class="cabecera__logo" href="${ruta}index.html" title="Ir a la página principal" tabindex="0">
                            <img class="cabecera__logo" src="${ruta}assets/img/iconos/logo-alura-geek.svg" alt="Logo de AluraGeek">
                        </a>
                        <form action="" class="cabecera__formulario" data-formulario-busqueda>
                            <input class="cabecera__campo campo--busqueda" type="text" placeholder="¿Qué deseas buscar?"
                                data-form-buscador>
                        </form>
                    </div>
                    <a class="cabecera__boton boton--primario" href="${ruta}ventanas/login.html" title="Inicia sesión"
                        tabindex="0" data-btn-login>Login</a>
                    <button class="cabecera__botonBuscarMovil" title="Buscar productos" tabindex="0">
                        <img class="cabecera__iconoMovil" src="${ruta}assets/img/iconos/lupa.svg" alt="Icono de Lupa">
                    </button>
                    <button class="cabecera__botonClose cabecera__ocultarElemento" title="Cerrar buscador" tabindex="0">
                        <img class="cabecera__iconoMovil" src="${ruta}assets/img/iconos/close.png" alt="Icono cerrar">
                    </button>
                </nav>
            </header>
        `;
    }
}

customElements.define("header-component", Header);