//ARCHIVO DE SERVICIO DE LIBROS, MARCO ARAGON
'use strict';
let registrarTipoLibro = (ptipo) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/tipoLibro/registrarTipoLibro',
        responseType: 'json',
        data: {
            tipo: ptipo,
            
        }
    });
};

let obtenerTipoLibro = async () => {
    try {
        const response = axios({
            method: 'get',
            url: 'http://localhost:4000/api/tipoLibro/listarTipoLibro',
            responseType: 'json'
        });

        const result = await response;
        return result.data.listaTipoLibro;

    } catch (error) {
        console.log(error);
    }
};