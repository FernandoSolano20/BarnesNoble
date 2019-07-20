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
var sennasAlert = document.getElementById('alert-sennas');
var favAlert = document.getElementById('alert-favorito');

var obtenerDatosUsuarios = async function () {
    var error = validarId() | validarNombre1() | validarNombre2() | validarApellido1() | validarApellido2() | validarCorreo() | validarPass() | validarTelefono() | validarFecha() | validarFoto() | validarSexo() | validarAlias() | validarProvincia() | validarCanton() | validarDistrito() | validarSennas() | validarFavoritos();
    if (!error) {
        var sexoValue;
        for(var i = 0; i < sexoInput.length; i++){
            if(sexoInput[i].checked){
                sexoValue = sexoInput[i].value;
                break;
            }
        }
        var nacimiento = new Date(nacimientoInput.value);
        nacimiento = nacimiento.getFullYear() + '-' + Number(nacimiento.getUTCMonth() + 1) + '-' + nacimiento.getUTCDate()
        var usuario = {
            id: idInput.value,
            nombre: nombreInput1.value,
            segundoNombre: nombreInput2.value,
            primerApellido: apellidoInput1.value,
            segundoApellido: apellidoInput2.value,
            correo: correoInput.value,
            pass: passInput1.value,
            img: imgInput.value,
            sexo: sexoValue,
            telefono: telefonoInput.value,
            tipoUsuario: 'Lector',
            nacimiento: nacimiento,
            sennas: sennasInput.value,
            alias: aliasInput.value,
            localizacionLatitud: '5',
            localizacionLongitud: '5',
            estado: 1,
            idProvincia: sectionProvincia.value,
            idCanton: sectionCantones.value,
            idDistrito: sectionDistritos.value,
            idAutor: autorSelect.value,
            idGenero: generoSelect.value,
            idLibro: libroSelect.value,
            idCategoria: categoriaSelect.value,
            idLibreria: ''
        }
        var nuevoUsuario = await crearUsuario(usuario);
        if (nuevoUsuario.success) {
            Swal.fire({
                type: 'success',
                title: nuevoUsuario.message
            });
        }
        else {
            Swal.fire({
                type: 'error',
                title: nuevoUsuario.message
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
    if (elementText.value != '')
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
    if (elementText.value != '')
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
        return true;
    }
    else {
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.alert.className = elementPass1.alert.className + " alert-hidden";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
        return false;
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
    else if (elementNumber.value.length != 8) {
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
    var fileName = elementPicture.value,
        idxDot = fileName.lastIndexOf(".") + 1,
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (!noVacio(elementPicture)) {
        return true;
    }
    else if (!(["jpg", "jpeg", "png"].includes(extFile))) {
        imgAlert.innerText = "Seleccione un archivo de tipo imagen."
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
        sexoInput[0].parentElement.className = sexoInput[0].parentElement.className.replace("error-radio", "");
        return false;
    }
}

var validarAlias = function () {
    var elementText = {
        value: aliasInput.value,
        alert: aliasAlert,
        input: aliasInput
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
        alert: distritoAlert,
        input: sectionDistritos
    }
    return !(validarSelect(elementSelect));
}

var validarSennas = function () {
    var elementText = {
        value: sennasInput.value,
        alert: sennasAlert,
        input: sennasInput
    }
    return !(noVacio(elementText));
}

var validarFavoritos = function () {
    if (autorSelect.value === '' && generoSelect.value === '' && categoriaSelect.value === '' && libroSelect.value === '') {
        favAlert.className = favAlert.className.replace("alert-hidden", "");
        autorSelect.className = autorSelect.className.replace("select-error", "");
        autorSelect.className = autorSelect.className + " select-error";
        generoSelect.className = generoSelect.className.replace("select-error", "");
        generoSelect.className = generoSelect.className + " select-error";
        categoriaSelect.className = categoriaSelect.className.replace("select-error", "");
        categoriaSelect.className = categoriaSelect.className + " select-error";
        libroSelect.className = libroSelect.className.replace("select-error", "");
        libroSelect.className = libroSelect.className + " select-error";
        return true;
    }
    else {
        autorSelect.className = autorSelect.className.replace("select-error", "");
        generoSelect.className = generoSelect.className.replace("select-error", "");
        categoriaSelect.className = categoriaSelect.className.replace("select-error", "");
        libroSelect.className = libroSelect.className.replace("select-error", "");
        favAlert.className = favAlert.className.replace("alert-hidden", "");
        favAlert.className = favAlert.className + " alert-hidden";
        return false;
    }
}

var validarNumeros = function (elementos) {
    if (!noVacio(elementos)) {
        return false;
    }
    else if (isNaN(elementos.value)) {
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
            elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
            elementos.alert.className = elementos.alert.className + " alert-hidden";
            return true;
        }
    }
    elementos.alert.innerText = "Campo requerido."
    elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
    elementos.input[0].parentElement.className = elementos.input[0].parentElement.className + " error-radio";
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
        return true;
    }
}

idInput.addEventListener('blur', validarId);
nombreInput1.addEventListener('blur', validarNombre1);
nombreInput2.addEventListener('blur', validarNombre2);
apellidoInput1.addEventListener('blur', validarApellido1);
apellidoInput2.addEventListener('blur', validarApellido2);
correoInput.addEventListener('blur', validarCorreo);
passInput2.addEventListener('blur', validarPass);
telefonoInput.addEventListener('blur', validarTelefono);
nacimientoInput.addEventListener('blur', validarFecha);
imgInput.addEventListener('change', validarFoto);
aliasInput.addEventListener('blur', validarAlias);
sectionProvincia.addEventListener('change', validarProvincia);
sectionCantones.addEventListener('change', validarCanton);
sectionDistritos.addEventListener('change', validarDistrito);
sennasInput.addEventListener('blur', validarSennas);
for (var i = 0; i < sexoInput.length; i++)
    sexoInput[i].addEventListener('change', validarSexo);
autorSelect.addEventListener('change', validarFavoritos);
generoSelect.addEventListener('change', validarFavoritos);
categoriaSelect.addEventListener('change', validarFavoritos);
libroSelect.addEventListener('change', validarFavoritos);
document.getElementById('registrar').addEventListener('click', obtenerDatosUsuarios);