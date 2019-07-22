let nombreGeneroInput;
let descripcionGeneroInput;
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const inputFiltro = document.getElementById('input-filtro');
let listaGeneros = [];

let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        listaGeneros = await obtenerGenero();
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaGeneros.length; i++) {
        if (listaGeneros[i].nombre.toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaGenero(listaGeneros[i]);
        }
    }
    filaNoDatos();
};

let generoFunciones = async (event) => {
    nombreGeneroInput = document.getElementById('nombre-genero');
    descripcionGeneroInput = document.getElementById('descripcion-genero');
    let accion = document.getElementById("modal").getAttribute('data-action');
    if (accion === 'crear') {
        let genero = {
            nombre: nombreGeneroInput.value,
            descripcion: descripcionGeneroInput.value,
            estado: 1
        }
        if (!validarCampos(genero)) {
            let nuevoGenero = await crearGenero(genero);
            if (nuevoGenero.success) {
                agregarFilaGenero(nuevoGenero.genero);
                sweetAlertSuccess(nuevoGenero.message);
                removerForm();
                agregarListaGenero(nuevoGenero.genero);
                let noData = document.getElementById("no-data");
                if(noData){
                    noData.remove();
                }
            }
            else {
                sweetAlertError(nuevoGenero.message);
            }
        }
        else {
            sweetAlertWarning();
        }
    }
    else {
        let idGenero = document.getElementById('cuerpo-modal').getAttribute('data-genero');
        if (accion === 'editar') {
            let genero = {
                nombre: nombreGeneroInput.value,
                descripcion: descripcionGeneroInput.value,
                estado: Number(!document.getElementById(idGenero).checked)
            }
            if (!validarCampos(genero)) {
                let nuevoGenero = await editarGenero(genero, idGenero);
                if (nuevoGenero.success) {
                    let trElemento = document.querySelector('[data-id="' + nuevoGenero.genero._id + '"]');
                    let tdElementos = trElemento.querySelectorAll('td');
                    tdElementos[0].innerText = nuevoGenero.genero.nombre;
                    tdElementos[1].innerText = nuevoGenero.genero.descripcion;
                    sweetAlertSuccess(nuevoGenero.message);
                    removerForm();
                    editarListaGenero(nuevoGenero.genero);
                }
                else {
                    sweetAlertError(nuevoGenero.message);
                }
            }
            else {
                sweetAlertWarning();
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

let agregarFilaGenero = function (genero) {
    let tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', genero._id);
    fila.insertCell().innerHTML = genero.nombre;
    fila.insertCell().innerHTML = genero.descripcion;

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
    estadoInput.setAttribute('id', genero._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !genero.estado;

    let estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', genero._id);
    estadoCelda.appendChild(estadoLabel);
}

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (listaGeneros.length === 0 || tbody.childElementCount === 0) {
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

document.getElementById('confirm').addEventListener('click', generoFunciones);
inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();