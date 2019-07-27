'use strict';

const tbody = document.querySelector('#tbl_librerias tbody');
let listaLibrerias = [];
const sctListaLibrerias = document.querySelector('#listaLibrerias');

let txtFiltro = document.querySelector('#txt-filtro');

let mostrar_cards = async () => {

    listaLibrerias = await obtenerLibrerias();
    for (let i = 0; i < listaLibrerias.length; i++) {
        let contenedorCard = document.createElement('div');
        contenedorCard.classList.add('card')
        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = listaLibrerias[i]['nombreComercial'];


        header.appendChild(h2);

        let contenerdorImagen = document.createElement('div')
        contenerdorImagen.classList.add('contenedoImagen')
        let foto = document.createElement('img');
        foto.src = 'https://res.cloudinary.com/barnesnoble/image/upload/v1563769499/psrjapo9vb9wpzaczdqv.png'
        contenedorCard.appendChild(foto);
        
        let p_nombreFantasia  = document.createElement('p');
        p_nombreFantasia.innerText = listaLibrerias[i]['nombreFantasia'];

        let p_provincia  = document.createElement('p');
        p_provincia.innerText = listaLibrerias[i]['provincia'];
        
        let p_canton  = document.createElement('p');
        p_canton.innerText = listaLibrerias[i]['canton'];

        let p_distrito  = document.createElement('p');
        p_distrito.innerText = listaLibrerias[i]['distrito'];

        let btnPerfil = document.createElement('button');
        btnPerfil.innerText = 'Ver Perfil'
        btnPerfil.dataset._id = listaLibrerias[i]['_id'];
        btnPerfil.addEventListener('click',function(){
                window.location.href = `verPerfil-libreria.html?_id=${this.dataset._id}`;
            });

        contenedorCard.appendChild(header);
        contenedorCard.appendChild(contenerdorImagen);
        contenedorCard.appendChild(p_nombreFantasia);
        contenedorCard.appendChild(p_provincia);
        contenedorCard.appendChild(p_canton);
        contenedorCard.appendChild(p_distrito);
        contenedorCard.appendChild(btnPerfil);

        sctListaLibrerias.appendChild(contenedorCard);
    }
};


let filtrar_cards = async () => {

    let filtro = txtFiltro.value.toLowerCase();
    sctListaLibrerias.innerHTML = '';

    for (let i = 0; i < listaLibrerias.length; i++) {
        if (listaLibrerias[i]['nombreComercial'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['nombreFantasia'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['provincia'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['canton'].toLowerCase().includes(filtro)
        || listaLibrerias[i]['distrito'].toLowerCase().includes(filtro) ) {

            let contenedorCard = document.createElement('div');
            contenedorCard.classList.add('card')
            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = listaLibrerias[i]['nombreComercial'];
    
    
            header.appendChild(h2);
    
            let contenerdorImagen = document.createElement('div')
            contenerdorImagen.classList.add('contenedoImagen')
            let foto = document.createElement('img');
            foto.src = 'https://res.cloudinary.com/barnesnoble/image/upload/v1563769499/psrjapo9vb9wpzaczdqv.png'
            contenedorCard.appendChild(foto);
            
            let p_nombreFantasia  = document.createElement('p');
            p_nombreFantasia.innerText = listaLibrerias[i]['nombreFantasia'];
    
            let p_provincia  = document.createElement('p');
            p_provincia.innerText = listaLibrerias[i]['provincia'];
            
            let p_canton  = document.createElement('p');
            p_canton.innerText = listaLibrerias[i]['canton'];
    
            let p_distrito  = document.createElement('p');
            p_distrito.innerText = listaLibrerias[i]['distrito'];
    
            let btnPerfil = document.createElement('button');
            btnPerfil.innerText = 'Ver Perfil'
            btnPerfil.dataset._id = listaLibrerias[i]['_id'];
            btnPerfil.addEventListener('click',function(){
                    window.location.href = `verPerfil-libreria.html?_id=${this.dataset._id}`;
                });
    
            contenedorCard.appendChild(header);
            contenedorCard.appendChild(contenerdorImagen);
            contenedorCard.appendChild(p_nombreFantasia);
            contenedorCard.appendChild(p_provincia);
            contenedorCard.appendChild(p_canton);
            contenedorCard.appendChild(p_distrito);
            contenedorCard.appendChild(btnPerfil);
    
            sctListaLibrerias.appendChild(contenedorCard);
        }
    }
};

mostrar_cards();
txtFiltro.addEventListener('keyup', filtrar_cards);

