'use strict';

let listaLibros = [];
const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");

let mostarLibros = async (event) => {
    if (!event)
        listaLibros = await obtenerLibrosFetch();
    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibros.length; i++) {
        if (listaLibros[i].titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarCardLibro(listaLibros[i]);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro) {
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

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        let btnFormato = document.createElement('a');
        btnFormato.setAttribute('class', 'material btnLibreria');
        btnFormato.innerText = 'Añadir formato';
        btnFormato.href = "formatoLibro.html?id=" + libro._id;
        child2.appendChild(btnFormato);
    }
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
txtFiltro.addEventListener('keyup', mostarLibros);