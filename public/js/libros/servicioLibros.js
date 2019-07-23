//ARCHIVO DE SERVICIO DE LIBROS, MARCO ARAGON
'use strict';
let registrarLibros = (ptitulo, pedicion, peditorial, pannoEdicion, pisbl, pcaratula, pcontraportada, pprecio, pidGenero, pidCategoria, pidAutor) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/libros/registrarLibro',
        responseType: 'json',
        data: {
            titulo: ptitulo,
            edicion: pedicion,
            editorial: peditorial,
            annoEdicion: pannoEdicion,
            isbl: pisbl,
            caratula: pcaratula,
            contraportada: pcontraportada,
            precio: pprecio,
            idGenero: pidGenero,
            idCategoria: pidCategoria,
            idAutor: pidAutor


        }
    });
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

let obtenerLibrosId = async () => {
    let response = await fetch('http://localhost:4000/api/libros/buscarLibroID', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaLibros;
}