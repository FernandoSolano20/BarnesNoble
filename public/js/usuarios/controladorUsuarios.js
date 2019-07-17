var regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


var idInput = document.getElementById('ID');
var idAlert = document.getElementById('alert-id');

var nombreInput1 = document.getElementById('nombre-input');
var nombreAlert1 = document.getElementById('alert-nombre1');

var nombreInput2 = document.getElementById('segundo-nombre-input');
var nombreAlert2 = document.getElementById('alert-nombre2');

var apellidoInput1 = document.getElementById('primer-apellido-input');
var apellidoAlert1 = document.getElementById('alert-apellido1');

var apellidoInput2 = document.getElementById('segundo-apellido-input');
var apellidoAlert2 = document.getElementById('alert-apellido2');

var correoInput = document.getElementById('correo-input');
var correoAlert = document.getElementById('alert-correo');

var passInput1 = document.getElementById('pass-input');
var passAlert1 = document.getElementById('alert-pass');

var passInput2 = document.getElementById('pass2-input');

var telefonoInput = document.getElementById('telefono-input');
var telefonoAlert = document.getElementById('alert-telefono');

var nacimientoInput = document.getElementById('nacimiento-input');
var nacimientoAlert = document.getElementById('alert-date');

var imgInput = document.getElementById('img');
var imgAlert = document.getElementById('alert-img');

var sexoInput = document.querySelectorAll('[name="sexo"]');
var sexoAlert = document.getElementById('alert-sexo');

var aliasInput = document.getElementById('alias-input');

var sennasInput = document.getElementById('sennas-input');
var autorInput = document.getElementById('autor');
var generoInput = document.getElementById('genero');
var categoriaInput = document.getElementById('categoria');
var libroInput = document.getElementById('libro');

var obtenerDatosUsuarios = function () {
    var usuario = {
        id: idInput.value,
        nombre: nombreInput1.value,
        segundoNombre: nombreInput2.value,
        primerApellido: apellidoInput1.value,
        segundoApellido: apellidoInput2.value,
        correo: correoInput.value,
        pass: passInput1.value,
        img: imgInput.value,
        sexo: sexoInput.value,
        telefono: telefonoInput.value,
        tipoUsuario: 'Lector',
        nacimiento: nacimientoInput.value,
        sennas: sennasInput.value,
        alias: aliasInput.value,
        localizacionLatitud: '5',
        localizacionLongitud: '5',
        estado: true,
        idProvincia: sectionProvincia.value,
        idCanton: sectionCantones.value,
        idDistrito: sectionDistritos.value,
        idAutor: autorInput.value,
        idGenero: generoInput.value,
        idLibro: libroInput.value,
        idCategoria: categoriaInput.value,
        idLibreria: ''
    }

    var error = validarUsuario(usuario);
}

var validarUsuario = function (usuario) {
    var error = false;

}

var validarCedula = function () {
    var elementNumber = {
        value: idInput.value,
        alert: idAlert,
        input: idInput,
    }
    if (!validarNumeros(elementNumber)) {
        return true;
    }
    else if (elementNumber.value != 9) {
        idAlert.innerText = "Debe tener 9 dígitos."
        idAlert.className = idAlert.className.replace("alert-hidden", "");
        idInput.className = idInput.className.replace("input-error", "");
        idInput.className = idInput.className + " input-error";
        return true;
    }
    else {
        idAlert.className = idAlert.className + " alert-hidden";
        idInput.className = idInput.className.replace("input-error", "");
        return false;
    }
}

var validarNombre1 = function () {
    var elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1,
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

var validarNombre2 = function () {
    var elementText = {
        value: nombreInput2.value,
        alert: nombreAlert2,
        input: nombreInput2,
    }
    return !(validarTexto(elementText));
}

var validarApellido1 = function () {
    var elementText = {
        value: apellidoInput1.value,
        alert: apellidoAlert1,
        input: apellidoInput1,
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

var validarApellido2 = function () {
    var elementText = {
        value: apellidoInput2.value,
        alert: apellidoAlert2,
        input: apellidoInput2,
    }
    return !(validarTexto(elementText));
}

var validarCorreo = function () {
    var elementText = {
        value: correoInput.value,
        alert: correoAlert,
        input: correoInput,
    }

    if (!noVacio(elementText)) {
        return true;
    }
    else if (!regexEmail.test(elementText.value)) {
        correoAlert.innerText = "El correo no cumple el formato."
        correoAlert.className = correoAlert.className.replace("alert-hidden", "");
        correoInput.className = correoInput.className.replace("input-error", "");
        correoInput.className = correoInput.className + " input-error";
        return true;
    }
    else {
        correoInput.className = correoInput.className.replace("input-error", "");
        correoAlert.className = correoAlert.className + " alert-hidden";
        return false;
    }
}

var validarPass = function () {
    var elementPass1 = {
        value: passInput1.value,
        alert: passAlert1,
        input: passInput1,
    }

    var elementPass2 = {
        value: passInput2.value,
        alert: passAlert1,
        input: passInput2,
    }

    if (noVacio(elementPass1) | noVacio(elementPass2)) {
        return true;
    }
    else if(elementPass1.value !== elementPass2.value){
        elementPass1.alert.innerText = "Las contraseñas no coiciden."
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.input.className = elementPass1.input.className + " input-error";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
        elementPass2.input.className = elementPass2.input.className + " input-error";
    }
    else{
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.alert.className = elementPass1.alert.className + " alert-hidden";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
    }
}

var validarTelefono = function(){
    var elementNumber = {
        value: telefonoInput.value,
        alert: telefonoAlert,
        input: telefonoInput,
    }
    if (!validarNumeros(elementNumber)) {
        return true;
    }
    else if (elementNumber.value != 8) {
        telefonoAlert.innerText = "Debe tener 8 dígitos."
        telefonoAlert.className = telefonoAlert.className.replace("alert-hidden", "");
        telefonoInput.className = telefonoInput.className.replace("input-error", "");
        telefonoInput.className = telefonoInput.className + " input-error";
        return true;
    }
    else {
        telefonoAlert.className = telefonoAlert.className + " alert-hidden";
        telefonoInput.className = telefonoInput.className.replace("input-error", "");
        return false;
    }
}

var validarFecha = function(){
    var elementDate = {
        value: nacimientoInput.value,
        alert: nacimientoAlert,
        input: nacimientoInput,
    }
    var nacimento = new Date(elementDate.value);
    nacimento = new Date(nacimento.getUTCFullYear()+"-"+(nacimento.getUTCMonth()+1)+"-"+nacimento.getUTCDate());
    if (nacimento != 'Invalid Date') {
        elementDate.alert.innerText = "Seleccione una fecha."
        elementDate.alert.className = elementDate.alert.className.replace("alert-hidden", "");
        elementDate.input.className = elementDate.input.className.replace("input-error", "");
        elementDate.input.className = elementDate.input.className + " input-error";
        return true;
    }
    else if (nacimientoAlert > new Date()) {
        elementDate.alert.innerText = "Seleccione una fecha menor a la actual."
        elementDate.alert.className = elementDate.alert.className.replace("alert-hidden", "");
        elementDate.input.className = elementDate.input.className.replace("input-error", "");
        elementDate.input.className = elementDate.input.className + " input-error";
        return true;
    }
    else {
        nacimientoAlert.className = nacimientoAlert.className + " alert-hidden";
        nacimientoInput.className = nacimientoInput.className.replace("input-error", "");
        return false;
    }
}





var validarNumeros = function (elementos) {
    if (NoVacio() && isNaN(elementos.value)) {
        elementos.alert.innerText = "Solo debe tener números."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    elementos.alert.className = elementos.alert.className + " alert-hidden";
    elementos.input.className = elementos.input.className.replace("input-error", "");
    return true;
}

var validarTexto = function (elementos) {
    if (!regexText.test(elementos.value)) {
        elementos.alert.innerText = "Solo debe tener letras."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    elementos.alert.className = elementos.alert.className + " alert-hidden";
    elementos.input.className = elementos.input.className.replace("input-error", "");
    return true;
}

var noVacio = function (elementos) {
    if (elementos.value === "") {
        elementos.alert.innerText = "Rellene el campo."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    elementos.alert.className = elementos.alert.className + " alert-hidden";
    elementos.input.className = elementos.input.className.replace("input-error", "");
    return true;
}