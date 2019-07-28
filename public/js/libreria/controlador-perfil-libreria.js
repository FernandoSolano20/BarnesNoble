'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const nombre_comercial = document.querySelector('txt-nombreComercial');
const nombre_Fantasia = document.querySelector('txt-nombreFantasia');
const txt_provincia = document.querySelector('txt-provincia');
const txt_canton = document.querySelector('txt-canton');
const txt_distrito = document.querySelector('txt-distrito');


let llenarPerfil = async () => {
    let libreria = await obtenerLibreriaId(_id);

    if (libreria) {
        nombre_comercial.innerHTML = libreria['nombreComercial'];
        nombre_Fantasia.innerHTML = libreria['nombreFantasia'];
        txt_provincia.innerHTML = libreria['provincia'];
        txt_canton.innerHTML = libreria['canton'];
        txt_distrito.innerHTML = lbreria['distrito'];

    }


};



llenarPerfil();