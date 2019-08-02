'use strict';
const inputFiltro = document.getElementById('input-filtro');
const tbody = document.querySelector('#tabla-elementos tbody');
let listaOfertas = [];
let txtFiltro = document.querySelector('#input-filtro');


let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        if (sessionStorage.tipoUsuario == "Adminitrador plataforma") {
            listaOfertas = await obtenerOfertas();
        }
        else {
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
        }
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaOfertas.listaOfertas.length; i++) {
        if (listaOfertas.listaOfertas[i].nombre.toLowerCase().includes(filtro.toLowerCase()) || listaOfertas.listaOfertas[i].descripcion.toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaGenero(listaOfertas.listaOfertas[i]);
        }

    }
    filaNoDatos();
};



//for (let i = 0; i < listaOfertas.length; i++) {
let agregarFilaGenero = function (listaOfertas) {
    let tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();

    fila.setAttribute('data-id', listaOfertas._id);
    fila.insertCell().innerHTML = listaOfertas.nombre + " " + listaOfertas.descripcion;
    let descripcion = "";
    if (listaOfertas.autor)
        descripcion = "Autor: " + listaOfertas.autor.nombre + "<br>";

    if (listaOfertas.categoria)
        descripcion = "Categoría: " + listaOfertas.categoria.nombre + "<br>";

    if (listaOfertas.libro)
        descripcion = "Libro: " + listaOfertas.libro.titulo + "<br>";

    if (listaOfertas.genero)
        descripcion = "Género: " + listaOfertas.genero.nombre + "<br>";

    fila.insertCell().innerHTML = descripcion;
    if (listaOfertas.sucursal) {
        fila.insertCell().innerHTML = listaOfertas.sucursal.nombre;
    }
    else {
        fila.insertCell().innerHTML = listaOfertas.libreria.nombreFantasia;
    }

    let editarCelda = fila.insertCell();
    let editar = document.createElement('i');
    editar.setAttribute('class', 'far fa-edit');
    editar.setAttribute('data-action', 'editar');
    editarCelda.appendChild(editar);

    let eliminarCelda = fila.insertCell();
    let eliminar = document.createElement('i');
    eliminar.setAttribute('class', 'fal fa-trash-alt');
    eliminar.setAttribute('data-action', 'borrar');
    eliminarCelda.appendChild(eliminar);

    let estadoCelda = fila.insertCell();

    let estadoInput = document.createElement('input');
    estadoInput.setAttribute('class', 'switch');

    estadoInput.setAttribute('id', listaOfertas._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !listaOfertas.estado;

    let estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', listaOfertas._id);
    estadoCelda.appendChild(estadoLabel);

}
    ;

let filaNoDatos = function () {
    if (listaOfertas.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}


//document.getElementById('confirm').addEventListener('click', generoFunciones);
inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();

document.querySelector('#crear-elemento').addEventListener('click', function () {
    window.location.href = 'http://localhost:3000/registrarOferta.html';
})
