/**
 * Función útil al implementarse en funciones con condiciones lógicas
 * que permitan modificar el contenido de la página que no sean
 * posibles de modificar con CSS p.ej.
 * 
 * if (mediaQueryCelular()) {código a ejecutar para celulares} else {código a ejecutarse fuera del rango}
 * @returns {boolean} Si el resultado es true, el contenido cambiara para
 * dispositivos móviles entre 0px a 767px.
 */
const mediaQueryCelular = () => {
    const mediaQueryCelular = window.matchMedia("(min-width: 0px) and (max-width: 767px)");
    const anchoValido = (mediaQueryCelular.matches);
    return anchoValido;
}

/**
 * Función útil al implementarse en funciones con condiciones lógicas
 * que permitan modificar el contenido de la página que no sean
 * posibles de modificar con CSS p.ej.
 * 
 * if (mediaQueryCelular()) {código a ejecutar para celulares} else {código a ejecutarse fuera del rango}
 * @returns {boolean} Si el resultado es true, el contenido cambiara para
 * dispositivos móviles entre 667px a 1080px cuando estén inclinados horizintalmente.
 */
export const mediaQueryCelularHorizontal = () => {
    const mediaQueryCelular = window.matchMedia("(min-width: 667px) and (max-width: 1080px)");
    const anchoValido = (mediaQueryCelular.matches);
    return anchoValido;
}

export default mediaQueryCelular;