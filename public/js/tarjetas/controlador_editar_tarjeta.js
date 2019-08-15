'use strict';

const btnGuardar = document.querySelector("#guardar");
const input_nombre1 = document.querySelector('#nombre1');
const input_tipoTarjeta = document.querySelector('#tipoTarjeta');
const input_numTarjeta = document.querySelector('#numTarjeta');
const input_expiracionMM = document.querySelector('#mes');
const input_expiracionYY = document.querySelector('#year');
const input_cvv = document.querySelector('#cvv');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
let cargar_formulario = async () =>{
            let listaTarjetas = await obtenerTarjetasUsuario(_id);
            if (listaTarjetas) {
                input_tipoTarjeta.value = listaTarjetas['tipoTarjeta'];
                input_numTarjeta.value = listaTarjetas['numTarjeta'];
                input_nombre1.value = listaTarjetas['nombre1'];                
                input_expiracionMM.value = listaTarjetas['expiracionMM'];
                input_expiracionYY.value = listaTarjetas['expiracionYY'];
                input_cvv.value = listaTarjetas['cvv'];
            }
        };
        
        cargar_formulario();

let editar = () => {

        modificar(_id, input_nombre1.value, input_tipoTarjeta.value, input_numTarjeta.value, input_expiracionMM.value, input_expiracionYY.value, input_cvv.value );
 };
        
        
cargar_formulario();
btnGuardar.addEventListener('click', guardar);
// redirect();





// let tarjeta = JSON.parse(localStorage.getItem("tarjeta"));


// let modificarTarjeta = (id) => {
//     console.log(id);
//     let nombre1 = document.querySelector('#nombre1').value;
//     let tipoTarjeta = document.querySelector('#tipo').value;
//     let numTarjeta = document.querySelector('#numTarjeta').value;
//     let expiracionMM = document.querySelector('#mes').value;
//     let expiracionYY = document.querySelector('#year').value;
//     let cvv = document.querySelector('#cvv').value;
//     editarTarjetaServicio(id, nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv );
// }

// document.querySelector("#guardar").addEventListener("click", function () {
//     modificarTarjeta(tarjeta._id);
// });

// let llenarFormulario = () => {

//     document.querySelector('#nombre1').value = tarjeta.nombre1;
//     document.querySelector('#tipo').value = tarjeta.tipoTarjeta;
//     document.querySelector('#numTarjeta').value = tarjeta.numTarjeta;
//     document.querySelector('#mes').value = tarjeta.expiracionMM;
//     document.querySelector('#year').value = tarjeta.expiracionYY;
//     document.querySelector('#cvv').value = tarjeta.cvv;
//     limpiar();
// };


// let limpiar = () => {
//     localStorage.removeItem("tarjeta");
// }
let redirect = () => {
    window.location.assign("listarTarjetas.html");
}

// llenarFormulario();
// redirect();


// const botonRegistrar = document.querySelector('#registrar');

// const cardnoVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
// const cardnoMasterCard = /^(?:5[1-5][0-9]{14})$/;
// const cardnoAmerican = /^(?:3[47][0-9]{13})$/;

// const nombreInput = document.getElementById('nombre1');
// const alertNombre = document.getElementById('alert-nombre');

// const tarjetaInput = document.getElementById('numTarjeta');
// const alertTarjeta = document.getElementById('alert-tarjeta');

// const tipoInput = document.getElementById('tipo');
// const alertTipo = document.getElementById('alert-tipo');

// const mesInput = document.getElementById('mes');
// const alertMes = document.getElementById('alert-mes');

// const yearInput = document.getElementById('year');
// const alertYear = document.getElementById('alert-year');

// const cvvInput = document.getElementById('cvv');
// const alertCvv = document.getElementById('alert-cvv');



// let redirect = () => {
//     window.location.assign("listarTarjetas.html");
// }

// let validarDatosTarjetas = async () => {

//     let error = validarNombre() | validarTarjeta() | validarExpMM() | validarExpYY() | validarCVV();
//     if (!error) {
//         let nombre1 = nombreInput.value;
//         let numTarjeta = tarjetaInput.value;
//         let tipoTarjeta = tipoInput.value;
//         let expiracionMM = mesInput.value;
//         let expiracionYY = yearInput.value;
//         let cvv = cvvInput.value;

//         let tarjeta = {
//             nombre: nombre1,
//             tipo: tipoTarjeta,
//             numero: numTarjeta,
//             mes: expiracionMM,
//             year: expiracionYY,
//             cvv: cvv,
//             usuario: sessionStorage.id
//         }

//         let nuevaTarjeta = await registrarTarjeta(tarjeta);

//         if (nuevaTarjeta.success) {
//             Swal.fire({
//                 title: nuevaTarjeta.message,
//                 type: 'success',
//                 text: 'Se tarjeta se registró correctamente'

//             })
//             redirect();
//         } else {
//             Swal.fire({
//                 title: nuevaTarjeta.message,
//                 type: 'error'
//             })
//         }
//     }
//     else {
//         Swal.fire({
//             title: 'No se ha realizado el registro',
//             type: 'warning',
//             text: 'Revise los campos resaltados e inténtelo de nuevo'
//         })
//     }
// };


// let validarNombre = function () {

//     let validarNombre = {
//         value: nombreInput.value,
//         alert: alertNombre,
//         input: nombreInput
//     }

//     return !(noVacio(validarNombre) && validarTexto(validarNombre));
// };
// let validarTarjeta = function () {
//     let validarNumTarjeta = {
//         value: tarjetaInput.value,
//         alert: alertTarjeta,
//         input: tarjetaInput
//     }

//     let tipoTarjeta = tipoInput.value;

//     if (!validarNumeros(validarNumTarjeta)) {
//         return true;
//     }
//     else if ((tipoTarjeta == 'Visa' || tipoTarjeta == 'MasterCard') && validarNumTarjeta.value.length != 16) {
//         alertTarjeta.innerText = "Debe tener 16 dígitos."
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         tarjetaInput.className = tarjetaInput.className + " inputError";
//         return true;
//     }
//     else if (tipoTarjeta == 'AmericanExpress' && validarNumTarjeta.value.length != 15) {
//         alertTarjeta.innerText = "Debe tener 15 dígitos."
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         tarjetaInput.className = tarjetaInput.className + " inputError";
//         return true;
//     }
//     else if (tipoTarjeta == 'Visa' && !cardnoVisa.test(validarNumTarjeta.value)) {
//         alertTarjeta.innerText = "La tarjeta Visa inicia con el número 4."
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         tarjetaInput.className = tarjetaInput.className + " inputError";
//         return true;
//     }
//     else if (tipoTarjeta == 'MasterCard' && !cardnoMasterCard.test(validarNumTarjeta.value)) {
//         alertTarjeta.innerText = "La tarjeta Master Card inicia con el número 5."
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         tarjetaInput.className = tarjetaInput.className + " inputError";
//         return true;
//     }
//     else if (tipoTarjeta == 'AmericanExpress' && !cardnoAmerican.test(validarNumTarjeta.value)) {
//         alertTarjeta.innerText = "La tarjeta American Express inicia con el número 37 o 34."
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         tarjetaInput.className = tarjetaInput.className + " inputError";
//         return true;
//     }
//     else {
//         alertTarjeta.className = alertTarjeta.className.replace("alertHidden", "");
//         alertTarjeta.className = alertTarjeta.className + " alertHidden";
//         tarjetaInput.className = tarjetaInput.className.replace("inputError", "");
//         return false;
//     }
// };

// let validarCVV = function () {
//     let cvv = {
//         value: cvvInput.value,
//         alert: alertCvv,
//         input: cvvInput
//     }
//     if (!validarNumeros(cvv)) {
//         return true;
//     }
//     else if (cvv.value.length != 3) {
//         alertCvv.innerText = "Debe tener 3 dígitos."
//         alertCvv.className = alertCvv.className.replace("alertHidden", "");
//         cvvInput.className = cvvInput.className.replace("inputError", "");
//         cvvInput.className = cvvInput.className + " inputError";
//         return true;
//     }
//     else {
//         alertCvv.className = alertCvv.className.replace("alertHidden", "");
//         alertCvv.className = alertCvv.className + " alertHidden";
//         cvvInput.className = cvvInput.className.replace("inputError", "");
//         return false;
//     }
// };

// let validarExpMM = function () {
//     let mes = {
//         value: mesInput.value,
//         alert: alertMes,
//         input: mesInput
//     }
//     return !(validarSelect(mes));
// };

// let validarExpYY = function () {
//     let year = {
//         value: yearInput.value,
//         alert: alertYear,
//         input: yearInput
//     }
//     return !(validarSelect(year));
// };


// function cardnumberMastercard(inputtxt) {
//     var cardno = /^(?:5[1-5][0-9]{14})$/;
//     if (inputtxt.value.match(cardno)) {
//         return true;
//     }
//     else {
//         alert("Not a valid Mastercard number!");
//         return false;
//     }
// }

// nombreInput.addEventListener('blur', validarNombre);
// tarjetaInput.addEventListener('blur', validarTarjeta);
// mesInput.addEventListener('change', validarExpMM);
// yearInput.addEventListener('change', validarExpYY);
// cvvInput.addEventListener('blur', validarCVV);
// document.getElementById('registrar').addEventListener('click', validarDatosTarjetas);
// // botonRegistrar.addEventListener('click', registrar);

