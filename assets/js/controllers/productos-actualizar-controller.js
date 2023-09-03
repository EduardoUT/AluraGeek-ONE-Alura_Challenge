import { obtenerArchivoServer } from "../formularios/dropBoxArea.js";
import { habilitarBotonProducto, producto } from "../formularios/imagenDropBoxArea.js";
import {
    productServices, obtenerDatoArrayProducto,
    obtenerIdentificadorProductoUrl, comprobarValoresVacios
} from "../service/product-service.js";

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
        const existenValores = comprobarValoresVacios(datoArrayProducto);

        if (existenValores) {
            producto.img = datoArrayProducto[0].imagen_producto;
            obtenerArchivoServer(producto.img);
            nombreFormulario.value = datoArrayProducto[0].nombre_producto;
            precioFormulario.value = datoArrayProducto[0].precio_producto;
            categoriaFormulario.value = datoArrayProducto[0].categoria_producto;
            descripcionFormulario.value = datoArrayProducto[0].descripcion_producto;
            habilitarBotonProducto();
        } else {
            throw new Error();
        }

    } catch (error) {
        window.location.href = "./mensajes/error.html";
    }
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = obtenerIdentificadorProductoUrl();
    const productoDetalleServidor = await productServices.detalleProducto(id);
    const datoArrayProducto = obtenerDatoArrayProducto(productoDetalleServidor);
    const imagenValor = producto.img;
    const existeValorEnServidor = ((datoArrayProducto[0].imagen_producto == imagenValor)
        && (datoArrayProducto[0].nombre_producto == nombreFormulario.value)
        && (datoArrayProducto[0].precio_producto == precioFormulario.value)
        && (datoArrayProducto[0].categoria_producto == categoriaFormulario.value)
        && (datoArrayProducto[0].descripcion_producto == descripcionFormulario.value));

    if (!existeValorEnServidor) {
        Swal.fire({
            icon: "question",
            title: "¿Desea actualizar este producto?",
            text: "Los cambios se verán reflejados inmediatamente.",
            confirmTextButton: "Confirmar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((envio) => {
            if (envio.isConfirmed) {
                const formatoEnvio = {
                    "producto": [
                        {
                            "id": id,
                            "imagen": imagenValor,
                            "nombre": nombreFormulario.value,
                            "precio": precioFormulario.value,
                            "categoria": categoriaFormulario.value,
                            "desc": descripcionFormulario.value
                        }
                    ]
                }
                console.table(formatoEnvio);
                productServices.actualizarProducto(id, nombreFormulario.value, descripcionFormulario.value, categoriaFormulario.value, precioFormulario.value, imagenValor)
                    .then(() => {
                        window.location.href = "./mensajes/actualizado_exitosamente.html";
                    });
            } else if (envio.isDismissed) {
                Swal.fire({
                    icon: "info",
                    title: "Actualización cancelada."
                }).then((envio) => {
                    if (envio.isConfirmed) {
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