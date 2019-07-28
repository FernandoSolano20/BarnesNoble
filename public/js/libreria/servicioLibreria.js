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