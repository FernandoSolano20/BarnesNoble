/*
* Nombre de archivo: route/tarjeta
* Last Modified: Aug 17, 2019
* Modified by: Fran A. Wilson
* Modified by: Fernando Solano
*/

'use strict';
const tbody = document.querySelector('#tbl_tarjetas tbody');
let listaTarjetas = [];
let txtFiltro = document.querySelector('#txt-filtro');
let inputTipoTarjeta;
let inputNumTarjeta;
let inputNombre;
let inputExpiracionMM;
let inputExpiracionYY;
let inputCvv;
let mostrar_tabla = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
            listaTarjetas = await obtenerTarjetas();
        }
        else {
            listaTarjetas = await obtenerTarjetasUsuario(sessionStorage.id);
        }
    }
    let filtro = txtFiltro.value.toLowerCase();
    tbody.innerHTML = '';
    for (let i = 0; i < listaTarjetas.length; i++) {
        if (listaTarjetas[i]['nombre1'].toLowerCase().includes(filtro) || listaTarjetas[i]['tipoTarjeta'].toLowerCase().includes(filtro) || String(listaTarjetas[i]['numTarjeta']).includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
            fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['expiracionMM'] + "/" + listaTarjetas[i]['expiracionYY'];
            fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];
            let editarCelda = fila.insertCell();
            let editar = document.createElement('i');
            editar.setAttribute('class', 'far fa-edit');
            editar.setAttribute('data-action', 'editar');
            editarCelda.appendChild(editar);
            editar.addEventListener('click', function () {
                window.location.href = `registrarTarjeta.html?id=${listaTarjetas[i]['_id']}`;
            });
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('i');
            boton_eliminar.setAttribute('class', 'fal fa-trash-alt');
            boton_eliminar.setAttribute('data-action', 'boton_eliminar');
            celda_eliminar.appendChild(boton_eliminar);
            boton_eliminar.href = '#';

            boton_eliminar.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Está seguro de eliminar esta tarjeta?',
                    text: "Ésta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#315c74',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro'
                }).then((result) => {
                    if (result.value) {
                        eliminarTarjeta(listaTarjetas[i]['_id']);

                        Swal.fire(
                            'Tarjeta eliminada!',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                window.location.href = 'listarTarjetas.html';
                            }
                        });
                    }
                })
            })
            celda_eliminar.appendChild(boton_eliminar);
        }
    } //fin del for
    filaNoDatos();
}; //fin del mostrar_table
let filaNoDatos = function () {
    if (listaTarjetas.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '8');
    }
}
mostrar_tabla();
txtFiltro.addEventListener('keyup', mostrar_tabla);
