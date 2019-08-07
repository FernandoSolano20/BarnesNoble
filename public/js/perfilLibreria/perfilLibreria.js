let libreria, administrador;

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionLibreria');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    libreria = await obtenerLibreriaPorId(id);
    administrador = await obtenerUsuarioPorIdLibreria(libreria.listaLibrerias._id);

    partialInformacionLibreria(contenedor);
}

let partialInformacionLibreria = function (contenedor) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información de la librería";
    infoContainer.appendChild(title);

    let divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    let span = document.createElement('span');
    divInfo.appendChild(span);
    let label = document.createTextNode('Nombre Fantasía:');
    span.appendChild(label);
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    let text = document.createElement('p');
    text.innerText = libreria.listaLibrerias.nombreFantasia;
    divInfo.appendChild(text);
    document.getElementById('tiendaNombre').innerText = "Librería " + libreria.listaLibrerias.nombreFantasia;

    divInfo = document.createElement('div');
    infoContainer.appendChild(divInfo);
    span = document.createElement('span');
    divInfo.appendChild(span);
    label = document.createTextNode('Nombre Comercial:');
    span.appendChild(label);
    icon = document.createElement('i');
    icon.setAttribute('class', 'fal fa-books');
    span.insertBefore(icon, label);
    text = document.createElement('p');
    text.innerText = libreria.listaLibrerias.nombreComercial;
    divInfo.appendChild(text);

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
    text.innerText = libreria.listaLibrerias.provincia;
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
    text.innerText = libreria.listaLibrerias.canton;
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
    text.innerText = libreria.listaLibrerias.distrito;
    divInfo.appendChild(text);

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

    let containerSucursal = document.getElementById('sucursales');
    let sucursales = libreria.listaLibrerias.sucursales;
    for (let i = 0; i < sucursales.length; i++) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card cardsSucursal');
        containerSucursal.appendChild(card);

        let h3 = document.createElement('h3');
        h3.setAttribute('class', 'sub-subTitile');
        h3.innerText = sucursales[i].sucursal.nombre;
        card.appendChild(h3);

        let anchorEmail = document.createElement('a');
        anchorEmail.setAttribute('class', 'linkCard');
        anchorEmail.setAttribute('href', 'http://localhost:3000/perfilSucursal.html?id='+sucursales[i].sucursal._id);
        anchorEmail.innerText = sucursales[i].sucursal.correo;
        card.appendChild(anchorEmail);

        let anchorTelefono = document.createElement('a');
        anchorTelefono.setAttribute('class', 'linkCard linkLast');
        anchorTelefono.setAttribute('href', 'http://localhost:3000/perfilSucursal.html?id='+sucursales[i].sucursal._id);
        anchorTelefono.innerText = sucursales[i].sucursal.telefono;
        card.appendChild(anchorTelefono);

        let ul = document.createElement('ul');
        card.appendChild(ul);

        let anchorButton = document.createElement('a');
        anchorButton.setAttribute('href', 'http://localhost:3000/perfilSucursal.html?id='+sucursales[i].sucursal._id);
        anchorButton.setAttribute('class', 'linkCard');
        anchorButton.innerText = sucursales[i].telefono;
        anchorButton.innerText = "Ver perfil";
        ul.appendChild(anchorButton);
    }

    let haightAshbury = { lat: 9.9281, lng: -84.0907 };
    initMap(haightAshbury, 8);
    let message = '<h1 id="firstHeading" class="firstHeading">Librería ' + libreria.listaLibrerias.nombreFantasia + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + libreria.listaLibrerias.provincia + ", " + libreria.listaLibrerias.canton + ", " + libreria.listaLibrerias.distrito + '</p>' +
        '<p><a href="http://localhost:3000/perfilLibreria.html?id=' + libreria.listaLibrerias._id + '">' +
        'Ver perfil librería</a> ' +
        '</p> </div>';
    let position = {
        lat: Number(libreria.listaLibrerias.localizacionLatitud),
        lng: Number(libreria.listaLibrerias.localizacionLongitud)
    }
    addMarker(position, message);

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

informacionLibreria();