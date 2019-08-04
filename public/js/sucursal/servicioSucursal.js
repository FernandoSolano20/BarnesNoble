'use strict';
var crearSucursal = async (sucursal) => {
    var response = await fetch('http://localhost:4000/api/sucursal/registrarSucursal', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(sucursal)
    });
    var result = await response.json();
    return result;
}



let obtenerSucursales = async() => {
    var response = await fetch('http://localhost:4000/api/sucursal/listarSucursales', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.listaSucursales;
};

let obtenerSucursalPorId = async(id) => {
    var response = await fetch('http://localhost:4000/api/sucursal/sucursalId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let obtenerCountSucursal = async function () {
    var response = await fetch('http://localhost:4000/api/sucursal/countSucursal', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result.count;
}