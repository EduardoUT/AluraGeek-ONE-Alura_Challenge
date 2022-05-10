import rutaRelativaCabeceraRodapie from "./rutaRelativaCabeceraRodapie.js";

const ruta = rutaRelativaCabeceraRodapie();

/**
 * Referencia:
 * https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
 */
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="informaciones container">
        <div class="informaciones__alurageek">
            <div class="informaciones__contactos">
                <div class="informaciones__cabecera">
                    <a class="informaciones__logo" href="${ruta}index.html" title="Ir a la página principal" tabindex="0">
                        <img class="informaciones__logo" src="${ruta}assets/img/iconos/logo-alura-geek.svg"
                            alt="Logo de AluraGeek">
                    </a>
                </div>
                <ul class="informaciones__links">
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ir a quienes somos"
                            tabindex="0">
                            Quienes somos
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Ir a las políticas de provacidad" tabindex="0">
                            Política de privacidad
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Ir al programa de fidelidad" tabindex="0">
                            Programa de fidelidad
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ver nuestras tiendas"
                            tabindex="0">
                            Nuestras tiendas
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#"
                            title="Consultar información de franquiciado" tabindex="0">
                            Quiero ser franquiciado
                        </a>
                    </li>
                    <li class="informaciones__item">
                        <a class="informaciones__link link link--secundario" href="#" title="Ir a anuncios"
                            tabindex="0">
                            Anúncie aquí
                        </a>
                    </li>
                </ul>
            </div>
            <form class="formulario" action="" id="formulario-rodapie">
                <legend class="formulario__legend">Hable con nosotros.</legend>
                <p class="formulario__instruccion parrafo">Campos Obligatorios</p>
                <div class="formulario__componentes">
                    <label class="formulario__label" for="nombre" tabindex="0">Nombre:</label>
                    <input class="formulario__campo formulario__campoEstilo" id="nombre" type="text" required
                        placeholder="Nombre(s) Apellido(s)" tabindex="0"
                        title="La primer letra de cada nombre y apellido debe ser en mayúscula, no debe haber más de un espacio en blanco y no puede haber más de 50 carácteres."
                        pattern="^(?=.{3,51}$)([A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:[\\s][A-ZÁÉÍÓÚ][a-záéíóúñ]+)+)$" 
                        minlength="3" maxlength="50" data-campo="nombre">
                    <span class="formulario__span--error" tabindex="0">Error</span>
                </div>
                <div class="formulario__componentes">
                    <label class="formulario__label" for="mensaje" tabindex="0">Mensaje:</label>
                    <textarea class="formulario__textarea formulario__campoEstilo" id="mensaje" required
                        placeholder="Escribe tu mensaje" rows="3" tabindex="0"
                        title="El campo nombre no puede estar en blanco o vacío, debe contener mínimo 20 carácteres máximo 120"
                        minlength="20" maxlength="120" data-campo="mensaje"></textarea>
                    <span class="formulario__span--error" tabindex="0">Error</span>
                </div>
                <input class="formulario__boton boton--secundario" id="btn-enviar" type="submit" value="Enviar Mensaje"
                    tabindex="0">
            </form>
        </div>
        </footer>
        <div class="copyright">
            <p class="copyright__autor parrafo" tabindex="0">Desarrollado por Eduardo Reyes Hernández</p>
            <p class="copyright__autor parrafo">&#169; 2022</p>
        </div>
        `
    }
}

customElements.define("footer-component", Footer);