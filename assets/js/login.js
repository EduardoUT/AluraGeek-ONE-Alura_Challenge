import { habilitarBtnLogin } from "./formularios/habilitarBoton.js";

(() => {

    const formularioLogin = document.getElementById("formulario-login");
    const btnLogin = document.getElementById("btn-login");

    habilitarBtnLogin(btnLogin);

    const validarBtnLogin = (event) => {
        const element = event.target;
        if (element && element.tagName == 'INPUT') {
            habilitarBtnLogin(btnLogin);
        }
    }

    formularioLogin.addEventListener("keyup", validarBtnLogin);
})();