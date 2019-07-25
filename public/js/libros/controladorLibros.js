'use strict';

const tbody = document.querySelector('#tablaElementos tbody');
let listaLibros = [];
let txtFiltro = document.querySelector('#txtFiltro');

let mostrarTabla = async() => {
    listaLibros = await obtenerLibros();
    tbody.innerHTML = '';


    for (let i = 0; i < listaLibros.length; i++){
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaLibros[i]['caratula'];
        fila.insertCell().innerHTML = listaLibros[i]['titulo'];
        fila.insertCell().innerHTML = listaLibros[i]['idGenero'];
        fila.insertCell().innerHTML = listaLibros[i]['idCategoria'];
        fila.insertCell().innerHTML = listaLibros[i]['idAutor'];
        fila.insertCell().innerHTML = listaLibros[i]['precio'];
    }
};

mostrarTabla();

