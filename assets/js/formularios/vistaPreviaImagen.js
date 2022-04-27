import { contenidoDropBoxArea, esFormatoValido } from "./agregarProducto.js";
const formAgregarProducto = document.getElementById("agregarProductoForm");
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
 * @function leerUrl()
 * @function contenidoDropBoxArea()
 */
const vistaPreviaImagen = (dropBoxArea, archivo) => {
    const imagenValida = esFormatoValido();
    const imagenVisible = esImagenVisible(dropBoxArea);
    if (imagenValida) {
        archivoCorrecto = true;
        habilitarBotonProducto(archivoCorrecto);
        leerArchivo.onload = (e) => {
            e.preventDefault();
            const obtenerUrl = leerUrl(leerArchivo);
            leerUrl(leerArchivo);
            /**
             * Creando un tag HTML de tipo imágen, asignandole la URL obtenida
             * en el atributo src.
             */
            const imgView = `<img src="${obtenerUrl}" class="agregar-producto__usuarioImagen" alt="Su imágen">`;
            //Agregando el tag dentro del div
            dropBoxArea.innerHTML = imgView;
            /**
             * Desactivamos el evento resize para evitar que
             * la imágen desaparezca al cambiar el ancho de la
             * ventana.
             */
            window.removeEventListener("resize", contenidoDropBoxArea);
            producto.img = obtenerUrl;
        }
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
        alert("El formato ingresado no es admitido, sólo (.jpeg .jpg y .png), intente nuevamente.");
    }
}

/**
 * Obtiene la información de la imágen en Base64, y la
 * asigna en la propiedad src de la imágen de vista previa 
 * creada por una URL.
 * @param {div} dropBoxArea 
 */
export const leerUrl = (leerArchivo) => {
    //Asignando dirección URL del archivo del usuario en variable.
    /**CONTEMPLAT VALOR A FUTURO */
    const dataImagenBase64 = leerArchivo.result;
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

/**
 * Se encarga de limpiar el nombre del archivo visible en
 * el campo de tipo file.
 * @param {Object} inputFile 
 * @returns Valor vacío.
 */
export const limpiarValorImagen = (inputFile) => {
    return inputFile.value = "";
}

export const habilitarBotonProducto = (archivoCorrecto) => {
    const btnAgregarProducto = document.getElementById("agregarProducto");
    const campoNombreProducto = document.getElementById("nombreProducto");
    const campoPrecioProducto = document.getElementById("precioProducto");
    const campoDscProducto = document.getElementById("descProducto");
    const campoNombreProductoValido = campoNombreProducto.validity.valid;
    const campoPrecioProductoValido = campoPrecioProducto.validity.valid;
    const campoDscProductoValido = campoDscProducto.validity.valid;
    const formularioAgregarProductoValido = (archivoCorrecto && campoNombreProductoValido &&
        campoPrecioProductoValido && campoDscProductoValido);
    if (formularioAgregarProductoValido) {
        btnAgregarProducto.removeAttribute("disabled");
        btnAgregarProducto.classList.remove("boton--bloqueado");
    } else {
        btnAgregarProducto.setAttribute("disabled", "true");
        btnAgregarProducto.classList.add("boton--bloqueado");
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

habilitarBotonProducto(archivoCorrecto);
formAgregarProducto.addEventListener("keyup", validarBtnProducto);

export default vistaPreviaImagen;