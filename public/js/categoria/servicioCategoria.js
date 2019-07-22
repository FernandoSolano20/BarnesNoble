let crearCategoria = async (categoria) => {
    let response = await fetch('http://localhost:4000/api/categoria/registrarCategoria', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    let result = await response.json();
    return result;
}

let obtenerCategoria = async () => {
    let response = await fetch('http://localhost:4000/api/categoria/listarCategorias', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaCategorias;
}

let editarCategoria = async(categoria,id) => {
    let response = await fetch('http://localhost:4000/api/categoria/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    let result = await response.json();
    return result;
}

let eliminarCategoria = async(id) => {
    let response = await fetch('http://localhost:4000/api/categoria/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
}

let estadoCategoria = async(categoria,id) => {
    let response = await fetch('http://localhost:4000/api/categoria/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(categoria)
    });
    let result = await response.json();
    return result.response;
}