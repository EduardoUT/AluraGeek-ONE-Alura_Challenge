import { login } from "../login.js";
import { estaAutenticado } from "../main.js";
import { productServices } from "../service/product-service.js";

const productos = document.querySelector("[data-lista-productos]");

const obtenerProducto = (id, imagen, nombre, precio) => {
    //console.log(id);
    const rangoId = (id <= 18);
    const producto = document.createElement("div");
    producto.setAttribute("class", "productos-existentes__producto productos__producto");
    //<div class="productos-existentes__producto productos__producto" data-producto>
    if (rangoId) {
        const contenido = `
        <div class="productos-existentes__container productos__imagen"
            style="background: url('../assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0">
            <a class="productos-existentes__botones boton--eliminar" data-borrar-boton></a>
            <a class="productos-existentes__botones boton--editar" data-editar-boton></a>
        </div>
        <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
        <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
        <p class="productos__id parrafo" tabindex="0">${id}</p>
        `;
        producto.innerHTML = contenido;
    } else {
        const contenido = `
        <div class="productos-existentes__container productos__imagen"
            style="background: url('${imagen}') center / 100% 100% no-repeat;" tabindex="0">
            <a class="productos-existentes__botones boton--eliminar" data-borrar-boton></a>
            <a class="productos-existentes__botones boton--editar" data-editar-boton></a>
        </div>
        <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
        <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
        <p class="productos__id parrafo" tabindex="0">${id}</p>
        `;
        producto.innerHTML = contenido;
    }
    //</div>

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
            btnEliminar.setAttribute("id", `${id}`);
            btnEditar.setAttribute("href", `../../../ventanas/actualizar_producto.html?id=${id}`);
            btnEliminar.addEventListener("click", () => {
                const idProducto = btnEliminar.id;
                productServices.eliminarProducto(idProducto)
                    .then((respuesta) => {
                        console.log(respuesta);
                    }).catch((error) => alert(error));
            });
        }
    }
    return producto;
}

productServices.listaProductos()
    .then((data) => {
        console.log(data)
        data.forEach(({ id, imagen, nombre, precio }) => {
            const nuevoProducto = obtenerProducto( id, imagen, nombre, precio);
            productos.appendChild(nuevoProducto);
        });
    })
    .catch((error) => alert("Ocurrió un error: " + error));