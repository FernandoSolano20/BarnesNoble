var regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

var validarFotos = function (elementos) {
    var fileName = elementos.value,
        idxDot = fileName.lastIndexOf(".") + 1,
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (!(["jpg", "jpeg", "png"].includes(extFile))) {
            elementos.alert.innerText = "Seleccione un archivo de tipo imagen."
            elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
            elementos.input.className = elementos.input.className.replace("input-error", "");
            elementos.input.className = elementos.input.className + " input-error";
            return false;
        }
        else {
            elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
            elementos.alert.className = elementos.alert.className + " alert-hidden";
            elementos.input.className = elementos.input.className.replace("input-error", "");
            return true;
        }
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
        return false;
    }
    else if (elementPass1.value !== elementPass2.value) {
        elementPass1.alert.innerText = "Las contraseñas no coiciden."
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.input.className = elementPass1.input.className + " input-error";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
        elementPass2.input.className = elementPass2.input.className + " input-error";
        return false;
    }
    else {
        elementPass1.alert.className = elementPass1.alert.className.replace("alert-hidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("input-error", "");
        elementPass1.alert.className = elementPass1.alert.className + " alert-hidden";
        elementPass2.input.className = elementPass2.input.className.replace("input-error", "");
        return true;
    }
}

var validarFecha = function(elementos){
    var nacimento = new Date(elementos.value);
    nacimento = new Date(nacimento.getUTCFullYear() + "-" + (nacimento.getUTCMonth() + 1) + "-" + nacimento.getUTCDate());
    if (nacimento == 'Invalid Date') {
        elementos.alert.innerText = "Seleccione una fecha."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    else{
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.alert.className = elementos.alert.className + " alert-hidden";
        elementos.input.className = elementos.input.className.replace("input-error", "");
        return true;
    }
}

var validarFechaMayorActual = function(elementos){
    var nacimento = new Date(elementos.value);
    nacimento = new Date(nacimento.getUTCFullYear() + "-" + (nacimento.getUTCMonth() + 1) + "-" + nacimento.getUTCDate());
    if (nacimento > new Date()) {
        elementos.alert.innerText = "Seleccione una fecha menor a la actual."
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.input.className = elementos.input.className.replace("input-error", "");
        elementos.input.className = elementos.input.className + " input-error";
        return false;
    }
    else{
        elementos.alert.className = elementos.alert.className.replace("alert-hidden", "");
        elementos.alert.className = elementos.alert.className + " alert-hidden";
        elementos.input.className = elementos.input.className.replace("input-error", "");
        return true;
    }
}

var validarMapa = function () {
    if (markers.length === 0) {
        mapaAlert.className = mapaAlert.className.replace("alert-hidden", "");
        return true;
    }
    else {
        mapaAlert.className = mapaAlert.className.replace("alert-hidden", "");
        mapaAlert.className = mapaAlert.className + " alert-hidden";
        return false;
    }
}