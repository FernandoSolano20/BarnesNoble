'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
console.log(urlParams.get('_id'));

// const txt_nombreComercial = document.querySelector('#txt-nombreComercial');
// const txt_correoFantasia = document.querySelector('#txt-nombreFantasia');
// const txt_pronvincia = document.querySelector('#txt-provincia');
// const txt_canton = document.querySelector('#txt-canton');
// const txt_distrito = document.querySelector('#txt-distrito');


// let lista_clubesLectura = [];
// const txt_nombreClub = document.querySelector('#txt-nombreClub');
// const txt_fecha = document.querySelector('#txt-fecha');
// const txt_horaReunion = document.querySelector('#txt-horaReunion');
// const txt_tema = document.querySelector('#txt-tema');
// const txt_tipoClub = document.querySelector('#txt-tipoClub');


let llenarPerfil = async() => {
    let libreria = await obtenerLibreriaId(_id);
    console.log(libreria)
};

 

llenarPerfil();