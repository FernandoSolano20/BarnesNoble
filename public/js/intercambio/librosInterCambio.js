const containerCard = document.querySelector('#cardElements')
const txtFiltro = document.getElementById("txtFiltro");
let listaLibroUsuario;
let listaUsersEjemplares = [];
let listaMisLibros = []

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

    let btnIntercambio = document.createElement('button');
    btnIntercambio.setAttribute('class', 'material btnLibreria masGrande');
    btnIntercambio.innerText = 'Intercambiar';
    btnIntercambio.setAttribute('href', '#');
    btnIntercambio.setAttribute('data-id', ejemplar._id)
    btnIntercambio.setAttribute('data-nombre', libro.titulo)
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

let intercambioModal = async (event) => {
    let element = event.target;
    idEjemplar = element.getAttribute('data-id');
    listaUsersEjemplares = await obtenerLectoresPorEjemplaresId(idEjemplar);
    listaUsersEjemplares = listaUsersEjemplares.usuario;
    let modalLector = '';
    for (let i = 0; i < listaUsersEjemplares.length; i++) {
        if (listaUsersEjemplares[i].ejemplares[0].estadoIntercambio == 1 && sessionStorage.id != listaUsersEjemplares[i]._id) {
            modalLector += ` <div class="radioCard">
                        <input class="radioCard__input" id="${listaUsersEjemplares[i]._id}" type="radio" name="usuarios" />
                        <label class="radioCard__button" for="${listaUsersEjemplares[i]._id}" tabindex="1">
                            <img class="radioCard__icon" src="${listaUsersEjemplares[i].img}" alt="" />
                            <span class="radioCard__content">
                                <span class="radioCard__title">${listaUsersEjemplares[i].provincia} ${listaUsersEjemplares[i].canton}</span>
                                <span class="radioCard__description">${listaUsersEjemplares[i].nombre} ${listaUsersEjemplares[i].primerApellido}</span>
                            </span>
                        </label>
                    </div>`;
        }
    }
    if (listaUsersEjemplares.length == 0) {
        modalLector = ` <div class="crear-contenedor">
                                <p>Ningun usuario tiene este libro</p>
                            </div>`;

    }

    Swal.fire({
        title: 'Datos de intercambio',
        html: ` <div>${modalLector}
                </div>`,
        showCancelButton: true,
        showConfirmButton: !!(listaUsersEjemplares.length)
    }).then(async (result) => {
        if (result.value) {
            var user;
            document.querySelectorAll("[name='usuarios']").forEach((element) => {
                if (element.checked) {
                    user = element;
                }
            });

            listaMisLibros = await verLibrosCompradosLector(sessionStorage.id)
            let modalMisLibros = '';
            listaMisLibros = listaMisLibros.usuario.ejemplares;

            for (let i = 0; i < listaMisLibros.length; i++) {
                if (listaMisLibros[i].estadoIntercambio == 1 && listaMisLibros[i].libro._id != idEjemplar) {
                    let ejemplar = listaMisLibros[i].libro;
                    let libro = listaMisLibros[i].libro.libro;
                    modalMisLibros += ` <div class="radioCard">
                                <input class="radioCard__input" id="${ejemplar._id}" type="radio" name="libros" data-nombre="${libro.titulo}"/>
                                <label class="radioCard__button" for="${ejemplar._id}" tabindex="1">
                                    <img class="radioCard__icon" src="${libro.caratula}" alt="" />
                                    <span class="radioCard__content">
                                        <span class="radioCard__title">${libro.titulo}</span>
                                        <span class="radioCard__description">${ejemplar.tipo}</span>
                                    </span>
                                </label>
                            </div>`;
                }
            }
            if (listaMisLibros.length == 0) {
                modalMisLibros = ` <div class="crear-contenedor">
                                        <p>No tiene libros comprados</p>
                                    </div>`;

            }
            Swal.fire({
                title: 'Datos de intercambio',
                html: ` <div><h2>Mis libros</h2> ${modalMisLibros}
                        </div>`,
                showCancelButton: true,
                showConfirmButton: !!(listaUsersEjemplares.length)
            }).then(async (result) => {
                if (result.value) {
                    var libro;
                    document.querySelectorAll("[name='libros']").forEach((element) => {
                        if (element.checked) {
                            libro = element;
                        }
                    });
                    let participantes = [
                        {
                            usuario: user.id,
                            ejemplarUsuario: idEjemplar,
                            tipoUsuario: "Receptor"
                        },
                        {
                            usuario: sessionStorage.id,
                            ejemplarUsuario: libro.id,
                            tipoUsuario: "Emisor"
                        }
                    ];
                    let intercambio = {
                        nombre: `Intercambio entre ${element.getAttribute('data-nombre')} y ${libro.getAttribute('data-nombre')}`,
                        participantes: participantes
                    }
                    let response = await crearIntercambio(intercambio);
                    if (response.success) {
                        Swal.fire({
                            title: 'El intercambio se ha enviado al usuario',
                            type: 'success',
                            title: response.message
                        })
                    }
                    else{
                        Swal.fire({
                            title: 'Ocurrio un error al realizar el intercambio',
                            type: 'error',
                            title: response.message
                        })
                    }
                }
            })
        }
    });
}

txtFiltro.addEventListener('keyup', mostarLibros);
mostarLibros();