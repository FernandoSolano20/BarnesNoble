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
            IdLibreria: pIdLibreria,
            IdProvincia:pIdProvincia,
            IdCanton:pIdCanton,
            IdDistrito: pIdDistrito

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