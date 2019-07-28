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
        // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLatitud'];
        // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLongitud'];
        // let celda_perfil = fila.insertCell();
        // let boton_perfil = document.createElement('button');
        // boton_perfil.type = 'button';
        // boton_perfil.innerText = 'Ver perfil';
        // boton_perfil.dataset._id = lista_contactos[i]['_id'];

        // celda_perfil.appendChild(boton_perfil);

        // boton_perfil.addEventListener('click', function() {
             //     window.location.href = `verPerfil-libreria.html?_id=${this.dataset._id}`
        // });
       
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
            // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLatitud'];
            // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLongitud'];
        }
    }
};

txtFiltro.addEventListener('keyup', filtrar_tabla);

