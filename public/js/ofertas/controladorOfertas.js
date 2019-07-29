'use strict';
const inputFiltro = document.getElementById('input-filtro');
const tbody = document.querySelector('#tabla-elementos tbody');
let listaOfertas = [];
let txtFiltro = document.querySelector('#input-filtro');


    let crearTabla = async (event) => {
        let tbody = document.querySelector('#tabla-elementos tbody');
        if (!event) {
            listaOfertas = await obtenerOfertas();
        }
        let filtro = inputFiltro.value;

        tbody.innerHTML = '';
        for (let i = 0; i < listaOfertas.length; i++) {
            if (listaOfertas[i].nombre.toLowerCase().includes(filtro.toLowerCase())||listaOfertas[i].descripcion.toLowerCase().includes(filtro.toLowerCase())) {
                agregarFilaGenero(listaOfertas[i]);
            }

            }
        filaNoDatos();
    };



    //for (let i = 0; i < listaOfertas.length; i++) {
        let agregarFilaGenero = function (listaOfertas) {
            let tbody = document.querySelector('#tabla-elementos tbody');
            let fila = tbody.insertRow();
            
            fila.setAttribute('data-id', listaOfertas._id);
            fila.insertCell().innerHTML = listaOfertas.nombre;
            fila.insertCell().innerHTML = listaOfertas.descripcion;


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




//document.getElementById('confirm').addEventListener('click', generoFunciones);
inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();

document.querySelector('#crear-elemento').addEventListener('click',function(){
    window.location.href= 'http://localhost:3000/registrarOferta.html';
})
