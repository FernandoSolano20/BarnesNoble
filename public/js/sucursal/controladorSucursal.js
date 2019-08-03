'use strict';

const tbody = document.querySelector('#tbl_sucursales tbody');
let lista_sucursales = [];
let txt_filtro = document.querySelector('#txt_filtro');
const thead = document.querySelector('#tbl_sucursales thead');
let listaLibreria;


let mostrar_tabla = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
            lista_sucursales = await obtenerTiendas();
            listaLibreria = lista_sucursales;
            lista_sucursales = lista_sucursales.listaLibrerias;
           
        }
        else {
            lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
            lista_sucursales = lista_sucursales.usuario.libreria.sucursales;
        }
    }

    tbody.innerHTML = '';
if (sessionStorage.tipoUsuario == 'Adminitrador librería'){
    let fila = thead.insertRow();
    fila.insertCell().innerHTML = 'Nombre';
    fila.insertCell().innerHTML = 'Correo';
    fila.insertCell().innerHTML = 'Teléfono';
    fila.insertCell().innerHTML = 'Editar';
    fila.insertCell().innerHTML = 'Eliminar';
    fila.insertCell().innerHTML = 'Activar/Desactivar';
} else{
    let fila = thead.insertRow();
    fila.insertCell().innerHTML = 'Nombre';
    fila.insertCell().innerHTML = 'Correo';
    fila.insertCell().innerHTML = 'Teléfono';
    fila.insertCell().innerHTML = 'Librería';
    fila.insertCell().innerHTML = 'Editar';
    fila.insertCell().innerHTML = 'Eliminar';
    fila.insertCell().innerHTML = 'Activar/Desactivar';

}

    for (let i = 0; i < lista_sucursales.length; i++) {
        if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
            agregarFilaSucursal(lista_sucursales[i].sucursal);
        }
        else {
            agregarFilaSucursal(lista_sucursales[i].sucursal, listaLibreria.listaLibrerias.nombreFantasia);
        }
    }
    filaNoDatos();
};

let agregarFilaSucursal = function (sucursal, libreria) {
    let filtro = txt_filtro.value.toLowerCase();
    if (sucursal['nombre'].toLowerCase().includes(filtro) || sucursal['correo'].toLowerCase().includes(filtro) || sucursal['telefono'].toLowerCase().includes(filtro)) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = sucursal['nombre'];
        fila.insertCell().innerHTML = sucursal['correo'];
        fila.insertCell().innerHTML = sucursal['telefono'];

        if (libreria){
            fila.insertCell().innerHTML = libreria;
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
        estadoInput.setAttribute('id', sucursal._id);
        estadoInput.setAttribute('type', 'checkbox');
        estadoCelda.appendChild(estadoInput);

        let estadoLabel = document.createElement('label');
        estadoLabel.setAttribute('data-action', 'estado');
        estadoLabel.setAttribute('for', sucursal._id);
        estadoCelda.appendChild(estadoLabel);
    }
    filaNoDatos();
}

    // if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
    //     let fila = tbody.insertRow();
    //     fila.insertCell().innerHTML = lista_usuarios[i]['libreria']; 
    // }

let filaNoDatos = function () {
    let tbody = document.querySelector('#tbl_sucursales tbody');
    if (lista_sucursales.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

mostrar_tabla();
txt_filtro.addEventListener('keyup', mostrar_tabla);

document.querySelector('#crear-elemento').addEventListener('click', function () {
    window.location.href = 'http://localhost:3000/registrarSucursal.html';
})