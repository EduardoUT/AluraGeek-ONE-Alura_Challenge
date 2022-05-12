import { productServices } from "../service/product-service.js";

const listaResultados = document.querySelector("[data-productos-resultados]");

const infoProductos = async (filtroNombre) => {
    filtroNombre.forEach(({ id, imagen, nombre, precio }) => {
        const rangoId = (id <= 18);
        if (rangoId) {
            const contenidoLocal = `
            <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                <div class="productos__imagen" style="background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
                <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
                <p class="productos__precio parrafo" tabindex="0">${precio}</p>
                <a class="productos__link link" href="/ventanas/productos_detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver Producto</a>
            </div>
            `;
            listaResultados.innerHTML += contenidoLocal;
        } else {
            const contenidoServidor = `
                <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                    <div class="productos__imagen" style="background: url('${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
                    <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
                    <p class="productos__precio parrafo" tabindex="0">${precio}</p>
                    <a class="productos__link link" href="/ventanas/productos_detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver Producto</a>
                </div>
            `;
            listaResultados.innerHTML += contenidoServidor;
        }
    });
}

const obtenerResultados = async () => {
    const url = new URL(window.location);
    const nombreProducto = url.searchParams.get("nombre_like");
    if (nombreProducto == null) {
        window.location.href = "/ventanas/mensajes/error.html";
    }

    try {
        const filtroNombre = await productServices.nombreProducto(nombreProducto);
        if (filtroNombre.length != 0) {
            infoProductos(filtroNombre);
        } else {
            Swal.fire({
                icon: "info",
                title: "Producto no encontrado. :(",
                text: "Lo sentimos, no se encontro ningún resultado.",
                allowOutsideClick: false
            }).then((respuesta) => {
                if (respuesta.isConfirmed) {
                    window.history.back();
                }
            })
        }
    } catch (error) {

    }
}

obtenerResultados();