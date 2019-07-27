//ARCHIVO DE SERVICIO DE LIBROSTIPOLIBRO, MARCO ARAGON
'use strict';
let registrarLibrosTipoLibro = (pidLibro, pidTipoLibro, pstock) => {
    axios({
        method: 'post',
        responseType: 'json',
        data: {
            idLibro: pidLibro,
            idTipoLibro: pidTipoLibro,
            stock: pstock
            
        }
    });
};

let obtenerLibrosTipoLibro = async () => {
    try {
        const response = axios({
            method: 'get',
            url: 'http://localhost:4000/api/librosTipoLibro/listarLibrosTipoLibro',
            responseType: 'json'
        });

        const result = await response;
        return result.data.listaLibrosTipoLibro;

    } catch (error) {
        console.log(error);
    }
};