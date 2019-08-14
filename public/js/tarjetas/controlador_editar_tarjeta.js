'use strict';

let tarjeta = JSON.parse(localStorage.getItem("tarjeta"));


let modificarTarjeta = (id) => {
    console.log(id);
    let nombre1 = document.querySelector('#nombre1').value;
    let tipoTarjeta = document.querySelector('#tipo').value;
    let numTarjeta = document.querySelector('#numTarjeta').value;
    let expiracionMM = document.querySelector('#mes').value;
    let expiracionYY = document.querySelector('#year').value;
    let cvv = document.querySelector('#cvv').value;
    editarTarjetaServicio(id, nombre1, tipoTarjeta, numTarjeta, expiracionMM, expiracionYY, cvv );
}

document.querySelector("#guardar").addEventListener("click", function () {
    modificarTarjeta(tarjeta._id);
});

let llenarFormulario = () => {

    document.querySelector('#nombre1').value = tarjeta.nombre1;
    document.querySelector('#tipo').value = tarjeta.tipoTarjeta;
    document.querySelector('#numTarjeta').value = tarjeta.numTarjeta;
    document.querySelector('#mes').value = tarjeta.expiracionMM;
    document.querySelector('#year').value = tarjeta.expiracionYY;
    document.querySelector('#cvv').value = tarjeta.cvv;
    limpiar();
};


let limpiar = () => {
    localStorage.removeItem("tarjeta");
}
let redirect = () => {
    window.location.assign("listarTarjetas.html");
}

llenarFormulario();
redirect();