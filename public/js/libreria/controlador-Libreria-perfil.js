let libreria, administrador, usuario;

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionLibreria');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    // usuario = await obtenerUsuarioPorIdLibreria(sessionStorage.id);
    // administrador = await obtenerUsuarioPorIdLibreria(id);

    // administrador = await obtenerLibreriaPorId(sessionStorage.id);
    administrador = await obtenerUsuarioPorIdLibreria(id);

    partialInformacionLibreria(contenedor);
}

let partialInformacionLibreria = function (contenedor) {
   
    infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    title = document.createElement('h2');
    title.innerText = "Información del administrador";
    infoContainer.appendChild(title);

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Nombre:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = administrador.usuario.nombre;
    divInfo.appendChild(text);

    if (administrador.usuario.segundoNombre) {
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
        text.innerText = administrador.usuario.segundoNombre;
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
    text.innerText = administrador.usuario.primerApellido;
    divInfo.appendChild(text);

    if (administrador.usuario.segundoApellido) {
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
        text.innerText = administrador.usuario.segundoApellido;
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
    text.innerText = administrador.usuario.correo;
    divInfo.appendChild(text);


}

informacionLibreria();