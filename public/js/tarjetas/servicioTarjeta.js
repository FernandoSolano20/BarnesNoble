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

let obtenerTarjetasPorId = async (id) => {
    try {
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarTarjetasPorIdDB/' + id,
            responseType: 'json'
        });
        const result = await response;
        return result.data.listaTarjetas;
    } catch (error) {
        console.log(error);
    }
 };

let obtenerTarjetasUsuarioIdFetch  = async (id) => {
    var response = await fetch('http://localhost:4000/api/listarTarjetasPorId/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    var result = await response.json();
    return result;
};

let editarTarjeta = async (tarjeta, id) => {
    let response = await fetch('http://localhost:4000/api/editarTarjeta/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(tarjeta)
    });
    let result = await response.json();
    return result;
 }
 let eliminarTarjeta = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminarTarjeta/',
        responseType: 'json',
        data: {
            _id: pid
        }
    });
 }