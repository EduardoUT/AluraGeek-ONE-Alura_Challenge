import { contenidoDropBoxArea, esFormatoValido } from "./dropBoxArea.js";

const formAgregarProducto = document.getElementById("agregarProductoForm");
const formActualizarProducto = document.querySelector("[data-form-update-product]");
let archivoCorrecto = false;
const leerArchivo = new FileReader();
export let producto = {
    img: null
}

/**
 * Genera una vista de la imágen seleccionada por el usuario
 * dentro del dropBoxArea.
 * @param {div} dropBoxArea 
 * @param {File} archivo 
 * @function esFormatoValido()
 * @function esImagenVisible()
 * @function obtenerUrl()
 * @function contenidoDropBoxArea()
 */
const imagenDropBoxArea = (dropBoxArea, archivo) => {
    const imagenValida = esFormatoValido();
    const imagenVisible = esImagenVisible(dropBoxArea);
    if (imagenValida) {
        archivoCorrecto = true;
        habilitarBotonProducto(archivoCorrecto);
        leerArchivo.addEventListener("load", (event) => {
            event.preventDefault();
            const url = obtenerUrl(event.target);
            /**
             * Creando un tag HTML de tipo imágen, asignandole la URL obtenida
             * en el atributo src.
             */
            const imgView = `<img src="${url}" class="agregar-producto__usuarioImagen" alt="Su imágen">`;
            //Agregando el tag dentro del div
            dropBoxArea.innerHTML = imgView;
            /**
             * Desactivamos el evento resize para evitar que
             * la imágen desaparezca al cambiar el ancho de la
             * ventana.
             */
            window.removeEventListener("resize", contenidoDropBoxArea);
            producto.img = url;
        });
        //Leyendo información de archivo en Base64
        leerArchivo.readAsDataURL(archivo);
    } else {
        /**
         * En caso de haber cargado primero una imágen correcta, y después
         * un archivo que no sea en la extensión requerida, se limpiará
         * la imágen, el contenido del dropBoxArea volverá a su
         * vista inicial con las instrucciones y el contenido capturado
         * por archivo será limpiado.
         */
        if (imagenVisible) {
            const imagenVistaPrevia = document.querySelector(".agregar-producto__usuarioImagen");
            imagenVistaPrevia.remove();
            contenidoDropBoxArea();
            archivo = "";
        }
        archivoCorrecto = false;
        producto.img = null;
        habilitarBotonProducto(archivoCorrecto);
        Swal.fire({
            icon: "warning",
            title: "El formato ingresado no es admitido, sólo (.jpeg .jpg y .png), intente nuevamente."
        });
    }
}

export const imagenDropBoxAreaServer = (dropBoxArea, imagenBase64) => {
    const img = `<img src="${imagenBase64}" class="agregar-producto__usuarioImagen" alt="Su imágen">`;
    dropBoxArea.innerHTML = img;
    window.removeEventListener("resize", contenidoDropBoxArea);
    producto.img = imagenBase64;
}

/**
 * Obtiene la información de la imágen en Base64, y la
 * asigna en la propiedad src de la imágen de vista previa 
 * creada por una URL.
 * @param {div} dropBoxArea 
 */
export const obtenerUrl = (dataFile) => {
    //Asignando dirección URL del archivo del usuario en variable.
    const dataImagenBase64 = dataFile.result;
    return dataImagenBase64;
}

/**
 * Función encargada de comprobar que exista dentro
 * del dropBoxArea un childNode que sea de tipo img.
 * @param {div} dropBoxArea
 * @returns boolean
 */
const esImagenVisible = (dropBoxArea) => {
    const esVisible = dropBoxArea.innerHTML.includes("img");
    return esVisible;
}

export const habilitarBotonProducto = (archivoCorrecto) => {
    if (window.location.href.includes("productos_registrar.html")) {
        const btnAgregarProducto = document.getElementById("agregarProducto");
        const nombreProducto = document.getElementById("nombreProducto");
        const precioProducto = document.getElementById("precioProducto");
        const dscProducto = document.getElementById("descProducto");
        const nombreValido = nombreProducto.validity.valid;
        const precioValido = precioProducto.validity.valid;
        const dscValido = dscProducto.validity.valid;
        const formularioAgregarProductoValido = (archivoCorrecto && nombreValido &&
            precioValido && dscValido);
        if (formularioAgregarProductoValido) {
            btnAgregarProducto.removeAttribute("disabled");
            btnAgregarProducto.classList.remove("boton--bloqueado");
        } else {
            btnAgregarProducto.setAttribute("disabled", "true");
            btnAgregarProducto.classList.add("boton--bloqueado");
        }
    } else if (window.location.href.includes("productos_actualizar.html")) {
        const btnUpdate = document.querySelector("[data-button-update]");
        const nombreFormularioUpdate = document.querySelector("[data-campo=productoUpdate]");
        const precioFormularioUpdate = document.querySelector("[data-campo=precioUpdate]");
        const descripcionFormulario = document.querySelector("[data-campo=descripcionUpdate]");
        const nombreValido = nombreFormularioUpdate.validity.valid;
        const precioValido = precioFormularioUpdate.validity.valid;
        const dscValido = descripcionFormulario.validity.valid;
        const formActualizarValido = (nombreValido && precioValido && dscValido);
        if (formActualizarValido) {
            btnUpdate.removeAttribute("disabled");
            btnUpdate.classList.remove("boton--bloqueado");
        } else {
            btnUpdate.setAttribute("disabled", "true");
            btnUpdate.classList.add("boton--bloqueado");
        }
    }
}

const validarBtnProducto = (event) => {
    const element = event.target;
    if (element && element.tagName == 'INPUT') {
        habilitarBotonProducto(archivoCorrecto);
    } else if (element && element.tagName == 'TEXTAREA') {
        habilitarBotonProducto(archivoCorrecto);
    }
}

const comprobarFormularioActual = () => {
    if (window.location.href.includes("productos_registrar.html")) {
        formAgregarProducto.addEventListener("keyup", validarBtnProducto);
    } else if (window.location.href.includes("productos_actualizar.html")) {
        formActualizarProducto.addEventListener("keyup", validarBtnProducto);
    }
}

comprobarFormularioActual();
habilitarBotonProducto(archivoCorrecto);
export default imagenDropBoxArea;