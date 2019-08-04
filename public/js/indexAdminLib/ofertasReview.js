'use strict';
const inputFiltro = document.getElementById('input-filtro');
const tbodyOferta = document.querySelector('#tablaOferta tbody');
let listaOfertas = [];


let crearTabla = async (event) => {

    let usuario = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
    let tiendas = {
        libreria: usuario.usuario.libreria._id
    }
    let sucursal = [];
    let sucursales = usuario.usuario.libreria.sucursales;
    if (sucursales) {
        for (let i = 0; i < sucursales.length; i++) {
            sucursal.push(sucursales[i].sucursal._id);
        }
        tiendas.sucursal = sucursal;
    }

    listaOfertas = await obtenerOfertasPorLibreria(tiendas);

    tbodyOferta.innerHTML = '';
    for (let i = 0; i < listaOfertas.listaOfertas.length; i++) {
        agregarFilaGenero(listaOfertas.listaOfertas[i]);

    }
    filaNoDatosOfertas();
};



//for (let i = 0; i < listaOfertas.length; i++) {
let agregarFilaGenero = function (listaOfertas) {
    let fila = tbodyOferta.insertRow();

    fila.setAttribute('data-id', listaOfertas._id);
    fila.insertCell().innerHTML = listaOfertas.nombre + " " + listaOfertas.descripcion;

    if (listaOfertas.sucursal) {
        fila.insertCell().innerHTML = listaOfertas.sucursal.nombre;
    }
    else {
        fila.insertCell().innerHTML = listaOfertas.libreria.nombreFantasia;
    }
}
    ;

let filaNoDatosOfertas = function () {
    if (listaOfertas.length === 0 || tbodyOferta.childElementCount === 0) {
        let fila = tbodyOferta.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

crearTabla();

document.querySelector('#crear-elemento').addEventListener('click', function () {
    window.location.href = 'http://localhost:3000/registrarOferta.html';
})
