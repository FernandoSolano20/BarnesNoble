const nombreInput = document.getElementById('nombre-input');
const nombreAlert = document.getElementById('alert-nombre');

const temaInput = document.getElementById('tema-input');
const temaAlert = document.getElementById('alert-tema');

const tipoClubInput = document.querySelectorAll('[name="tipoClub"]')
const tipoClubAlert = document.getElementById('alert-tipo-club');

const fechaReunionInput = document.getElementById('fecha-reunion-input');
const fechaReunionAlert = document.getElementById('alert-fecha-reunion');


const horaReunionInput = document.getElementById('hora-reunion-input');
const horaReunionAlert = document.getElementById('alert-hora-reunion');

const sucursalAlert = document.getElementById('alertSucursal');

const favAlert = document.getElementById('alertTipo');

const tipoClubCont = document.getElementById('tipo-club-input');

let url = new URL(window.location.href);
let id = url.searchParams.get("id");

(async () => {
    let club = await obtenerClubPorId(id);
    club = club.clubLectura;
    nombreInput.value = club.nombre;
    temaInput.value = club.tema;
    fechaReunionInput.value = club.fechaReunion;
    horaReunionInput.value = club.horaReunion;
    await crearSectionGeneros();
    generoSelect.value = club.genero ? club.genero._id : '';
    await crearSectionCategorias();
    categoriaSelect.value = club.categoria ? club.categoria._id : '';
    tipoClubCont.querySelector("[value='" + club.tipoClub + "']").checked = true;
    let tiendas = document.getElementById('tiendas');
    if (club.tipoClub == 'Presencial') {
        tiendas.className = tiendas.className.replace("alertHidden", "");
        await crearSectionSucursal();
        sucursalSelect.value = club.sucursal._id;
    }
})();

let validarDatosClubLectura = async function () {
    let error = validarNombre() | validarTema() | validarTipoClub() | validarFechaReunion() | validarHoraReunion() | validarSelectSucursal() | validarTipos();
    if (!error) {

        let nombre = nombreInput.value;
        let tema = temaInput.value;
        let tipoClub;
        for (let i = 0; i < tipoClubInput.length; i++) {
            if (tipoClubInput[i].checked) {
                tipoClub = tipoClubInput[i].value;
                break;
            }
        }
        let fechaReunion = fechaReunionInput.value;
        let horaReunion = horaReunionInput.value;

        let clubLectura = {
            nombre: nombre,
            tema: tema,
            tipoClub: tipoClub,
            fechaReunion: fechaReunion,
            horaReunion: horaReunion,
            administrador: sessionStorage.id
        }

        if (valor == 'Presencial')
            clubLectura.sucursal = sucursalSelect.value
        if (generoSelect.value)
            clubLectura.genero = generoSelect.value;
        if (categoriaSelect.value)
            clubLectura.categoria = categoriaSelect.value;

        let nuevoClubLectura;
        if (id) {
            nuevoClubLectura = await modificarClubLectura(clubLectura, id);
        }
        else {
            nuevoClubLectura = await registrarClubLectura(clubLectura);
        }
        if (nuevoClubLectura.success) {
            Swal.fire({
                title: 'Se guardó correctamente',
                type: 'success',
                text: nuevoClubLectura.message,
            }).then((result) => {
                if (id) {
                    window.location.href = "perfilClubLectura.html?id=" + id
                }
                else {
                    window.location.href = 'listarClubLectura.html';
                }
            });
        } else {
            Swal.fire({
                title: 'No se pudo almacenar correctamente',
                text: nuevoClubLectura.message,
                type: 'error'
            })
        }
    }
    else {
        Swal.fire({
            title: 'No se pudo guardar el club de lectura',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }
};



let validarNombre = function () {
    let elementText = {
        value: nombreInput.value,
        alert: nombreAlert,
        input: nombreInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarTema = function () {
    let elementText = {
        value: temaInput.value,
        alert: temaAlert,
        input: temaInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarFechaReunion = function () {
    let elementSelect = {
        value: fechaReunionInput.value,
        alert: fechaReunionAlert,
        input: fechaReunionInput
    }
    return !(validarSelect(elementSelect));
}
let valor;
let validarTipoClub = function () {
    let elementRadio = {
        alert: tipoClubAlert,
        input: tipoClubInput
    }
    let tiendas = document.getElementById('tiendas');
    for (let i = 0; i < tipoClubInput.length; i++) {
        if (tipoClubInput[i].checked) {
            valor = tipoClubInput[i].value;
            break;
        }
    }

    if (valor == 'Presencial') {
        tiendas.className = tiendas.className.replace("alertHidden", "");
    }
    else {
        tiendas.className = tiendas.className.replace("alertHidden", "");
        tiendas.className = tiendas.className + "alertHidden";
    }
    return !(validarRadio(elementRadio));
}

let validarHoraReunion = function () {
    let elementTime = {
        value: horaReunionInput.value,
        alert: horaReunionAlert,
        input: horaReunionInput
    }
    return !(noVacio(elementTime));
}

let validarSelectSucursal = function () {
    if (valor == 'Presencial') {
        let elementSelect = {
            value: sucursalSelect.value,
            alert: sucursalAlert,
            input: sucursalSelect
        }
        return !(validarSelect(elementSelect));
    }
}

let validarTipos = function () {
    if (generoSelect.value === '' && categoriaSelect.value === '') {
        favAlert.className = favAlert.className.replace("alertHidden", "");
        generoSelect.className = generoSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className + " selectError";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className + " selectError";
        return true;
    }
    else {
        generoSelect.className = generoSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        favAlert.className = favAlert.className + " alertHidden";
        return false;
    }
}

nombreInput.addEventListener('blur', validarNombre);
temaInput.addEventListener('blur', validarTema);
for (let i = 0; i < tipoClubInput.length; i++)
    tipoClubInput[i].addEventListener('change', validarTipoClub);
fechaReunionInput.addEventListener('change', validarFechaReunion);
horaReunionInput.addEventListener('blur', validarHoraReunion);
sucursalSelect.addEventListener('change', validarSelectSucursal);
generoSelect.addEventListener('change', validarTipos);
categoriaSelect.addEventListener('change', validarTipos);
document.getElementById('registrar').addEventListener('click', validarDatosClubLectura);

