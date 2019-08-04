let club;

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionClub');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    club = await obtenerClubPorId(id);

    partialInformacionClub(contenedor);
}

let partialInformacionClub = function (contenedor) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información del club de lectura";
    infoContainer.appendChild(title);

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
    text.innerText = club.clubLectura.nombre;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Tema:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.tema;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Tipo Club:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.tipoClub;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Fecha de Reunión:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.fechaReunion;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Hora de la reunión:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.horaReunion;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Administrador:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.administrador.nombre + " " + club.clubLectura.administrador.primerApellido;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Correo:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = club.clubLectura.administrador.correo;
    divInfo.appendChild(text);

    if (club.clubLectura.categoria) {
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
        text.innerText = club.clubLectura.categoria.nombre;
        divInfo.appendChild(text);
    }

    if (club.clubLectura.genero) {
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
        text.innerText = club.clubLectura.genero.nombre;
        divInfo.appendChild(text);
    }
    if (club.clubLectura.sucursal) {
        divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'crear-contenedor');
        infoContainer.appendChild(divInfo);
        let button = document.createElement('a');
        button.setAttribute("href", "http://localhost:3000/perfilSucursal.html?id=" + club.clubLectura.sucursal._id);
        button.setAttribute("class", "material-blue");
        button.innerText = "Ver perfil librería";
        divInfo.appendChild(button);

    }
}

informacionLibreria();