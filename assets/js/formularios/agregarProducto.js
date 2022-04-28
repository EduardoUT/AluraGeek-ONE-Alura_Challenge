import mediaQueryCelular from "../componentes/mediaQuery.js";
import vistaPreviaImagenDropBoxArea, { limpiarValorImagen } from "./vistaPreviaImagen.js";

const dropBoxArea = document.querySelector("[data-dropbox-area]"),
    textoInfo = dropBoxArea.querySelector("[data-dropbox-info]"),
    inputFile = dropBoxArea.querySelector("[data-dropbox-campo]");
const btnBuscarArchivo = document.querySelector("[data-dropbox-btn]");
export const precio = document.querySelector("[data-campo=precio]");
const opcionDefault = document.querySelector("[data-select-option=default]");
const btnEnviar = document.getElementById("agregarProducto");
let archivo;

//Si la página se carga o recarga se limpia el archivo.
limpiarValorImagen(inputFile);

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
 * Se propaga el evento click al input de tipo file visiblemente
 * oculto con CSS, se habilita en el botón "Busque en su computador" en
 * la versión de escritorio y en el dropBoxArea en la versión celular.
 * @param {click} event 
 */
 export const clickInputFile = (event) => {
    //Evitando que se recargue la página al hacer click.
    event.preventDefault();
    inputFile.click();
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
    vistaPreviaImagenDropBoxArea(dropBoxArea, archivo);
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
const capturarCambioArchivo = (event) => {
    event.preventDefault();
    archivo = event.target.files[0];
    vistaPreviaImagenDropBoxArea(dropBoxArea, archivo)
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

dropBoxArea.addEventListener("dragover", arrastrarArchivoSobre);
dropBoxArea.addEventListener("dragleave", arrastrarArchivoFuera);
dropBoxArea.addEventListener("drop", soltarArchivo);
inputFile.addEventListener("change", capturarCambioArchivo);
btnBuscarArchivo.addEventListener("click", clickInputFile);
window.addEventListener("resize", contenidoDropBoxArea);
contenidoDropBoxArea();
precio.addEventListener("keyup", validarPrecioIngresado);
seleccionarOpcionDefault(opcionDefault);