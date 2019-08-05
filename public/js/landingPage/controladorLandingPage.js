'use strict';

const carrusel1 = document.querySelector('#carrusel1');
const carrusel2 = document.querySelector('#carrusel2');
const txtFiltro = document.getElementById("txtFiltro");
let listaLibrosMasVendidos;
let listaLibros;
let card, card2;

const crearSliderMasVendidos = async () => {
    listaLibrosMasVendidos = await obtenerLibrosMasVendidos();
    carrusel1.innerHTML = '';
    for (let i = 0; i < listaLibrosMasVendidos.length; i++) {
        agregarLibroCarruselMasVendidos(listaLibrosMasVendidos[i]);
    }
    filaNoDatosMasVendidos();
    movimentoSlider1();
};

const agregarLibroCarruselMasVendidos = function (libro) {
    let cardElement = document.createElement('li');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-target', 'card');

    let imagen = document.createElement('img');
    imagen.setAttribute('src', libro.caratula);

    let titulo = document.createElement('h3');
    titulo.innerHTML = libro.titulo;

    let informacion = document.createElement('p');
    informacion.innerHTML = libro.autor.nombre;

    cardElement.appendChild(imagen);
    cardElement.appendChild(titulo);
    cardElement.appendChild(informacion);

    carrusel1.appendChild(cardElement);
    card = carrusel1.querySelector("[data-target='card']");
}

let filaNoDatos = function () {
    if (listaLibros.length === 0 || carrusel2.childElementCount === 0) {
        let cardElement = document.createElement('li');
        cardElement.setAttribute('class', 'card noData');
        cardElement.setAttribute('data-target', 'card');
        carrusel2.appendChild(cardElement);

        let titulo = document.createElement('h3');
        titulo.innerHTML = "No se encontraron datos";
        cardElement.appendChild(titulo);
    }
    if (carrusel2.childElementCount < 5) {
        carrusel2.className = carrusel2.className.replace("centerFlex", "");
        carrusel2.className = carrusel2.className + " centerFlex";
    }
    else {
        carrusel2.className = carrusel2.className.replace("centerFlex", "");
    }
}

const crearSliderLibros = async (event) => {
    if (!event)
        listaLibros = await obtenerLibrosFetch();
    let filtro = txtFiltro.value;
    carrusel2.innerHTML = '';
    for (let i = 0; i < listaLibros.length; i++) {
        if (listaLibros[i].titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
        agregarLibroCarrusel(listaLibros[i]);
    }
    filaNoDatos();
    movimentoSlider2();
};

const agregarLibroCarrusel = function (libro) {
    let cardElement = document.createElement('li');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-target', 'card2');

    let imagen = document.createElement('img');
    imagen.setAttribute('src', libro.caratula);

    let titulo = document.createElement('h3');
    titulo.innerHTML = libro.titulo;

    let informacion = document.createElement('p');
    informacion.innerHTML = libro.autor.nombre;

    cardElement.appendChild(imagen);
    cardElement.appendChild(titulo);
    cardElement.appendChild(informacion);

    carrusel2.appendChild(cardElement);
    card2 = carrusel2.querySelector("[data-target='card2']");
}

let filaNoDatosMasVendidos = function () {
    if (listaLibrosMasVendidos.length === 0 || carrusel1.childElementCount === 0) {
        let cardElement = document.createElement('li');
        cardElement.setAttribute('class', 'card noData');
        cardElement.setAttribute('data-target', 'card');
        carrusel1.appendChild(cardElement);

        let titulo = document.createElement('h3');
        titulo.innerHTML = "No se encontraron datos";
        cardElement.appendChild(titulo);
        carrusel1.className = carrusel1.className + " centerFlex";
    }
}


crearSliderMasVendidos();
crearSliderLibros();
txtFiltro.addEventListener('keyup', crearSliderLibros);
//crearSliderMejorCalificados();