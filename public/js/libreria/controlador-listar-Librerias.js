'use strict';

let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

let mostrar_tabla = async (event) => {
    let tbody = document.querySelector('#tbl_librerias tbody');
    if (!event) {
        if (sessionStorage.tipoUsuario != 'Lector') {
            let btn = document.createElement('a');
            btn.type = "button";
            btn.setAttribute('class', 'material-blue');
            btn.href = "registroLibreria.html";
            document.getElementById('boton').appendChild(btn);
            listaLibrerias = await obtenerLibrerias();

            let label = document.createTextNode('Crear Libreria');
            btn.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btn.insertBefore(icon, label);
            document.getElementById('lib').innerHTML += '<th>Eliminar</th><th>Activar/Desactivar</th>';
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
            fila.setAttribute("data-id", listaLibrerias[i]._id)
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
            btnPerfil.setAttribute('class', 'material-blue')
            btnPerfil.addEventListener('click', function () {
                window.location.href = `perfilLibreria.html?id=${this.dataset._id}`;
            });
            celda_perfil.appendChild(divContendor);
            divContendor.appendChild(btnPerfil);

            if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {


                let eliminarCelda = fila.insertCell();
                let eliminar = document.createElement('i');
                eliminar.setAttribute('class', 'fal fa-trash-alt');
                eliminar.setAttribute('data-action', 'borrar');
                eliminarCelda.appendChild(eliminar);

                let estadoCelda = fila.insertCell();

                let estadoInput = document.createElement('input');
                estadoInput.setAttribute('class', 'switch');
                estadoInput.setAttribute('id', listaLibrerias[i]._id);
                estadoInput.setAttribute('type', 'checkbox');
                estadoCelda.appendChild(estadoInput);
                estadoInput.checked = !listaLibrerias[i].estado;

                let estadoLabel = document.createElement('label');
                estadoLabel.setAttribute('data-action', 'estado');
                estadoLabel.setAttribute('for', listaLibrerias[i]._id);
                estadoCelda.appendChild(estadoLabel);
            }
        }
    }
    // filaNoDatos();
};


mostrar_tabla();

txtFiltro.addEventListener('keyup', mostrar_tabla);

let filaNoDatos = function () {
    let tbody = document.querySelector('#tbl_librerias tbody');
    if (listaLibrerias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '10');
    }
}


let validarCampos = function (genero) {
    let error = false;
    if (genero.nombre === "" || !regexText.test(genero.nombre)) {
        error = true;
        nombreGeneroInput.className = nombreGeneroInput.className.replace("error", "");
        nombreGeneroInput.className = nombreGeneroInput.className + " error";
    }
    else {
        nombreGeneroInput.className = nombreGeneroInput.className.replace("error", "");
    }

    if (genero.descripcion === "") {
        error = true;
        descripcionGeneroInput.className = descripcionGeneroInput.className.replace("error", "");
        descripcionGeneroInput.className = descripcionGeneroInput.className + " error";
    }
    else {
        descripcionGeneroInput.className = descripcionGeneroInput.className.replace("error", "");
    }

    return error;
}

let sweetAlertSuccess = function (message) {
    Swal.fire({
        type: 'success',
        title: message
    });
}

let sweetAlertWarning = function () {
    Swal.fire({
        type: 'warning',
        title: 'No se ha enviado su mensaje exitosamente',
        text: 'Revise los campos resaltados e intételo de nuevo'
    });
}

let sweetAlertError = function (message) {
    Swal.fire({
        type: 'error',
        title: message
    });
}

let removerListaGenero = function (idGenero) {
    for (let i = 0; i < listaGeneros.length; i++) {
        if (listaGeneros[i]._id === idGenero) {
            listaGeneros.splice(i, 1);
            break;
        }
    }
}

let agregarListaGenero = function (genero) {
    listaGeneros.push(genero);
}

let editarListaGenero = function (genero) {
    for (let i = 0; i < listaGeneros.length; i++) {
        if (listaGeneros[i]._id === genero._id) {
            listaGeneros[i].nombre = genero.nombre;
            listaGeneros[i].descripcion = genero.descripcion;
            listaGeneros[i].estado = genero.estado
            break;
        }
    }
}
