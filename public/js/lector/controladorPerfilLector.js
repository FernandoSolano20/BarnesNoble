'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const nombre = document.querySelector('#nombre');
const identificacion = document.querySelector('#id')
const correo = document.querySelector('#correo');
const fecha = document.querySelector('#fecha');
const telefono = document.querySelector('#telefono');
const sexo = document.querySelector('#sexo')

let llenar_perfil = async() => {
    let lector = await obtenerLectorId(_id);
    if (lector) {
        nombre.innerHTML = lector['nombre'];
        correo.innerHTML = lector['correo'];
        fecha.innerHTML = lector['nacimiento'];
    }
};

llenar_perfil();