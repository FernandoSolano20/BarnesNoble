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
var aliasAlert = document.getElementById('alert-alias');

var provinciaAlert = document.getElementById('alert-provincia');
var cantonAlert = document.getElementById('alert-canton');
var distritoAlert = document.getElementById('alert-distrito');

var sennasInput = document.getElementById('sennas-input');
var autorInput = document.getElementById('autor');
var generoInput = document.getElementById('genero');
var categoriaInput = document.getElementById('categoria');
var libroInput = document.getElementById('libro');
var favAlert = document.getElementById('alert-favorito');

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

var validarId = function () {
    var elementNumber = {
        value: idInput.value,
        alert: idAlert,
        input: idInput
    }
    if (!validarNumeros(elementNumber)) {
        return true;
    }
    else if (elementNumber.value.length != 9) {
        idAlert.innerText = "Debe tener 9 dígitos."
        idAlert.className = idAlert.className.replace("alert-hidden", "");
        idInput.className = idInput.className.replace("input-error", "");
        idInput.className = idInput.className + " input-error";
        return true;
    }
    else {
        idAlert.className = idAlert.className.replace("alert-hidden", "");
        idAlert.className = idAlert.className + " alert-hidden";
        idInput.className = idInput.className.replace("input-error", "");
        return false;
    }
}

var validarNombre1 = function () {
    var elementText = {
        value: nombreInput1.value,
        alert: nombreAlert1,
        input: nombreInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

var validarNombre2 = function () {
    var elementText = {
        value: nombreInput2.value,
        alert: nombreAlert2,
        input: nombreInput2
    }
    if(elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

var validarApellido1 = function () {
    var elementText = {
        value: apellidoInput1.value,
        alert: apellidoAlert1,
        input: apellidoInput1
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

var validarApellido2 = function () {
    var elementText = {
        value: apellidoInput2.value,
        alert: apellidoAlert2,
        input: apellidoInput2
    }
    if(elementText.value != '')
        return !(validarTexto(elementText));
    return false;
}

var validarCorreo = function () {
    var elementText = {
        value: correoInput.value,
        alert: correoAlert,
        input: correoInput
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
        correoAlert.className = correoAlert.className.replace("alert-hidden", "");
        correoInput.className = correoInput.className.replace("input-error", "");
        correoAlert.className = correoAlert.className + " alert-hidden";
        return false;
    }
}

var validarPass = function () {
    var elementPass1 = {
        value: passInput1.value,
        alert: passAlert1,
        input: passInput1
    }

    var elementPass2 = {
        value: passInput2.value,
        alert: passAlert1,
        input: passInput2
    }

    if (!noVacio(elementPass1) | !noVacio(elementPass2)) {
        return true;
    }
    else if (elementPass1.value !== elementPass2.value) {
        elementPass1.alert.innerText = "Las contraseñas no coiciden."
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.input.className = elementPass1.input.className + " input-error";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
        elementPass2.input.className = elementPass2.input.className + " input-error";
    }
    else {
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.alert.className = elementPass1.alert.className + " alert-hidden";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
    }
}

var validarTelefono = function () {
    var elementNumber = {
        value: telefonoInput.value,
        alert: telefonoAlert,
        input: telefonoInput
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
        telefonoAlert.className = telefonoAlert.className.replace("alert-hidden", "");
        telefonoAlert.className = telefonoAlert.className + " alert-hidden";
        telefonoInput.className = telefonoInput.className.replace("input-error", "");
        return false;
    }
}

var validarFecha = function () {
    var elementDate = {
        value: nacimientoInput.value,
        alert: nacimientoAlert,
        input: nacimientoInput
    }
    var nacimento = new Date(elementDate.value);
    nacimento = new Date(nacimento.getUTCFullYear() + "-" + (nacimento.getUTCMonth() + 1) + "-" + nacimento.getUTCDate());
    if (nacimento == 'Invalid Date') {
        elementDate.alert.innerText = "Seleccione una fecha."
        elementDate.alert.className = elementDate.alert.className.replace("alert-hidden", "");
        elementDate.input.className = elementDate.input.className.replace("input-error", "");
        elementDate.input.className = elementDate.input.className + " input-error";
        return true;
    }
    else if (nacimento > new Date()) {
        elementDate.alert.innerText = "Seleccione una fecha menor a la actual."
        elementDate.alert.className = elementDate.alert.className.replace("alert-hidden", "");
        elementDate.input.className = elementDate.input.className.replace("input-error", "");
        elementDate.input.className = elementDate.input.className + " input-error";
        return true;
    }
    else {
        elementDate.alert.className = elementDate.alert.className.replace("alert-hidden", "");
        nacimientoAlert.className = nacimientoAlert.className + " alert-hidden";
        nacimientoInput.className = nacimientoInput.className.replace("input-error", "");
        return false;
    }
}

var validarFoto = function () {
    var elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    var fileName = input.value,
        idxDot = fileName.lastIndexOf(".") + 1,
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (!noVacio(elementPicture)) {
        return true;
    }
    else if (!["jpg", "jpeg", "png"].includes(extFile)) {
        imgAlert.innerText = "Seleccione una fecha menor a la actual."
        imgAlert.className = imgAlert.className.replace("alert-hidden", "");
        imgInput.className = imgInput.className.replace("input-error", "");
        imgInput.className = imgInput.className + " input-error";
        return true;
    }
    else {
        imgAlert.className = imgAlert.className.replace("alert-hidden", "");
        imgAlert.className = imgAlert.className + " alert-hidden";
        imgInput.className = imgInput.className.replace("input-error", "");
        return false;
    }
}

var validarSexo = function () {
    var elementCheckbox = {
        alert: sexoAlert,
        input: sexoInput
    }
    if (!validarRadio(elementCheckbox)) {
        return true;
    }
    else {
        sexoAlert.className = sexoAlert.className.replace("alert-hidden", "");
        sexoAlert.className = sexoAlert.className + " alert-hidden";
        for(var i =0; i < sexoInput.length; i++)
            sexoInput[i].className = sexoInput[i].className.replace("error-radio", "");
        return false;
    }
}

var validarAlias = function () {
    var elementText = {
        value: aliasInput.value,
        alert: aliasAlert,
        input: alias
    }
    return !(noVacio(elementText));
}

var validarProvincia = function () {
    var elementSelect = {
        value: sectionProvincia.value,
        alert: provinciaAlert,
        input: sectionProvincia
    }
    return !(validarSelect(elementSelect));
}

var validarCanton = function () {
    var elementSelect = {
        value: sectionCantones.value,
        alert: cantonAlert,
        input: sectionCantones
    }
    return !(validarSelect(elementSelect));
}

var validarDistrito = function () {
    var elementSelect = {
        value: sectionDistritos.value,
        alert: cantonAlert,
        input: sectionDistritos
    }
    return !(validarSelect(elementSelect));
}

var validarSennas = function () {
    var elementText = {
        value: sennasInput.value,
        alert: sexoAlert,
        input: sennasInput
    }
    return !(noVacio(elementText));
}

var validarFavoritos = function () {
    if(autorInput.value !== '' || generoInput.value !== '' || categoriaInput.value !== '' || libroInput !== ''){
        favAlert.className = favAlert.className.replace("alert-hidden", "");
        return true;
    }
    else{
        favAlert.className = favAlert.className.replace("alert-hidden", "");
        favAlert.className = favAlert.className + " alert-hidden";
    }
}

var validarNumeros = function (elementos) {
    if (!noVacio(elementos)) {
        return false;
    }
    else if(isNaN(elementos.value)){
        elementos.alert.innerText = "Solo debe tener números."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
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
    elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
    elementos.alert.className = elementos.alert.className + " alert-hidden";
    elementos.input.className = elementos.input.className.replace("input-error", "");
    return true;
}

var noVacio = function (elementos) {
    if (elementos.value == "") {
        elementos.alert.innerText = "Rellene el campo."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
    elementos.alert.className = elementos.alert.className + " alert-hidden";
    elementos.input.className = elementos.input.className.replace("input-error", "");
    return true;
}

var validarRadio = function (elementos) {
    for (var i = 0; i < elementos.input.length; i++) {
        if (elementos.input[i].checked) {
            return true;
        }
    }
    elementos.alert.innerText = "Seleccione una opción."
    elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
    elementos.input.className = elementos.input.className.replace("error-radio", "");
    elementos.input.className = elementos.input.className + " error-radio";
    return false;
}

var validarSelect = function (elementos) {
    if (elementos.value == "") {
        elementos.alert.innerText = "Seleccione una opción."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("select-error", "");
        elementos.input.className = elementos.input.className + " select-error";
        return false;
    }
    else {
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("select-error", "");
        elementos.alert.className = elementos.alert.className + " alert-hidden";
        return false;
    }
}

idInput.addEventListener('blur',validarId);
nombreInput1.addEventListener('blur',validarNombre1);
nombreInput2.addEventListener('blur',validarNombre2);
apellidoInput1.addEventListener('blur',validarApellido1);
apellidoInput2.addEventListener('blur',validarApellido2);
correoInput.addEventListener('blur',validarCorreo);
passInput2.addEventListener('blur',validarPass);
telefonoInput.addEventListener('blur',validarTelefono);
nacimientoInput.addEventListener('blur',validarFecha);
imgInput.addEventListener('change',validarFoto);
for(var i =0; i < sexoInput.length; i++)
    sexoInput[i].addEventListener('change',validarSexo);
aliasInput.addEventListener('blur',validarSexo);
sectionProvincia.addEventListener('blur',validarProvincia);
sectionCantones.addEventListener('blur',validarCanton);
sectionDistritos.addEventListener('blur',validarDistrito);
sennasInput.addEventListener('blur',validarSennas);