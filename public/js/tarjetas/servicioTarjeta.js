'use strict';

let registrarTarjeta = async (tarjeta ) => {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrarTarjeta',
        responseType: 'json',
        data: tarjeta
    });
    return await response.data;
};

let obtenerTarjetas  = async () => {
    try{ 
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarTarjetas',  
            responseType: 'json'   
        });
        const result = await response;
        return result.data.listaTarjetas;
    }catch (error){
        console.log(error);
    } 
};

let obtenerTarjetasUsuario  = async (id) => {
    try{ 
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarTarjetasPorId/'+id,  
            responseType: 'json'   
        });
        const result = await response;
        return result.data.listaTarjetas;
    }catch (error){
        console.log(error);
    } 
};


// var registrarTarjeta = async (pnombre1, pnumTarjeta, pexpiracion, pcvv, ptipoTarjeta ) => {
//     var response = await fetch('http://localhost:4000/api/registrarTarjetas', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//         },
//         body:JSON.stringify(pnombre1, pnumTarjeta, pexpiracion, pcvv, ptipoTarjeta )
//     });
//     var result = await response.json();
//     return result;
// }