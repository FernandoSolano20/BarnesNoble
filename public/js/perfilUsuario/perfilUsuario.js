let usuario;

let formatearFech = function (date) {
    return "" + ((date.getUTCDate() + 1 < 10 ? "0" + Number(date.getUTCDate()) : Number(date.getUTCDate())) + '/' + (date.getUTCMonth() + 1 < 10 ? "0" + Number(date.getUTCMonth() + 1) : Number(date.getUTCMonth() + 1)) + '/' + date.getFullYear()) + "";
}


let informacionUsuario = async function () {
    let contenedor = document.getElementById('informacionUsuario');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    usuario = await obtenerUsuarioPorIdFetch(id);

    partialInformacionUsuario(contenedor, id);
}


let partialInformacionUsuario = function (contenedor, idUser) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información del usuario";
    infoContainer.appendChild(title);

    document.getElementById("fotoPerfil").src = usuario.usuario.img;

    let divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    let span = document.createElement('span');
    divInfo.appendChild(span);
    let label = document.createTextNode('Nombre:');
    span.appendChild(label);
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    let text = document.createElement('p');
    text.innerText = usuario.usuario.nombre;
    divInfo.appendChild(text);

    if (usuario.usuario.segundoNombre) {
        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Segundo nombre:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.segundoNombre;
        divInfo.appendChild(text);
    }

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Primer apellido:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = usuario.usuario.primerApellido;
    divInfo.appendChild(text);

    if (usuario.usuario.segundoApellido) {
        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Segundo apellido:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.segundoApellido;
        divInfo.appendChild(text);
    }

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Correo eléctronico:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = usuario.usuario.correo;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Sexo:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = usuario.usuario.sexo;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Nacimeinto:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    var nacimiento = new Date(usuario.usuario.nacimiento);
    text.innerText = formatearFech(nacimiento);
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Edad:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = calcularEdad(nacimiento.getFullYear() + '-' + Number(nacimiento.getUTCMonth() + 1) + '-' + nacimiento.getUTCDate()) + " años"
    divInfo.appendChild(text);


    if (usuario.usuario.tipoUsuario === "Lector" || usuario.usuario.tipoUsuario === "Adminitrador plataforma") {
        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Teléfono:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.telefono;
        divInfo.appendChild(text);

        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Alias:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.alias;
        divInfo.appendChild(text);

        title = document.createElement('h2');
        title.innerText = "Dirección";
        infoContainer.appendChild(title);

        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Provincia:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.provincia;
        divInfo.appendChild(text);

        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Cantón:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.canton;
        divInfo.appendChild(text);

        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Distrito:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.distrito;
        divInfo.appendChild(text);

        divInfo = document.createElement('div');
        infoContainer.appendChild(divInfo);
        span = document.createElement('span');
        divInfo.appendChild(span);
        label = document.createTextNode('Señas:');
        span.appendChild(label);
        icon = document.createElement('i');
        icon.setAttribute('class', 'fal fa-books');
        span.insertBefore(icon, label);
        text = document.createElement('p');
        text.innerText = usuario.usuario.sennas;
        divInfo.appendChild(text);

        if (usuario.usuario.tipoUsuario === "Lector") {

            let haightAshbury = { lat: Number(usuario.usuario.localizacionLatitud), lng: Number(usuario.usuario.localizacionLongitud) };
            initMap(haightAshbury, 13);
            let message = '<h1 id="firstHeading" class="firstHeading">' + usuario.usuario.provincia + ", " + usuario.usuario.canton + ", " + usuario.usuario.distrito + '</h1>' +
                '<div id="bodyContent">' +
                '<p>Esta es tu localización</p>' +
                '</div>';
            addMarker(haightAshbury, message);

            let contenedorVotoPrefe = document.getElementById('contendorVotoPreferencia');
            let tableDiv = document.createElement('div');
            tableDiv.setAttribute('class', 'table-div');
            contenedorVotoPrefe.appendChild(tableDiv);

            let tableCellDiv = document.createElement('div');
            tableCellDiv.setAttribute('class', 'table-cell-div');
            tableDiv.appendChild(tableCellDiv);

            let divBooks = document.createElement('div');
            tableCellDiv.appendChild(divBooks);

            let spanBooksContainer = document.createElement('span');
            spanBooksContainer.setAttribute('class', 'container');
            divBooks.appendChild(spanBooksContainer);

            // <div class="stars-outer far fa-book-alt">
            //                             <div id="promVoto" class="stars-inner fas fa-book-alt"></div>
            //                         </div>
            let starsOuter = document.createElement('div');
            starsOuter.setAttribute('class', 'stars-outer far fa-book-alt');
            spanBooksContainer.appendChild(starsOuter);

            let starsInner = document.createElement('div');
            starsInner.setAttribute('class', 'stars-inner fas fa-book-alt');
            starsInner.setAttribute('id', 'promVoto');
            starsOuter.appendChild(starsInner);

            let contendorPreferencia = document.createElement('div');
            contendorPreferencia.setAttribute('id', 'preferencias');
            contendorPreferencia.setAttribute('class', 'crear-contenedor');
            contenedorVotoPrefe.appendChild(contendorPreferencia);

            infoContainer = document.createElement('div');
            infoContainer.setAttribute('class', 'info');
            contendorPreferencia.appendChild(infoContainer);

            title = document.createElement('h2');
            title.innerText = "Preferencias";
            infoContainer.appendChild(title);

            if (usuario.usuario.autor) {
                divInfo = document.createElement('div');
                infoContainer.appendChild(divInfo);
                span = document.createElement('span');
                divInfo.appendChild(span);
                label = document.createTextNode('Autor:');
                span.appendChild(label);
                icon = document.createElement('i');
                icon.setAttribute('class', 'fal fa-books');
                span.insertBefore(icon, label);
                text = document.createElement('p');
                text.innerText = usuario.usuario.autor.nombre;
                divInfo.appendChild(text);
            }

            if (usuario.usuario.genero) {
                divInfo = document.createElement('div');
                infoContainer.appendChild(divInfo);
                span = document.createElement('span');
                divInfo.appendChild(span);
                label = document.createTextNode('Género:');
                span.appendChild(label);
                icon = document.createElement('i');
                icon.setAttribute('class', 'fal fa-books');
                span.insertBefore(icon, label);
                text = document.createElement('p');
                text.innerText = usuario.usuario.genero.nombre;
                divInfo.appendChild(text);
            }

            if (usuario.usuario.categoria) {
                divInfo = document.createElement('div');
                infoContainer.appendChild(divInfo);
                span = document.createElement('span');
                divInfo.appendChild(span);
                label = document.createTextNode('Categoría:');
                span.appendChild(label);
                icon = document.createElement('i');
                icon.setAttribute('class', 'fal fa-books');
                span.insertBefore(icon, label);
                text = document.createElement('p');
                text.innerText = usuario.usuario.categoria.nombre;
                divInfo.appendChild(text);
            }

            if (usuario.usuario.libro) {
                divInfo = document.createElement('div');
                infoContainer.appendChild(divInfo);
                span = document.createElement('span');
                divInfo.appendChild(span);
                label = document.createTextNode('Libro:');
                span.appendChild(label);
                icon = document.createElement('i');
                icon.setAttribute('class', 'fal fa-books');
                span.insertBefore(icon, label);
                text = document.createElement('p');
                text.innerText = usuario.usuario.libro.titulo;
                divInfo.appendChild(text);
            }
            let tituloH2 = document.createElement("h2");
            tituloH2.setAttribute('class', 'subtitle');
            tituloH2.innerText = "Reseñas del lector";
            document.getElementById("reviews").appendChild(tituloH2);
            let promVoto = reviewsUsuario(usuario.usuario.resennas);
            let votoDiv = document.getElementById('promVoto');
            votoDiv.setAttribute('style', 'width: ' + promVoto + '%');
        } else {
            document.getElementById('map').remove();
        }
    } else {
        divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'crear-contenedor');
        infoContainer.appendChild(divInfo);
        let button = document.createElement('a');
        button.setAttribute("href", "http://localhost:3000/perfilLibreria.html?id=" + usuario.usuario.libreria._id);
        button.setAttribute("class", "material-blue");
        button.innerText = "Ver perfil librería";
        divInfo.appendChild(button);

        let haightAshbury = { lat: 9.9281, lng: -84.0907 };
        initMap(haightAshbury, 8);
        let libreria = usuario.usuario.libreria;
        let message = '<h1 id="firstHeading" class="firstHeading">Librería ' + libreria.nombreFantasia + '</h1>' +
            '<div id="bodyContent">' +
            '<p>' + libreria.provincia + ", " + libreria.canton + ", " + libreria.distrito + '</p>' +
            '<p><a href="http://localhost:3000/perfilLibreria.html?id=' + libreria._id + '">' +
            'Ver perfil librería</a> ' +
            '</p> </div>';
        let position = {
            lat: Number(libreria.localizacionLatitud),
            lng: Number(libreria.localizacionLongitud)
        }
        addMarker(position, message);

        let sucursales = usuario.usuario.libreria.sucursales;
        for (let i = 0; i < sucursales.length; i++) {
            let message = '<h1 id="firstHeading" class="firstHeading"> Sucursal ' + sucursales[i].sucursal.nombre + '</h1>' +
                '<div id="bodyContent">' +
                '<p>' + sucursales[i].sucursal.provincia + ", " + sucursales[i].sucursal.canton + ", " + sucursales[i].sucursal.distrito + '</p>' +
                '<p><a href="http://localhost:3000/perfilSucursal.html?id=' + sucursales[i].sucursal._id + '">' +
                'Ver perfil sucursal</a> ' +
                '</p> </div>';
            let position = {
                lat: Number(sucursales[i].sucursal.localizacionLatitud),
                lng: Number(sucursales[i].sucursal.localizacionLongitud)
            }
            addMarker(position, message);
        }
    }
    mostarLibros();
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

let filaNoDatosReview = function (reviewsContainer) {

    let divConatinerReview = document.createElement("div");
    divConatinerReview.setAttribute('id', 'response-container');
    reviewsContainer.appendChild(divConatinerReview);

    let ul = document.createElement("ul");
    divConatinerReview.appendChild(ul);

    let liArticle = document.createElement('li');
    liArticle.setAttribute('id', 'noDatos');
    liArticle.setAttribute('class', 'article');
    ul.appendChild(liArticle);

    let h2 = document.createElement('h2');
    liArticle.appendChild(h2);

    let anchorName = document.createElement('a');
    anchorName.setAttribute('href', '#');
    anchorName.innerText = "No hay reseñas para este usuario";
    h2.appendChild(anchorName);

    let paragraph = document.createElement('p');
    paragraph.innerText = "Realice intercambios";
    liArticle.appendChild(paragraph);
}

let drawDivReview = function (voto, usuario, reviewsContainer) {

    let divConatinerReview = document.createElement("div");
    divConatinerReview.setAttribute('id', 'response-container');
    reviewsContainer.appendChild(divConatinerReview);

    let ul = document.createElement("ul");
    divConatinerReview.appendChild(ul);

    let liArt = document.createElement("li");
    liArt.setAttribute('class', 'article');
    ul.appendChild(liArt);

    let imgUser = document.createElement('img');
    imgUser.setAttribute('src', usuario.img);
    imgUser.setAttribute('alt', 'Foto perfil');
    imgUser.setAttribute('class', 'fotoUsuario');
    liArt.appendChild(imgUser);

    let h2Name = document.createElement("h2");
    liArt.appendChild(h2Name);

    let anchorName = document.createElement("a");
    anchorName.setAttribute("href", "#");
    anchorName.innerText = usuario.nombre + " " + usuario.primerApellido;
    h2Name.appendChild(anchorName);

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('class', 'table-div');
    liArt.appendChild(tableDiv);

    let tableCellDiv = document.createElement('div');
    tableCellDiv.setAttribute('class', 'table-cell-div table-cell-resenna');
    tableDiv.appendChild(tableCellDiv);

    let divBooks = document.createElement('div');
    tableCellDiv.appendChild(divBooks);

    let spanBooksContainer = document.createElement('span');
    spanBooksContainer.setAttribute('class', 'container');
    divBooks.appendChild(spanBooksContainer);

    let divStarOuter = document.createElement('div');
    divStarOuter.setAttribute('class', 'stars-outer far fa-book-alt');
    spanBooksContainer.appendChild(divStarOuter);

    let divStarInner = document.createElement('div');
    divStarInner.setAttribute('class', 'stars-inner fas fa-book-alt');
    divStarInner.setAttribute('style', 'width: ' + voto.calificacion * 20 + '%');
    divStarOuter.appendChild(divStarInner);

    var p = document.createElement('p');
    p.innerText = voto.comentario;
    liArt.appendChild(p);
}

let reviewsUsuario = function (resenna) {
    let reviewsContainer = document.getElementById("reviews");

    let votosLength = resenna.length;
    let sumCalificacion = 0;
    for (let i = 0; i < votosLength; i++) {
        drawDivReview(resenna[i], resenna[i].usuario, reviewsContainer);
        sumCalificacion += resenna[i].calificacion;
    }
    if (votosLength == 0) {
        filaNoDatosReview(reviewsContainer);
    }
    return (sumCalificacion / (votosLength ? votosLength : 1)) * 20;
};

informacionUsuario();