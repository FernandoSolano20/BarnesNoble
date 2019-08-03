const nombreInput = document.getElementById('nombre-input');
const nombreAlert = document.getElementById('alert-nombre');

const temaInput = document.getElementById('tema-input');
const temaAlert = document.getElementById('alert-tema');

let   tipoClubInput  = document.querySelectorAll('[name="tipoClub"]')
const tipoClubAlert = document.getElementById('alert-tipo-club');

const fechaReunionInput = document.getElementById('fecha-reunion-input');
const fechaReunionAlert = document.getElementById('alert-fecha-reunion');


const horaReunionInput = document.getElementById('hora-reunion-input');
const horaReunionAlert = document.getElementById('alert-hora-reunion');


let validarDatosClubLectura = async function () {
    let error = validarNombre() | validarTema() | validarTipoClub()  | validarFechaReunion() | validarHoraReunion();
    if (!error) {

        let nombre = nombreInput.value;
        let tema = temaInput.value;
        for (let i = 0; i < tipoClubInput.length; i++){
        if (tipoClubInput[i].checked){
        tipoClubInput=tipoClubInput[i].value;
        break;
        }
    }
        let fechaReunion = fechaReunionInput.value;
        let horaReunion =horaReunionInput.value;

        let clubLectura = {
            nombre: nombre,
            tema: tema,
            tipoClub: tipoClubInput,
            fechaReunion: fechaReunion,
            horaReunion: horaReunion,
            administrador: sessionStorage.id
        }

        let nuevoClubLectura = await registrarClubLectura(clubLectura);

        if (nuevoClubLectura.success) {
            Swal.fire({
                title: nuevoClubLectura.message,
                type: 'success',
                text: 'Se registró correctamente',
                confirmButtonText:
                        '<a href="http://localhost:3000/listarClubLectura.html" class="linkPage">Ok</a>'

            })
        } else {
            Swal.fire({
                title: nuevoClubLectura.message,
                type: 'error'
            })
        }
    }
    else {
        Swal.fire({
            title: 'No se ha realizado el registro',
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

let validarTipoClub = function () {
    let elementRadio = {
        alert: tipoClubAlert,
        input: tipoClubInput
    }
    return !(validarRadio(elementRadio));
}

let validarHoraReunion = function () {
    let elementTime = {
        value: fechaReunionInput.value,
        alert: fechaReunionAlert,
        input: fechaReunionInput
    }
    return !(noVacio(elementTime));
}

nombreInput.addEventListener('blur', validarNombre);
temaInput.addEventListener('blur', validarTema);
for (let i = 0; i < tipoClubInput.length; i++)
tipoClubInput[i].addEventListener('change', validarTipoClub);
fechaReunionInput.addEventListener('change', validarFechaReunion);
horaReunionInput.addEventListener('change', validarHoraReunion);
document.getElementById('registrar').addEventListener('click', validarDatosClubLectura);
