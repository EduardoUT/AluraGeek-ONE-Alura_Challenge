import mediaQueryCelular from "../componentes/mediaQuery.js";

const dragAndDropBox = () => {
    //Selectores para dropBox área.
    const dropBox = document.querySelector("[data-dropBox]"),
        textoInfo = dropBox.querySelector("[data-info]"),
        inputFile = dropBox.querySelector("[data-campo]");
    /**Botón fuera del área dropBox **/
    const botonBuscarArchivo = document.querySelector(".agregar-producto__boton");
    const btnEnviar = document.querySelector("#btn");

    let archivo;
    let inputValido = false;
    inputFile.value = "";

    btnEnviar.addEventListener("click", (event) => {
        event.preventDefault();
        //console.log("LOL" + habilitarBotonProductos(inputValido));
    });
    const clickInput = () => {
        inputFile.click();
    }
    /* 
    const clickButtonHidden = () => {
    *
     * Evento click:
     * Se ejecutará un click() función que a su vez
     * contendrá dentro un click correspondiente al input de tipo file.
    
    buttonHidden.click(buttonHidden.addEventListener("click", clickInput));
    } */

    /**
    * Evento click:
    * Cuando el usuario pulse el botón, se propagará el evento 
    * al inputFile.
    */
    /**
  * arrastrarSobre, permite saber si un
  * elemento es arrastrado sobre la zona
  * definida.
  */
    const arrastrarSobre = (event) => {
        /**
         * Evitando que al arrastrar y soltar la imágen
         * se abra en una nueva ventana.
         */
        event.preventDefault();
        //Agregando clase CSS para que el borde sea solido en la dropBox.
        dropBox.classList.add("dropbox--activo");
        textoInfo.textContent = "Suelte aquí su imagen.";
    }

    /**
     * arrastrarFuera, permite saber si un
     * elemento es arrastrado sobre la zona
     * definida.
     */
    const arrastrarFuera = () => {
        //Removiendo clase CSS para que el borde sea solido en la dropBox.
        dropBox.classList.remove("dropbox--activo");
        textoInfo.textContent = "Arrastre para agregar una imagen para el producto.";
    }

    /**
     * soltar, cuando el usuario suelta el
     * archivo dentro del dropBox
     */
    const soltarArchivo = (event) => {
        /**
         * Evitando que al soltar la imágen
         * se abra en una nueva ventana.
         */
        event.preventDefault();
        /**
         * Capturando el archivo seleccionado por el usuario,
         * valor files[0] significa que si el usuario selecciona
         * más de un archivo sólo se seleccionará el
         * primero.
         */
        archivo = event.dataTransfer.files[0];

        vistaPreviaImagen();
    }

    const vistaPreviaImagen = () => {
        /**Llamar función para habilitar botón aquí y reciba 
         * como parámetro el contenido de inputFile.validity 
         * que a partir de este momento será false
         * const inputvalido = true;
         * habilitarBotonProductos(inputValido);
         * 
         * inputValido <- Posible nombre de variable que almacenará el validity state.
         */
        const tipoArchivo = archivo.type;
        /**
         * Añadir esta validación
         * en función de validaciones.
         */
        const extensionesValidas = ["image/jpeg", "image/jpg", "image/png"];
        if (extensionesValidas.includes(tipoArchivo)) {
            inputValido = true;
            habilitarBotonProductos(inputValido);
            const leerArchivo = new FileReader(); //Creando un nuevo objeto lector de archivo
            leerArchivo.onload = () => {
                const archivoUrl = leerArchivo.result; //Asignando dirección URL del archivo del usuario en variable.
                /**
                 * Creando un tag HTML de tipo imágen, asignandole la URL obtenida
                 * en el atributo src.
                 */
                const imgView = `<img src="${archivoUrl}" class="agregar-producto__usuarioImagen" alt="Su imágen">`;
                dropBox.innerHTML = imgView; /**Agregando el tag dentro de la zona */
            }
            leerArchivo.readAsDataURL(archivo); /**Leyendo información de archivo en Base64 */
        } else {
            alert("El formato ingresado no es admitido, sólo (.jpeg .jpg y .png), intente nuevamente.");
        }
    }

    inputFile.addEventListener("change", function () {
        /**
         * Capturando el archivo seleccionado por el usuario,
         * valor files[0] significa que si el usuario selecciona
         * más de un archivo sólo se seleccionará el
         * primero.
         */
        archivo = this.files[0];
        vistaPreviaImagen();
    });

    const habilitarBotonProductos = (input) => {
        console.log(input);
        if (input) {
            btnEnviar.removeAttribute("disabled");
            btnEnviar.classList.remove("boton--bloqueado");
        } else {
            btnEnviar.setAttribute("disabled", "true");
            btnEnviar.classList.add("boton--bloqueado");
        }
        return input;
    }

    const contenidoDropBox = () => {
        const icono = document.querySelector(".agregar-producto__imagen");
        const textInfo = document.querySelector("[data-info]");
        if (mediaQueryCelular()) {
            icono.classList.remove("imagen--photo");
            icono.classList.add("imagen--add");
            textInfo.textContent = "Agregar una imágen para el producto.";
        } else {
            icono.classList.remove("imagen--add");
            icono.classList.add("imagen--photo");
            textInfo.textContent = "Arrastre para agregar una imágen para el producto.";
        }
    }

    /**
     * Eventos en zona dropBox.
     * click: Al hacer click se abrirá el administrador de archivos del usuario (Útil para versión móvil).
     * dragover: Al arrastrar el archivo sobre la zona la línea punteada 
     * del borde se hace lisa, el texto cambia.
     * dragleave: Al arrastrar el archivo fuera de la zona la línea punteada
     * vuelve en el borde y el texto vuelve a su estado original.
     * drop: Al soltar el archivo en la zona se carga una vista previa en 
     * la misma zona.
    */
    window.addEventListener("resize", contenidoDropBox);
    dropBox.addEventListener("click", clickInput);
    dropBox.addEventListener("dragover", arrastrarSobre);
    dropBox.addEventListener("dragleave", arrastrarFuera);
    dropBox.addEventListener("drop", soltarArchivo);
    botonBuscarArchivo.addEventListener("click", clickInput);
    habilitarBotonProductos(inputValido);
    contenidoDropBox();
}

export default dragAndDropBox;