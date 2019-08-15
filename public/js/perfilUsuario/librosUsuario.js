const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");
let listaLibroUsuario;

let mostarLibros = async (event) => {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    listaLibroUsuario = await verLibrosCompradosLector(id);
    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibroUsuario.usuario.ejemplares.length; i++) {
        let libro = listaLibroUsuario.usuario.ejemplares[i].libro.libro;
        let ejemplar = listaLibroUsuario.usuario.ejemplares[i].libro;
        if (ejemplar.tipo.toLowerCase().includes(filtro.toLowerCase()) || libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || libro.genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarCardLibro(libro, ejemplar, listaLibroUsuario.usuario.ejemplares[i]);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro, ejemplar, infoEjemplar) {
    let divParrent = document.createElement('div');
    divParrent.setAttribute('class', 'parrent');
    divParrent.setAttribute('data-idEjemplar', ejemplar._id);
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
    p1.setAttribute('class', 'infoBook');
    p1.innerText = ejemplar.tipo;
    divInformationBook.appendChild(p1);

    p1 = document.createElement('p');
    p1.setAttribute('class', 'infoBook');
    p1.setAttribute('id', 'pCantidad');
    p1.innerText = "Cantidad: " + infoEjemplar.cantidad;
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
}

let filaNoDatos = function () {
    if (sucursal.sucursal.ejemplares.length === 0 || containerCard.childElementCount === 0) {
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

txtFiltro.addEventListener('keyup', mostarLibros);
mostarLibros();
