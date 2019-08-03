'use strict';

const tbody = document.querySelector('#tbl_librerias tbody');
let listaLibrerias = [];
let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_tabla = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario != 'Lector') {
            let btn = document.createElement('a');
            btn.type = "button";
            btn.setAttribute('class', 'material-blue');
            btn.href = "registroLibreria.html";
            document.getElementById('boton').appendChild(btn);

            let label = document.createTextNode('Crear');
            btn.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btn.insertBefore(icon, label);

        }

        if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
            listaLibrerias = await obtenerLibrerias();
        }
        else {
            listaLibrerias = await obtenerLibreriaPorId(sessionStorage.id);
        }

    }
    tbody.innerHTML = '';

    let filtro = txtFiltro.value.toLowerCase();
    for (let i = 0; i < listaLibrerias.length; i++) {
        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
            || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreComercial'];
            fila.insertCell().innerHTML = listaLibrerias[i]['nombreFantasia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['provincia'];
            fila.insertCell().innerHTML = listaLibrerias[i]['distrito'];

            let celda_perfil = fila.insertCell();
            let divContendor = document.createElement("div");
            divContendor.setAttribute('class', 'crear-contenedor');

            let btnPerfil = document.createElement('button');

            btnPerfil.innerText = 'Ver Perfil'
            btnPerfil.dataset._id = listaLibrerias[i]['_id'];
            btnPerfil.setAttribute('class', 'material-blue')
            btnPerfil.addEventListener('click', function () {
                window.location.href = `perfilLibreria.html?id=${this.dataset._id}`;
            });
            celda_perfil.appendChild(divContendor);
            divContendor.appendChild(btnPerfil);
        }
    }
};

mostrar_tabla();

txtFiltro.addEventListener('keyup', mostrar_tabla);