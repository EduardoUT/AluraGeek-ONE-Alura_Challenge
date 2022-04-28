const url = "http://localhost:3000/producto";

const crearProducto = (imagen, nombre, precio, categoria, desc) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: uuid.v4(), imagen, nombre, precio, categoria, desc})
    });
} 