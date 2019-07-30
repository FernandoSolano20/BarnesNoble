'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const nombre = document.querySelector('#valorNombre');
const nombreArtistico = document.querySelector('#valorNombreArtistico');
const nacionalidad = document.querySelector('#valorNacionalidad');
const nacimiento = document.querySelector('#valorNacimiento');
const muerte = document.querySelector('#valorMuerte');
const resenna = document.querySelector('#valorResenna');
const avatar = document.querySelector('#avatar');
const nombrePremio = document.querySelector('#valorNombrePremio');
const annoPremio = document.querySelector('#valorAnnoPremio');
const descripPremio = document.querySelector('#valorDesPremio');

let llenarPerfil = async() => {
    let autor = await obtenerAutorId(_id);
    let premios = autor['premios'];
    if (autor) {
        nombre.innerHTML = autor['nombre'];
        nombreArtistico.innerHTML = autor['nombreArtistico'];
        nacionalidad.innerHTML = autor['nacionalidad'];
        nacimiento.innerHTML = autor['fechaNacimiento'];
        muerte.innerHTML = autor['fechaMuerte'];
        resenna.innerHTML = autor['resenna'];
        avatar.setAttribute('src', autor.foto);
        for (let i = 0; i < premios.length; i++) {
        nombrePremio.innerHTML = premios[i]['nombre'];
        annoPremio.innerHTML = premios[i]['anno'];
        descripPremio.innerHTML = premios[i]['descripcion'];
    }
    
    }
};

llenarPerfil();