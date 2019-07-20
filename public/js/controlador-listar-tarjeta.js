'use strict';

const tbody = document.querySelector('#tbl_tarjetas tbody');
let listaTarjetas = [];
let txt_filtro = document.querySelector('#txt_filtro');


let mostrar_tabla = async() => {

    listaTarjetas = await obtenerTarjetas();
    tbody.innerHTML = '';


    for (let i = 0; i < listaTarjetas.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
        fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
        fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
        fila.insertCell().innerHTML = listaTarjetas[i]['expiracion'];
        fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];
    }


};

let filtrar_tabla = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < listaTarjetas.length; i++) {
        if (listaTarjetas[i]['Nombre'].toLowerCase().includes(filtro) || listaTarjetas[i]['Tipo de Tarjeta'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
            fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['expiracion'];
            fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];
        }

    }


};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);