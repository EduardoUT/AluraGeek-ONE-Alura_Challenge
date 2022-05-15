/**
 * @const 
 * Arreglo con los nombres de los distintos tipos de errores 
 * del objeto ValidityState.
 */
const tiposDeErrores = [
    "valueMissing",
    "patternMismatch",
    "tooShort",
    "tooLong",
    "typeMismatch",
];

/**
 * 
 * @param {Object} input 
 * Elemento input del DOM en el formulario.
 * @function
 * Se exportará al archivo main.js
 * 
 * Permite validar un input, en caso de ser valido:
 * 
 * --Remueve la clase css formulario__componentes--incorrecto
 * 
 * --Esta a su vez selecciona el elemento span de error formulario__span--error
 * 
 * De lo contrario:
 * 
 * --Agrega la clase css formulario__componentes--incorrecto
 * 
 * --Selecciona al elemento span de error formulario__span--error
 * 
 * @function mostrarMensajeDeError
 * 
 * Será mostrado en el elemento span, por medio del innerHTML.
 */
export function valida(input) {
    /**
     * @const {string}
     * Variable que contiene el tipo de dataset, obtenido
     * de la propiedad data- del DOM.
     */
    const tipoDeInput = input.dataset.campo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("formulario__componentes--incorrecto");
        input.parentElement.querySelector(".formulario__span--error").innerHTML = "";
    } else {
        input.parentElement.classList.add("formulario__componentes--incorrecto");
        input.parentElement.querySelector(".formulario__span--error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }
}

/**
 * 
 * @param {string} tipoDeInput 
 * Valor del tipo de input acorde a la propiedad data- del DOM.
 * @param {Object} input 
 * Valor del objeto input.
 * @returns Mensaje de tipo string del 
 * tipo de error acorde al tipo de input mensajesDeError y
 * del objeto ValidityState.
 * @function
 * Permite obtener el mensaje de error acorde a el arreglo de tipos
 * de errores, y el objeto ValidityState, en caso de coincidir,
 * se mostrará el mensaje contenido en el objeto mensajesDeError.
 */
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if (input.validity[error]) {
            /*
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            */
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

/**
 * @const
 * Objeto con las propiedades nombradas acorde a la propiedad
 * data- del DOM, posee propiedades hijas acorde al nombre
 * de los tipos de errores del objeto ValidityState.
 */
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar en blanco o vacío.",
        tooShort: "El valor mínimo requerido de carácteres es de 3.",
        tooLong: "El campo nombre sólo puede contener un máximo de 40 carácteres",
        patternMismatch: "Por favor, asegúrese de verificar los siguientes requerimientos: <br>" +
            "Debes incluir por lo menos un apellido. <br>" +
            "Sólo la primera letra de los nombres y apellidos debe ser mayúscula. <br>" +
            "No puede haber más de un espacio en blanco. <br>"
    },
    mensaje: {
        valueMissing: "El campo mensaje no puede estar en blanco o vacío.",
        tooLong: "El mensaje sólo puede contener un máximo de 120 carácteres",
        tooShort: "Debe contener mínimo 20 carácteres",
    },
    correo: {
        valueMissing: "El campo correo no puede estar en blanco o vacío.",
        patternMismatch: "El formato admitido debe ser en formato correousuario@dominio.com",
        typeMismatch:
            "Deber estar en formato e-mail conteniendo el caracter especial @ " +
            "seguido de un dominio o proveedor seguido de un punto(.).",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar en blanco o vacío.",
    },
    producto: {
        valueMissing: "El campo producto no puede estar en blanco o vacío.",
        patternMismatch: "Por favor, asegúrese de verificar los siguientes requerimientos: <br>" +
            "No debe haber más de un espacio en blanco. <br>" +
            "Se admiten números si el nombre lo requiera. <br>" +
            "Se admiten los símbolos: .-,¿?!¡&/$()=+# <br>",
        tooLong: "El nombre del producto no puede exceder los 20 carácteres."
    },
    precio: {
        valueMissing: "El campo precio no puede estar en blanco o vacío.",
        patternMismatch: "Por favor, asegúrese de verificar los siguientes requerimientos: <br>" +
            "No se aceptan letras, carácteres especiales ni valores negativos, sólo un punto<br>" +
            "Si es un precio sin centavos, escriba la cifra con .00 centavos.<br>" +
            "Formatos de ejemplo: 9999999.99 1200.99 20.30 506.00 1.99<br>" +
            "Incluya un punto para índicar los centavos.",
        tooLong: "No debe exceder los 9 dígitos, contando décimales.",
    },
    categoria: {
        valueMissing: "Por favor, seleccione una categoría."
    },
    descripcion: {
        valueMissing: "El campo descripción no puede estar en blanco o vacío.",
        tooShort: "Debe contener mínimo 20 carácteres",
        tooLong: "No debe exceder los 150 carácteres."
    },
    productoUpdate: {
        valueMissing: "El campo producto no puede estar en blanco o vacío.",
        patternMismatch: "Por favor, asegúrese de verificar los siguientes requerimientos: <br>" +
            "No debe haber más de un espacio en blanco. <br>" +
            "Se admiten números si el nombre lo requiera. <br>" +
            "Se admiten los símbolos: .-,¿?!¡&/$()=+# <br>",
        tooLong: "El nombre del producto no puede exceder los 20 carácteres."
    },
    precioUpdate: {
        valueMissing: "El campo precio no puede estar en blanco o vacío.",
        patternMismatch: "Por favor, asegúrese de verificar los siguientes requerimientos: <br>" +
            "No se aceptan letras, carácteres especiales ni valores negativos, sólo un punto<br>" +
            "Si es un precio sin centavos, escriba la cifra con .00 centavos.<br>" +
            "Formatos de ejemplo: 9999999.99 1200.99 20.30 506.00 1.99<br>" +
            "Incluya un punto para índicar los centavos.",
        tooLong: "No debe exceder los 9 dígitos, contando décimales.",
    },
    descripcionUpdate: {
        valueMissing: "El campo descripción no puede estar en blanco o vacío.",
        tooShort: "Debe contener mínimo 20 carácteres",
        tooLong: "No debe exceder los 150 carácteres."
    }
};

/**
 * Objeto opcional que contendrá validaciones específicas
 * cuyos mensajes de error serán customizados.
 */
const validadores = {
};