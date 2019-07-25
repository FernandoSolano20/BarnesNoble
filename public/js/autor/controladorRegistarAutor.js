'use strict';

const botonRegistrar = document.querySelector('#registrar');

const alertNombre = document.querySelector('#alertNombre')
const inputnombre = document.querySelector('#nombre');
const alertNomArtistico = document.querySelector('#alertNomArtistico')
const inputNomArtistico = document.querySelector('#nomArtistico');
const alertNac = document.querySelector('#alertaNac')
const inputNacimiento = document.querySelector('#nacimiento');
const alertMuerte = document.querySelector('#alertaMuerte')
const inputMuerte = document.querySelector('#muerte');
const alertNacionalidad = document.querySelector('#alertNacionalidad')
const inputNacionalidad = document.querySelector('#paises');
const alertResenna = document.querySelector('#alertResenna')
const inputResenna = document.querySelector('#resenna');
const imgInput = document.getElementById('img');
const imgAlert = document.getElementById('alert-img');

let validarDatosAutor = async () => {

    let error = validarNombre() | validarNombreArtistico() | validarFechaNacimiento() | validarFechaMuerte() | validarNacionalidad() | validarResenna() | validarFotoPerfil();
    if (!error) {
        let imgValue = document.getElementById('img');
        let imgResult = await crearImagen(imgValue);
        let nombre = inputnombre.value;
        let nombreArtistico = inputNomArtistico.value;
        let nacimiento = new Date(inputNacimiento.value);
        nacimiento = nacimiento.getFullYear() + '-' + Number(nacimiento.getUTCMonth() + 1) + '-' + nacimiento.getUTCDate();
        let nacionalidad = inputNacionalidad.value;
        let fechaMuerte = inputMuerte.value;
        let resenna = inputResenna.value;
        let autor = {
            nombre: nombre,
            nombreArtistico: nombreArtistico,
            fechaNacimiento: nacimiento,
            nacionalidad: nacionalidad,
            fechaMuerte: fechaMuerte,
            resenna: resenna,
            estado: 1,
            foto: imgResult.result.secure_url
        }

        let nuevoUsuario = await registrarAutor(autor);
        if (nuevoUsuario.success) {
            Swal.fire({
                title: nuevoUsuario.message,
                type: 'success',
                text: 'Se ha relizado su registro correctamente'
            })
        } else {
            Swal.fire({
                title: nuevoUsuario.message,
                type: 'error'
            })
        }
    }
    else {
        Swal.fire({
            title: 'No se ha realizado el registro',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }
};


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
        value: inputNacimiento.value,
        alert: alertNac,
        input: inputNacimiento
    }

    return !(validarFecha(validarFechaNac) && validarFechaMayorActual(validarFechaNac));
};

let validarFechaMuerte = function () {
    let validarFechaMuer = {
        value: inputMuerte.value,
        alert: alertMuerte,
        input: inputMuerte
    }
    if (!(validarFecha(validarFechaMuer) && validarFechaMayorActual(validarFechaMuer) && validarMuerte(validarFechaMuer))) {
        return true
    }
}

function validarMuerte(elementos) {
    let nacimento = inputNacimiento.value;
    nacimento = new Date(nacimento);
    let muerte = new Date(elementos.value);

    if (muerte < nacimento) {
        elementos.alert.innerText = "Seleccione una fecha posterior a la fecha de nacimiento."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    else {
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.alert.className = elementos.alert.className + " alertHidden";
        elementos.input.className = elementos.input.className.replace("inputError", "");
        return true;
    }
};

let validarNacionalidad = function () {
    let validarNac = {
        value: inputNacionalidad.value,
        alert: alertNacionalidad,
        input: inputNacionalidad
    }

    return !(validarSelect(validarNac));
};

let validarResenna = function () {
    let validarRes = {
        value: inputResenna.value,
        alert: alertResenna,
        input: inputResenna
    }
    return !(noVacio(validarRes) && validarTexto(validarRes));
};

let validarFotoPerfil = function () {
    let elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}

inputnombre.addEventListener('blur', validarNombre);
inputNomArtistico.addEventListener('blur', validarNombreArtistico);
inputNacimiento.addEventListener('blur', validarFechaNacimiento);
inputMuerte.addEventListener('blur', validarFechaMuerte);
inputNacionalidad.addEventListener('blur', validarNacionalidad);
inputResenna.addEventListener('blur', validarResenna);
imgInput.addEventListener("change", validarFotoPerfil);
document.getElementById('registrar').addEventListener('click', validarDatosAutor);