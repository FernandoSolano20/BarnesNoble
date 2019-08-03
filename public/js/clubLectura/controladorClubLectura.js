'use strict';

const tbody = document.querySelector('#tbl_clubesLectura tbody');
let lista_clubesLectura = [];
let txt_filtro = document.querySelector('#txt_filtro');


let mostrar_tabla = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario === 'Adminitrador plataforma' || sessionStorage.tipoUsuario === 'Lector') {
            lista_clubesLectura = await obtenerClubesLectura();
        }
        else {
            lista_clubesLectura = await obtenerClubesLecturaUsuarioAdminClub(sessionStorage.id);
        }
    }
    tbody.innerHTML = '';
    let filtro = txt_filtro.value.toLowerCase();

    for (let i = 0; i < lista_clubesLectura.length; i++) {
        if (lista_clubesLectura[i]['nombre'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['tipoClub'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['tema'].toLowerCase().includes(filtro) || lista_clubesLectura[i]['fechaReunion'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_clubesLectura[i]['nombre'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['tema'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['tipoClub'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['fechaReunion'];
            fila.insertCell().innerHTML = lista_clubesLectura[i]['horaReunion'];
        }
    }
    filaNoDatos();
};

let filaNoDatos = function () {
    if (lista_clubesLectura.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}

mostrar_tabla();
txt_filtro.addEventListener('keyup', mostrar_tabla);

document.querySelector('#crear-elemento').addEventListener('click', function () {
    window.location.href = 'http://localhost:3000/clubLectura.html';
})