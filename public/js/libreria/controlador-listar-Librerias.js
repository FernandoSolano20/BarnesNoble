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
        let divContenedor = document.createElement("div");
        divContenedor.setAttribute('class', 'crear-contenedor');
        celda_perfil.appendChild(divContenedor);
        
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = 'Ver perfil';
        boton_perfil.dataset._id = listaLibrerias[i]['_id'];
        boton_perfil.setAttribute('class', 'material-blue');
        divContenedor.appendChild(boton_perfil);

    boton_perfil.addEventListener('click', function() {
        //console.log(this.dataset._id);
        window.location.href = `perfilLibreria.html?id=${this.dataset._id}`

    }); 
    
    }
};


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
        let divContenedor = document.createElement("div");
        divContenedor.setAttribute('class', 'crear-contenedor');
        celda_perfil.appendChild(divContenedor);
        
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = 'Ver perfil';
        boton_perfil.dataset._id = listaLibrerias[i]['_id'];
        boton_perfil.setAttribute('class', 'material-blue');
        divContenedor.appendChild(boton_perfil);

    boton_perfil.addEventListener('click', function() {
        //console.log(this.dataset._id);
        window.location.href = `perfilLibreria.html?id=${this.dataset._id}`

    }); 

        }
       
    }
    filaNoDatos();  
};

let filaNoDatos = function () {
    let tbody = document.querySelector('#tbl_librerias tbody');
    if (listaLibrerias.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
};

mostrar_tabla();
txtFiltro.addEventListener('keyup', filtrar_tabla);

