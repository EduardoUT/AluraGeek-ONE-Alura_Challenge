import { productServices } from "../service/product-service.js";

const imagenDetalles = document.querySelector("[data-detalles-imagen]");
const nombre = document.querySelector("[data-detalles-nombre]");
const precio = document.querySelector("[data-detalles-precio]");
const descripcion = document.querySelector("[data-detalles-dsc]");
const titleWindow = document.querySelector("title");
const seccionSimilares = document.querySelector("[data-productos-similares]");
const listaDesordenada = [];


const mostrarImagen = (imagen) => {
    const regexImagen = /^(([a-z\d]+)([-]?[a-z\d]+)+[.](jpeg|jpg|png))$/g;
    const esImagenLocal = regexImagen.test(imagen);
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
        window.location.href = "/ventanas/error.html";
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
    productos = productos.sort(() => { return Math.random() - 0.5 });
    return productos;
}

const contenidoProductosLocales = (id, imagen, nombre, precio) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('./assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">${precio}</p>
            <a class="productos__link link" href="./ventanas/detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const contenidoProductosServidor = (id, imagen, nombre, precio) => {
    const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">${precio}</p>
            <a class="productos__link link" href="./ventanas/detalles.html?id=${id}" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
    return contenido;
}

const crearListaProductosSimilares = () => {
    const productosContainer = document.querySelector("[data-productos]");


}

productServices.listaProductos()
    .then((productos) => {

        for (let i = 0; i < productos.length; i++) {
            const productoAleatorio = generarProductoAleatorio(productos);
            if (!listaDesordenada.includes(productoAleatorio) && !listaDesordenada.includes(productos[i])) {
                listaDesordenada.push(productoAleatorio);
            }
        }
        /* const product = generarProductoAleatorio(productos);
        console.log(productos); */
        //console.log(listaDesordenada[0])
        //console.log(listaDesordenada[0])
        for(let i = 0; i < listaDesordenada.length; i++) {
            for (let j = 0; j < productos.length; j++) {
                console.log(listaDesordenada[i][j]);
            }
        }
        /* listaDesordenada.forEach((item , i) => {
            console.log(item[i].categoria);
        }); */
        /* listaDesordenada.forEach((item) => {
            console.log(item)
        }); */
        //console.log(listaDesordenada[0][0].imagen);
    })
    .catch((error) => console.log(error));

obtenerDetallesProducto();
/* console.log(listaDesordenada); */
