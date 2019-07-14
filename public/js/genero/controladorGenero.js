let nombreGeneroInput;
let descripcionGeneroInput;
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const inputFiltro = document.getElementById('input-filtro');
let listaGeneros = [];

var crearTabla = async (event) => {
    var tbody = document.querySelector('#tabla-elementos tbody');
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

var generoFunciones = async (event) => {
    nombreGeneroInput = document.getElementById('nombre-genero');
    descripcionGeneroInput = document.getElementById('descripcion-genero');
    var accion = document.getElementById("modal").getAttribute('data-action');
    if (accion === 'crear') {
        var genero = {
            nombre: nombreGeneroInput.value,
            descripcion: descripcionGeneroInput.value,
            estado: 1
        }
        if (!validarCampos(genero)) {
            var nuevoGenero = await crearGenero(genero);
            if (nuevoGenero.success) {
                agregarFilaGenero(nuevoGenero.genero);
                sweetAlertSuccess(nuevoGenero.message);
                removerForm();
                agregarListaGenero(nuevoGenero.genero);
                var noData = document.getElementById("no-data");
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
        var idGenero = document.getElementById('cuerpo-modal').getAttribute('data-genero');
        if (accion === 'editar') {
            var genero = {
                nombre: nombreGeneroInput.value,
                descripcion: descripcionGeneroInput.value,
                estado: Number(!document.getElementById(idGenero).checked)
            }
            if (!validarCampos(genero)) {
                var nuevoGenero = await editarGenero(genero, idGenero);
                if (nuevoGenero.success) {
                    var trElemento = document.querySelector('[data-id="' + nuevoGenero.genero._id + '"]');
                    var tdElementos = trElemento.querySelectorAll('td');
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
            var trElemento = document.querySelector('[data-id="' + idGenero + '"]');
            trElemento.remove();
            var result = await eliminarGenero(idGenero);
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
            var genero = {
                estado: Number(!document.getElementById(idGenero).checked)
            };
            var result = await estadoGenero(genero, idGenero);
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

var agregarFilaGenero = function (genero) {
    var tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', genero._id);
    fila.insertCell().innerHTML = genero.nombre;
    fila.insertCell().innerHTML = genero.descripcion;

    var editarCelda = fila.insertCell();
    var editar = document.createElement('i');
    editar.setAttribute('class', 'far fa-edit');
    editar.setAttribute('data-action', 'editar');
    editarCelda.appendChild(editar);

    var eliminarCelda = fila.insertCell();
    var eliminar = document.createElement('i');
    eliminar.setAttribute('class', 'fal fa-trash-alt');
    eliminar.setAttribute('data-action', 'borrar');
    eliminarCelda.appendChild(eliminar);

    var estadoCelda = fila.insertCell();

    var estadoInput = document.createElement('input');
    estadoInput.setAttribute('class', 'switch');
    estadoInput.setAttribute('id', genero._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !genero.estado;

    var estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', genero._id);
    estadoCelda.appendChild(estadoLabel);
}

var filaNoDatos = function () {
    var tbody = document.querySelector('#tabla-elementos tbody');
    if (listaGeneros.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        var celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

var validarCampos = function (genero) {
    var error = false;
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

var sweetAlertSuccess = function (message) {
    Swal.fire({
        type: 'success',
        title: message
    });
}

var sweetAlertWarning = function () {
    Swal.fire({
        type: 'warning',
        title: 'No se ha enviado su mensaje exitosamente',
        text: 'Revise los campos resaltados e intételo de nuevo'
    });
}

var sweetAlertError = function (message) {
    Swal.fire({
        type: 'error',
        title: message
    });
}

var removerListaGenero = function (idGenero) {
    for (var i = 0; i < listaGeneros.length; i++) {
        if (listaGeneros[i]._id === idGenero) {
            listaGeneros.splice(i, 1);
            break;
        }
    }
}

var agregarListaGenero = function (genero) {
    listaGeneros.push(genero);
}

var editarListaGenero = function (genero) {
    for (var i = 0; i < listaGeneros.length; i++) {
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