export const rutaRelativaCabeceraRodapie = () => {
    const rutaActual = window.location.href;
    const archivoIndex = "index.html";
    const rutaRaizOnline = "";
    const directorioVentanas = "/ventanas/";
    const directorioMensajes = "/ventanas/mensajes/";
    const listaRutas = ["./", "../", "../../"];
    if ((rutaActual.includes(archivoIndex) || rutaActual.includes(rutaRaizOnline)) && !rutaActual.includes(directorioVentanas)) {
        return listaRutas[0];
    } else if (rutaActual.includes(directorioVentanas) && !rutaActual.includes(directorioMensajes)) {
        return listaRutas[1];
    } else if (rutaActual.includes(directorioMensajes)) {
        return listaRutas[2];
    } else {
        return;
    }
}

export default rutaRelativaCabeceraRodapie;

