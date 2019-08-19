const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");
let listaLibroUsuario;
let listaUsersEjemplares = [];

let mostarLibros = async (event) => {
    if (!event) {
        listaLibroUsuario = await obtenerLibroIntercambio(sessionStorage.id);
    }

    let filtro = txtFiltro.value;
    containerCard.innerHTML = '';
    for (let i = 0; i < listaLibroUsuario.length; i++) {
        let libro = listaLibroUsuario[i]._id.libro;
        let ejemplar = listaLibroUsuario[i]._id;
        if (ejemplar.tipo.toLowerCase().includes(filtro.toLowerCase()) || libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.nombreArtistico.toLowerCase().includes(filtro.toLowerCase()) || libro.genero.nombre.toLowerCase().includes(filtro.toLowerCase()) || libro.categoria.nombre.toLowerCase().includes(filtro.toLowerCase()))
            agregarCardLibro(libro, ejemplar);
    }
    filaNoDatos();
};

let agregarCardLibro = function (libro, ejemplar) {
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

    let divContainerButtons = document.createElement('div');
    divContainerButtons.setAttribute('class', 'containerButtonsCards');
    child2.appendChild(divContainerButtons);

    let btnIntercambio = document.createElement('a');
    btnIntercambio.setAttribute('class', 'material btnLibreria masGrande');
    btnIntercambio.innerText = 'Intercambiar';
    btnIntercambio.addEventListener('click', intercambioModal);
    divContainerButtons.appendChild(btnIntercambio);
}

let filaNoDatos = function () {
    if (listaLibroUsuario.length === 0 || containerCard.childElementCount === 0) {
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

let intercambioModal = function (event) {
    let element = event.target;
    idEjemplar = element.getAttribute('data-id');
    listaUsersEjemplares = await obtenerLectoresPorEjemplaresId(idEjemplar);
    listaUsersEjemplares = listaUsersEjemplares.usuario;

    for (let i = 0; i < listaUsersEjemplares.length; i++) {
        modalLector += ` <div class="radioCard">
                        <input class="radioCard__input" id="${listaTarjetas[i]._id}" data-num="${listaTarjetas[i].numTarjeta}" data-nombre="${listaTarjetas[i].nombre1}" type="radio" name="tarjeta" />
                        <label class="radioCard__button" for="${listaTarjetas[i]._id}" tabindex="1">
                            <img class="radioCard__icon" src="img/${listaTarjetas[i].tipoTarjeta}.png" alt="" />
                            <span class="radioCard__content">
                                <span class="radioCard__title">${listaTarjetas[i].numTarjeta}</span>
                                <span class="radioCard__description">${listaTarjetas[i].nombre1}</span>
                            </span>
                        </label>
                    </div>`;
    }
}

txtFiltro.addEventListener('keyup', mostarLibros);
mostarLibros();