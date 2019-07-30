

const nombreInput1 = document.getElementById('nombre-input');
const nombreAlert1 = document.getElementById('alert-nombre1');


const latitudInput = document.getElementById('latitud-input');
const latitudAlert = document.getElementById('alert-latitud');

const longitudInput = document.getElementById('longitud-input');
const longitudAlert = document.getElementById('alert-longitud');

const correoInput = document.getElementById('correo-input');
const correoAlert = document.getElementById('alert-correo');

const telefonoInput = document.getElementById('telefono-input');
const telefonoAlert = document.getElementById('alert-telefono');

const imgInput = document.getElementById('img');
const imgAlert = document.getElementById('alert-img');

const provinciaAlert = document.getElementById('alert-provincia');
const cantonAlert = document.getElementById('alert-canton');
const distritoAlert = document.getElementById('alert-distrito');

const favAlert = document.getElementById('alert-favorito');
const mapaAlert = document.getElementById('alert-mapa');

let obtenerDatosSucursales = async function () {
    let error =  validarNombre1() | validarLatitud() | validarLongitud() | validarCorreo() | validarTelefono() | validarProvincia() | validarCanton() | validarDistrito() | validarMapa();
    if (!error) {

        document.body.className = "loading";
        let imgValue = document.getElementById('img');
        let imgResult = await crearImagen(imgValue);
        if (imgResult.success) {
            
            let textProvincia, textCanton, textDistrito;
            textProvincia = sectionProvincia.value;
            textProvincia = sectionProvincia.querySelector('[value="'+textProvincia+'"]').innerText;
            textCanton = sectionCantones.value;
            textCanton = sectionCantones.querySelector('[value="'+textCanton+'"]').innerText;
            textDistrito = sectionDistritos.value;
            textDistrito = sectionDistritos.querySelector('[value="'+textDistrito+'"]').innerText;
            let usuario = {
                nombre: nombreInput1.value,
                latitud: latitudInput.value,
                longitud: longitudInput.value,
                correo: correoInput.value,
                img: imgResult.result.secure_url,
                telefono: telefonoInput.value,
                localizacionLatitud: markers[0].position.lat(),
                localizacionLongitud: markers[0].position.lng(),
                estado: 1,
                provincia: textProvincia,
                canton: textCanton,
                distrito: textDistrito,
                libreria: ''
            }
            let nuevoSucursal = await crearSucursal(sucursal);
            document.body.className = "";
            if (nuevoSucursal.success) {
                Swal.fire({
                    type: 'success',
                    title: nuevoSucursal.message,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<a href="http://localhost:3000/inicioSesion.html" class="linkPage">Ok</a>'
                });
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: nuevoSucursal.message
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

let cambiarIdentificacion = function () {
    for (let i = 0; i < idRadios.length; i++) {
        if (idRadios[i].checked) {
            document.getElementById('labelID').innerHTML = idRadios[i].value;
            idInput.name = idRadios[i].value;
            break;
        }
    }
    validarId();
}


let validarNombre1 = function () {
    let elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarNombre2 = function () {
    let elementText = {
        value: nombreInput2.value,
        alert: nombreAlert2,
        input: nombreInput2
    }
    if (elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

let validarApellido1 = function () {
    let elementText = {
        value: apellidoInput1.value,
        alert: apellidoAlert1,
        input: apellidoInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarApellido2 = function () {
    let elementText = {
        value: apellidoInput2.value,
        alert: apellidoAlert2,
        input: apellidoInput2
    }
    if (elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

let validarTelefono = function () {
    let elementNumber = {
        value: telefonoInput.value,
        alert: telefonoAlert,
        input: telefonoInput
    }
    if (!validarNumeros(elementNumber)) {
        return true;
    }
    else if (elementNumber.value.length != 8) {
        telefonoAlert.innerText = "Debe tener 8 dígitos."
        telefonoAlert.className = telefonoAlert.className.replace("alertHidden", "");
        telefonoInput.className = telefonoInput.className.replace("inputError", "");
        telefonoInput.className = telefonoInput.className + " inputError";
        return true;
    }
    else {
        telefonoAlert.className = telefonoAlert.className.replace("alertHidden", "");
        telefonoAlert.className = telefonoAlert.className + " alertHidden";
        telefonoInput.className = telefonoInput.className.replace("inputError", "");
        return false;
    }
}

let validarNacimiento = function () {
    let elementDate = {
        value: nacimientoInput.value,
        alert: nacimientoAlert,
        input: nacimientoInput
    }
    return !(validarFecha(elementDate) && validarFechaMayorActual(elementDate));
}

let validarFotoPerfil = function () {
    let elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}

let validarSexo = function () {
    let elementCheckbox = {
        alert: sexoAlert,
        input: sexoInput
    }
    if (!validarRadio(elementCheckbox)) {
        return true;
    }
    else {
        sexoAlert.className = sexoAlert.className.replace("alertHidden", "");
        sexoAlert.className = sexoAlert.className + " alertHidden";
        sexoInput[0].parentElement.className = sexoInput[0].parentElement.className.replace("errorRadio", "");
        return false;
    }
}

let validarAlias = function () {
    let elementText = {
        value: aliasInput.value,
        alert: aliasAlert,
        input: aliasInput
    }
    return !(noVacio(elementText));
}

let validarProvincia = function () {
    let elementSelect = {
        value: sectionProvincia.value,
        alert: provinciaAlert,
        input: sectionProvincia
    }
    return !(validarSelect(elementSelect));
}

let validarCanton = function () {
    let elementSelect = {
        value: sectionCantones.value,
        alert: cantonAlert,
        input: sectionCantones
    }
    return !(validarSelect(elementSelect));
}

let validarLatitud = function(){
    let elementNumber = {
        value: latitudInput.value,
        alert:latitudAlert,
        input: latitudInput
    }
    return !(noVacio(elementNumber));
}

let validarLongitud = function(){
    let elementNumber = {
        value: longitudInput.value,
        alert: longitudAlert,
        input: longitudInput
    }
    return !(noVacio(elementNumber));
}

let validarDistrito = function () {
    let elementSelect = {
        value: sectionDistritos.value,
        alert: distritoAlert,
        input: sectionDistritos
    }
    return !(validarSelect(elementSelect));
}

let validarSennas = function () {
    let elementText = {
        value: sennasInput.value,
        alert: sennasAlert,
        input: sennasInput
    }
    return !(noVacio(elementText));
}

let validarFavoritos = function () {
    if (autorSelect.value === '' && generoSelect.value === '' && categoriaSelect.value === '' && libroSelect.value === '') {
        favAlert.className = favAlert.className.replace("alertHidden", "");
        autorSelect.className = autorSelect.className.replace("selectError", "");
        autorSelect.className = autorSelect.className + " selectError";
        generoSelect.className = generoSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className + " selectError";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className + " selectError";
        libroSelect.className = libroSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className + " selectError";
        return true;
    }
    else {
        autorSelect.className = autorSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className.replace("selectError", "");
        favAlert.className = favAlert.className.replace("alertHidden", "");
        favAlert.className = favAlert.className + " alertHidden";
        return false;
    }
}

nombreInput1.addEventListener('blur', validarNombre1);
latitudInput.addEventListener('blur', validarLatitud);
longitudInput.addEventListener('blur', validarLongitud);
correoInput.addEventListener('blur', validarCorreo);
telefonoInput.addEventListener('blur', validarTelefono);
imgInput.addEventListener('change', validarFotoPerfil);
sectionProvincia.addEventListener('change', validarProvincia);
sectionCantones.addEventListener('change', validarCanton);
sectionDistritos.addEventListener('change', validarDistrito);
document.getElementById('registrar').addEventListener('click', obtenerDatosSucursales);
document.getElementById('map').addEventListener('click', validarMapa);