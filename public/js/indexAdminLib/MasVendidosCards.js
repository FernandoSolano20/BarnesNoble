'use strict';

let listaLibros = [];
const containerCard = document.querySelector('#cardElements');

let mostarLibros = async (event) => {
    if (!event)
        listaLibros = await obtenerLibrosMasVendidos();

    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibros.length; i++) {
        agregarCardLibro(listaLibros[i]);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro, autor) {
    let divParrent = document.createElement('div');
    divParrent.setAttribute('class', 'parrent');
    containerCard.appendChild(divParrent);

    let child = document.createElement('div');
    child.setAttribute('class', 'child');
    divParrent.appendChild(child);

    let span = document.createElement('i');
    span.setAttribute('class', 'far fa-books');
    child.appendChild(span);

    let child2 = document.createElement('div');
    child2.setAttribute('class', 'child-two');
    divParrent.appendChild(child2);

    let h3 = document.createElement('h3');
    h3.innerText = libro.titulo;
    child2.appendChild(h3);

    let img = document.createElement('img');
    img.setAttribute('src', libro.caratula);
    child2.appendChild(img);

    let p1 = document.createElement('p');
    p1.innerText = libro.autor.nombre;
    child2.appendChild(p1);

    let btnPerfil = document.createElement('a');
    btnPerfil.setAttribute('class', 'material btnLibreria');
    btnPerfil.setAttribute('id', 'btnPerfil');
    btnPerfil.href = "perfilLibro.html?id=" + libro._id;
    btnPerfil.innerText = 'Perfil';
    child2.appendChild(btnPerfil);
}



let filaNoDatos = function () {
    if (listaLibros.length === 0 || containerCard.childElementCount === 0) {
        let divParrent = document.createElement('div');
        divParrent.setAttribute('class', 'parrent');
        containerCard.appendChild(divParrent);

        let child = document.createElement('div');
        child.setAttribute('class', 'child');
        divParrent.appendChild(child);

        let span = document.createElement('i');
        span.setAttribute('class', 'far fa-books');
        child.appendChild(span);

        let child2 = document.createElement('div');
        child2.setAttribute('class', 'child-two');
        divParrent.appendChild(child2);

        let h3 = document.createElement('h3');
        h3.innerText = "No hay datos";
        child2.appendChild(h3);
    }
}

mostarLibros();