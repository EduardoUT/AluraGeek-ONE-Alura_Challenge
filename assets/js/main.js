import menu from "./componentes/menu.js";
import buscadorCelular from "./componentes/buscadorCelular.js";
import { habilitarBtnRodapie } from "./formularios/habilitarBoton.js";
import { login } from "./login.js";
import { productServices } from "./service/product-service.js";
import { categoriasUnicas, incluyeCategoria } from "./controllers/categoriasUnicas.js";
import validarCampos from "./formularios/validarCampos.js";

const formularioBusqueda = document.querySelector("[data-formulario-busqueda]");
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

export const comprobarAcceso = () => {
    if (!login(estaAutenticado)) {
        Swal.fire({
            icon: "warning",
            title: "Acceso denegado.",
            text: "Inicie sesión para poder acceder a este sitio.",
            showConfirmButton: false,
            allowOutsideClick: false
        });
        setTimeout(() => { window.location.href = "../index.html"; }, 4000);
    }
}

const buscarProducto = (event) => {
    event.preventDefault();
    productServices.listaProductos()
        .then((productos) => {
            const categorias = categoriasUnicas(productos);
            const campoBusqueda = document.querySelector("[data-form-buscador]");
            const valorCampoBusqueda = campoBusqueda.value;
            if (valorCampoBusqueda != "") {
                const esUnValorCategoria = incluyeCategoria(categorias, valorCampoBusqueda);
                if (esUnValorCategoria) {
                    if ((window.location.href.includes("index.html") || window.location.href.includes("")) && !window.location.href.includes("/ventanas/")) {
                        window.location.href = `./ventanas/productos_busqueda.html?categoria_like=${valorCampoBusqueda}`;
                    } else if (window.location.href.includes("/ventanas/") && !window.location.href.includes("/ventanas/mensajes/")) {
                        window.location.href = `./productos_busqueda.html?categoria_like=${valorCampoBusqueda}`;
                    } else if (window.location.href.includes("/mensajes/")) {
                        window.location.href = `../productos_busqueda.html?categoria_like=${valorCampoBusqueda}`;
                    }
                } else {
                    if ((window.location.href.includes("index.html") || window.location.href.includes("")) && !window.location.href.includes("/ventanas/")) {
                        window.location.href = `./ventanas/productos_busqueda.html?nombre_like=${valorCampoBusqueda}`;
                    } else if (window.location.href.includes("/ventanas/") && !window.location.href.includes("/ventanas/mensajes/")) {
                        window.location.href = `./productos_busqueda.html?nombre_like=${valorCampoBusqueda}`;
                    } else if (window.location.href.includes("/mensajes/")) {
                        window.location.href = `../productos_busqueda.html?nombre_like=${valorCampoBusqueda}`;
                    }
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Por favor, escriba el nombre de un producto."
                });
            }
        })
        .catch((e) => console.log(e));
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
formularioBusqueda.addEventListener("submit", buscarProducto);
formularioRodapie.addEventListener("keyup", validarBtnRodapie);