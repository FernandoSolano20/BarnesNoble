'use strict';

const inputNombre1 = document.querySelector('#txt-nombre');
const inputNumTarjeta = document.querySelector('#nmr-tarjeta');
const inputExpiracion = document.querySelector('#dt-expiracion');
const inputCVV = document.querySelector('#nmr-cvv');
const inputTipoTarjeta = document.querySelector('#slt-tipoTarjeta');
const botonRegistrar = document.querySelector('#btn-registrar');
const successMessage = 'Se ha registrado la tarjeta exitosamente';
const errorMessage = 'No se ha registrado la tarjeta.';

let validar = (pnombre1, pnumTarjeta, pexpiracion, pcvv, ptipoTarjeta) => {
    let error = false;
    if (pnombre1 == '') {
        error = true;
        inputNombre1.classList.add('input_error');
    } else {
        inputNombre1.classList.remove('input_error');
    }
    if (ptipoTarjeta == '') {
        error = true;
        inputTipoTarjeta.classList.add('input_error');
    } else {
        inputTipoTarjeta.classList.remove('input_error');
    }
    if (pnumTarjeta == '') {
        error = true;
        inputNumTarjeta.classList.add('input_error');
    } else {
        inputNumTarjeta.classList.remove('input_error');
    }
    if (pexpiracion == 'Invalid Date') {
        error = true;
        inputExpiracion.classList.add('input_error');
    } else {
        inputExpiracion.classList.remove('input_error');
    }
    if (pcvv == '') {
        error = true;
        inputCVV.classList.add('input_error');
    } else {
        inputCVV.classList.remove('input_error');
    }
    return error;
}

let registrar = () => {
    let nombre1 = inputNombre1.value;
    let tipoTarjeta = inputTipoTarjeta.value;
    let numTarjeta = inputNumTarjeta.value;
    let cvv = inputCVV.value;
    let expiracion = new Date(inputExpiracion.value);
    let expiracionFormateada = Number(expiracion.getUTCMonth() + 1) + ' - ' + Number(expiracion.getUTCDate()) + " - " + expiracion.getFullYear();

    let error = validar(nombre1, tipoTarjeta, numTarjeta, expiracion, cvv);

    if (error == false) {
        registrarTarjeta(nombre1, tipoTarjeta, numTarjeta, expiracion, cvv);

        console.log(`Nombre: ${nombre1}`);
        console.log(`Tipo de tarjeta ${tipoTarjeta}`);
        console.log(`Numero de Tarjeta: ${numTarjeta}`);
        console.log(`Coodigo CVV: ${cvv}`);
        console.log(`Expiracion:  ${expiracionFormateada}`)

        Swal.fire({
            type: 'success',
            title: successMessage,
            text: 'Todo esta trabajando perfectamente.',

        })
    } else {
        Swal.fire({
            type: 'warning',
            title: errorMessage,
            text: 'Revise los campos resaltados e intentelo de nuevo.',

        })
    }
};

// function validarIdent(identificacion) {
//     var idPatron = /^[0-9]{9}$/;

//     if (identificacion.value = idPatron) {
//         return false;

//     } else {

//         return true;

//     }

// }

botonRegistrar.addEventListener('click', registrar);
// document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);