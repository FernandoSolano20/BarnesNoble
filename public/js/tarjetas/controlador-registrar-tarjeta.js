'use strict';

const inputNombre1 = document.querySelector('#txt-nombre');
const inputNumTarjeta = document.querySelector('#nmr-tarjeta');
const inputExpiracionMM = document.querySelector('#slt-expiracionMM');
const inputExpiracionYY = document.querySelector('#slt-expiracionYY');
const inputCVV = document.querySelector('#nmr-cvv');
const inputTipoTarjeta = document.querySelector('#slt-tipoTarjeta');
const botonRegistrar = document.querySelector('#btn-registrar');
const successMessage = 'Se ha registrado la tarjeta exitosamente';
const errorMessage = 'No se ha registrado la tarjeta.';

function formReset() {
    document.getElementById("registrarTarjeta").reset();
 }

 let redirect =() =>{
    // window.open("listarTarjetas.html");
    window.location.assign("listarTarjetas.html");
 }

let validar = (pnombre1, ptipoTarjeta, pnumTarjeta, pexpiracionMM, pexpiracionYY, pcvv) => {
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
    if (pexpiracionMM == '') {
        error = true;
        inputExpiracionMM.classList.add('input_error');
    } else {
        inputExpiracionMM.classList.remove('input_error');
    }
    if (pexpiracionYY == '') {
        error = true;
        inputExpiracionYY.classList.add('input_error');
    } else {
        inputExpiracionYY.classList.remove('input_error');
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
    let expiracionMM = inputExpiracionMM.value;
    let expiracionYY = inputExpiracionYY.value;
    let cvv = inputCVV.value;

    // let expiracion = new Date(inputExpiracionMM.value, inputExpiracionYY.value);
    let expiracionFormateada = expiracionMM + ' / ' + expiracionYY;
    let error = validar(nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv);

    if (error == false) {
        registrarTarjeta(nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv);

        console.log(`Nombre: ${nombre1}`);
        console.log(`Tipo de tarjeta ${tipoTarjeta}`);
        console.log(`Numero de Tarjeta: ${numTarjeta}`);
        console.log(`Mes Expiracion:  ${expiracionMM}`)
        console.log(`Ano Expiracion:  ${expiracionYY}`)
        console.log(`Ano Expiracion:  ${expiracionFormateada}`)
        console.log(`Coodigo CVV: ${cvv}`);


        Swal.fire({
            type: 'success',
            title: successMessage,
            text: 'Todo esta trabajando perfectamente.',
            

        })
        formReset();
        
        // redirect();
    } else {
        Swal.fire({
            type: 'warning',
            title: errorMessage,
            text: 'Revise los campos resaltados e intentelo de nuevo.',

        })
    }

};
    

botonRegistrar.addEventListener('click', registrar);
// document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);