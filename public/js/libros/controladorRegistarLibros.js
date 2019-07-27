'use strict' //archivo controlador para registarlibros
const idRadios = document.querySelectorAll('[name="id"]');

const tituloInput = document.getElementById('titulo');
const idAlert = document.getElementById('');

const edicionInput = document.getElementById('edicionInput');
const edicionAlert = document.getElementById('alertEdicion');

const editorialInput = document.getElementById('editorialInput');
const editorialAlert = document.getElementById('alertEditorial');

const ISBN10Input = document.getElementById('ISBN10Input');
const ISBN10Alert = document.getElementById('alertISBN10');

const ISBN13Input = document.getElementById('ISBN13Input');
const ISBN13Alert = document.getElementById('alertISBN13');

const precioInput = document.getElementById('precioInput');
const precioAlert = document.getElementById('alertPrecio');

const imgInput1 = document.getElementById('img1');
const imgAlert1 = document.getElementById('alertImg1');

const imgInput2 = document.getElementById('img2');
const imgAlert2 = document.getElementById('alertImg2');

const botonRegistrar = document.querySelector('#registrar');


let registrarLibros =()=> {
    console.log('hola');
}

botonRegistrar.addEventListener('click', registrarLibros);