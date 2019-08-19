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
let usuarioSuscito = function(lista, idUsuario){
    for (let i = 0; i < lista.length; i++) {
        if(lista[i].usuario == idUsuario) return true;
    }
    return false;
}

let clubLectura;
let btnSuscribir = document.createElement('button');

if(usuarioSuscito(clubLectura.usuariosSubscritos, sessionStorage.id)){
    btnSuscribir.innerText = 'Cancelar subscripción';
    btnSuscribir.addEventListener('click', async function () {
        let response = await desuscribirUsuario({
            idUsuario : sessionStorage.id,
            idClubLectura : clubLectura['_id']
        });
        if (response.success) {
            btnSuscribir.innerText = 'Subscribir';
            Swal.fire({
                type: 'success',
                title: response.message
            })
        }
        else {
            Swal.fire({
                type: 'error',
                title: response.message
            })
        }
    });
}
else{
    btnSuscribir.innerText = 'Subscribir';
    btnSuscribir.addEventListener('click', async function () {
        let response = await suscribirUsuario({
            idUsuario : sessionStorage.id,
            idClubLectura : clubLectura['_id']
        });
        if (response.success) {
            btnSuscribir.innerText = 'Cancelar';
            Swal.fire({
                type: 'success',
                title: response.message
            })
        }
        else {
            Swal.fire({
                type: 'error',
                title: response.message
            })
        }
    });
}

btnSuscribir.setAttribute('class', 'material-blue');
separator.innerHTML = '&nbsp;';
divContendor.appendChild(separator);
divContendor.appendChild(btnSuscribir);



let filaNoDatos = function () {
    let tbody = document.querySelector('#tbl_clubesLectura tbody');
    if (!lista_clubesLectura || tbody.childElementCount === 0) {
        tbody.innerHTML = '';
        let fila = tbody.insertRow();
        fila.setAttribute('id', 'no-data');
        let celda = fila.insertCell()
        celda.innerHTML = 'No se encontró datos';
        celda.setAttribute('colspan', '8');
    }
}

informacionLibreria();