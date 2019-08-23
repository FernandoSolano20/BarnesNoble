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
            btnPerfil.setAttribute('class', 'material-blue')
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
    // filaNoDatos();
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
                estado: Number(!document.getElementById(idLibreria).checked)
            }
            if (!validarCampos(libreria)) {
                let nuevaLibreria = await editarGenero(libreria, idLibreria);
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
                    editarListaLibreria(nuevaLibreria.genero);
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
            let result = await eliminarGenero(idLibreria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm();
                removerListaGenero(idLibreria);
                filaNoDatos();
            }
            else {
                sweetAlertError(result.message);
            }
        } else if (accion === 'estado') {
            let libreria = {
                estado: Number(!document.getElementById(idLibreria).checked)
            };
            let result = await estadoGenero(libreria, idLibreria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm(result.success);
                editarListaGenero(result.libreria);
            }
            else {
                sweetAlertError(result.message);
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
