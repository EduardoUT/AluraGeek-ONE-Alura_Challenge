import { login } from "../login.js";
import { estaAutenticado } from "../main.js";
import { productServices } from "../service/product-service.js";

const productos = document.querySelector("[data-lista-productos]");

const contenidoProductoLocal = (id_producto, nombre_producto, precio_producto, imagen_producto) => {
    const contenido = `
            <div class="productos-existentes__container productos__imagen"
                style="background: url('../assets/img/productos/${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0">
                <a class="productos-existentes__botones boton--eliminar" data-borrar-boton></a>
                <a class="productos-existentes__botones boton--editar" data-editar-boton></a>
            </div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio_producto}</p>
            <p class="productos__id parrafo" tabindex="0">${id_producto}</p>
        `;
    return contenido;
}

const contenidoProductoServidor = (id_producto, nombre_producto, precio_producto, imagen_producto) => {
    const contenido = `
            <div class="productos-existentes__container productos__imagen"
                style="background: url('${imagen_producto}') center / 100% 100% no-repeat;" tabindex="0">
                <a class="productos-existentes__botones boton--eliminar" data-borrar-boton></a>
                <a class="productos-existentes__botones boton--editar" data-editar-boton></a>
            </div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre_producto}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio_producto}</p>
            <p class="productos__id parrafo" tabindex="0">${id_producto}</p>
        `;
    return contenido;
}

const obtenerProducto = (id_producto, nombre_producto, precio_producto, imagen_producto) => {
    const rangoId = (id_producto <= 18);
    const producto = document.createElement("div");
    producto.setAttribute("class", "productos-existentes__producto productos__producto");
    if (rangoId) {
        const contenidoLocal = contenidoProductoLocal(id_producto, nombre_producto, precio_producto, imagen_producto);
        producto.innerHTML = contenidoLocal;
    } else {
        const contenidoServidor = contenidoProductoServidor(id_producto, nombre_producto, precio_producto, imagen_producto);
        producto.innerHTML = contenidoServidor;
    }

    const btnEliminar = producto.querySelector("[data-borrar-boton]");
    const btnEditar = producto.querySelector("[data-editar-boton]");
    if (!login(estaAutenticado)) {
        btnEliminar.style.display = "none";
        btnEditar.style.display = "none";
    } else {
        if (rangoId) {
            btnEliminar.addEventListener("click", () => {
                Swal.fire({
                    icon: "warning",
                    title: "No es posible eliminar este producto."
                });
            });

            btnEditar.addEventListener("click", () => {
                Swal.fire({
                    icon: "warning",
                    title: "No es posible editar este producto."
                });
            });
        } else {
            btnEliminar.setAttribute("id", `${id_producto}`);
            btnEditar.setAttribute("href", `./productos_actualizar.html?id=${id_producto}`);
            btnEliminar.addEventListener("click", () => {
                Swal.fire({
                    icon: "question",
                    title: "¿Desea eliminar este producto?",
                    text: "Los cambios se verán reflejados inmediatamente.",
                    confirmTextButton: "Eliminar",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar"
                }).then((respuesta) => {
                    if (respuesta.isConfirmed) {
                        const idProducto = btnEliminar.id;
                        productServices.eliminarProducto(idProducto)
                            .then((respuesta) => {
                                window.location.reload();
                            }).catch((error) => alert(error));
                    } else if (respuesta.isDismissed) {
                        Swal.fire({
                            icon: "info",
                            title: "Eliminación cancelada."
                        });
                    }
                });
            });
        }
    }
    return producto;
}

productServices.listaProductos()
    .then(({ alura_geek_productos }) => {
        alura_geek_productos.forEach(({ id_producto, nombre_producto, precio_producto, imagen_producto }) => {
            const nuevoProducto = obtenerProducto(id_producto, nombre_producto, precio_producto, imagen_producto);
            productos.appendChild(nuevoProducto);
        });
    })
    .catch((error) => alert("Ocurrió un error: " + error));