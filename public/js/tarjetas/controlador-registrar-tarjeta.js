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
const tarjetaInput = document.getElementById('tarjeta');
const tarjetaAlert = document.getElementById('alert-tarjeta');
let regexTarjeta = /^[0-9<]{16}$/;

function formReset() {
    document.getElementById("registrarTarjeta").reset();
 }

 let redirect =() =>{
      window.location.assign("listarTarjetas.html");
 }
 let validarTarjeta = () =>{
    let numTarjeta = document.getElementById("nmr-tarjeta").value;
    let regexTarjeta = /^[0-9<]{16}$/;

    if(numTarjeta != regexTarjeta){
        error = true;
    }
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
    if (pnumTarjeta ==  regexTarjeta()) {
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
    // let expiracionFormateada = expiracionMM + ' / ' + expiracionYY;
    let error = validar(nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv) | validarTarjeta();

    if (error == false) {
        registrarTarjeta(nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv);

           Swal.fire({
            type: 'success',
            title: successMessage,
            
            
       })
        formReset();            
        redirect();

    } else {
        Swal.fire({
            type: 'warning',
            title: errorMessage,
            text: 'Revise los campos resaltados e intentelo de nuevo.',

        })
    }
   

};
botonRegistrar.addEventListener('click', registrar);





function validarCC() {
    numero = document.getElementById('nmr-tarjeta').value;
    tipo = document.getElementById('slt-tipoTarjeta').value;
    if (checkCreditCard(numero, tipo)) {
      alert("Credit card has a valid format")
    } else {
      alert(ccErrors[ccErrorNo])
    };
  }
