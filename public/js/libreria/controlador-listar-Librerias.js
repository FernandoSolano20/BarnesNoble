'use strict';

let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async (event) => {
    let tbody = document.querySelector('#tbl_librerias tbody');
       if (!event) {
        if (sessionStorage.tipoUsuario != 'Lector') {
            let btn = document.createElement('a');
            btn.type = "button";
            btn.setAttribute('class', 'material-blue-crear');
            btn.href = "registroLibreria.html";
            document.getElementById('boton').appendChild(btn);
            listaLibrerias = await obtenerLibrerias();

            let label = document.createTextNode('Crear Libreria');
            btn.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btn.insertBefore(icon, label);
          }

        if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
            listaLibrerias = await obtenerLibrerias();
        }
        else {
            listaLibrerias = await obtenerLibreriaPorId(sessionStorage.id);
        }

    }
    tbody.innerHTML = '';

    let filtro = txtFiltro.value.toLowerCase();
    for (let i = 0; i < listaLibrerias.length; i++) {
        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro)) {

            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['canton'];
            fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];

           let celda_perfil = fila.insertCell();
            let divContendor = document.createElement("div");
            divContendor.setAttribute('class', 'crear-contenedor');

            let btnPerfil = document.createElement('button');

            btnPerfil.innerText = 'Ver Perfil'
            btnPerfil.dataset._id = listaLibrerias[i]['_id'];
            btnPerfil.setAttribute('class', 'material-blue-perfil')
            btnPerfil.addEventListener('click', function () {
                window.location.href = `perfilLibreria.html?id=${this.dataset._id}`;
            });
            celda_perfil.appendChild(divContendor);
            divContendor.appendChild(btnPerfil);

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
            estadoInput.setAttribute('id', libreria._id);
            estadoInput.setAttribute('type', 'checkbox');
            estadoCelda.appendChild(estadoInput);
            estadoInput.checked = !libreria.estado;

            let estadoLabel = document.createElement('label');
            estadoLabel.setAttribute('data-action', 'estado');
            estadoLabel.setAttribute('for', libreria._id);
            estadoCelda.appendChild(estadoLabel);
        }
    }
    filaNoDatos();
};

let libreriaFunciones = async (event) => {
    nombreComercialInput = document.getElementById('nombreComercial');
    nombreFantasiaInput = document.getElementById('nombreFantasia');
    provinciaInput = document.getElementById('nombreFantasia');
    cantonInput = document.getElementById('canton');
    distritoInput = document.getElementById('distrito');

    let accion = document.getElementById("modal").getAttribute('data-action');
          let idLibreria = document.getElementById('cuerpo-modal').getAttribute('data-libreria');
        if (accion === 'editar') {
            let libreria = {
                nombreComercial: nombreComercialInput.value,
                nombreFantasia: nombreFantasiaInput.value,
                provincia: provinciaInput.value,
                canton: cantonInput.value,
                distrito: distritoInput.value,

                estado: Number(!document.getElementById(idfLibreria).checked)
            }
            
        } else if (accion === 'borrar') {
            let trElemento = document.querySelector('[data-id="' + idGenero + '"]');
            trElemento.remove();
            let result = await eliminarGenero(idGenero);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm();
                removerListaGenero(idGenero);
                filaNoDatos();
            }
            else {
                sweetAlertError(result.message);
            }
        } else if (accion === 'estado') {
            let genero = {
                estado: Number(!document.getElementById(idGenero).checked)
            };
            let result = await estadoGenero(genero, idGenero);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm(result.success);
                editarListaGenero(result.genero);
            }
            else {
                sweetAlertError(result.message);
            }
        }
    }
}

mostrar_tabla();
document.getElementById('confirm').addEventListener('click', libreriaFunciones);
txtFiltro.addEventListener('keyup', mostrar_tabla);

let filaNoDatos = function () {
    if (listaLibrerias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}