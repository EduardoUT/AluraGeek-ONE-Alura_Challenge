import { productServices, obtenerDatoArrayProducto } from "../service/product-service.js";
import { categoriasUnicas, incluyeCategoria } from "./categoriasUnicas.js";

const listaResultados = document.querySelector("[data-productos-resultados]");
const encabezadoResultados = document.querySelector("[data-productos-encabezdo-resultado]");
const titulo = document.querySelector("title");

const infoProductos = async (filtro) => {
    filtro.forEach(({ id_producto, nombre_producto, precio_producto, imagen_producto }) => {
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
            listaResultados.innerHTML += contenidoLocal;
        } else {
            const contenidoServidor = `
                <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                    <div class="productos__imagen" style="background: url('${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
                    <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
                    <p class="productos__precio parrafo" tabindex="0">${precio_producto}</p>
                    <a class="productos__link link" href="./productos_detalles.html?id=${id_producto}" title="Ver más detalles" tabindex="0">Ver Producto</a>
                </div>
            `;
            listaResultados.innerHTML += contenidoServidor;
        }
    });
}

const obtenerResultados = async () => {
    productServices.listaProductos()
        .then(async (alura_geek_productos) => {
            const listaCategorias = categoriasUnicas(alura_geek_productos);
            const url = new URL(window.location);
            const nombreProducto = url.searchParams.get("nombre_like");
            const categoriaProducto = url.searchParams.get("categoria_like");
            const esUnValorCategoria = incluyeCategoria(listaCategorias, categoriaProducto);
            if (esUnValorCategoria) {
                if (categoriaProducto == null) {
                    window.location.href = "./mensajes/error.html";
                }
                try {
                    const filtroCategoria = await productServices.buscarCategoriaProducto(categoriaProducto);
                    const datoArrayCategoria = obtenerDatoArrayProducto(filtroCategoria);
                    if (datoArrayCategoria.length != 0) {
                        titulo.textContent = "Alura Geek | " + categoriaProducto;
                        encabezadoResultados.textContent = "Resultados Búsqueda: " + categoriaProducto;
                        infoProductos(datoArrayCategoria);
                    } else {
                        return;
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const filtroNombre = await productServices.buscarNombreProducto(nombreProducto);
                    const datoArrayNombre = obtenerDatoArrayProducto(filtroNombre);
                    if (datoArrayNombre.length != 0) {
                        titulo.textContent = "Alura Geek | " + nombreProducto;
                        encabezadoResultados.textContent = "Resultados Búsqueda: " + nombreProducto;
                        infoProductos(datoArrayNombre);
                    } else {
                        Swal.fire({
                            icon: "info",
                            title: "Producto o Categoría no encontrados. &#128561;",
                            text: "Lo sentimos, no se encontro ningún resultado.",
                            allowOutsideClick: false
                        }).then((respuesta) => {
                            if (respuesta.isConfirmed) {
                                window.history.back();
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })
        .catch((error) => console.log(error));
}

obtenerResultados();