'use strict';

const tbody = document.querySelector('#tbl_sucursales tbody');
let lista_sucursales = [];
let txt_filtro = document.querySelector('#txt_filtro');


let mostrar_tabla = async() => {

    lista_sucursales = await obtenerSucursales();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_sucursales.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_sucursales[i]['nombre'];
        fila.insertCell().innerHTML = lista_sucursales[i]['correo'];
        fila.insertCell().innerHTML = lista_sucursales[i]['telefono'];
        fila.insertCell().innerHTML = lista_sucursales[i]['localizacionLatitud'];
        fila.insertCell().innerHTML = lista_sucursales[i]['localizacionLongitud'];
    }


};

let filtrar_tabla = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_sucursales.length; i++) {
        if (lista_sucursales[i]['nombre'].toLowerCase().includes(filtro) || lista_sucursales[i]['correo'].toLowerCase().includes(filtro) || lista_sucursales[i]['telefono'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_sucursales[i]['nombre'];
            fila.insertCell().innerHTML = lista_sucursales[i]['correo'];
            fila.insertCell().innerHTML = lista_sucursales[i]['telefono'];
            fila.insertCell().innerHTML = lista_sucursales[i]['localizacionLatitud'];
            fila.insertCell().innerHTML = lista_sucursales[i]['localizacionLongitud'];
        }

    }


};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);