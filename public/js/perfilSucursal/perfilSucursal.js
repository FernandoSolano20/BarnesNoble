let sucursal, libreria;

let informacionLibreria = async function () {
    let contenedor = document.getElementById('informacionSucursal');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    sucursal = await obtenerSucursalPorId(id);
    libreria = await obtenerLibreriaPorIdSucursal(id);

    partialInformacionSucursal(contenedor);
}

let partialInformacionSucursal = function (contenedor) {
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class', 'info');
    contenedor.appendChild(infoContainer);
    let title = document.createElement('h2');
    title.innerText = "Información de la sucursal";
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
    text.innerText = sucursal.sucursal.nombre;
    divInfo.appendChild(text);
    document.getElementById('tiendaNombre').innerText = "Sucursal " + sucursal.sucursal.nombre;

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
    text.innerText = sucursal.sucursal.telefono;
    divInfo.appendChild(text);

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
    text.innerText = sucursal.sucursal.correo;
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
    text.innerText = sucursal.sucursal.provincia;
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
    text.innerText = sucursal.sucursal.canton;
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
    text.innerText = sucursal.sucursal.distrito;
    divInfo.appendChild(text);

    divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'crear-contenedor');
    infoContainer.appendChild(divInfo);
    let button = document.createElement('a');
    button.setAttribute("href", "http://localhost:3000/perfilLibreria.html?id=" + libreria.libreria[0]._id);
    button.setAttribute("class", "material-blue");
    button.innerText = "Ver perfil librería";
    divInfo.appendChild(button);

    let position = {
        lat: Number(sucursal.sucursal.localizacionLatitud),
        lng: Number(sucursal.sucursal.localizacionLongitud)
    }
    initMap(position, 13);
    let message = '<h1 id="firstHeading" class="firstHeading"> Sucursal ' + sucursal.sucursal.nombre + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + sucursal.sucursal.provincia + ", " + sucursal.sucursal.canton + ", " + sucursal.sucursal.distrito + '</p>' +
        '<p>Está es la localización de la sucursal ' +
        '</p> </div>';
    addMarker(position, message);
}

informacionLibreria();