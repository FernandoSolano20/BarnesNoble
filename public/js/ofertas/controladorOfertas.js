'use strict';
let nombreGeneroInput;
let descripcionGeneroInput;
const inputFiltro = document.getElementById('input-filtro');
const tbody = document.querySelector('#tabla-elementos tbody');
let listaOfertas = [];
let txtFiltro = document.querySelector('#input-filtro');
let mensajeCrearOferta = "La oferta se creó correctamente";


let crearTabla = async (event) => {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        if (sessionStorage.tipoUsuario == "Adminitrador plataforma") {
            listaOfertas = await obtenerOfertas();
        }
        else {
            let usuario = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
            let tiendas = {
                libreria: usuario.usuario.libreria._id
            }
            let sucursal = [];
            let sucursales = usuario.usuario.libreria.sucursales;
            if (sucursales) {
                for (let i = 0; i < sucursales.length; i++) {
                    sucursal.push(sucursales[i].sucursal._id);
                }
                tiendas.sucursal = sucursal;
            }

            listaOfertas = await obtenerOfertasPorLibreria(tiendas);
        }
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaOfertas.listaOfertas.length; i++) {
        if (listaOfertas.listaOfertas[i].nombre.toLowerCase().includes(filtro.toLowerCase()) || listaOfertas.listaOfertas[i].descripcion.toLowerCase().includes(filtro.toLowerCase()) || (listaOfertas.listaOfertas[i].autor ? listaOfertas.listaOfertas[i].autor.nombre : "").toLowerCase().includes(filtro.toLowerCase()) || (listaOfertas.listaOfertas[i].genero ? listaOfertas.listaOfertas[i].genero.nombre : "").toLowerCase().includes(filtro.toLowerCase()) || (listaOfertas.listaOfertas[i].categoria ? listaOfertas.listaOfertas[i].categoria.nombre : "").toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaGenero(listaOfertas.listaOfertas[i], i);
        }

    }
    filaNoDatos();
};

let redireccionarEditar = function (listaOfertas) {
    localStorage.setItem("ofertaEditar", JSON.stringify(listaOfertas));
    window.location = "editarOferta.html";
}

/* let eliminarOferta = function (listaOfertas) {
    console.log("oferta eliminada");
} */



//for (let i = 0; i < listaOfertas.length; i++) {
let agregarFilaGenero = function (listaOfertas, i) {
    let tbody = document.querySelector('#tabla-elementos tbody');
    let fila = tbody.insertRow();

    fila.setAttribute('data-id', listaOfertas._id);
    fila.insertCell().innerHTML = listaOfertas.nombre + " " + listaOfertas.descripcion;
    let descripcion = "";
    if (listaOfertas.autor)
        descripcion += "Autor: " + listaOfertas.autor.nombre + "<br>";

    if (listaOfertas.categoria)
        descripcion += "Categoría: " + listaOfertas.categoria.nombre + "<br>";

    if (listaOfertas.libro)
        descripcion += "Libro: " + listaOfertas.libro.titulo + "<br>";

    if (listaOfertas.genero)
        descripcion += "Género: " + listaOfertas.genero.nombre + "<br>";

    let descripcionFila = fila.insertCell();
    descripcionFila.innerHTML = descripcion;
    descripcionFila.setAttribute('class', 'left');
    if (listaOfertas.sucursal) {
        fila.insertCell().innerHTML = listaOfertas.sucursal.nombre;
    }
    else {
        fila.insertCell().innerHTML = listaOfertas.libreria.nombreFantasia;
    }

    let editarCelda = fila.insertCell();
    let editar = document.createElement('i');
    editar.setAttribute('class', 'far fa-edit');
    editar.addEventListener("click", function () {
        redireccionarEditar(listaOfertas);
    })
    editarCelda.appendChild(editar);

    let eliminarCelda = fila.insertCell();
    let eliminar = document.createElement('i');
    eliminar.setAttribute('class', 'fal fa-trash-alt');
    eliminar.addEventListener("click", function () {
        Swal.fire({
            title: 'Eliminar',
            text: "¿Está seguro que quiere eliminar esta oferta?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            //llamar al servicio para borrar elemento
            if (result.value) {
                let response = await eliminarOferta(listaOfertas._id);
                if (response.success) {
                    Swal.fire(
                        'Eliminado',
                        response.message,
                        'success'
                    ).then((result) => {
                        window.location.href = 'listarOfertas.html';
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: response.message,
                        text: 'Algo salió mal!'
                    })
                }

            }
        })
    })
    eliminarCelda.appendChild(eliminar);

    let estadoCelda = fila.insertCell();

    let estadoInput = document.createElement('input');
    estadoInput.setAttribute('class', 'switch');
    estadoInput.setAttribute('data-id', listaOfertas._id);
    estadoInput.addEventListener('click', function (event) {
        let inputRadio = event.target;
        let idElemento = inputRadio.getAttribute('data-id');
        if (!inputRadio.checked) {
            Swal.fire({
                title: 'Activar',
                text: "¿Está seguro que quiere activar esta oferta?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Activar'
            }).then(async (result) => {
                if (result.value) {
                    let oferta = {
                        estado: true
                    }
                    let response = await estadoOferta(oferta, idElemento)
                    if (response.success) {
                        Swal.fire(
                            'Activar',
                            'La oferta se activó con éxito',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Ocurrio un error',
                            'La oferta no se activó con éxito',
                            'error'
                        ).then((result) => {
                            window.location.href = 'listarOfertas.html';
                        })
                    }
                } else {
                    inputRadio.checked = true;
                }
            })
        }
        else {
            Swal.fire({
                title: 'Desactivar?',
                text: "¿Está seguro que quiere desactivar esta oferta?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Desactivar'
            }).then(async (result) => {
                if (result.value) {
                    let oferta = {
                        estado: false
                    }
                    let response = await estadoOferta(oferta, idElemento);
                    if (response.success) {
                        Swal.fire(
                            'Desactivado',
                            'La oferta se desactivo con éxito',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Ocurrio un error',
                            'La oferta no se desactivo con éxito',
                            'error'
                        ).then((result) => {
                            window.location.href = 'listarOfertas.html';
                        })
                    }
                } else {
                    inputRadio.checked = false;
                }
            })
        }
    })

    estadoInput.setAttribute('id', listaOfertas._id);
    estadoInput.setAttribute('type', 'checkbox');
    estadoCelda.appendChild(estadoInput);
    estadoInput.checked = !listaOfertas.estado;

    let estadoLabel = document.createElement('label');
    estadoLabel.setAttribute('data-action', 'estado');
    estadoLabel.setAttribute('for', listaOfertas._id);
    estadoCelda.appendChild(estadoLabel);

}


let filaNoDatos = function () {
    if (listaOfertas.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}


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
                if (noData) {
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
            let result = await eliminarOferta(idGenero);
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
            let result = await estadoOferta(genero, idGenero);
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


//document.getElementById('confirm').addEventListener('click', generoFunciones);
document.getElementById('confirm').addEventListener('click', generoFunciones);
inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();

document.querySelector('#crear-elemento').addEventListener('click', function () {
    window.location.href = 'http://localhost:3000/registrarOferta.html';
})
