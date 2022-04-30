import { productServices } from "../service/product-service.js";

const productos = document.querySelector("[data-lista-productos]");

const obtenerProducto = (imagen, nombre, precio, id) => {
    console.log(id);
    const producto = document.createElement("div");
    const contenido = `
        <div class="productos-existentes__producto productos__producto" data-producto>
            <div class="productos-existentes__container productos__imagen"
            style="background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0">
                <button class="productos-existentes__botones boton--eliminar" data-borrar-boton></button>
                <button class="productos-existentes__botones boton--editar" data-editar-boton></button>
            </div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
            <p class="productos__id parrafo" tabindex="0">${id}</p>
        </div>
    `;
    producto.innerHTML = contenido;
    return producto;
}

productServices.listaProductos()
    .then((data) => {
        console.log(data)
        data.forEach(({ imagen, nombre, precio, id }) => {
            const nuevoProducto = obtenerProducto(imagen, nombre, precio, id);
            productos.appendChild(nuevoProducto);
        });
    })
    .catch((error) => alert("Ocurrió un error: " + error));