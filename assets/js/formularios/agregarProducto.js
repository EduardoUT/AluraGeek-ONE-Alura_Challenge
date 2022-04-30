import { login } from "../login.js";
import { estaAutenticado } from "../main.js";

export const precio = document.querySelector("[data-campo=precio]");
const opcionDefault = document.querySelector("[data-select-option=default]");

const comprobarAcceso = () => {
    if (!login(estaAutenticado)) {
        Swal.fire({
            icon: "warning",
            title: "Acceso denegado.",
            text: "Inicie sesión para poder acceder a este sitio.",
            showConfirmButton: false,
            allowOutsideClick: false
        });
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 4000);
    }
}

/**
 * Función asociada a evento keyup del campo precio,
 * al escribir evita que el usuario ingrese cifras con precios 0
 * y sólo escriba cifras y puntos decimales, en este caso sólo 1.
 * @param {keyup} event 
 */
const validarPrecioIngresado = (event) => {
    let valorIngresado = event.target.value;
    let valorFinal = "";
    const filtro = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    const cifrasInvalidas = ["0000000.00", "000000.00", "00000.00", "0000.00", "000.00", "00.00", "0.00"];
    const esInvalido = cifrasInvalidas.includes(valorIngresado);
    for (let i = 0; i <= valorIngresado.length; i++) {
        if (filtro.includes(valorIngresado[i]) && !esInvalido) {
            valorFinal = valorIngresado;
        } else {
            valorFinal += "";
        }
    }
    precio.value = valorFinal;
}

const seleccionarOpcionDefault = (opcionDefault) => {
    opcionDefault.selected = "true";
}

comprobarAcceso();
precio.addEventListener("keyup", validarPrecioIngresado);
seleccionarOpcionDefault(opcionDefault);