import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { habilitarBotonProducto, producto } from "../formularios/imagenDropBoxArea.js";
import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form-update-product]");
const nombreFormulario = document.querySelector("[data-campo=productoUpdate]");
const precioFormulario = document.querySelector("[data-campo=precioUpdate]");
const categoriaFormulario = document.querySelector("[data-campo=categoriaUpdate]");
const descripcionFormulario = document.querySelector("[data-campo=descripcionUpdate]");

const obtenerInformacion = async () => {
    const id = obtenerIdentificadorProductoUrl();
    if (id == null) {
        window.location.href = "./mensajes/error.html";
    }

    try {
        const productoDetalleServidor = await productServices.detalleProducto(id);
        const datoArrayProducto = obtenerDatoArrayProducto(productoDetalleServidor);
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

const obtenerDatoArrayProducto = (productoObjeto) => {
    const datoArrayProducto = Object.values(productoObjeto.producto);
    return datoArrayProducto;
}

const obtenerIdentificadorProductoUrl = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    return id;
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = obtenerIdentificadorProductoUrl();
    const productoDetalleServidor = await productServices.detalleProducto(id);
    const datoArrayProducto = obtenerDatoArrayProducto(productoDetalleServidor);
    const imagenValor = producto.img;
    const existeValorEnServidor = ((datoArrayProducto[0].imagen == imagenValor)
        && (datoArrayProducto[0].nombre == nombreFormulario.value)
        && (datoArrayProducto[0].precio == precioFormulario.value)
        && (datoArrayProducto[0].categoria == categoriaFormulario.value)
        && (datoArrayProducto[0].desc == descripcionFormulario.value));

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
                productServices.actualizarProducto(id, imagenValor, nombreFormulario.value,
                    precioFormulario.value, categoriaFormulario.value, descripcionValor.value)
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