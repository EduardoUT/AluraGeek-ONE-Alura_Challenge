import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { habilitarBotonProducto, producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");
const nombreFormulario = document.querySelector("[data-campo=productoUpdate]");
const precioFormulario = document.querySelector("[data-campo=precioUpdate]");
const categoriaFormulario = document.querySelector("[data-campo=categoriaUpdate]");
const descripcionFormulario = document.querySelector("[data-campo=descripcionUpdate]");

const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "./mensajes/error.html";
    }

    try {
        obtenerDatoServidor(id);
        const estaVacio = (valorActual) => valorActual != null;
        const existenValores = datoArrayProducto.every(estaVacio);

        if (existenValores) {
            producto.img = datoArrayProducto[0].imagen;
            obtenerArchivoServer(producto.img);
            nombreFormulario.value = datoArrayProducto[0].nombre;
            precioFormulario.value = datoArrayProducto[0].precio;
            categoriaFormulario.value = datoArrayProducto[0].categoria;
            descripcionFormulario.value = datoArrayProducto[0].desc;
            habilitarBotonProducto();
        } else {
            throw new Error();
        }

    } catch (error) {
        window.location.href = "./mensajes/error.html";
    }
}

const obtenerDatoServidor = async (id) => {
    const productoDetalles = await productServices.detalleProducto(id);
    const datoArrayProducto = Object.values(productoDetalles.producto);
    return datoArrayProducto;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const dato = obtenerDatoServidor(id);
    id = productoServer.id;
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