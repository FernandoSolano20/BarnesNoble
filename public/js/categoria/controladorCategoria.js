let nombreCategoriaInput;
let descripcionCategoriaInput;
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const inputFiltro = document.getElementById('input-filtro');
let listaCategorias = [];

var crearTabla = async (event) => {
    var tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        listaCategorias = await obtenerCategoria();
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaCategorias.length; i++) {
        if (listaCategorias[i].nombre.toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaCategoria(listaCategorias[i]);
        }
    }
    filaNoDatos();
};

var categoriaFunciones = async (event) => {
    nombreCategoriaInput = document.getElementById('nombre-categoria');
    descripcionCategoriaInput = document.getElementById('descripcion-categoria');
    var accion = document.getElementById("modal").getAttribute('data-action');
    if (accion === 'crear') {
        var categoria = {
            nombre: nombreCategoriaInput.value,
            descripcion: descripcionCategoriaInput.value,
            estado: 1
        }
        if (!validarCampos(categoria)) {
            var nuevoCategoria = await crearCategoria(categoria);
            if (nuevoCategoria.success) {
                agregarFilaCategoria(nuevoCategoria.categoria);
                sweetAlertSuccess(nuevoCategoria.message);
                removerForm();
                agregarListaCategoria(nuevoCategoria.categoria);
                var noData = document.getElementById("no-data");
                if(noData){
                    noData.remove();
                }
            }
            else {
                sweetAlertError(nuevoCategoria.message);
            }
        }
        else {
            sweetAlertWarning();
        }
    }
    else {
        var idCategoria = document.getElementById('cuerpo-modal').getAttribute('data-categoria');
        if (accion === 'editar') {
            var categoria = {
                nombre: nombreCategoriaInput.value,
                descripcion: descripcionCategoriaInput.value,
                estado: Number(!document.getElementById(idCategoria).checked)
            }
            if (!validarCampos(categoria)) {
                var nuevoCategoria = await editarCategoria(categoria, idCategoria);
                if (nuevoCategoria.success) {
                    var trElemento = document.querySelector('[data-id="' + nuevoCategoria.categoria._id + '"]');
                    var tdElementos = trElemento.querySelectorAll('td');
                    tdElementos[0].innerText = nuevoCategoria.categoria.nombre;
                    tdElementos[1].innerText = nuevoCategoria.categoria.descripcion;
                    sweetAlertSuccess(nuevoCategoria.message);
                    removerForm();
                    editarListaCategoria(nuevoCategoria.categoria);
                }
                else {
                    sweetAlertError(nuevoCategoria.message);
                }
            }
            else {
                sweetAlertWarning();
            }
        } else if (accion === 'borrar') {
            var trElemento = document.querySelector('[data-id="' + idCategoria + '"]');
            trElemento.remove();
            var result = await eliminarCategoria(idCategoria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm();
                removerListaCategoria(idCategoria);
                filaNoDatos();
            }
            else {
                sweetAlertError(result.message);
            }
        } else if (accion === 'estado') {
            var categoria = {
                estado: Number(!document.getElementById(idCategoria).checked)
            };
            var result = await estadoCategoria(categoria, idCategoria);
            if (result.success) {
                sweetAlertSuccess(result.message);
                removerForm(result.success);
                editarListaCategoria(result.categoria);
            }
            else {
                sweetAlertError(result.message);
            }
        }
    }
}

var agregarFilaCategoria = function (categoria) {
    var tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', categoria._id);
    fila.insertCell().innerHTML = categoria.nombre;
    fila.insertCell().innerHTML = categoria.descripcion;

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
    estadoInput.setAttribute('id', categoria._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !categoria.estado;

    var estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', categoria._id);
    estadoCelda.appendChild(estadoLabel);
}

var filaNoDatos = function () {
    var tbody = document.querySelector('#tabla-elementos tbody');
    if (listaCategorias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        var celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

var validarCampos = function (categoria) {
    var error = false;
    if (categoria.nombre === "" || !regexText.test(categoria.nombre)) {
        error = true;
        nombreCategoriaInput.className = nombreCategoriaInput.className.replace("error", "");
        nombreCategoriaInput.className = nombreCategoriaInput.className + " error";
    }
    else {
        nombreCategoriaInput.className = nombreCategoriaInput.className.replace("error", "");
    }

    if (categoria.descripcion === "") {
        error = true;
        descripcionCategoriaInput.className = descripcionCategoriaInput.className.replace("error", "");
        descripcionCategoriaInput.className = descripcionCategoriaInput.className + " error";
    }
    else {
        descripcionCategoriaInput.className = descripcionCategoriaInput.className.replace("error", "");
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

var removerListaCategoria = function (idCategoria) {
    for (var i = 0; i < listaCategorias.length; i++) {
        if (listaCategorias[i]._id === idCategoria) {
            listaCategorias.splice(i, 1);
            break;
        }
    }
}

var agregarListaCategoria = function (categoria) {
    listaCategorias.push(categoria);
}

var editarListaCategoria = function (categoria) {
    for (var i = 0; i < listaCategorias.length; i++) {
        if (listaCategorias[i]._id === categoria._id) {
            listaCategorias[i].nombre = categoria.nombre;
            listaCategorias[i].descripcion = categoria.descripcion;
            listaCategorias[i].estado = categoria.estado
            break;
        }
    }
}

document.getElementById('confirm').addEventListener('click', categoriaFunciones);
inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();