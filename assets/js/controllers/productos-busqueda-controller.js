import { productServices } from "../service/product-service.js";
import { categoriasUnicas, incluyeCategoria } from "./categoriasUnicas.js";

const listaResultados = document.querySelector("[data-productos-resultados]");
const encabezadoResultados = document.querySelector("[data-productos-encabezdo-resultado]");
const titulo = document.querySelector("title");

const infoProductos = async (filtro) => {
    filtro.forEach(({ id, imagen, nombre, precio }) => {
        const rangoId = (id <= 18);
        if (rangoId) {
            const contenidoLocal = `
            <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                <div class="productos__imagen" style="background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
                <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
                <p class="productos__precio parrafo" tabindex="0">${precio}</p>
                <a class="productos__link link" href="./productos_detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver Producto</a>
            </div>
            `;
            listaResultados.innerHTML += contenidoLocal;
        } else {
            const contenidoServidor = `
                <div class="productos__producto" style="display: flex; flex-direction: column; width: inherit;">
                    <div class="productos__imagen" style="background: url('${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
                    <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
                    <p class="productos__precio parrafo" tabindex="0">${precio}</p>
                    <a class="productos__link link" href="./productos_detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver Producto</a>
                </div>
            `;
            listaResultados.innerHTML += contenidoServidor;
        }
    });
}

const obtenerResultados = async () => {
    productServices.listaProductos()
        .then(async (productos) => {
            const listaCategorias = categoriasUnicas(productos);
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
                    if (filtroCategoria.length != 0) {
                        titulo.textContent = "Alura Geek | " + categoriaProducto;
                        encabezadoResultados.textContent = "Resultados Búsqueda: " + categoriaProducto;
                        infoProductos(filtroCategoria);
                    } else {
                        return;
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const filtroNombre = await productServices.buscarNombreProducto(nombreProducto);
                    if (filtroNombre.length != 0) {
                        titulo.textContent = "Alura Geek | " + nombreProducto;
                        encabezadoResultados.textContent = "Resultados Búsqueda: " + nombreProducto;
                        infoProductos(filtroNombre);
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