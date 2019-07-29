'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const txt_nombreComercial = document.querySelector('#txt-nombreComercial');
const txt_nombreFantasia = document.querySelector('#txt-nombreFantasia');
const txt_provincia = document.querySelector('#txt-provincia');
const txt_canton = document.querySelector('#txt-canton');
const txt_distrito = document.querySelector('#txt-distrito');


let llenarPerfil = async () => {

    let libreria = await obtenerLibreriaId(_id);
    console.log(libreria)

    if (libreria) {
        txt_nombreComercial.innerHTML = libreria['nombreComercial'];
        txt_nombreFantasia.innerHTML = libreria['nombreFantasia'];
        txt_provincia.innerHTML = libreria['provincia'];
        txt_canton.innerHTML = libreria['canton'];
        txt_distrito.innerHTML = libreria['distrito'];

    }
};

llenarPerfil();

// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }

// function currentDiv(n) {
//   showDivs(slideIndex = n);
// }

// function showDivs(n) {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   if (n > x.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = x.length}
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" w3-white", "");
//   }
//   x[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " w3-white";
// }