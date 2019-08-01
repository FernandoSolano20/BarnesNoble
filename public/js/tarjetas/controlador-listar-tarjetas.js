'use strict';

const tbody = document.querySelector('#tbl_tarjetas tbody');
let listaTarjetas = [];
let txtFiltro = document.querySelector('#txt-filtro');
//  let expiracionMM =  listaTarjetas[i]['expiracionMM'];
//      let expiracionYY = listaTarjetas[i]['expiracionYY'];
// let expiracionFormateada = expiracionMM + ' / ' + expiracionYY;
let mostrar_tabla = async () => {
    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        listaTarjetas = await obtenerTarjetas();
    }
    else {
        listaTarjetas = await obtenerTarjetasUsuario(sessionStorage.id);
    }

    tbody.innerHTML = ''


    for (let i = 0; i < listaTarjetas.length; i++) {
        //   let expiracionMM =  listaTarjetas[i]['expiracionMM'];
        // let expiracionYY = listaTarjetas[i]1Y'];
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
        fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
        fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
        // fila.insertCell().innerHTML = listaTarjetas[i]['expiracionMM'];
        // fila.insertCell().innerHTML = listaTarjetas[i]['expiracionYY'];
        fila.insertCell().innerHTML = (listaTarjetas[i]['expiracionMM']) + '/' + (listaTarjetas[i]['expiracionYY']);
        fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];

        let celda_perfil = fila.insertCell();
        let btnPerfil = document.createElement('button');
        celda_perfil.appendChild(btnPerfil);

        btnPerfil.innerText = 'Editar'
        btnPerfil.dataset._id = listaTarjetas[i]['_id'];
        btnPerfil.addEventListener('click', function () {
            window.location.href = `editarTajeta.html?_id=${this.dataset._id}`;
        });
    }
};

mostrar_tabla();

let filtrar_tabla = async () => {

    let filtro = txtFiltro.value.toLowerCase();
    tbody.innerHTML = '';

    for (let i = 0; i < listaTarjetas.length; i++) {

        if (listaTarjetas[i]['nombre1'].toLowerCase().includes(filtro) || listaTarjetas[i]['tipoTarjeta'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaTarjetas[i]['nombre1'];
            fila.insertCell().innerHTML = listaTarjetas[i]['tipoTarjeta'];
            fila.insertCell().innerHTML = listaTarjetas[i]['numTarjeta'];
            // fila.insertCell().innerHTML = listaTarjetas[i]['expiracionMM'];
            // fila.insertCell().innerHTML = listaTarjetas[i]['expiracionYY'];
            fila.insertCell().innerHTML = listaTarjetas[i]['cvv'];
            fila.insertCell().innerHTML = (listaTarjetas[i]['expiracionMM']) + '/' + (listaTarjetas[i]['expiracionYY']);


            let celda_perfil = fila.insertCell();
            let btnPerfil = document.createElement('button');
            celda_perfil.appendChild(btnPerfil);

            btnPerfil.innerText = 'Editar'
            btnPerfil.dataset._id = listaTarjetas[i]['_id'];
            btnPerfil.addEventListener('click', function () {
                window.location.href = `editarTajeta.html?_id=${this.dataset._id}`;
            });


        }
    }
};

txtFiltro.addEventListener('keyup', filtrar_tabla);



