import { productServices } from "../service/product-service.js";
import { categoriasUnicas } from "./categoriasUnicas.js";

const elementoMain = document.querySelector("[data-categorias]");

const crearSeccionCategoria = (categoriaUnica) => {
    const seccion = document.createElement("section");
    seccion.setAttribute("class", "productos container");

    const contenidoSeccionCategoria = `
        <header class="productos__categoria">
            <h2 class="titulo">${categoriaUnica}</h2>
            <a class="productos__linkCategoria link link--categoria" href="./ventanas/productos_categoria.html?categoria=${categoriaUnica}"
                title="Ver todos los productos de Star Wars" tabindex="0">
                Ver todo
                <div class="productos__link--flecha"></div>
            </a>
        </header>
        <div class="productos__detalles" data-productos></div>
    `;
    seccion.innerHTML = contenidoSeccionCategoria;

    return seccion;
}

const exhibirProductosLocales = (id_producto, nombre_producto, precio_producto, imagen_producto) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('./assets/img/productos/${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio_producto}</p>
            <a class="productos__link link" href="./ventanas/productos_detalles.html?id=${id_producto}" title="Ver más detalles" tabindex="0" data-link-detalles>Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const exhibirProductosServidor = (id_producto, nombre_producto, precio_producto, imagen_producto) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio_producto}</p>
            <a class="productos__link link" href="./ventanas/productos_detalles.html?id=${id_producto}" title="Ver más detalles" tabindex="0" data-link-detalles>Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const filtrarProductosExcedentes = (listaProductos, contadorProductos) => {
    //Si son más de 6 productos se asigna display: none, para no romper la visualización.
    if (contadorProductos - 1 > 5) {
        listaProductos.children[contadorProductos - 1].setAttribute("style", "display: none");
    }
}

const crearListaProductos = ({ alura_geek_productos }, categoriaUnica, seccion) => {
    const listaProductos = seccion.querySelector("[data-productos]");
    let contadorProductos = 0;
    alura_geek_productos.forEach(({ id_producto, nombre_producto, categoria_producto, precio_producto, imagen_producto }) => {
        if (categoriaUnica.includes(categoria_producto)) {
            const rangoId = (id_producto <= 18);
            if (rangoId) {
                const contenidoProductosLocales = exhibirProductosLocales(id_producto, nombre_producto, precio_producto, imagen_producto);
                listaProductos.innerHTML += contenidoProductosLocales;
            } else {
                const contenidoProductosServidor = exhibirProductosServidor(id_producto, nombre_producto, precio_producto, imagen_producto);
                listaProductos.innerHTML += contenidoProductosServidor;
            }
            contadorProductos++;
            filtrarProductosExcedentes(listaProductos, contadorProductos);
        }
    });

    return listaProductos;
}

productServices.listaProductos()
    .then((productos) => {
        //Filtrando las categorias repetidas en un arreglo.
        const listaCategorias = categoriasUnicas(productos);
        listaCategorias.forEach((categoria) => {
            /**
             * Creando secciones por categoria y asignando el nombre_producto
       _producto      * de la categoría al encabezado y links de referencia a la página de categoría
             * correspondiente.
             */
            const nuevaSeccion = crearSeccionCategoria(categoria);
            elementoMain.appendChild(nuevaSeccion);
            //Asignando la lista de productos a su sección correspondiente.
            const nuevaListaProductos = crearListaProductos(productos, categoria, nuevaSeccion);
            nuevaSeccion.appendChild(nuevaListaProductos);
        });
    })
    .catch((error) => console.log(error));