import { productServices } from "../service/product-service.js";

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
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "./mensajes/error.html";
    }

    try {
        const productoDetalles = await productServices.detalleProducto(id);
        const existenValores = (productoDetalles.imagen && productoDetalles.nombre &&
            productoDetalles.precio && productoDetalles.categoria && productoDetalles.desc);
        if (existenValores) {
            titleWindow.textContent = "AluraGeek | " + productoDetalles.nombre;
            mostrarImagen(productoDetalles.imagen);
            nombre.textContent = productoDetalles.nombre;
            precio.textContent = "$ " + productoDetalles.precio;
            descripcion.textContent = productoDetalles.desc;
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
            <div class="productos__imagen" style="background: url('../assets/img/productos/${producto.imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${producto.nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">${producto.precio}</p>
            <a class="productos__link link" href="./productos_detalles.html?id=${producto.id}" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const contenidoProductosServidor = (producto) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('${producto.imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${producto.nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">${producto.precio}</p>
            <a class="productos__link link" href="./productos_detalles.html?id=${producto.id}" title="Ver más detalles" tabindex="0">Ver
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
    const rangoId = (producto.id <= 18);
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
    .then((productos) => {
        const lista = generarListaDesordenada(productos);
        for (let i = 0; i < lista.length; i++) {
            for (let j = 0; j < productos.length; j++) {
                const producto = lista[i][j];
                const contadorProductos = j;
                const listaProductosSimilares = crearListaProductosSimilares(producto, contadorProductos);
                seccionSimilares.appendChild(listaProductosSimilares);
            }
        }
    })
    .catch((error) => console.log(error));

obtenerDetallesProducto();