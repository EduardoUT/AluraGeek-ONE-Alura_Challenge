import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { habilitarBotonProducto, producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");
const nombreFormulario = document.querySelector("[data-campo=productoUpdate]");
const precioFormulario = document.querySelector("[data-campo=precioUpdate]");
const categoriaFormulario = document.querySelector("[data-campo=categoriaUpdate]");
const descripcionFormulario = document.querySelector("[data-campo=descripcionUpdate]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "./mensajes/error.html";
    }

    try {
        const productoDetalles = await productServices.detalleProducto(id);
        const productoDetallesAcceso = productoDetalles.producto;
        const existenValores = (productoDetallesAcceso.imagen && productoDetallesAcceso.nombre &&
            productoDetallesAcceso.precio && productoDetallesAcceso.categoria && productoDetallesAcceso.desc);
        console.log(existenValores);
        console.log(productoDetallesAcceso.imagen);
        console.log(productoDetallesAcceso.nombre);
        console.log(productoDetallesAcceso.precio);
        console.log(productoDetallesAcceso.categoria);
        console.log(productoDetallesAcceso.desc);
        if (existenValores) {
            producto.img = productoDetallesAcceso.imagen;
            obtenerArchivoServer(producto.img);
            nombreFormulario.value = productoDetallesAcceso.nombre;
            precioFormulario.value = productoDetallesAcceso.precio;
            categoriaFormulario.value = productoDetallesAcceso.categoria;
            descripcionFormulario.value = productoDetallesAcceso.desc;
            habilitarBotonProducto();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        window.location.href = "./mensajes/error.html";
    }
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const productoServer = await productServices.detalleProducto({producto});
    productoIdentificador = productoServer.id;
    const imagenValor = producto.img;
    const nombreValor = nombreFormulario.value;
    const precioValor = precioFormulario.value;
    const categoriaValor = categoriaFormulario.value;
    const descripcionValor = descripcionFormulario.value;
    const existeValorEnServidor = ((productoServer.imagen == imagenValor) && (productoServer.nombre == nombreValor) &&
        (productoServer.precio == precioValor) && (productoServer.categoria == categoriaValor) &&
        (productoServer.desc == descripcionValor));

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
                productServices.actualizarProducto(id, imagenValor, nombreValor, precioValor, categoriaValor, descripcionValor)
                    .then(() => {
                        window.location.href = "./mensajes/actualizado_exitosamente.html";
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
        });
    } else {
        Swal.fire({
            icon: "info",
            title: "No se realizó ningún cambio.",
            text: "Pruebe a editar algún campo para realizar una actualización.",
        })
    }
});

obtenerInformacion();