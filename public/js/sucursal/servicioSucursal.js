'use strict';

let registrarSucursal = (pnombre, ptelefono, pcorreo, plocalizacionLongitud , plocalizacionLatitud, pIdLibreria, pIdProvincia, pIdCanton, pIdDistrito,) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/sucursal/registrarSucursal',
        responseType: 'json',
        data: {
            nombre: pnombre,
            telefono: ptelefono,
            correo: pcorreo,
            LocalizacionLongitud: plocalizacionLongitud,
            LocalizacionLatitud: plocalizacionLatitud,
            libreria: pIdLibreria,
            provincia:pIdProvincia,
            canton:pIdCanton,
            distrito: pIdDistrito

        }
    });
};

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

let obtenerSucursalesIdLibreria = async (id) => {
    let response = await fetch('http://localhost:4000/api/sucursal/buscarIdLibreria/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result;
}