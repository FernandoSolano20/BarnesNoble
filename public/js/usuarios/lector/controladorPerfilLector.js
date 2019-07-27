'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const txt_nombre = document.querySelector('#txt_nombre');
const txt_correo = document.querySelector('#txt_correo');
const txt_fecha = document.querySelector('#txt_fecha');

let llenar_perfil = async() => {
    let contacto = await obtenerContactoId(_id);
    if (contacto) {
        txt_nombre.innerHTML = contacto['nombre'];
        txt_correo.innerHTML = contacto['correo'];
        txt_fecha.innerHTML = contacto['nacimiento'];
    }
};

llenar_perfil();