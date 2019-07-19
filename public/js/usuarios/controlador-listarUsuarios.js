'use strict';

const tbody = document.querySelector('#tabla-elementos tbody');
let lista_usuarios = [];
let txt_filtro = document.querySelector('#input-filtro');


let mostrar_tabla = async() => {

    lista_usuarios = await obtenerUsuarios();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];
        fila.insertCell().innerHTML = lista_usuarios[i]['nombre2'];
        fila.insertCell().innerHTML = lista_usuarios[i]['apellido1'];
        fila.insertCell().innerHTML = lista_usuarios[i]['apellido2'];
        fila.insertCell().innerHTML = lista_usuarios[i]['alias'];
        fila.insertCell().innerHTML = lista_usuarios[i]['telefono'];
        fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
        fila.insertCell().innerHTML = lista_usuarios[i]['nacimiento'];
        fila.insertCell().innerHTML = lista_usuarios[i]['sexo'];
        fila.insertCell().innerHTML = lista_usuarios[i]['cedula'];   
    }


};

let filtrar_tabla = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_usuarios.length; i++) {
        if (lista_usuarios[i]['nombre'].toLowerCase().includes(filtro) || lista_usuarios[i]['nombre2'].toLowerCase().includes(filtro) || lista_usuarios[i]['apellido1'].toLowerCase().includes(filtro) || lista_usuarios[i]['apellido2'].toLowerCase().includes(filtro)|| lista_usuarios[i]['alias'].toLowerCase().includes(filtro) || lista_usuarios[i]['telefono'].toLowerCase().includes(filtro) || lista_usuarios[i]['correo'].toLowerCase().includes(filtro) || lista_usuarios[i]['nacimiento'].toLowerCase().includes(filtro)  || lista_usuarios[i]['sexo'].toLowerCase().includes(filtro) || lista_usuarios[i]['cedula'].toLowerCase().includes(filtro))
         {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];
            fila.insertCell().innerHTML = lista_usuarios[i]['nombre2'];
            fila.insertCell().innerHTML = lista_usuarios[i]['apellido1'];
            fila.insertCell().innerHTML = lista_usuarios[i]['apellido2'];
            fila.insertCell().innerHTML = lista_usuarios[i]['alias'];
            fila.insertCell().innerHTML = lista_usuarios[i]['telefono'];
            fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
            fila.insertCell().innerHTML = lista_usuarios[i]['nacimiento'];
            fila.insertCell().innerHTML = lista_usuarios[i]['sexo'];
            fila.insertCell().innerHTML = lista_usuarios[i]['cedula']; 
        }

    }


};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);