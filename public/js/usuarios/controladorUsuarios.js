var idRadios = document.querySelectorAll('[name="id"]');
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
var mapaAlert = document.getElementById('alert-mapa');

var obtenerDatosUsuarios = async function () {
    var error = validarId() | validarNombre1() | validarNombre2() | validarApellido1() | validarApellido2() | validarCorreo() | validarTelefono() | validarNacimiento() | validarFotoPerfil() | validarSexo() | validarAlias() | validarProvincia() | validarCanton() | validarDistrito() | validarSennas() | validarFavoritos() | validarMapa();
    if (!error) {

        document.body.className = "loading";
        var imgResult = await crearImagen();
        if (imgResult.success) {
            var sexoValue;
            for (var i = 0; i < sexoInput.length; i++) {
                if (sexoInput[i].checked) {
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
                pass: '123',
                img: imgResult.secure_url,
                sexo: sexoValue,
                telefono: telefonoInput.value,
                tipoUsuario: 'Lector',
                nacimiento: nacimiento,
                sennas: sennasInput.value,
                alias: aliasInput.value,
                localizacionLatitud: markers[0].position.lat(),
                localizacionLongitud: markers[0].position.lng(),
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
            document.body.className = "";
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

var cambiarIdentificacion = function () {
    for (var i = 0; i < idRadios.length; i++) {
        if (idRadios[i].checked) {
            document.getElementById('labelID').innerHTML = idRadios[i].value;
            idInput.name = idRadios[i].value;
            break;
        }
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

var validarNacimiento = function () {
    var elementDate = {
        value: nacimientoInput.value,
        alert: nacimientoAlert,
        input: nacimientoInput
    }
    return !(validarFecha(elementDate) && validarFechaMayorActual(elementDate));
}

var validarFotoPerfil = function () {
    var elementPicture = {
        value: imgInput.value,
        alert: imgAlert,
        input: imgInput
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
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

idInput.addEventListener('blur', validarId);
nombreInput1.addEventListener('blur', validarNombre1);
nombreInput2.addEventListener('blur', validarNombre2);
apellidoInput1.addEventListener('blur', validarApellido1);
apellidoInput2.addEventListener('blur', validarApellido2);
correoInput.addEventListener('blur', validarCorreo);
telefonoInput.addEventListener('blur', validarTelefono);
nacimientoInput.addEventListener('blur', validarNacimiento);
imgInput.addEventListener('change', validarFotoPerfil);
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
document.getElementById('map').addEventListener('click', validarMapa);
for (var i = 0; i < idRadios.length; i++)
    idRadios[i].addEventListener('change', cambiarIdentificacion);