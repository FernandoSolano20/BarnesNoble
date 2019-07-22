'use strict';

const botonRegistrar = document.querySelector('#btnRegistrar');

const alertNombre = document.querySelector('#alertNombre')
const inputnombre = document.querySelector('#nombre');
const alertNomArtistico = document.querySelector('#alertNomArtistico')
const inputNomArtistico = document.querySelector('#nomArtistico');
const alertNac = document.querySelector('#alertaNac')
const inputNacimiento = document.querySelector('#nacimiento');
const alertMuerte = document.querySelector('#alertaMuerte')
const inputMuerte = document.querySelector('#muerte');
const alertNacionalidad = document.querySelector('#alertNacionalidad')
const inputNacionalidad = document.querySelector('#nacionalidad');
const alertLugarNac = document.querySelector('#alertaNac')
const inputLugarNac = document.querySelector('#lugarNac');
const alertResenna = document.querySelector('#alertResenna')
const inputResenna = document.querySelector('#resenna');
const alertEstado = document.querySelector('#alertEstado')
const inputEstado = document.querySelector('#estado');

let validarNombre = function () {
    let validaNomAuto = {
        value: inputnombre.value,
        alert: alertNombre,
        input: inputnombre
    };

    return !(noVacio(validaNomAuto) && validarTexto(validaNomAuto));
}



//botonRegistrar.addEventListener('click');
inputnombre.addEventListener('blur', validarNombre);