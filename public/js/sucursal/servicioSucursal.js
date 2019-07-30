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
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/sucursal/listarSucursales',
            responseType: 'json'
        });

        return response.data.listaSucursales;
    } catch (error) {
        console.log(error);
    }
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