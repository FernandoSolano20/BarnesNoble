'use strict';

let listaLibrerias = [];
let nombreComercialInput = document.getElementById('nombreComercial');
let nombreFantasiaInput;
let provinciaInput;
let cantonInput;
let distritoInput;
let txtFiltro = document.querySelector('#txt-filtro');
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

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
        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro.toLowerCase())
            || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro.toLowerCase())
            || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro.toLowerCase())
            || listaLibrerias[i]['canton'].toLowerCase().includes(filtro.toLowerCase())
            || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro.toLowerCase())) {

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
            estadoInput.setAttribute('id', libreria.id);
            estadoInput.setAttribute('type', 'checkbox');
            estadoCelda.appendChild(estadoInput);
            estadoInput.checked = !libreria.estado;

            let estadoLabel = document.createElement('label');
            estadoLabel.setAttribute('data-action', 'estado');
            estadoLabel.setAttribute('for', libreria.id);
            estadoCelda.appendChild(estadoLabel);
        }
    }
    
    filaNoDatos();
};


let libreriaFunciones = async (event) => {
    nombreComercialInput = document.getElementById('nombreComercial');
    nombreFantasiaInput = document.getElementById('nombreFantasia');
    provinciaInput = document.getElementById('provincia');
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
                estado: Number(!document.getElementById(idLibreria).checked)
            }
            if (!validarCampos(libreria)) {
                let nuevaLibreria = await editarlibreria(libreria, idLibreria);
                if (nuevaLibreria.success) {
                    let trElemento = document.querySelector('[data-id="' + nuevaLibreria.libreria._id + '"]');
                    let tdElementos = trElemento.querySelectorAll('td');
                    tdElementos[0].innerText = nuevaLibreria.libreria.nombreComercial;
                    tdElementos[1].innerText = nuevaLibreria.libreria.nombreFantasia;
                    tdElementos[2].innerText = nuevaLibreria.libreria.provincia;
                    tdElementos[3].innerText = nuevaLibreria.libreria.canton;
                    tdElementos[4].innerText = nuevaLibreria.libreria.distrito;

                    sweetAlertSuccess(nuevaLibreria.message);
                    removerForm();
                    editarListaLibreria(nuevaLibreria.libreria);
                }
                else {
                    sweetAlertError(nuevaLibreria.message);
                }
            }
            else {
                sweetAlertWarning();
            }
        } else if (accion === 'borrar') {
            let trElemento = document.querySelector('[data-id="' + idLibreria + '"]');
            trElemento.remove();
            let result = await eliminarlibreria(idLibreria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm();
                removerListalibreria(idLibreria);
                filaNoDatos();
            }
            else {
                sweetAlertError(result.message);
            }
        } else if (accion === 'estado') {
            let libreria = {
                estado: Number(!document.getElementById(idLibreria).checked)
            };
            let result = await estadolibreria(libreria, idLibreria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm(result.success);
                editarListalibreria(result.libreria);
            }
            else {
                sweetAlertError(result.message);
            }
        }
    }
let agregarFilaLibreria = function (libreria)  {
    let tbody = document.querySelector('#tbl_librerias tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.nombreComercial;
    let nombreComercialFila = fila.insertCell();
    nombreComercialFila.innerHTML = libreria.nombreFantasia;
    nombreComercialFila.setAttribute('class','left');

    let nombreFantasiaFila = fila.insertCell();
    nombreFantasiaFila.innerHTML = libreria.nombreFantasia;
    nombreFantasiaFila.setAttribute('class','left');

    let provinciaFila = fila.insertCell();
    provinciaFila.innerHTML = libreria.provincia;
    provinciaFila.setAttribute('class','left');

    let cantonFila = fila.insertCell();
    cantonFila.innerHTML = libreria.canton;
    cantonFila.setAttribute('class','left');
    
    let distritoFila = fila.insertCell();
    distritoFila.innerHTML = libreria.distrito;
    distritoFila.setAttribute('class','left');

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

mostrar_tabla();

let filaNoDatos = function () {
    if (listaLibrerias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

let validarCampos = function (libreria) {
    let error = false;
    if (libreria.nombre === "" || !regexText.test(libreria.nombre)) {
        error = true;
        nombreComercialInput.className = nombreComercialInput.className.replace("error", "");
        nombreComercialInput.className = nombreComercialInput.className + " error";
    }
    else {
        nombreComercialInput.className = nombreComercialInput.className.replace("error", "");
    }

    if (libreria.nombreFantasia === "") {
        error = true;
        nombreFantasiaInput.className = nombreFantasiaInput.className.replace("error", "");
        nombreFantasiaInput.className = nombreFantasiaInput.className + " error";
    }
    else {
        nombreFantasiaInput.className = nombreFantasiaInput.className.replace("error", "");
    }
    if (libreria.provincia === "") {
        error = true;
        provinciaInput.className = provinciaInput.className.replace("error", "");
        provinciaInput.className = provinciaInput.className + " error";
    }
    else {
        provinciaInput.className = provinciaInput.className.replace("error", "");
    }
    if (libreria.canton === "") {
        error = true;
        cantonInput.className = cantonInput.className.replace("error", "");
        cantonInput.className = cantonInput.className + " error";
    }
    else {
        cantonInput.className = cantonInput.className.replace("error", "");
    }
    if (libreria.distrito === "") {
        error = true;
        distritoInput.className = distritoInput.className.replace("error", "");
        distritoInput.className = distritoInput.className + " error";
    }
    else {
        distritoInput.className = distritoInput.className.replace("error", "");
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

let removerListalibreria = function (idLibreria) {
    for (let i = 0; i < listalibrerias.length; i++) {
        if (listalibrerias[i]._id === idLibreria) {
            listalibrerias.splice(i, 1);
            break;
        }
    }
}

let agregarListalibreria = function (libreria) {
    listalibrerias.push(libreria);
}

let editarListalibreria = function (libreria) {
    for (let i = 0; i < listalibrerias.length; i++) {
        if (listalibrerias[i]._id === libreria._id) {
            listalibrerias[i].nombreComercial = libreria.nombreComercial;
            listalibrerias[i].nombreFantasia = libreria.nombreFantasia;
            listalibrerias[i].provincia = libreria.provincia;
            listalibrerias[i].canton = libreria.canton;
            listalibrerias[i].distrito = libreria.distrito;
            listalibrerias[i].estado = libreria.estado
            break;
        }
    }
 }
// let reverseLibreria = function (listaLibrerias) {
//     var listaLibreriasInversa = [];
//     listaLibreriasInversa.reverse();
// }

document.getElementById('confirm').addEventListener('click', libreriaFunciones);
txtFiltro.addEventListener('keyup', mostrar_tabla);
// mostrar_Tabla();