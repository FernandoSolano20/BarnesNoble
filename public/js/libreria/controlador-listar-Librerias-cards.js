'use strict';

const tbody = document.querySelector('#tbl_librerias tbody');
let listaLibrerias = [];
const sctListaLibrerias = document.querySelector('#listaLibrerias');

// let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async () => {

    listaLibrerias = await obtenerLibrerias();
    for (let i = 0; i < listaLibrerias.length; i++) {
        let contenedorCard = document.createElement('div');
        contenedorCard.classList.add('card')
        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = listaLibrerias[i]['nombreComercial'];


        header.appendChild(h2);

        let contenerdorImagen = document.createElement('div')
        let foto = document.createElement('img');

        contenedorCard.appendChild(foto);
        
        let p_nombreFantasia  = document.createElement('p');
        p_nombreFantasia.innerText = listaLibrerias[i]['nombreFantasia'];
        let p_provincia  = document.createElement('p');
        p_provincia.innerText = listaLibrerias[i]['provincia'];
        let p_canton  = document.createElement('p');
        p_canton.innerText = listaLibrerias[i]['canton'];
        let p_distrito  = document.createElement('p');
        p_distrito.innerText = listaLibrerias[i]['distrito'];
        let btnPerfil = document.createElement('button');
        btnPerfil.innerText = 'Ver Perfil'

        contenedorCard.appendChild(header);
        contenedorCard.appendChild(contenerdorImagen);
        contenedorCard.appendChild(p_nombreFantasia);
        contenedorCard.appendChild(p_provincia);
        contenedorCard.appendChild(p_canton);
        contenedorCard.appendChild(p_distrito);
        contenedorCard.appendChild(btnPerfil);

        sctListaLibrerias.appendChild(contenedorCard);
    }
};

mostrar_tabla();

let filtrar_tabla = async () => {

    // let filtro = txtFiltro.value.toLowerCase();


    for (let i = 0; i < listaLibrerias.length; i++) {


    }
};


// txtFiltro.addEventListener('keyup', filtrar_tabla);



