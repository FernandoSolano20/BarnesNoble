let arrayEjemplar = [];
let libro = [];
let listaEjemp = [];
let radioEjemple = '';

let obtenerInformacionLibro = async function () {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    libro = await obtenerLibrosId(id);
    if (libro.success) {
        let promVoto = partialReviews(libro.listaLibro.voto);
        let votoDiv = document.getElementById('promVoto');
        votoDiv.setAttribute('style', 'width: ' + promVoto + '%');
        if (sessionStorage.tipoUsuario != 'Adminitrador plataforma') {
            let divButton = document.getElementById('contenedorBotonCompra');

            let btnCompra = document.createElement('button');
            btnCompra.setAttribute('type', 'button');
            btnCompra.setAttribute('class', 'material-blue');
            btnCompra.setAttribute('data-libro', libro.listaLibro._id);
            let label;
            if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
                btnCompra.addEventListener('click', modalComprarLibroBarnesNoble);
                label = document.createTextNode('Comprar');
            }
            else {
                btnCompra.addEventListener('click',modalComprarLibroBarnesNobleLector);
                label = document.createTextNode('Agregar a carrito');
            }

            divButton.appendChild(btnCompra);
            btnCompra.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btnCompra.insertBefore(icon, label);
        }

        let ejemplares = await obtenerEjemplaresPorIdLibro(id);
        if (ejemplares.success) {
            document.getElementById('titulo').innerHTML = libro.listaLibro.titulo;
            document.getElementById('caratula').src = libro.listaLibro.caratula;
            document.getElementById('contraportada').src = libro.listaLibro.contraportada;
            document.getElementById('autor').innerHTML = libro.listaLibro.autor.nombre;
            document.getElementById('perfilAutor').href = "verPerfilAutor.html?_id=" + libro.listaLibro.autor._id;

            document.getElementById('nombreArtistico').innerHTML = libro.listaLibro.autor.nombreArtistico;
            document.getElementById('fotoAutor').src = libro.listaLibro.autor.foto;
            document.getElementById('categoria').innerHTML = libro.listaLibro.categoria.nombre;
            document.getElementById('genero').innerHTML = libro.listaLibro.genero.nombre;

            let radioTipoLibro = document.getElementById('tipoLibro');
            let infoLibro = document.getElementById('infoLibro');
            ejemplares = ejemplares.listaLibros;
            for (let i = 0; i < ejemplares.length; i++) {
                radioEjemple += `<input type="radio" name="ejempRadio" id="${ejemplares[i]._id}" data-libro="${ejemplares[i]._id}"  data-nombreLibro="${libro.listaLibro.titulo}" data-tipoLibro="${ejemplares[i].tipo}" data-img="${libro.listaLibro.caratula}" data-precio="${ejemplares[i].precio}">
                                <label for="${ejemplares[i]._id}" class="labelRadio">${ejemplares[i].tipo}</label>`;
                listaEjemp.push(ejemplares[i]._id);
                let input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'id');
                input.setAttribute('id', 'input' + i);
                input.setAttribute('value', i);
                input.addEventListener('change', changeText);
                radioTipoLibro.appendChild(input);

                let label = document.createElement('label');
                label.setAttribute('for', 'input' + i);
                label.setAttribute('class', 'labelRadio');
                label.innerText = ejemplares[i].tipo;
                radioTipoLibro.appendChild(label);

                arrayEjemplar[i] = `<div><span><i class="fas fa-newspaper"></i>Edición:</span><p id="edicion">${ejemplares[i].edicion}</p>
            </div>
            <div>
                <span><i class="fas fa-newspaper"></i>Editorial:</span>
                <p id="editorial">${ejemplares[i].editorial}</p>
            </div>
            <div>
                <span><i class="far fa-book"></i>ISBN:</span>
                <p id="isbn10">${ejemplares[i].isbn10}</p>
            </div>
            <div>
                <span><i class="far fa-book"></i>ISBN:</span>
                <p id="isbn13">${ejemplares[i].isbn13}</p>
            </div>
            <div>
                <span><i class="far fa-money-bill"></i>Precio:</span>
                <p id="precio">${ejemplares[i].precio}</p>
            </div>
            <div>
                <span><i class="far fa-calendar-week"></i>Año de edición:</span>
                <p id="annoEdicion">${ejemplares[i].annoEdicion}</p>
            </div>`
            }
            if (sessionStorage.tipoUsuario == 'Lector') {
                let usuario = {
                    idLibro: id,
                    idUsuario: sessionStorage.id,
                    ejemplares: listaEjemp,
                }
                let response = await tieneElLibroVoto(usuario);
                if (response.success && ejemplares.length) {
                    let divButtones = document.getElementById('contendorVoto');
                    let btnVotar = document.createElement('button');
                    btnVotar.setAttribute('type', 'button');
                    btnVotar.setAttribute('class', 'material-blue');
                    btnVotar.setAttribute('id','btnVoto')
                    btnVotar.setAttribute('data-libro', libro.listaLibro._id);
                    btnVotar.addEventListener('click', votar);
                    let labelVotar = document.createTextNode('Votar');
                    divButtones.appendChild(btnVotar);
                    btnVotar.appendChild(labelVotar);
                    let iconVoto = document.createElement('i');
                    iconVoto.setAttribute('class', 'far fa-book');
                    btnVotar.insertBefore(iconVoto, labelVotar);
                }
            }

            let firstInput = document.getElementById("input0")
            if (firstInput)
                firstInput.checked = true;

            if (arrayEjemplar[0])
                infoLibro.innerHTML = arrayEjemplar[0];
            animationVotes();
        }
    }
}

let changeText = function (event) {
    document.getElementById('infoLibro').innerHTML = arrayEjemplar[event.target.value];
}

let filaNoDatos = function (containerReviews) {
    let liArticle = document.createElement('li');
    liArticle.setAttribute('id','noDatos');
    liArticle.setAttribute('class', 'article');
    containerReviews.appendChild(liArticle);

    let h2 = document.createElement('h2');
    liArticle.appendChild(h2);

    let anchorName = document.createElement('a');
    anchorName.setAttribute('href', '#');
    anchorName.innerText = "No hay reseñas en este libro";
    h2.appendChild(anchorName);

    let paragraph = document.createElement('p');
    paragraph.innerText = "Compre el libro para poder calificar";
    liArticle.appendChild(paragraph);
}

let drawDivReview = function (voto, usuario) {
    let containerReviews = document.getElementById('reviews');
    let liArticle = document.createElement('li');
    liArticle.setAttribute('class', 'article');
    containerReviews.appendChild(liArticle);

    let imgUser = document.createElement('img');
    imgUser.setAttribute('src', usuario.img);
    imgUser.setAttribute('alt', 'Foto perfil de' + usuario.nombre + " " + usuario.primerApellido);
    imgUser.setAttribute('class', 'fotoUsuario');
    liArticle.appendChild(imgUser);

    let h2 = document.createElement('h2');
    liArticle.appendChild(h2);

    let anchorName = document.createElement('a');
    anchorName.setAttribute('href', 'perfilUsuario.html?id=' + usuario._id);
    anchorName.innerText = usuario.nombre + " " + usuario.primerApellido;
    h2.appendChild(anchorName);

    let divTable = document.createElement('div');
    divTable.setAttribute('class', 'table-div');
    liArticle.appendChild(divTable);

    let divTableCell = document.createElement('div');
    divTableCell.setAttribute('class', 'table-cell-div table-cell-resenna');
    divTable.appendChild(divTableCell);

    let divContainerVoto = document.createElement('div');
    divTableCell.appendChild(divContainerVoto);

    let spanContainer = document.createElement('span');
    spanContainer.setAttribute('class', 'container');
    divContainerVoto.appendChild(spanContainer);

    let divStars = document.createElement('div');
    divStars.setAttribute('class', 'stars-outer far fa-book-alt');
    spanContainer.appendChild(divStars);

    let divStarsInner = document.createElement('div');
    divStarsInner.setAttribute('class', 'stars-inner fas fa-book-alt');
    divStarsInner.setAttribute('style', 'width: ' + voto.calificacion * 20 + '%');
    divStars.appendChild(divStarsInner);

    let paragraph = document.createElement('p');
    paragraph.innerText = voto.comentario;
    liArticle.appendChild(paragraph);
}

let partialReviews = function (votos) {
    let containerReviews = document.getElementById('reviews');
    let votosLength = votos.length;
    let sumCalificacion = 0;
    for (let i = 0; i < votosLength; i++) {
        drawDivReview(votos[i], votos[i].usuario);
        sumCalificacion += votos[i].calificacion;
    }
    if (votosLength == 0) {
        filaNoDatos(containerReviews);
    }
    return (sumCalificacion / (votosLength ? votosLength : 1)) * 20;
}


obtenerInformacionLibro();