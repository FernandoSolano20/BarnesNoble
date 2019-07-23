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
        fila.insertCell().innerHTML = lista_usuarios[i]['segundoNombre'];
        fila.insertCell().innerHTML = lista_usuarios[i]['primerApellido'];
        fila.insertCell().innerHTML = lista_usuarios[i]['segundoApellido'];
        fila.insertCell().innerHTML = lista_usuarios[i]['alias'];
        fila.insertCell().innerHTML = lista_usuarios[i]['telefono'];
        fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
        fila.insertCell().innerHTML = formatearFecha(lista_usuarios[i]['nacimiento']);
        fila.insertCell().innerHTML = lista_usuarios[i]['sexo'];
        fila.insertCell().innerHTML = lista_usuarios[i]['id']; 
        
        let celda_perfil = fila.insertCell();
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = 'Ver perfil';
        boton_perfil.dataset._id = lista_usuarios[i]['_id'];
        
        celda_perfil.appendChild(boton_perfil);

        boton_perfil.addEventListener('click', function() {
            //console.log(this.dataset._id);
            window.location.href = `ver-perfil-contacto.html?_id=${this.dataset._id}`

        });       
    }




};

let filtrar_tabla = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_usuarios.length; i++) {
        if (lista_usuarios[i]['nombre'].toLowerCase().includes(filtro) || lista_usuarios[i]['segundoNombre'].toLowerCase().includes(filtro) || lista_usuarios[i]['primerApellido'].toLowerCase().includes(filtro) || lista_usuarios[i]['segundoApellido'].toLowerCase().includes(filtro)|| lista_usuarios[i]['alias'].toLowerCase().includes(filtro) || lista_usuarios[i]['telefono'].toLowerCase().includes(filtro) || lista_usuarios[i]['correo'].toLowerCase().includes(filtro) || lista_usuarios[i]['nacimiento'].toLowerCase().includes(filtro)  || lista_usuarios[i]['sexo'].toLowerCase().includes(filtro) || lista_usuarios[i]['id'].toLowerCase().includes(filtro))
         {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_usuarios[i]['nombre'];
            fila.insertCell().innerHTML = lista_usuarios[i]['segundoNombre'];
            fila.insertCell().innerHTML = lista_usuarios[i]['primerApellido'];
            fila.insertCell().innerHTML = lista_usuarios[i]['segundoApellido'];
            fila.insertCell().innerHTML = lista_usuarios[i]['alias'];
            fila.insertCell().innerHTML = lista_usuarios[i]['telefono'];
            fila.insertCell().innerHTML = lista_usuarios[i]['correo'];
            fila.insertCell().innerHTML = formatearFecha(lista_usuarios[i]['nacimiento']);
            fila.insertCell().innerHTML = lista_usuarios[i]['sexo'];
            fila.insertCell().innerHTML = lista_usuarios[i]['id']; 

        
            let celda_perfil = fila.insertCell();
            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = 'Ver perfil';
            boton_perfil.dataset._id = lista_usuarios[i]['_id'];
            
            celda_perfil.appendChild(boton_perfil);
    
            boton_perfil.addEventListener('click', function() {
                //console.log(this.dataset._id);
                window.location.href = `ver-perfil-contacto.html?_id=${this.dataset._id}`
    
            });        
        }

    }


};

var formatearFecha = function (pfecha) {

    var fechaFormateada = new Date(pfecha);

    return fechaFormateada.getDay() + "-" + (fechaFormateada.getMonth() + 1) + "-" + fechaFormateada.getFullYear();
}


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);