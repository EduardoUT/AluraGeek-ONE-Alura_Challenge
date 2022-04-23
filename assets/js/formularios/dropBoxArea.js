import mediaQueryCelular from "../componentes/mediaQuery.js";
import vistaPreviaImagen, { limpiarValorImagen } from "./vistaPreviaImagen.js";

const dropBoxArea = document.querySelector("[data-dropbox-area]"),
    textoInfo = dropBoxArea.querySelector("[data-dropbox-info]"),
    inputFile = dropBoxArea.querySelector("[data-dropbox-campo]");
const btnBuscarArchivo = document.querySelector("[data-dropbox-btn]");
let archivo;

//Si la página se carga o recarga se limpia el archivo.
limpiarValorImagen(inputFile);

const clickInputFile = () => {
    inputFile.click();
}

/**
 * Función encargada de modificar la visualización
 * del contenido del dropBoxArea con las instrucciones y icono
 * según corresponda el tamaño del dispositivo.
 */
export const contenidoDropBoxArea = () => {
    const anchoCelular = mediaQueryCelular();
    if (anchoCelular) {
        const contenidoDropBoxCelular = `
                <div class="agregar-producto__imagen imagen--add"></div>
                <p class="agregar-producto__texto parrafo" data-info>Agregar imágen para
                    el producto</p>
                <input class="agregar-producto__archivo" type="file" id="archivoImagen" required data-campo>`;
        dropBoxArea.innerHTML = contenidoDropBoxCelular;
        dropBoxArea.addEventListener("click", clickInputFile);
    } else {
        const contenidoDropBoxEscritorio = `
                <div class="agregar-producto__imagen imagen--photo"></div>
                <p class="agregar-producto__texto parrafo" data-info>Arrastre para agregar una imagen para el
                    producto.</p>
                <input class="agregar-producto__archivo" type="file" id="archivoImagen" required data-campo>`;
        dropBoxArea.innerHTML = contenidoDropBoxEscritorio;
        dropBoxArea.removeEventListener("click", clickInputFile);
    }
}

/**
 * Agregando clase CSS para que el borde sea solido y
 * modificando texto dentro del dropBoxArea. 
 * @param {dragover} event 
 */
const arrastrarArchivoSobre = (event) => {
    //Evita que al arrastrar un archivo se abra nueva ventana.
    event.preventDefault();
    dropBoxArea.classList.add("dropbox--activo");
    textoInfo.textContent = "Suelte aquí su imágen.";
}

/**
 * Removiendo clase CSS para que el borde sea solido y
 * modificando texto dentro del dropBoxArea.
 */
const arrastrarArchivoFuera = () => {
    dropBoxArea.classList.remove("dropbox--activo");
    textoInfo.textContent = "Arrastre para agregar una imágen para el producto."
}

/**
 * Capturando el archivo seleccionado por el usuario,
 * valor files[0] significa que si el usuario selecciona
 * más de un archivo sólo se seleccionará el
 * primero.
 * @param {drop} event
 * @function vistaPreviaImagen() 
 */
const soltarArchivo = (event) => {
    //Evita que al arrastrar un archivo se abra nueva ventana.
    event.preventDefault();
    /**
     * Capturando el archivo seleccionado por el usuario,
     * valor files[0] significa que si el usuario selecciona
     * más de un archivo sólo se seleccionará el
     * primero.
     */
    archivo = event.dataTransfer.files[0];
    vistaPreviaImagen(dropBoxArea, archivo);
    //console.log(archivo);
    //capturarValorImagen(inputFile);
}

/**
 * Permite validar si el archivo ingresado por el 
 * usuario corresponde a los formatos de imágen solicitados.
 * @returns boolean
 */
export const esFormatoValido = () => {
    const tipoArchivo = archivo.type;
    const extensionesValidas = ["image/jpeg", "image/jpg", "image/png"];
    const formatoValido = extensionesValidas.includes(tipoArchivo);
    return formatoValido;
}

/**
 * Función asociada al evento change del inputFile, cuando
 * el usuario cambie de archivo al dar click en el botón de la
 * versión de escritorio el nuevo archivo se captura.
 * @function vistaPreviaImagen()
 */
const capturarCambioArchivo = () => {
    archivo = inputFile.files[0];
    vistaPreviaImagen(dropBoxArea, archivo);
}

dropBoxArea.addEventListener("dragover", arrastrarArchivoSobre);
dropBoxArea.addEventListener("dragleave", arrastrarArchivoFuera);
dropBoxArea.addEventListener("drop", soltarArchivo);
inputFile.addEventListener("change", capturarCambioArchivo);
btnBuscarArchivo.addEventListener("click", clickInputFile);
window.addEventListener("resize", contenidoDropBoxArea);
contenidoDropBoxArea();