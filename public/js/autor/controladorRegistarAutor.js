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
const alertResenna = document.querySelector('#alertResenna')
const inputResenna = document.querySelector('#resenna');
const alertEstado = document.querySelector('#alertEstado')
const inputEstado = document.querySelector('#estado');

let validarNombre = function () {
    let validarNomAutor = {
        value: inputnombre.value,
        alert: alertNombre,
        input: inputnombre
    }

    return !(noVacio(validarNomAutor) && validarTexto(validarNomAutor));
};

let validarNombreArtistico = function () {
    let validarNomArtistico = {
        value: inputNomArtistico.value,
        alert: alertNomArtistico,
        input: inputNomArtistico
    }

    return !(noVacio(validarNomArtistico) && validarTexto(validarNomArtistico));
};

let validarFechaNacimiento = function () {
    let validarFechaNac = {
        value: inputNomArtistico.value,
        alert: alertNomArtistico,
        input: inputNomArtistico
    }

    return !(validarFecha(validarFechaNac) && validarFechaMayorActual(validarFechaNacs));
};

let validarFechaMuerte = function () {
    let validarFechaMuer = {
        value: inputMuerte.value,
        alert: alertMuerte,
        input: inputMuerte
    }
    if (!(validarFecha(validarFechaMuer) && validarMuerte(validarFechaMuer))) {
        return true
    }
}

function validarMuerte (elementos) {
    let nacimento = inputNacimiento.value;
    nacimento = new Date(nacimento);
    let muerte = new Date(elementos.value);

    if (muerte < nacimento) {
        elementos.alert.innerText = "Seleccione una fecha posterior a la fecha de nacimiento."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return true;
    }
    else {
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.alert.className = elementos.alert.className + " alertHidden";
        elementos.input.className = elementos.input.className.replace("inputError", "");
        return false;
    }
};

let validarNacionalidad = function () {
    let validarNac = {
        value: inputNacionalidad.value,
        alert: alertNacionalidad,
        input: inputNacionalidad
    }

    return !(noVacio(validarNac) && validarTexto(validarNac));
};

let validarResenna = function (){
    let validarRes = {
        value: inputResenna.value,
        alert: alertResenna,
        input: inputResenna
    }
    return !(noVacio(validarRes) && validarTexto(validarRes));
}

//botonRegistrar.addEventListener('click');
inputnombre.addEventListener('blur', validarNombre);
inputnombre.addEventListener('blur', validarNombreArtistico);
inputnombre.addEventListener('blur', validarFechaNacimiento);
inputMuerte.addEventListener('blur', validarFechaMuerte);
inputnombre.addEventListener('blur', validarNacionalidad);
inputnombre.addEventListener('blur', validarResenna);