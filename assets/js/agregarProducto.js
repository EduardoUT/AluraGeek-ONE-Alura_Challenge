import dragAndDropBox from "./formularios/arrastrarSoltarImagen.js";

(() => {
    const precio = document.getElementById("precioProducto");
    dragAndDropBox();
    const checkPrecio = (event) => {
        let valorIngresado = event.target.value;
        let valorFinal = "";
        for (let i = 0; i <= valorIngresado.length; i++) {
            if (valorIngresado[0] == 0) {
                valorFinal += "";
            } else {
                valorFinal = valorIngresado;
            }
        }
        precio.value = valorFinal;
    }
    precio.addEventListener("keyup", checkPrecio);
})();