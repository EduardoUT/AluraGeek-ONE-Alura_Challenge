const precio = document.getElementById("precioProducto");
const btnEnviar = document.getElementById("agregarProducto");

/**
 * Función asociada a evento keyup del campo precio,
 * al escribir evita que el usuario ingrese cifras con precios 0.
 * @param {keyup} event 
 */
const validarPrecioIngresado = (event) => {
    let valorIngresado = event.target.value;
    let valorFinal = "";
    const cifrasInvalidas = ["0000000.00", "000000.00", "00000.00", "0000.00", "000.00", "00.00", "0.00"];
    const esInvalido = cifrasInvalidas.includes(valorIngresado);
    if (esInvalido) {
        valorFinal += "";
    } else {
        valorFinal = valorIngresado;
    }
    precio.value = valorFinal;
}

precio.addEventListener("keyup", validarPrecioIngresado);