'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
console.log(urlParams.get('_id'));


let llenarPerfil = async() => {
    let libreria = await obtenerLibreriaId(_id);
    console.log(libreria)
};

 

llenarPerfil();