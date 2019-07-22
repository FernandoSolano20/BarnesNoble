let nombreCategoriaInput;
let descripcionCategoriaInput;
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const inputFiltro = document.getElementById('input-filtro');
let listaCategorias = [];

let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
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

let categoriaFunciones = async (event) => {
    nombreCategoriaInput = document.getElementById('nombre-categoria');
    descripcionCategoriaInput = document.getElementById('descripcion-categoria');
    let accion = document.getElementById("modal").getAttribute('data-action');
    if (accion === 'crear') {
        let categoria = {
            nombre: nombreCategoriaInput.value,
            descripcion: descripcionCategoriaInput.value,
            estado: 1
        }
        if (!validarCampos(categoria)) {
            let nuevoCategoria = await crearCategoria(categoria);
            if (nuevoCategoria.success) {
                agregarFilaCategoria(nuevoCategoria.categoria);
                sweetAlertSuccess(nuevoCategoria.message);
                removerForm();
                agregarListaCategoria(nuevoCategoria.categoria);
                let noData = document.getElementById("no-data");
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
        let idCategoria = document.getElementById('cuerpo-modal').getAttribute('data-categoria');
        if (accion === 'editar') {
            let categoria = {
                nombre: nombreCategoriaInput.value,
                descripcion: descripcionCategoriaInput.value,
                estado: Number(!document.getElementById(idCategoria).checked)
            }
            if (!validarCampos(categoria)) {
                let nuevoCategoria = await editarCategoria(categoria, idCategoria);
                if (nuevoCategoria.success) {
                    let trElemento = document.querySelector('[data-id="' + nuevoCategoria.categoria._id + '"]');
                    let tdElementos = trElemento.querySelectorAll('td');
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
            let trElemento = document.querySelector('[data-id="' + idCategoria + '"]');
            trElemento.remove();
            let result = await eliminarCategoria(idCategoria);
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
            let categoria = {
                estado: Number(!document.getElementById(idCategoria).checked)
            };
            let result = await estadoCategoria(categoria, idCategoria);
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

let agregarFilaCategoria = function (categoria) {
    let tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', categoria._id);
    fila.insertCell().innerHTML = categoria.nombre;
    fila.insertCell().innerHTML = categoria.descripcion;

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
    estadoInput.setAttribute('id', categoria._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !categoria.estado;

    let estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', categoria._id);
    estadoCelda.appendChild(estadoLabel);
}

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (listaCategorias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

let validarCampos = function (categoria) {
    let error = false;
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

let removerListaCategoria = function (idCategoria) {
    for (let i = 0; i < listaCategorias.length; i++) {
        if (listaCategorias[i]._id === idCategoria) {
            listaCategorias.splice(i, 1);
            break;
        }
    }
}

let agregarListaCategoria = function (categoria) {
    listaCategorias.push(categoria);
}

let editarListaCategoria = function (categoria) {
    for (let i = 0; i < listaCategorias.length; i++) {
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