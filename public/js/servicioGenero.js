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

var obtenerGenero = async (genero) => {
    var response = await fetch('http://localhost:4000/api/genero/registrarGenero', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:genero
    });
    var result = await response.json();
    return result.msj;
}