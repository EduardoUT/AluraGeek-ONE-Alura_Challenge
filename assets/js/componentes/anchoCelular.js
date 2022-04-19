const anchoCelular = () => {
    const minWidth = 0;
    const maxWidth = 767;
    const anchoActual = window.innerWidth;
    const anchoValido = ((anchoActual >= minWidth) && (anchoActual <= maxWidth));
    if (anchoValido) {
        return anchoValido;
    } else {
        return anchoValido;
    }
}

export default anchoCelular;