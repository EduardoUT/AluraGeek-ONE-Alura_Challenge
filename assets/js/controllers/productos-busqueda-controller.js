import { productServices } from "../service/product-service.js";

const obtenerResultados = async () => {
    const url = new URL(window.location);
    const nombreProducto = url.searchParams.get("nombre_like");
    if (nombreProducto == null) {
        window.location.href = "/ventanas/mensajes/error.html";
    }

    try {
        const filtroNombre = await productServices.nombreProducto(nombreProducto);
        console.log(filtroNombre);
    } catch (error) {
        
    }
}

obtenerResultados();