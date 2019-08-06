'use strict';

const tbody = document.querySelector('#tabla-elementos tbody');
let lista_usuarios = [];
let txt_filtro = document.querySelector('#input-filtro');


let mostrar_tabla = async () => {

    lista_usuarios = await obtenerUsuarios();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_usuarios[i]['id'];
        fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];
        fila.insertCell().innerHTML = lista_usuarios[i]['primerApellido'];
        fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
        fila.insertCell().innerHTML = formatearFecha(lista_usuarios[i]['nacimiento']);

        let celda_perfil = fila.insertCell();
        let divContenedor = document.createElement("div");
        divContenedor.setAttribute('class', 'crear-contenedor');
        celda_perfil.appendChild(divContenedor);

        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = 'Ver perfil';
        boton_perfil.dataset._id = lista_usuarios[i]['_id'];
        boton_perfil.setAttribute('class', 'material-blue');
        divContenedor.appendChild(boton_perfil);

        boton_perfil.addEventListener('click', function () {
            //console.log(this.dataset._id);
            window.location.href = `perfilUsuario.html?id=${this.dataset._id}`

        });
    }
    filaNoDatos();
};

let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_usuarios.length; i++) {
        if (String(lista_usuarios[i]['nombre']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['segundoNombre']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['primerApellido']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['segundoApellido']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['alias']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['telefono']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['correo']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['nacimiento']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['sexo']).toLowerCase().includes(filtro) || String(lista_usuarios[i]['id']).toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_usuarios[i]['id'];
            fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];
            fila.insertCell().innerHTML = lista_usuarios[i]['primerApellido'];
            fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
            fila.insertCell().innerHTML = formatearFecha(lista_usuarios[i]['nacimiento']);


            let celda_perfil = fila.insertCell();
            let divContenedor = document.createElement("div");
            divContenedor.setAttribute('class', 'crear-contenedor');
            celda_perfil.appendChild(divContenedor);

            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = 'Ver perfil';
            boton_perfil.dataset._id = lista_usuarios[i]['_id'];
            boton_perfil.setAttribute('class', 'material-blue');
            divContenedor.appendChild(boton_perfil);

            boton_perfil.addEventListener('click', function () {
                //console.log(this.dataset._id);
                window.location.href = `indexLector.html?_id=${this.dataset._id}`;

            });
        }
        filaNoDatos();
    };
}

var formatearFecha = function (pfecha) {

    var fechaFormateada = new Date(pfecha);

    return fechaFormateada.getDay() + "-" + (fechaFormateada.getMonth() + 1) + "-" + fechaFormateada.getFullYear();
}

let filaNoDatos = function () {
    let tbody = document.querySelector('#tabla-elementos tbody');
    if (lista_usuarios.length === 0 || tbody.childElementCount === 0) {
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '6');
    }
};

txt_filtro.addEventListener('keyup', filtrar_tabla);
mostrar_tabla();