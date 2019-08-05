

const nombreInput1 = document.getElementById('nombre-input');
const nombreAlert1 = document.getElementById('alert-nombre1');

const correoInput = document.getElementById('correo-input');
const correoAlert = document.getElementById('alert-correo');

const telefonoInput = document.getElementById('telefono-input');
const telefonoAlert = document.getElementById('alert-telefono');

const provinciaAlert = document.getElementById('alert-provincia');
const cantonAlert = document.getElementById('alert-canton');
const distritoAlert = document.getElementById('alert-distrito');

const favAlert = document.getElementById('alert-favorito');
const mapaAlert = document.getElementById('alert-mapa');

const alertLibreria = document.getElementById('alertLibreria');

let obtenerDatosSucursales = async function () {
    let error = validarNombre1() | validarCorreo() | validarTelefono() | validarProvincia() | validarCanton() | validarDistrito() | validarMapa() | validarSelectLibreria();
    if (!error) {

        document.body.className = "loading";
        let textProvincia, textCanton, textDistrito;
        textProvincia = sectionProvincia.value;
        textProvincia = sectionProvincia.querySelector('[value="' + textProvincia + '"]').innerText;
        textCanton = sectionCantones.value;
        textCanton = sectionCantones.querySelector('[value="' + textCanton + '"]').innerText;
        textDistrito = sectionDistritos.value;
        textDistrito = sectionDistritos.querySelector('[value="' + textDistrito + '"]').innerText;
        let sucursal = {
            nombre: nombreInput1.value,
            correo: correoInput.value,
            telefono: telefonoInput.value,
            localizacionLatitud: markers[0].position.lat(),
            localizacionLongitud: markers[0].position.lng(),
            estado: 1,
            provincia: textProvincia,
            canton: textCanton,
            distrito: textDistrito,
        }
        if(sessionStorage.tipoUsuario == "Adminitrador plataforma"){
            sucursal.idLibreria = libreriaSelect.value;
        }
        else{
            sucursal.idLibreria = adminLib.usuario.libreria;
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
                    '<a href="http://localhost:3000/sucursales.html" class="linkPage">Ok</a>'
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
        Swal.fire({
            type: 'warning',
            title: 'No se ha enviado su mensaje exitosamente',
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
}

let validarNombre1 = function () {
    let elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1
    }
    return !(noVacio(elementText) && validarTextoNumero(elementText));
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



let validarDistrito = function () {
    let elementSelect = {
        value: sectionDistritos.value,
        alert: distritoAlert,
        input: sectionDistritos
    }
    return !(validarSelect(elementSelect));
}

let validarSelectLibreria = function () {
    let elementSelect = {
        value: libreriaSelect.value,
        alert: alertLibreria,
        input: libreriaSelect
    }
    if(sessionStorage.tipoUsuario == "Adminitrador plataforma"){
        return !(validarSelect(elementSelect));
    }   
}

let validarSennas = function () {
    let elementText = {
        value: sennasInput.value,
        alert: sennasAlert,
        input: sennasInput
    }
    return !(noVacio(elementText));
}


nombreInput1.addEventListener('blur', validarNombre1);

correoInput.addEventListener('blur', validarCorreo);
telefonoInput.addEventListener('blur', validarTelefono);
sectionProvincia.addEventListener('change', validarProvincia);
sectionCantones.addEventListener('change', validarCanton);
sectionDistritos.addEventListener('change', validarDistrito);
libreriaSelect.addEventListener('change', validarSelectLibreria);
document.getElementById('registrar').addEventListener('click', obtenerDatosSucursales);
document.getElementById('map').addEventListener('click', validarMapa);