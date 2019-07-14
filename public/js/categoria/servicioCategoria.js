var crearCategoria = async (categoria) => {
    var response = await fetch('http://localhost:4000/api/categoria/registrarCategoria', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    var result = await response.json();
    return result;
}

var obtenerCategoria = async () => {
    var response = await fetch('http://localhost:4000/api/categoria/listarCategorias', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaCategorias;
}

var editarCategoria = async(categoria,id) => {
    var response = await fetch('http://localhost:4000/api/categoria/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    var result = await response.json();
    return result;
}

var eliminarCategoria = async(id) => {
    var response = await fetch('http://localhost:4000/api/categoria/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    var result = await response.json();
    return result;
}

var estadoCategoria = async(categoria,id) => {
    var response = await fetch('http://localhost:4000/api/categoria/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    var result = await response.json();
    return result.response;
}