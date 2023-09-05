import {
    productServices, obtenerDatoArrayProducto,
    obtenerIdentificadorProductoUrl, comprobarValoresVacios
} from "../service/product-service.js";

const imagenDetalles = document.querySelector("[data-detalles-imagen]");
const nombre = document.querySelector("[data-detalles-nombre]");
const precio = document.querySelector("[data-detalles-precio]");
const descripcion = document.querySelector("[data-detalles-dsc]");
const titleWindow = document.querySelector("title");
const seccionSimilares = document.querySelector("[data-productos-similares]");

const mostrarImagen = (imagen) => {
    const regexImagenLocal = /^(([a-z\d]+)([-]?[a-z\d]+)+[.](jpeg|jpg|png))$/g;
    const esImagenLocal = regexImagenLocal.test(imagen);
    if (esImagenLocal) {
        imagenDetalles.setAttribute("style", `background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;`);
    } else {
        imagenDetalles.setAttribute("style", `background: url('${imagen}') center / 100% 100% no-repeat;`);
    }
}

const obtenerDetallesProducto = async () => {
    const id = obtenerIdentificadorProductoUrl();
    if (id == null) {
        window.location.href = "./mensajes/error.html";
    }

    try {
        const productoDetalles = await productServices.detalleProducto(id);
        const datoArrayProducto = obtenerDatoArrayProducto(productoDetalles);
        const existenValores = comprobarValoresVacios(datoArrayProducto);

        if (existenValores) {
            titleWindow.textContent = "AluraGeek | " + datoArrayProducto[0].nombre_producto;
            mostrarImagen(datoArrayProducto[0].imagen_producto);
            nombre.textContent = datoArrayProducto[0].nombre_producto;
            precio.textContent = "$ " + datoArrayProducto[0].precio_producto;
            descripcion.textContent = datoArrayProducto[0].descripcion_producto;
        } else {
            throw new Error();
        }

    } catch (error) {
        console.log(error);
    }

}

const generarProductoAleatorio = (productos) => {
    const producto = productos.sort(() => { return Math.random() - 0.5 });
    return producto;
}

const generarListaDesordenada = (productos) => {
    const listaDesordenada = [];
    productos.forEach((producto) => {
        const productoAleatorio = generarProductoAleatorio(productos);
        if (!listaDesordenada.includes(productoAleatorio) && !listaDesordenada.includes(productos.indexOf(producto))) {
            listaDesordenada.push(productoAleatorio);
        }
    });

    return listaDesordenada;
}

const contenidoProductosLocales = (producto) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('../assets/img/productos/${producto.imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${producto.nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">${producto.precio_producto}</p>
            <a class="productos__link link" href="./productos_detalles.html?id=${producto.id_producto}" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const contenidoProductosServidor = (producto) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('${producto.imagen_producto}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${producto.nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">${producto.precio_producto}</p>
            <a class="productos__link link" href="./productos_detalles.html?id=${producto.id_producto}" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const filtrarProductosExcedentes = (productosContainer, contadorProductos) => {
    if (contadorProductos > 5) {
        productosContainer.children[contadorProductos].setAttribute("style", "display: none;");
    }
}

const crearListaProductosSimilares = (producto, contadorProductos) => {
    const productosContainer = document.querySelector("[data-productos]");
    const rangoId = (producto.id_producto <= 18);
    if (rangoId) {
        const productosLocal = contenidoProductosLocales(producto);
        productosContainer.innerHTML += productosLocal;
    } else {
        const productosServidor = contenidoProductosServidor(producto);
        productosContainer.innerHTML += productosServidor;
    }
    filtrarProductosExcedentes(productosContainer, contadorProductos);
    return productosContainer;
}

productServices.listaProductos()
    .then(({ alura_geek_productos }) => {
        const lista = generarListaDesordenada(alura_geek_productos);
        console.log("LOL: ", lista);
        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < alura_geek_productos.length; j++) {
                const producto = lista[i][j];
                const contadorProductos = j;
                const listaProductosSimilares = crearListaProductosSimilares(producto, contadorProductos);
                seccionSimilares.appendChild(listaProductosSimilares);
            }
        }
    })
    .catch((error) => console.log(error));

obtenerDetallesProducto();