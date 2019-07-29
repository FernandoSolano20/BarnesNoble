'use strict';
//ARCHIVO DE SERVICIO DE OFERTAS, MARCO ARAGON


let registrarOfertas = async (oferta) => {
    let response = await fetch('http://localhost:4000/api/ofertas/registrarGenero', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(oferta)
    });
    let result = await response.json();
    return result;
}

let obtenerOfertas= async () => {
    let response = await fetch('http://localhost:4000/api/ofertas/listarOfertas', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaOfertas;
}

let editarOferta = async(oferta,id) => {
    let response = await fetch('http://localhost:4000/api/ofertas/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(oferta)
    });
    let result = await response.json();
    return result;
}

let eliminarOferta = async(id) => {
    let response = await fetch('http://localhost:4000/api/oferta/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
}

let estadoOferta = async(oferta,id) => {
    let response = await fetch('http://localhost:4000/api/oferta/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(oferta)
    });
    let result = await response.json();
    return result.response;
}