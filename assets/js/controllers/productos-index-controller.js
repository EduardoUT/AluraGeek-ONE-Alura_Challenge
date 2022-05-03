import { productServices } from "../service/product-service.js";

const categorias = document.querySelector("[data-categorias]");
const categoriasExistentes = [];

const crearSeccionCategoria = (categoriaExistente, data) => {
    const seccion = document.createElement("section");
    seccion.setAttribute("class", "productos container");

    const contenidoSeccionCategoria = `
        <header class="productos__categoria">
            <h2 class="titulo">${categoriaExistente}</h2>
            <a class="productos__linkCategoria link link--categoria" href="./ventanas/productos_existentes.html"
                title="Ver todos los productos de Star Wars" tabindex="0">
                Ver todo
                <div class="productos__link--flecha"></div>
            </a>
        </header>
        <div class="productos__detalles"></div>
    `;
    seccion.innerHTML = contenidoSeccionCategoria;

    const productosCategoria = seccion.querySelector(".productos__detalles");

    data.forEach(({ id, imagen, nombre, precio, categoria }) => {
        if (categoriaExistente.includes(categoria)) {
            const rangoId = (id <= 18);
            if (rangoId) {
                const contenidoProductos = crearSeccionProductosLocales(id, imagen, nombre, precio);
                productosCategoria.innerHTML += contenidoProductos;
            } else {
                const contenidoProductos = crearSeccionProductosServidor(id, imagen, nombre, precio);
                productosCategoria.innerHTML += contenidoProductos;
            }
        }
    });

    return seccion;
}

const crearSeccionProductosLocales = (id, imagen, nombre, precio) => {
    const contenidoSeccionCategoria = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('./assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
            <a class="productos__link link" href="#" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenidoSeccionCategoria;
}

const crearSeccionProductosServidor = (id, imagen, nombre, precio) => {
    const contenidoSeccionCategoria = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
            <a class="productos__link link" href="#" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenidoSeccionCategoria;
}

productServices.listaProductos()
    .then((data) => {
        /**
         * Filtrando las categorias existentes y almacenandolas
         * en un arreglo.
         */
        data.forEach(({ categoria }) => {
            if (!categoriasExistentes.includes(categoria)) {
                categoriasExistentes.push(categoria);
            }
        });

        /**
         * Creando elementos section acorde a las 
         * categorias filtradas y asignando el valor a los 
         * encabezados.
         */
        categoriasExistentes.forEach((categoriaExistente) => {
            const nuevaSeccion = crearSeccionCategoria(categoriaExistente, data);
            categorias.appendChild(nuevaSeccion);
        });
    })
    .catch((error) => console.log(error));