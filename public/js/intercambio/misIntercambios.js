'use strict';
let interCambioHTML = '';
let formatearFechaClub = function (date) {
    return "" + ((date.getUTCDate() + 1 < 10 ? "0" + Number(date.getUTCDate()) : Number(date.getUTCDate())) + '/' + (date.getUTCMonth() + 1 < 10 ? "0" + Number(date.getUTCMonth() + 1) : Number(date.getUTCMonth() + 1)) + '/' + date.getFullYear()) + "";
}

let listaIntercambio = [];
const containerInter = document.querySelector('#containerIntercambio')

let mostarIntercambio = async (event) => {
    if (!event) {
        listaIntercambio = await obtenerMisIntercambios(sessionStorage.id);
        listaIntercambio = listaIntercambio.intercambio;
    }

    containerInter.innerHTML = '';
    for (let i = 0; i < listaIntercambio.length; i++) {
        agregarCardIntercambio(listaIntercambio[i]);
    }
    filaNoDatos();
};

let agregarCardIntercambio = async (intercambio) => {
    interCambioHTML += `<div data-idIntercambio="${intercambio._id}">
                            <h2 class="tituloIntercambio">${intercambio.nombre}</h2>
                            <h3 class="tituloIntercambio">${intercambio.sucursal.nombre} en ${intercambio.sucursal.provincia}, ${intercambio.sucursal.canton}, ${intercambio.sucursal.distrito} </h3>
                            <figure class="snip1473">
                                <img src="${intercambio.participantes[0].ejemplarUsuario.libro.caratula}"
                                    alt="profile-sample6" class="profile" />
                                <figcaption>
                                    <blockquote>${intercambio.participantes[0].usuario.nombre} ${intercambio.participantes[0].usuario.primerApellido}</blockquote>
                                    <span>Fecha inicio: ${formatearFechaClub(new Date(intercambio.fechaInicio))}</span>
                                </figcaption>
                                <h3>${intercambio.participantes[0].ejemplarUsuario.libro.titulo}<span>${intercambio.participantes[0].ejemplarUsuario.tipo}</span></h3>
                                
                            </figure>
                            <figure class="snip1473 hover"><img
                                    src="${intercambio.participantes[1].ejemplarUsuario.libro.caratula}"
                                    alt="profile-sample7" class="profile" />
                                <figcaption>
                                    <blockquote>${intercambio.participantes[1].usuario.nombre} ${intercambio.participantes[1].usuario.primerApellido}</blockquote>
                                    <span>Fecha fin: ${formatearFechaClub(new Date(intercambio.fechaFin))}</span>
                                </figcaption>
                                <h3>${intercambio.participantes[1].ejemplarUsuario.libro.titulo}<span>${intercambio.participantes[1].ejemplarUsuario.tipo}</span></h3>
                                
                            </figure>
                            `;
    if (!intercambio.terminado && new Date(intercambio.fechaInicio) > new Date()) {
        interCambioHTML += `<div class="crear-contenedor">
                                <button data-id="${intercambio._id}" type="button" class="material-blue terminarIntercambio" id="registrar">Terminar intercambio</button>
                            </div>`;
    }
    else {
        interCambioHTML += '</div>';
        containerInter.innerHTML += interCambioHTML;
        interCambioHTML = '';
        if (intercambio.participantes[0].usuario._id == sessionStorage.id) {
            let user = {
                idUsuarioVotado: intercambio.participantes[1].usuario._id,
                idUsuarioVotando: intercambio.participantes[0].usuario._id,
                idIntercambio: intercambio._id
            }
            let response = await tieneElVotoUsuario(user);
            if (response.success) {
                let container = document.querySelector('[data-idintercambio="' + intercambio._id + '"]');
                let divbtn = document.createElement('div');
                divbtn.setAttribute('class', 'crear-contenedor');
                container.appendChild(divbtn);

                let btn = document.createElement('button');
                btn.setAttribute('data-id', intercambio._id);
                btn.setAttribute('data-userVotado', user.idUsuarioVotado);
                btn.setAttribute('data-userVotando', user.idUsuarioVotando);
                btn.setAttribute('type', "button");
                btn.setAttribute('class', "material-blue");
                btn.innerText = 'Votar usuario';
                btn.addEventListener('click', votarUsuario);
                divbtn.appendChild(btn);
            }
        }
        else if (intercambio.participantes[1].usuario._id == sessionStorage.id) {
            let user = {
                idUsuarioVotado: intercambio.participantes[0].usuario._id,
                idUsuarioVotando: intercambio.participantes[1].usuario._id,
                idIntercambio: intercambio._id
            }
            let response = await tieneElVotoUsuario(user);
            if (response.success) {
                let container = document.querySelector('[data-idintercambio="' + intercambio._id + '"]');
                let divbtn = document.createElement('div');
                divbtn.setAttribute('class', 'crear-contenedor');
                container.appendChild(divbtn);

                let btn = document.createElement('button');
                btn.setAttribute('data-id', intercambio._id);
                btn.setAttribute('data-userVotado', user.idUsuarioVotado);
                btn.setAttribute('data-userVotando', user.idUsuarioVotando);
                btn.setAttribute('type', "button");
                btn.setAttribute('class', "material-blue");
                btn.innerText = 'Votar usuario';
                btn.addEventListener('click', votarUsuario);
                divbtn.appendChild(btn);
            }
        }
    }

    let terminarIntercambioBtn = document.getElementsByClassName("terminarIntercambio");
    Array.from(terminarIntercambioBtn).forEach((element) => {
        element.addEventListener('click', terminarIntercambioFunction);
    })
}

let filaNoDatos = function () {
    if (listaIntercambio.length === 0) {
        containerInter.innerHTML += `<div>
                            <h2 class="tituloIntercambio">No hay intercambios</h2>
                            <figure class="snip1473" style="float: none; margin: 10px auto;">
                                <figcaption>
                                    <blockquote>Cree un intercambio</blockquote>
                                </figcaption>
                                </figure>
                            <div class="crear-contenedor">
                                <a href="intercambios.html" class="material-blue" id="registrar"><i
                                        class="far fa-clipboard-list"></i>Crear intercambio</a>
                            </div>
                        </div></div>`;
    }
}

mostarIntercambio();