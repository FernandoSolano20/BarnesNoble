'use strict';

const tbody = document.querySelector('#tbl_sucursales tbody');
let lista_sucursales = [];
let txt_filtro = document.querySelector('#txt_filtro');


let mostrar_tabla = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario != 'Lector') {
            let btn = document.createElement('a');
            btn.type = "button";
            btn.setAttribute('class', 'material-blue');
            btn.href = "registrarSucursal.html";
            document.getElementById('boton').appendChild(btn);
            
            let label = document.createTextNode('Crear');
            btn.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btn.insertBefore(icon, label);
            
        }
        if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
            lista_sucursales = await obtenerSucursales();
        }
        else {
            lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
            lista_sucursales = lista_sucursales.usuario.libreria.sucursales;
        }
    }

    tbody.innerHTML = '';


    for (let i = 0; i < lista_sucursales.length; i++) {
        if (lista_sucursales[i].sucursal) {
            agregarFilaSucursal(lista_sucursales[i].sucursal);
        }
        else {
            agregarFilaSucursal(lista_sucursales[i]);
        }
    }
};

let agregarFilaSucursal = function (sucursal) {
    let filtro = txt_filtro.value.toLowerCase();
    if (sucursal['nombre'].toLowerCase().includes(filtro) || sucursal['correo'].toLowerCase().includes(filtro) || sucursal['telefono'].toLowerCase().includes(filtro)) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = sucursal['nombre'];
        fila.insertCell().innerHTML = sucursal['correo'];
        fila.insertCell().innerHTML = sucursal['telefono'];

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
        estadoInput.setAttribute('id', sucursal._id);
        estadoInput.setAttribute('type', 'checkbox');
        estadoCelda.appendChild(estadoInput);

        let estadoLabel = document.createElement('label');
        estadoLabel.setAttribute('data-action', 'estado');
        estadoLabel.setAttribute('for', sucursal._id);
        estadoCelda.appendChild(estadoLabel);
    }
}


mostrar_tabla();
txt_filtro.addEventListener('keyup', mostrar_tabla);
