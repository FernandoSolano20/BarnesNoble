'use strict';

let obtenerLibrerias  = async () => {
    try{ 
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarLibrerias',  
            responseType: 'json'   
        });
        const result = await response;
        return result.data.listaLibrerias;
    }catch (error){
        console.log(error);
    } 
};

