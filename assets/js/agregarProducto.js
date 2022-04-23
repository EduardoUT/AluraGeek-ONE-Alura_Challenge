const precio = document.getElementById("precioProducto");
const btnEnviar = document.getElementById("agregarProducto");
/**
 * Función asociada a evento keyup del campo precio,
 * al escribir evita que el usuario ingrese primero un 0.
 * @param {keyup} event 
 */
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