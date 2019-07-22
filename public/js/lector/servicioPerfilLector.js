'use strict'
let obtenerLectorId = async(_id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-lector-id/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};