
'use strict';

let obtenerLibrerias = async () => {
    try {
        const response = axios({
            method: 'get',
            url: 'http://localhost:4000/api/',
            responseType: 'json'
        });

        const result = await response;
        return result.data.listaLibros;

    } catch (error) {
        console.log(error);
    }
};
