export const categoriasUnicas = ({ alura_geek_productos }) => {
    const categoriaUnicas = [];
    alura_geek_productos.forEach(({ categoria_producto }) => {
        if (!categoriaUnicas.includes(categoria_producto)) {
            categoriaUnicas.push(categoria_producto);
        }
    });
    return categoriaUnicas;
}

export const incluyeCategoria = (listaCategorias, categoriaUsuario) => {
    let status = false;
    if (listaCategorias.includes(categoriaUsuario)) {
        return status = true;
    } else {
        return status = false;
    }
}
