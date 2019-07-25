'use strict';

const tbody = document.querySelector('#tbl_librerias tbody');
let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async() => {

    listaLibrerias = await obtenerLibrerias();
    tbody.innerHTML = '';
   
     
    for (let i = 0; i < listaLibrerias.length; i++) {

        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
        fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];
       
    }
};

mostrar_tabla();

let filtrar_tabla = async() => {

    let filtro = txtFiltro.value.toLowerCase();
    tbody.innerHTML = '';

    for (let i = 0; i < listaLibrerias.length; i++) {   

        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro) ) {

            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];
        }
    }
};

txtFiltro.addEventListener('keyup', filtrar_tabla);



