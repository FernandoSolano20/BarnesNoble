'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const txt_nombreComercial = document.querySelector('#txt-nombreComercial');
const txt_correoFantasia = document.querySelector('#txt-nombreFantasia');
const txt_pronvincia = document.querySelector('#txt-provincia');
const txt_canton = document.querySelector('#txt-canton');
const txt_distrito = document.querySelector('#txt-distrito');

let llenarPerfil = async() => {
    let listaLibrerias = await obtenerLibreriaId(_id);
    if (listaLibrerias) {
        txt_nombreComercial.innerHTML = listaLibrerias['nombreComercial'];
        txt_nombreFantasia.innerHTML = listaLibrerias['nombreFantasia'];
        txt_pronvincia.innerHTML = listaLibrerias['txt-provincia'];
        txt_canton.innerHTML = listaLibrerias['txt-canton'];
        txt_distrito.innerHTML = listaLibrerias['txt-distrito'];
    }
};

llenarPerfil();