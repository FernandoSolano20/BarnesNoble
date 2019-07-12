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

var editarGenero = async() => {
    var response = await fetch('http://localhost:4000/api/genero/editar', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaGeneros;
}