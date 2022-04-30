import menu from "./componentes/menu.js";
import buscadorCelular from "./componentes/buscadorCelular.js";
import validarCampos from "./formularios/validarCampos.js";
import { habilitarBtnRodapie } from "./formularios/habilitarBoton.js";
import { login } from "./login.js";
sessionStorage.setItem("correo", "e@gmail.com");
sessionStorage.setItem("password", "123");

const btnLogin = document.querySelector("[data-btn-login]");
const formularioRodapie = document.getElementById("formulario-rodapie");
const btnEnviar = document.getElementById("btn-enviar");
export const estaAutenticado = JSON.parse(sessionStorage.getItem("autenticado"));

const botonLogin = () => {
    const estaLogeado = JSON.parse(sessionStorage.getItem("autenticado"));
    if (estaLogeado == null || estaLogeado == false) {
        btnLogin.textContent = "Login";
    } else {
        btnLogin.textContent = "Salir";
    }
}

const clickOnLogin = () => {
    if (btnLogin.textContent.includes("Login")) {
        sessionStorage.setItem("autenticado", "false");
    } else if (btnLogin.textContent.includes("Salir")) {
        sessionStorage.setItem("autenticado", "false");
    }
}

const validarBtnRodapie = (event) => {
    const element = event.target;
    if (element && element.tagName == 'INPUT') {
        habilitarBtnRodapie(btnEnviar);
    } else if (element && element.tagName == 'TEXTAREA') {
        habilitarBtnRodapie(btnEnviar);
    }
}

const evitarRecarga = (event) => {
    event.preventDefault();
}

login(estaAutenticado);
botonLogin();
menu();
buscadorCelular();
habilitarBtnRodapie(btnEnviar);
validarCampos();
window.addEventListener("load", evitarRecarga);
btnLogin.addEventListener("click", clickOnLogin);
btnEnviar.addEventListener("click", evitarRecarga);
formularioRodapie.addEventListener("keyup", validarBtnRodapie);