let regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

const nombreInput1 = document.getElementById('nombre-input');
const nombreAlert1 = document.getElementById('alert-nombre1');

const temaInput = document.getElementById('tema-input');
const temaAlert = document.getElementById('alert-tema');

const tipoInput = document.querySelectorAll('[name="tipo"]');
const tipoAlert = document.getElementById('alert-tipo');

const diaInput = document.getElementById('dia-input');
const diaAlert = document.getElementById('alert-dia');

const horaInput = document.getElementById('hora-input');
const horalert = document.getElementById('alert-hora');

const imgInput = document.getElementById('img');
const imgAlert = document.getElementById('alert-img');

const favAlert = document.getElementById('alert-favorito');

let obtenerDatosClubLectura = async function () {
    let error = validarNombre1() | validarTema() | validarTipo();
    if (!error) {

        document.body.className = "loading";
        let imgResult = await crearImagen(imgValue);
        if (imgResult.success) {
    
            let clubLectura = {
                nombre: nombreInput1.value,
                tema: temaInput.value,
                tipo: tipoValue,
                dia: diaValue,
                img: imgResult.result.secure_url,
                hora: horaInput.value,
                sucursal: ''
            }
            let nuevoClubLectura = await crearClubLectura(clubLectura);
            document.body.className = "";
            if (nuevoClubLectura.success) {
                Swal.fire({
                    type: 'success',
                    title: nuevoClubLectura.message,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<a href="http://localhost:3000/inicioSesion.html" class="linkPage">Ok</a>'
                });
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: nuevoClubLectura.message
                });
            }
        }
        else {
            document.body.className = "";
            Swal.fire({
                type: 'error',
                title: imgResult.message
            });
        }
    }
    else {
        Swal.fire({
            type: 'warning',
            title: 'No se ha enviado su mensaje exitosamente',
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
}

let noVacio = function (elementos) {
    if (elementos.value == "") {
        elementos.alert.innerText = "Rellene el campo."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
    elementos.alert.className = elementos.alert.className + " alertHidden";
    elementos.input.className = elementos.input.className.replace("inputError", "");
    return true;
}

let validarRadio = function (elementos) {
    for (let i = 0; i < elementos.input.length; i++) {
        if (elementos.input[i].checked) {
            elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
            elementos.alert.className = elementos.alert.className + " alertHidden";
            return true;
        }
    }
    elementos.alert.innerText = "Campo requerido."
    elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
    elementos.input[0].parentElement.className = elementos.input[0].parentElement.className + " errorRadio";
    return false;
}


let cambiarTipo = function () {
    for (let i = 0; i < idRadios.length; i++) {
        if (idRadios[i].checked) {
            document.getElementById('labelID').innerHTML = idRadios[i].value;
            idInput.name = idRadios[i].value;
        
        }
    }
    validartipo();
}

let validarFotoPerfil = function () {
    let elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}


let validarTexto = function (elementos) {
    if (!regexText.test(elementos.value)) {
        elementos.alert.innerText = "Solo debe tener letras."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
    elementos.alert.className = elementos.alert.className + " alertHidden";
    elementos.input.className = elementos.input.className.replace("inputError", "");
    return true;
}



let validarNombre1 = function () {
    let elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarHora = function () {
    let elementTime = {
        value: horaInput.value,
        alert: horaAlert,
        input: horaInput
    }
    return !(noVacio(elementTime) && validarTexto(elementTime));
}


let validarTema = function () {
    let elementText = {
        value: temaInput.value,
        alert: temaAlert,
        input: temaInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}


let validarTipo = function () {
    let elementCheckbox = {
        alert: tipoAlert,
        input: tipoInput
    }
    if (!validarRadio(elementCheckbox)) {
        return true;
    }
    else {
        tipoAlert.className = tipoAlert.className.replace("alertHidden", "");
        tipoAlert.className = tipoAlert.className + " alertHidden";
        tipoInput[0].parentElement.className = tipoInput[0].parentElement.className.replace("errorRadio", "");
        return false;
    }
}


nombreInput1.addEventListener('blur', validarNombre1);
temaInput.addEventListener('blur', validarTema);
imgInput.addEventListener('change', validarFotoPerfil);
for (let i = 0; i < tipoInput.length; i++)
    tipoInput[i].addEventListener('change', validarTipo);

document.getElementById('registrar').addEventListener('click', obtenerDatosClubLectura);
