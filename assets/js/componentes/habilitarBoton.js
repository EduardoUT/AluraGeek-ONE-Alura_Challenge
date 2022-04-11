const habilitarBtnRodapie = (btnEnviar) => {
    const campoNombre = document.getElementById("nombre");
    const campoMensaje = document.getElementById("mensaje");
    const nombreValido = campoNombre.validity.valid;
    const mensajeValido = campoMensaje.validity.valid;
    const formularioValido = (nombreValido && mensajeValido);
    if (formularioValido) {
        btnEnviar.removeAttribute("disabled");
        btnEnviar.classList.remove("boton--bloqueado");
    } else {
        btnEnviar.setAttribute("disabled", "true");
        btnEnviar.classList.add("boton--bloqueado");
    }
};

export default habilitarBtnRodapie;