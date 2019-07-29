'use strict';

const tbody = document.querySelector('#tbl_clubesLectura tbody');
let lista_clubesLectura = [];
let txt_filtro = document.querySelector('#txt_filtro');


let mostrar_tabla = async() => {

    lista_clubesLectura = await obtenerClubesLectura();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_clubesLectura.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_clubesLectura[i]['nombre'];
        fila.insertCell().innerHTML = lista_clubesLectura[i]['tema'];
        fila.insertCell().innerHTML = lista_clubesLectura[i]['tipoClub'];
        fila.insertCell().innerHTML = lista_clubesLectura[i]['fechaReunion'];
        fila.insertCell().innerHTML = lista_clubesLectura[i]['horaReunion'];
    }


};

let filtrar_tabla = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_clubesLectura.length; i++) {
        if (lista_clubesLectura[i]['nombre'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['tipoClub'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['tema'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['fechaReunion'].toLowerCase().includes(filtro) ) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_clubesLectura[i]['nombre'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['tema'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['tipoClub'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['fechaReunion'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['horaReunion'];
        }

    }


};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);

document.querySelector('#crear-elemento').addEventListener('click',function(){
    window.location.href= 'http://localhost:3000/clubLectura.html';
})