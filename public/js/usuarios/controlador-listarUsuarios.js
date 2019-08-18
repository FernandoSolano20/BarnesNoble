'use strict';

const tbody = document.querySelector('#tabla-elementos tbody');
let lista_usuarios = [];
let txt_filtro = document.querySelector('#input-filtro');


let mostrar_tabla = async (event) => {

    if (!event) {
        lista_usuarios = await obtenerUsuarios();
    }

    tbody.innerHTML = '';
    let filtro = txt_filtro.value.toLowerCase();

    for (let i = 0; i < lista_usuarios.length; i++) {
        if (String(lista_usuarios[i]['nombre']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['segundoNombre']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['primerApellido']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['segundoApellido']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['alias']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['telefono']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['correo']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['nacimiento']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['sexo']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['id']).toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.setAttribute('data-id',lista_usuarios[i]._id);
            fila.insertCell().innerHTML = lista_usuarios[i]['id'];
            fila.insertCell().innerHTML = lista_usuarios[i]['nombre'] + " " + lista_usuarios[i]['primerApellido'];
            fila.insertCell().innerHTML = lista_usuarios[i]['tipoUsuario'];
            fila.insertCell().innerHTML = lista_usuarios[i]['correo'];


            let editarCelda = fila.insertCell();
            let editar = document.createElement('i');
            editar.setAttribute('class', 'far fa-edit');
            editar.setAttribute('data-action', 'editar');
            editar.setAttribute('data-usuario', lista_usuarios[i].tipoUsuario)
            editarCelda.appendChild(editar);

            let eliminarCelda = fila.insertCell();
            let eliminar = document.createElement('i');
            eliminar.setAttribute('class', 'fal fa-trash-alt');
            eliminar.setAttribute('data-action', 'borrar');
            eliminarCelda.appendChild(eliminar);

            let estadoCelda = fila.insertCell();

            let estadoInput = document.createElement('input');
            estadoInput.setAttribute('class', 'switch');
            estadoInput.setAttribute('id', lista_usuarios[i]._id);
            estadoInput.setAttribute('type', 'checkbox');
            estadoCelda.appendChild(estadoInput);
            estadoInput.checked = !lista_usuarios[i].estado;

            let estadoLabel = document.createElement('label');
            estadoLabel.setAttribute('data-action', 'estado');
            estadoLabel.setAttribute('for', lista_usuarios[i]._id);
            estadoCelda.appendChild(estadoLabel);

            let celda_perfil = fila.insertCell();
            let divContenedor = document.createElement("div");
            divContenedor.setAttribute('class', 'crear-contenedor');
            celda_perfil.appendChild(divContenedor);

            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = 'Ver perfil';
            boton_perfil.dataset._id = lista_usuarios[i]['_id'];
            boton_perfil.setAttribute('class', 'material-blue');
            divContenedor.appendChild(boton_perfil);

            boton_perfil.addEventListener('click', function () {
                window.location.href = `perfilUsuario.html?id=${this.dataset._id}`

            });
        }
    }
    filaNoDatos();
};

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (lista_usuarios.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '8');
    }
};

txt_filtro.addEventListener('keyup', mostrar_tabla);
mostrar_tabla();