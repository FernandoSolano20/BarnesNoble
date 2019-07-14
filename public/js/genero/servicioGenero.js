var crearGenero = async (genero) => {
    var response = await fetch('http://localhost:4000/api/genero/registrarGenero', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    var result = await response.json();
    return result;
}

var obtenerGenero = async () => {
    var response = await fetch('http://localhost:4000/api/genero/listarGeneros', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaGeneros;
}

var editarGenero = async(genero,id) => {
    var response = await fetch('http://localhost:4000/api/genero/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    var result = await response.json();
    return result;
}

var eliminarGenero = async(id) => {
    var response = await fetch('http://localhost:4000/api/genero/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    var result = await response.json();
    return result;
}

var estadoGenero = async(genero,id) => {
    var response = await fetch('http://localhost:4000/api/genero/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(genero)
    });
    var result = await response.json();
    return result.response;
}