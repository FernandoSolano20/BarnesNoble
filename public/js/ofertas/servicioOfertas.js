'use strict';
//ARCHIVO DE SERVICIO DE OFERTAS, MARCO ARAGON


let registrarOfertas = async (oferta) => {
    let response = await fetch('http://localhost:4000/api/ofertas/registrarOferta', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(oferta)
    });
    let result = await response.json();
    return result;
}

let obtenerOfertas = async () => {
    let response = await fetch('http://localhost:4000/api/ofertas/listarOfertas', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let obtenerOferta = async (id) => {
    let response = await fetch('http://localhost:4000/api/ofertas/buscarOfertaId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}

let editarOferta = async (oferta, id) => {
    let response = await fetch('http://localhost:4000/api/ofertas/editar/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(oferta)
    });
    let result = await response.json();
    return result;
}

let eliminarOferta = async (id) => {
    let response = await fetch('http://localhost:4000/api/ofertas/eliminar/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
}

let estadoOferta = async (oferta, id) => {
    let response = await fetch('http://localhost:4000/api/ofertas/modificarEstado/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(oferta)
    });
    let result = await response.json();
    return result.response;
}

var obtenerOfertasPorLibreria = async (tiendas) => {
    var response = await fetch('http://localhost:4000/api/ofertas/listarOfertasPorTiendas', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(tiendas)
    });
    var result = await response.json();
    return result;
}

let modificarOferta = async (oferta) => {
    let response = await fetch('http://localhost:4000/api/ofertas/modificarOferta', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(oferta)
    });
    let result = await response.json();
    return result;
}