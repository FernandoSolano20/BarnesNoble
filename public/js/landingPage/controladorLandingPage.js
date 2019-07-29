'use strict';

const carrusel1 = document.querySelector('#carrusel1');
const carrusel2 = document.querySelector('#carrusel2');
let card;

const crearSliderMasVendidos = async (event) => {

    let listaLibrosMasVendidos = await obtenerLibrosMasVendidos();

    for (let i = 0; i < listaLibrosMasVendidos.length; i++) {
        agregarLibroCarrusel(listaLibrosMasVendidos[i]);
    }
};

const agregarLibroCarrusel = function (libro) {  
    

    let cardElement = document.createElement('li');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-target', 'card');

        let imagen = document.createElement('img');
    //     //deberia cargar el url de la imagen del objeto libro de la base de datos.
        imagen.setAttribute('src', libro.caratula); //TODO: cambiar src por el correcto

    let titulo = document.createElement('h3');
        titulo.innerHTML = libro.titulo;

    let informacion = document.createElement('p');
        informacion.innerHTML = libro.autor.nombre;

        cardElement.appendChild(imagen);
    cardElement.appendChild(titulo);
    cardElement.appendChild(informacion);

    carrusel1.appendChild(cardElement);
    card = carousel.querySelector("[data-target='card']");
    movimentoSlider1();
}

const crearSliderMejorCalificados = async (event) => {

    //TODO: Falta hacer el endpoint que ordena por calificacion.
    //cuando un usuario vota, el sistema debe calcular la calificacion

    //se debe guardar la calificacion que el ususario realizo en una tabla aparte
    //esto solo para verificar que el usuario no voto ya por ese libro

    //se debe guardar en el libro dos campos, cantidad de votos, y calificacion,
    //cuando se agrega un nuevo voto, se tiene que calcular la calificacion de la siguiente manera:

    // nuevaCalificacion= ((<calificafion actual> * <numero de votos actual>) + <nuevoVoto>) / <numero de votos actual> + 1
    // nuevoNumerodeVotos = <numero de votos actual> + 1

    let listaLibrosMejorCalificados = await obtenerLibrosMejorCalificados();

    for (let i = 0; i < listaLibrosMejorCalificados.length; i++) {
        agregarLibroCalificacion(listaLibrosMejorCalificados[i]);
    }
};

const agregarLibroCalificacion = function (libro) {

    let card = document.createElement('li');
        card.classList.add('card');
        card.setAttribute('data-target', 'card');
    
    let imagen = document.createElement('img');
        //deberia cargar el url de la imagen del objeto libro de la base de datos.
        imagen.setAttribute('src', 'img/descarga.jpeg'); //TODO: cambiar src por el correcto

    let titulo = document.createElement('h3');
        titulo.innerHTML = libro.titulo;

    let form = document.createElement('form');

    //TODO: Agregar la calificacion al libro en la bbdd
    for (let i = 1; i <= 5; i++) {

        let inputId = 'radio' + i + "-" + libro.id;

        let input = document.createElement('input');
            input.id = inputId;
            input.setAttribute('type', 'radio');
            input.setAttribute('name', inputId);
            input.setAttribute('value', i);
        
        let label = document.createElement('label');
            input.setAttribute('for', inputId);

        let icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-book');


        if(i > libro.calificacion){
            icon.classList.add('blanco');
        }

        label.appendChild(icon);
        form.appendChild(input);
        form.appendChild(label);
    }

    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(form);

    carrusel2.appendChild(card);
}

crearSliderMasVendidos();
//crearSliderMejorCalificados();