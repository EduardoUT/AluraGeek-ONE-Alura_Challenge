import { contenidoDropBoxArea, esFormatoValido } from "../agregarProducto.js";

//Creando nuevo objeto lector de archivo
const leerArchivo = new FileReader();
/**
 * Genera una vista de la imágen seleccionada por el usuario
 * dentro del dropBoxArea.
 * @param {div} dropBoxArea 
 * @param {File} archivo 
 * @function esFormatoValido()
 * @function esImagenVisible()
 * @function cargarImagen()
 * @function contenidoDropBoxArea()
 */
export const vistaPreviaImagen = (dropBoxArea, archivo) => {
    const imagenValida = esFormatoValido();
    const imagenVisible = esImagenVisible(dropBoxArea);
    if (imagenValida) {
        leerArchivo.onload = () => {
            cargarImagen(dropBoxArea);
            /**
             * Desactivamos el evento resize para evitar que
             * la imágen desaparezca al cambiar el ancho de la
             * ventana.
             */
            window.removeEventListener("resize", contenidoDropBoxArea);
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
        alert("El formato ingresado no es admitido, sólo (.jpeg .jpg y .png), intente nuevamente.");
    }
}

/**
 * Obtiene la información de la imágen en Base64, y la
 * asigna en la propiedad src de la imágen de vista previa 
 * creada por una URL.
 * @param {div} dropBoxArea 
 */
const cargarImagen = (dropBoxArea) => {
    //Asignando dirección URL del archivo del usuario en variable.
    /**CONTEMPLAT VALOR A FUTURO */
    const archivoUrl = leerArchivo.result;
    /**
     * Creando un tag HTML de tipo imágen, asignandole la URL obtenida
     * en el atributo src.
     */
    const imgView = `<img src="${archivoUrl}" class="agregar-producto__usuarioImagen" alt="Su imágen">`;
    //Agregando el tag dentro del div
    dropBoxArea.innerHTML = imgView;
    /**
     * Para evitar que la vista previa desaparezca se desactiva el
     * evento resize que trae de vuelta el icono y el mensaje inicial dentro del dropbox
     */

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

