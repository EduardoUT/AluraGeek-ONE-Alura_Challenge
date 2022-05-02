import { productServices } from "../service/product-service.js";

const categorias = document.querySelector("[data-categorias]");
const categoriasExistentes = [];

const crearSeccionCategoria = (categoriaExistente, data) => {
    const seccion = document.createElement("section");
    seccion.setAttribute("class", "productos container");

    const contenido = `
        <header class="productos__categoria">
            <h2 class="titulo">${categoriaExistente}</h2>
            <a class="productos__linkCategoria link link--categoria" href="./ventanas/productos_existentes.html"
                title="Ver todos los productos de Star Wars" tabindex="0">
                Ver todo
                <div class="productos__link--flecha"></div>
            </a>
        </header>
        <div class="productos__detalles"></div>
    `;
    
    seccion.innerHTML = contenido;

    const productosCategoria = seccion.querySelector(".productos__detalles");
    console.log(productosCategoria)
    data.forEach(({categoria}) => {
        if(categoriaExistente.includes(categoria)) {
            console.log(categoria);
        }
    });
        /* data.forEach(({ id, imagen, nombre, precio, categoria }) => {
            console.log(categoria)
            const exhibirProductos = crearSeccionProductos(id, imagen, nombre, precio, categoria);
            productosCategoria.appendChild(exhibirProductos);
        });  */

    return seccion;
}

const crearSeccionProductos = (id, imagen, nombre, precio, categoria) => {
    console.log(categoria)
    const containerProductos = document.querySelector(".productos__detalles");
    if (categoria.includes("Star Wars")) {
        const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('./assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
            <a class="productos__link link" href="#" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
        containerProductos.innerHTML += contenido;
    }

    if (categoria.includes("Consolas")) {
        const contenido = `
        <div class="productos__producto">
            <div class="productos__imagen" style="background: url('./assets/img/productos/${imagen}') center / 100% 100% no-repeat;" tabindex="0"></div>
            <p class="productos__nombre parrafo" tabindex="0">${nombre}</p>
            <p class="productos__precio parrafo" tabindex="0">$ ${precio}</p>
            <a class="productos__link link" href="#" title="Ver más detalles" tabindex="0">Ver
                Producto</a>
        </div>
    `;
        containerProductos.innerHTML += contenido;
    }

    return containerProductos;
}

productServices.listaProductos()
    .then((data) => {
        console.log(data.length);
        /* const nuevo = obtenerProductosCategoria(categoria);
            categorias.appendChild(nuevo); */

        /**
         * Filtrando las categorias existentes y almacenandolas
         * en un arreglo.
         */
        data.forEach(({ categoria }) => {
            if (!categoriasExistentes.includes(categoria)) {
                categoriasExistentes.push(categoria);
            }
        });

        /**
         * Creando elementos section acorde a las 
         * categorias filtradas y asignando el valor a los 
         * encabezados.
         */
        categoriasExistentes.forEach((categoriaExistente) => {
            const nuevaSeccion = crearSeccionCategoria(categoriaExistente, data);
            categorias.appendChild(nuevaSeccion);
        });

        
        







        console.log(categoriasExistentes);

    })
    .catch((error) => console.log(error));


