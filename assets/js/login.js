import validarCampos from "./formularios/validarCampos.js";
import { userServices } from "./service/user-service.js";

export const login = (estaAutenticado) => {
    return estaAutenticado;
}

if (window.location.href.includes("login.html")) {
    const formularioLogin = document.getElementById("formulario-login");

    const loggearse = (event) => {
        event.preventDefault();
        userServices.listaUsuario()
            .then(({alura_geek_usuarios}) => {
                alura_geek_usuarios.forEach(({ correo_usuario, password_usuario }) => {
                    const correoServidor = correo_usuario;
                    const passwordServidor = password_usuario;
                    const correoUsuario = document.querySelector("[data-campo=correo]").value;
                    const passwordUsuario = document.querySelector("[data-campo=password]").value;
                    if (correoUsuario == correoServidor && passwordUsuario == passwordServidor) {
                        sessionStorage.setItem("autenticado", "true");
                        window.location.href = "./productos_existencias.html";
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
                });
            })
            .catch((error) => console.log("Error " + error));
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