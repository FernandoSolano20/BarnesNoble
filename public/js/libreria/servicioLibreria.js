'use strict';

let obtenerLibrerias  = async () => {
    var response = await fetch('http://localhost:4000/api/listarLibrerias', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaLibrerias;
};

let obtenerLibreriaId = async(_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscarLibreria-id/${_id}`,
            responseType: 'json'
        });

        return response.data.libreria;
    } catch (error) {
        console.log(error);
    }
};

let obtenerLibreriaPorId = async(id) => {
    var response = await fetch('http://localhost:4000/api/libreriaId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerLibreriaPorIdSucursal = async(id) => {
    var response = await fetch('http://localhost:4000/api/sucursalId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerCountLibreria = async function () {
    var response = await fetch('http://localhost:4000/api/countLibreria', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
}


let obtenerTiendas = async function () {
    var response = await fetch('http://localhost:4000/api/obtenerTiendas', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}

let comprarLibros = async function (ejemplarLibreria) {
    var response = await fetch('http://localhost:4000/api/comprarLibroLibreria', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplarLibreria)
    });
    var result = await response.json();
    return result;
}

let obtenerLibrosTienda = async function (id) {
    var response = await fetch('http://localhost:4000/api/obtenerLibrosPorLibreriaID/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}

let obtenerSucursalesPorLibreriaId = async function (id) {
    var response = await fetch('http://localhost:4000/api/obtenerSucursalesPorLibreriaId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
}

let editarLibreria = async(libreria,id) => {
    let response = await fetch('http://localhost:4000/api/editarLibreria/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libreria)
    });
    let result = await response.json();
    return result;
}

let eliminarLibreria = async(id) => {
    let response = await fetch('http://localhost:4000/api/libreria/eliminarLibreria/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    let result = await response.json();
    return result;
}

let estadoLibreria = async(genero,id) => {
    let response = await fetch('http://localhost:4000/api/modificarEstadoLibreria/' + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(libreria)
    });
    let result = await response.json();
    return result.response;
}

let obtenerLibreriaPorEjemplaresId = async(ejemplares) => {
    let response = await fetch('http://localhost:4000/api/obtenerLibreriasPorEjemplaresId', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplares)
    });
    let result = await response.json();
    return result;
}

let obtenerCantidadEjemplarPorLibreria = async(ejemplares) => {
    let response = await fetch('http://localhost:4000/api/obtenerCantidadEjemplarPorLibreria', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(ejemplares)
    });
    let result = await response.json();
    return result;
}

let obtenerLibreriasCompletas  = async () => {
    var response = await fetch('http://localhost:4000/api/listarLibreriasCompletas', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaLibrerias;
};