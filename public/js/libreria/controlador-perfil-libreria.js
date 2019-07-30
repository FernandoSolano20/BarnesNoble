'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const txt_nombreComercial = document.querySelector('#txt-nombreComercial');
const txt_nombreFantasia = document.querySelector('#txt-nombreFantasia');
const txt_provincia = document.querySelector('#txt-provincia');
const txt_canton = document.querySelector('#txt-canton');
const txt_distrito = document.querySelector('#txt-distrito');



let llenarPerfil = async () => {

    let libreria = await obtenerLibreriaId(_id);
    console.log(libreria)

    if (libreria) {
        txt_nombreComercial.innerHTML = libreria['nombreComercial'];
        txt_nombreFantasia.innerHTML = libreria['nombreFantasia'];
        txt_provincia.innerHTML = libreria['provincia'];
        txt_canton.innerHTML = libreria['canton'];
        txt_distrito.innerHTML = libreria['distrito'];
     
    }
};

llenarPerfil();


