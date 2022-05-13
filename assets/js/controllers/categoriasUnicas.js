export const categoriasUnicas = (productos) => {
    const categoriaUnicas = [];
    productos.forEach(({ categoria }) => {
        if (!categoriaUnicas.includes(categoria)) {
            categoriaUnicas.push(categoria);
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
