'use strict';

const tbody = document.querySelector('#tbl_tarjetas tbody');
let listaTarjetas = [];
let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async () => {
    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        listaTarjetas = await obtenerTarjetas();
    }
    else {
        listaTarjetas = await obtenerTarjetasUsuario(sessionStorage.id);
    }

    tbody.innerHTML = '';


    for (let i = 0; i < listaTarjetas.length; i++) {
      
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
        fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
        fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
        fila.insertCell().innerHTML = (listaTarjetas[i]['expiracionMM']) + '/' + (listaTarjetas[i]['expiracionYY']);
        fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];

        let celda_perfil = fila.insertCell();
        let divContendor = document.createElement("div");
        divContendor.setAttribute('class', 'crear-contenedor');
        let btnPerfil = document.createElement('button');
        celda_perfil.appendChild(divContendor);
        divContendor.appendChild(btnPerfil);

        btnPerfil.innerText = 'Editar'
        btnPerfil.dataset._id = listaTarjetas[i]['_id'];
        btnPerfil.setAttribute('class', 'material-blue')
        btnPerfil.addEventListener('click', function () {
            window.location.href = `modificarTarjeta.html?id=${this.dataset._id}`;
        });
    }
    filaNoDatos();
};

let filaNoDatos = function () {
    if (listaTarjetas.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
}
mostrar_tabla();


let filtrar_tabla = async () => {

    let filtro = txtFiltro.value.toLowerCase();
    tbody.innerHTML = '';

    for (let i = 0; i < listaTarjetas.length; i++) {

        if (listaTarjetas[i]['nombre1'].toLowerCase().includes(filtro) || listaTarjetas[i]['tipoTarjeta'].toLowerCase().includes(filtro) || String(listaTarjetas[i]['numTarjeta']).includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
            fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];
            fila.insertCell().innerHTML = (listaTarjetas[i]['expiracionMM']) + '/' + (listaTarjetas[i]['expiracionYY']);


            let celda_perfil = fila.insertCell();
            let divContendor = document.createElement("div");
            divContendor.setAttribute('class', 'crear-contenedor')
            let btnPerfil = document.createElement('button');
            celda_perfil.appendChild(divContendor);
            divContendor.appendChild(btnPerfil);

            btnPerfil.innerText = 'Editar'
            btnPerfil.dataset._id = listaTarjetas[i]['_id'];
            btnPerfil.setAttribute('class', 'material-blue')
            btnPerfil.addEventListener('click', function () {
                window.location.href = `modificarTarjeta.html?id=${this.dataset._id}`;
            });


        }
    }
    filaNoDatos();
};

txtFiltro.addEventListener('keyup', filtrar_tabla);



