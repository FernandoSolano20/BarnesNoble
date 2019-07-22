let crearGenero = async (genero) => {
    let response = await fetch('http://localhost:4000/api/genero/registrarGenero', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    let result = await response.json();
    return result;
}

let obtenerGenero = async () => {
    let response = await fetch('http://localhost:4000/api/genero/listarGeneros', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaGeneros;
}

let editarGenero = async(genero,id) => {
    let response = await fetch('http://localhost:4000/api/genero/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    let result = await response.json();
    return result;
}

let eliminarGenero = async(id) => {
    let response = await fetch('http://localhost:4000/api/genero/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
}

let estadoGenero = async(genero,id) => {
    let response = await fetch('http://localhost:4000/api/genero/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    let result = await response.json();
    return result.response;
}