import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { habilitarBotonProducto, producto } from "../formularios/imagenDropBoxArea.js";
import { login } from "../login.js";
import { comprobarAcceso, estaAutenticado } from "../main.js";
import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "/ventanas/error.html";
    }

    const nombre = document.querySelector("[data-campo=producto]");
    const precio = document.querySelector("[data-campo=precio]");
    const categoria = document.querySelector("[data-campo=categoria]");
    const descripcion = document.querySelector("[data-campo=descripcion]");
    //console.log(dropBoxArea, nombre, precio, categoria, descripcion);
    try {
        const productoDetalles = await productServices.detalleProducto(id);
        //console.log(productoDetalles);
        //console.log(productoDetalles.imagen);
        const existenValores = (productoDetalles.imagen && productoDetalles.nombre &&
            productoDetalles.precio && productoDetalles.categoria && productoDetalles.desc);
        if (existenValores) {
            producto.img = productoDetalles.imagen;
            obtenerArchivoServer(producto.img);
            nombre.value = productoDetalles.nombre;
            precio.value = productoDetalles.precio;
            categoria.value = productoDetalles.categoria;
            descripcion.value = productoDetalles.desc;
            habilitarBotonProducto();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        window.location.href = "/ventanas/error.html";

    }
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const productoServer = await productServices.detalleProducto(id);
    const imagen = producto.img;
    const nombre = document.querySelector("[data-campo=producto]").value;
    const precio = document.querySelector("[data-campo=precio]").value;
    const categoria = document.querySelector("[data-campo=categoria]").value;
    const descripcion = document.querySelector("[data-campo=descripcion]").value;
    const existeValorEnServidor = ((productoServer.imagen == imagen) && (productoServer.nombre == nombre) &&
        (productoServer.precio == precio) && (productoServer.categoria == categoria) &&
        (productoServer.desc == descripcion));

    if (!existeValorEnServidor) {
        Swal.fire({
            icon: "question",
            title: "¿Desea actualizar este producto?",
            text: "Los cambios se verán reflejados inmediatamente.",
            confirmTextButton: "Confirmar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((respuesta) => {
            if (respuesta.isConfirmed) {
                productServices.actualizarProducto(id, imagen, nombre, precio, categoria, descripcion)
                    .then(() => {
                        window.location.href = "/ventanas/actualizado_exitosamente.html";
                    });
            } else if (respuesta.isDismissed) {
                Swal.fire({
                    icon: "info",
                    title: "Actualización cancelada."
                }).then((respuesta) => {
                    if (respuesta.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        })
    } else {
        Swal.fire({
            icon: "info",
            title: "No se realizó ningún cambio.",
            text: "Pruebe a editar algún campo para realizar una actualización.",
        })
    }
});

obtenerInformacion();