import mediaQueryCelular from "../componentes/mediaQuery.js";

const dragAndDropBox = () => {
    //Selectores para dropBox área.
    const dropBox = document.querySelector("[data-dropBox]"),
        textoInfo = dropBox.querySelector("[data-info]"),
        inputFile = dropBox.querySelector("[data-campo]");
    //Botón fuera del área dropBox
    const botonBuscarArchivo = document.querySelector(".agregar-producto__boton");
    const formularioAgregarProducto = document.getElementById("agregarProducto");
    let archivo;
    let inputValido = false;
    inputFile.value = "";

    const clickInputFile = () => {
        inputFile.click();
    }

    /**
     * arrastrarSobre, permite saber si un elemento es arrastrado sobre 
     * la zona definida.
    */
    const arrastrarSobre = (event) => {
        //Evitando que al arrastrar y soltar la imágen se abra en una nueva ventana.
        event.preventDefault();
        //Agregando clase CSS para que el borde sea solido en la dropBox.
        dropBox.classList.add("dropbox--activo");
        textoInfo.textContent = "Suelte aquí su imagen.";
    }

    /**
     * arrastrarFuera, permite saber si un elemento es arrastrado sobre la zona
     * definida.
     */
    const arrastrarFuera = () => {
        //Removiendo clase CSS para que el borde sea solido en la dropBox.
        dropBox.classList.remove("dropbox--activo");
        textoInfo.textContent = "Arrastre para agregar una imagen para el producto.";
    }


    //soltar, cuando el usuario suelta el archivo dentro del dropBox
    const soltarArchivo = (event) => {

        //Evitando que al soltar la imágen se abra en una nueva ventana.
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
        if (formatoValido()) {
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
                dropBox.innerHTML = imgView; //Agregando el tag dentro del div
                /**
                 * Para evitar que la vista previa desaparezca se desactiva el
                 * evento resize que trae de vuelta el icono y el mensaje inicial dentro del dropbox
                 * */
                window.removeEventListener("resize", contenidoDropBox);
            }
            leerArchivo.readAsDataURL(archivo); //Leyendo información de archivo en Base64
        } else {
            /**
             * Si se carga una imágen correcta antes, y posteriormente 
             * se intenta ingresar un archivo que no corresponda al solicitado, se limpia
             * la vista previa y se trae el contenido inicial con contenidoDropBox, para que
             * no quede en blanco después de borrar la vista previa.
             */
            if (dropBox.innerHTML.includes("img")) {
                const img = document.querySelector(".agregar-producto__usuarioImagen");
                img.remove();
                contenidoDropBox();
            }

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

    const formatoValido = () => {
        const tipoArchivo = archivo.type;
        const extensionesValidas = ["image/jpeg", "image/jpg", "image/png"];
        const archivoValido = extensionesValidas.includes(tipoArchivo);
        if (archivoValido) {
            return archivoValido;
        } else {
            return archivoValido;
        }
    }

    /**Aquí cargamos dinámicamente el contenido del dropbox dependiendo
     * del tamaño del dispositvo.
     */
    const contenidoDropBox = () => {
        if (mediaQueryCelular()) {
            const contenidoDropBoxCelular = `
                <div class="agregar-producto__imagen imagen--add"></div>
                <p class="agregar-producto__texto parrafo" data-info>Agregar imágen para
                    el producto</p>
                <input class="agregar-producto__archivo" type="file" id="archivoImagen" required data-campo>`;
            dropBox.innerHTML = contenidoDropBoxCelular;
        } else {
            const contenidoDropBoxEscritorio = `
                <div class="agregar-producto__imagen imagen--photo"></div>
                <p class="agregar-producto__texto parrafo" data-info>Arrastre para agregar una imagen para el
                    producto.</p>
                <input class="agregar-producto__archivo" type="file" id="archivoImagen" required data-campo>`;
            dropBox.innerHTML = contenidoDropBoxEscritorio;
        }
    }

    /**Aquí habilitamos el evento click en el dropbox sólo para dispositivos móviles. */
    const clickOnDropBox = () => {
        if (mediaQueryCelular()) {
            dropBox.addEventListener("click", clickInputFile);
        } else {
            dropBox.removeEventListener("click", clickInputFile);
        }
    }
    const habilitarBotonProductos = (input) => {
        const btnEnviar = document.querySelector("#btn");
        const campoNombreProducto = document.getElementById("nombreProducto");
        const campoPrecioProducto = document.getElementById("precioProducto");
        const campoDscProducto = document.getElementById("descProducto");
        const campoNombreProductoValido = campoNombreProducto.validity.valid;
        const campoPrecioProductoValido = campoPrecioProducto.validity.valid;
        const campoDscProductoValido = campoDscProducto.validity.valid;
        const formularioAgregarProductoValido = (input && campoNombreProductoValido &&
            campoPrecioProductoValido && campoDscProductoValido);
        if (formularioAgregarProductoValido) {
            btnEnviar.removeAttribute("disabled");
            btnEnviar.classList.remove("boton--bloqueado");
        } else {
            btnEnviar.setAttribute("disabled", "true");
            btnEnviar.classList.add("boton--bloqueado");
        }
    }

    const validarBtnProducto = (event) => {
        const element = event.target;
        if (element && element.tagName == 'INPUT') {
            habilitarBotonProductos(inputValido);
        } else if (element && element.tagName == 'TEXTAREA') {
            habilitarBotonProductos(inputValido);
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
    dropBox.addEventListener("dragover", arrastrarSobre);
    dropBox.addEventListener("dragleave", arrastrarFuera);
    dropBox.addEventListener("drop", soltarArchivo);
    window.addEventListener("resize", clickOnDropBox);
    window.addEventListener("resize", contenidoDropBox);
    formularioAgregarProducto.addEventListener("keyup", validarBtnProducto);
    botonBuscarArchivo.addEventListener("click", clickInputFile);
    habilitarBotonProductos(inputValido);
    clickOnDropBox();
    contenidoDropBox();
}

export default dragAndDropBox;