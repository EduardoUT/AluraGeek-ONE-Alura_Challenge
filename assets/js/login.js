import validarCampos from "./formularios/validarCampos.js";

export const login = (estaAutenticado) => {
    console.log(estaAutenticado);
    return estaAutenticado;
}

if (window.location.href.includes("login.html")) {
    const formularioLogin = document.getElementById("formulario-login");

    const loggearse = (event) => {
        event.preventDefault();
        const correoAlmacenado = sessionStorage.getItem("correo");
        const passAlmacenado = sessionStorage.getItem("password");
        const correoUsuario = document.querySelector("[data-campo=correo]").value;
        const contrasenaUsuario = document.querySelector("[data-campo=password]").value;
        if (correoUsuario == correoAlmacenado && contrasenaUsuario == passAlmacenado) {
            sessionStorage.setItem("autenticado", "true");
            window.location.href = "/ventanas/productos_existentes.html";
        } else {
            sessionStorage.setItem("autenticado", "false");
            Swal.fire({
                icon: "error",
                title: "Usuario o Contraseña Incorrectos, intente nuevamente.",
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }
    }

    const habilitarBtnLogin = () => {
        const btnLogin = document.getElementById("btn-login");
        const email = document.querySelector("[data-campo=correo]");
        const pass = document.querySelector("[data-campo=password]");
        const campoCorreoValido = email.validity.valid;
        const campoPasswordValido = pass.validity.valid;
        const formularioLoginValido = (campoCorreoValido && campoPasswordValido);
        if (formularioLoginValido) {
            btnLogin.removeAttribute("disabled");
            btnLogin.classList.remove("boton--bloqueado");
        } else {
            btnLogin.setAttribute("disabled", "true");
            btnLogin.classList.add("boton--bloqueado");
        }
    }

    const validarBtnLogin = (event) => {
        const element = event.target;
        if (element && element.tagName == 'INPUT') {
            habilitarBtnLogin();
        }
    }

    habilitarBtnLogin();
    validarCampos();
    formularioLogin.addEventListener("keyup", validarBtnLogin);
    formularioLogin.addEventListener("submit", loggearse);
}