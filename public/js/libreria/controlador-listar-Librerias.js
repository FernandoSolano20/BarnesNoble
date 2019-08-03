'use strict';

const tbody = document.querySelector('#tbl_librerias tbody');
let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async() => {

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        listaLibrerias = await obtenerLibrerias();
    }
    else {
        listaLibrerias = await obtenerLibreriaPorId(sessionStorage.id);
    }

//    listaLibrerias = await obtenerLibrerias();
    tbody.innerHTML = '';
   
     
    for (let i = 0; i < listaLibrerias.length; i++) {

        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
        fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
        fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];

         let celda_perfil = fila.insertCell();
         let btnPerfil = document.createElement('button');
        celda_perfil.appendChild(btnPerfil);
      
        btnPerfil.innerText = 'Ver Perfil'
        btnPerfil.dataset._id = listaLibrerias[i]['_id'];
        btnPerfil.setAttribute('class', 'material-blue')
        btnPerfil.addEventListener('click', function () {
            window.location.href = `perfilLibreria.html?id=${this.dataset._id}`;
        });
    }
};

mostrar_tabla();

let filtrar_tabla = async() => {

    let filtro = txtFiltro.value.toLowerCase();
    tbody.innerHTML = '';

    for (let i = 0; i < listaLibrerias.length; i++) {   

        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
         || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro) ) {

            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];
            // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLatitud'];
            // fila.insertCell().innerHTML = listaLibrerias[i]['localizacionLongitud'];

            let celda_perfil = fila.insertCell();
            let btnPerfil = document.createElement('button');
           celda_perfil.appendChild(btnPerfil);
         
           btnPerfil.innerText = 'Ver Perfil'
           btnPerfil.dataset._id = listaLibrerias[i]['_id'];
           btnPerfil.addEventListener('click', function () {
               window.location.href = `perfilLibreria.html?id=${this.dataset._id}`;
           });

        }
    }
};

txtFiltro.addEventListener('keyup', filtrar_tabla);

