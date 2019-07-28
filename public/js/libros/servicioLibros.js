//ARCHIVO DE SERVICIO DE LIBROS, MARCO ARAGON
'use strict';
let registrarLibros = async (libro) => {
    var response = await fetch('http://localhost:4000/api/libros/registrarLibro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libro)
    });
    var result = await response.json();
    return result;
};

let obtenerLibros = async () => {
    try {
        const response = axios({
            method: 'get',
            url: 'http://localhost:4000/api/libros/listarLibros',
            responseType: 'json'
        });

        const result = await response;
        return result.data.listaLibros;

    } catch (error) {
        console.log(error);
    }
};

let obtenerLibrosFetch = async () => {
    let response = await fetch('http://localhost:4000/api/libros/listarLibros', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaLibros;
}

let obtenerLibrosId = async (id) => {
    let response = await fetch('http://localhost:4000/api/libros/buscarLibroID/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}