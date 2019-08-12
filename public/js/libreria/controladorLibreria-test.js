let nombreComercialInput;
let nombreFantasiaInput;
let provinciaIput;
let cantonInput;
let distritoInput;
const inputFiltro = document.getElementById('input-filtro');

let listaLibrerias = [];

let crearTabla = async (event) => {
    let tbody = document.querySelector('#tbl_librerias tbody');
    if (!event) {
        if (sessionStorage.tipoUsuario != 'Lector') {
            let btn = document.createElement('a');
            btn.type = "button";
            btn.setAttribute('class', 'material-blue');
            btn.href = "registroLibreria.html";
            document.getElementById('boton').appendChild(btn);

            let label = document.createTextNode('Crear Libreria');
            btn.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btn.insertBefore(icon, label);


            let fila = tbody.insertRow();
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

        if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
            listaLibrerias = await obtenerLibrerias();
        }
        else {
            listaLibrerias = await obtenerLibreriaPorId(sessionStorage.id);
        }

    }
    

    tbody.innerHTML = '';
    let filtro = inputFiltro.value;
    for (let i = 0; i < listaLibrerias.length; i++) {
        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro)) {
            agregarFilaLibreria(listalibrerias[i]);
        }
    }
    filaNoDatos();
};

let libreriaFunciones = async (event) => {
    nombreComercialInput = document.getElementById('nombre-comercial-input');
    nombreFantasiaInput = document.getElementById('nombre-fantasia-input');
    

    let accion = document.getElementById("modal").getAttribute('data-action');
    if (accion === 'crear') {
       
        let idLibreria = document.getElementById('cuerpo-modal').getAttribute('data-libreria');
        if (accion === 'editar') {
            let libreria = {
                nombre: nombreComercialInput.value,
                descripcion: descripcionlibreriaInput.value,
                estado: Number(!document.getElementById(idLibreria).checked)
            }
            if (!validarCampos(libreria)) {
                let nuevolibreria = await editarlibreria(libreria, idLibreria);
                if (nuevolibreria.success) {
                    let trElemento = document.querySelector('[data-id="' + nuevolibreria.libreria._id + '"]');
                    let tdElementos = trElemento.querySelectorAll('td');
                    tdElementos[0].innerText = nuevolibreria.libreria.nombre;
                    tdElementos[1].innerText = nuevolibreria.libreria.descripcion;
                    sweetAlertSuccess(nuevolibreria.message);
                    removerForm();
                    editarListaLibreria(nuevolibreria.libreria);
                }
                else {
                    sweetAlertError(nuevolibreria.message);
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
                editarListaLibreria(result.libreria);
            }
            else {
                sweetAlertError(result.message);
            }
        }
    }
}

let agregarFilaLibreria = function (libreria) {
    let tbody = document.querySelector('#tbl_librerias tbody');
    let fila = tbody.insertRow();
    fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.nombreComercial;

      fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.nombreComercialFantasia;

    fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.provincia;

   
    fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.canton;

   
    fila.setAttribute('data-id', libreria._id);
    fila.insertCell().innerHTML = libreria.distrito;

  
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

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (listalibrerias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
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

let editarListaLibreria = function (libreria) {
    for (let i = 0; i < listalibrerias.length; i++) {
        if (listalibrerias[i]._id === libreria._id) {
            listalibrerias[i].nombre = libreria.nombreComercial;
            listalibrerias[i].descripcion = libreria.nombreFantasia;
            listalibrerias[i].descripcion = libreria.provincia;
            listalibrerias[i].descripcion = libreria.canton;
            listalibrerias[i].descripcion = libreria.distrito;
            listalibrerias[i].estado = libreria.estado
            break;
        }
    }
}

document.getElementById('confirm').addEventListener('click', libreriaFunciones);
// inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();