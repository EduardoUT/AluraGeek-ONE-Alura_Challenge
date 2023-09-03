import { productServices, obtenerDatoArrayProducto } from "../service/product-service.js";

const titleWindow = document.querySelector("title");
const categoriaTitulo = document.querySelector("[data-categoria-titulo]");
const listaProductos = document.querySelector("[data-categoria-productos]");

const obtenerProducto = async (datoArrayProducto) => {
    datoArrayProducto.forEach(({ id_producto, nombre_producto, precio_producto, imagen_producto }) => {
        const rangoId = (id_producto <= 18);
        if (rangoId) {
            const contenidoLocal = `
                <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                    <div class="productos__imagen" style="background: url('../assets/img/productos/${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
                    <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
                    <p class="productos__precio parrafo" tabindex="0">${precio_producto}</p>
                    <a class="productos__link link" href="./productos_detalles.html?id=${id_producto}" title="Ver más detalles" tabindex="0">Ver Producto</a>
                </div>
            `;
            listaProductos.innerHTML += contenidoLocal;
        } else {
            const contenidoServidor = `
                <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                    <div class="productos__imagen" style="background: url('${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
                    <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
                    <p class="productos__precio parrafo" tabindex="0">${precio_producto}</p>
                    <a class="productos__link link" href="./productos_detalles.html?id=${id_producto}" title="Ver más detalles" tabindex="0">Ver Producto</a>
                </div>
            `;
            listaProductos.innerHTML += contenidoServidor;
        }
    });
}

const obtenerCategoria = async () => {
    const url = new URL(window.location);
    const categoria = url.searchParams.get("categoria");
    if (categoria == null) {
        window.location.href = "/ventanas/mensajes/error.html";
    }

    titleWindow.textContent = "AluraGeek | " + categoria;
    categoriaTitulo.textContent = categoria;
    try {
        const filtroCategoria = await productServices.detalleCategoria(categoria);
        const datoArrayProducto = obtenerDatoArrayProducto(filtroCategoria);
        obtenerProducto(datoArrayProducto);
    } catch (error) {
        console.log(error);
    }
}

obtenerCategoria();