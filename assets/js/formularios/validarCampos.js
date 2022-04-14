import { valida } from "./validaciones.js";

const validarCampos = () => {
    const campos = document.querySelectorAll("[data-contacto]");
    const btnLogin = document.getElementById("btn-login");
    const btnEnviar = document.getElementById("btn-enviar");
    campos.forEach((campo) => {
        campo.addEventListener("blur", (campo) => {
            valida(campo.target);
            habilitarBtnRodapie(btnEnviar);
            habilitarBtnLogin(btnLogin);
        });
    });
}

export const habilitarBtnRodapie = (btnEnviar) => {
    const campoNombre = document.getElementById("nombre");
    const campoMensaje = document.getElementById("mensaje");
    const nombreValido = campoNombre.validity.valid;
    const mensajeValido = campoMensaje.validity.valid;
    const formularioRodapieValido = (nombreValido && mensajeValido);
    if (formularioRodapieValido) {
        btnEnviar.removeAttribute("disabled");
        btnEnviar.classList.remove("boton--bloqueado");
    } else {
        btnEnviar.setAttribute("disabled", "true");
        btnEnviar.classList.add("boton--bloqueado");
    }
};

export const habilitarBtnLogin = (btnLogin) => {
    const campoCorreo = document.getElementById("correo");
    const campoPassword = document.getElementById("password");
    const campoCorreoValido = campoCorreo.validity.valid;
    const campoPasswordValido = campoPassword.validity.valid;
    const formularioLoginValido = (campoCorreoValido && campoPasswordValido);
    if (formularioLoginValido) {
        btnLogin.removeAttribute("disabled");
        btnLogin.classList.remove("boton--bloqueado");
    } else {
        btnLogin.setAttribute("disabled", "true");
        btnLogin.classList.add("boton--bloqueado");
    }
}

export default validarCampos;