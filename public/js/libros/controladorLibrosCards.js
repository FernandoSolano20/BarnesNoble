'use strict';

let listaLibros = [];
let obtenerAutorId = [];
let listaEjemplares = [];
const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");

let mostarLibros = async (event) => {
    if (!event) {
        if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
            let btnCrear = document.getElementById('container-btn');
            if (btnCrear) {
                let anchorElementCreate = document.createElement('a');
                anchorElementCreate.setAttribute('type', 'button');
                anchorElementCreate.setAttribute('class', 'material-blue');
                anchorElementCreate.setAttribute('href', 'http://localhost:3000/registrarlibro.html');
                btnCrear.appendChild(anchorElementCreate);
                let label = document.createTextNode('Crear');
                anchorElementCreate.appendChild(label);

                let icon = document.createElement('i');
                icon.setAttribute('class', 'far fa-plus-circle');
                anchorElementCreate.insertBefore(icon, label);
            }
        }
        listaLibros = await obtenerLibrosFetch();
    }

    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibros.length; i++) {
        if (listaLibros[i].titulo.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || listaLibros[i].categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
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

    let divInformationBook = document.createElement('div');
    divInformationBook.setAttribute('class', 'informacionLibro');
    child2.appendChild(divInformationBook);

    let h3 = document.createElement('h3');
    h3.innerText = libro.titulo;
    divInformationBook.appendChild(h3);

    let img = document.createElement('img');
    img.setAttribute('src', libro.caratula);
    divInformationBook.appendChild(img);

    let p1 = document.createElement('p');
    p1.innerText = libro.autor.nombre;
    divInformationBook.appendChild(p1);

    let divContainerButtons = document.createElement('div');
    divContainerButtons.setAttribute('class', 'containerButtonsCards');
    child2.appendChild(divContainerButtons);

    let btnPerfil = document.createElement('a');
    btnPerfil.setAttribute('class', 'material btnLibreria downButton');
    btnPerfil.setAttribute('id', 'btnPerfil');
    btnPerfil.href = "perfilLibro.html?id=" + libro._id;
    btnPerfil.innerText = 'Perfil';
    divContainerButtons.appendChild(btnPerfil);

    if (sessionStorage.tipoUsuario == 'Adminitrador plataforma') {
        let btnFormato = document.createElement('a');
        btnFormato.setAttribute('class', 'material btnLibreria downButton');
        btnFormato.setAttribute('id', 'btnFormato');
        btnFormato.innerText = 'Añadir formato';
        btnFormato.setAttribute('style', 'line-height:normal')
        btnFormato.href = "formatoLibro.html?id=" + libro._id;
        divContainerButtons.appendChild(btnFormato);
    }
    else if (sessionStorage.tipoUsuario == 'Lector') {
        let btnFormato = document.createElement('a');
        btnFormato.setAttribute('class', 'material btnLibreria downButton');
        btnFormato.setAttribute('id', 'btnFormato');
        btnFormato.innerText = 'Autor';
        btnFormato.href = "verPerfilAutor.html?_id=" + libro.autor._id;
        divContainerButtons.appendChild(btnFormato);
    }
    else if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
        let btnComprar = document.createElement('button');
        btnComprar.setAttribute('class', 'material btnLibreria downButton');
        btnComprar.setAttribute('id', 'btnComprar');
        btnComprar.setAttribute('data-libro', libro._id);
        btnComprar.innerText = 'Comprar';
        btnComprar.addEventListener('click', modalComprarLibroBarnesNoble);
        divContainerButtons.appendChild(btnComprar);
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