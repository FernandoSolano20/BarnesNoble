let regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexPassport = /^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$/;

let validarNumeros = function (elementos) {
    if (!noVacio(elementos)) {
        return false;
    }
    else if (isNaN(elementos.value)) {
        elementos.alert.innerText = "Solo debe tener números."
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

let validarCorreo = function () {
    let elementText = {
        value: correoInput.value,
        alert: correoAlert,
        input: correoInput
    }

    if (!noVacio(elementText)) {
        return true;
    }
    else if (!regexEmail.test(elementText.value)) {
        correoAlert.innerText = "El correo no cumple el formato."
        correoAlert.className = correoAlert.className.replace("alertHidden", "");
        correoInput.className = correoInput.className.replace("inputError", "");
        correoInput.className = correoInput.className + " inputError";
        return true;
    }
    else {
        correoAlert.className = correoAlert.className.replace("alertHidden", "");
        correoInput.className = correoInput.className.replace("inputError", "");
        correoAlert.className = correoAlert.className + " alertHidden";
        return false;
    }
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

let validarFotos = function (elementos) {
    let fileName = elementos.value,
        idxDot = fileName.lastIndexOf(".") + 1,
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (!(["jpg", "jpeg", "png"].includes(extFile))) {
            elementos.alert.innerText = "Seleccione un archivo de tipo imagen."
            elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
            elementos.input.className = elementos.input.className.replace("inputError", "");
            elementos.input.className = elementos.input.className + " inputError";
            return false;
        }
        else {
            elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
            elementos.alert.className = elementos.alert.className + " alertHidden";
            elementos.input.className = elementos.input.className.replace("inputError", "");
            return true;
        }
}

let validarSelect = function (elementos) {
    if (elementos.value == "") {
        elementos.alert.innerText = "Seleccione una opción."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("selectError", "");
        elementos.input.className = elementos.input.className + " selectError";
        return false;
    }
    else {
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("selectError", "");
        elementos.alert.className = elementos.alert.className + " alertHidden";
        return true;
    }
}

let validarPass = function () {
    let elementPass1 = {
        value: passInput1.value,
        alert: passAlert1,
        input: passInput1
    }

    let elementPass2 = {
        value: passInput2.value,
        alert: passAlert1,
        input: passInput2
    }

    if (!noVacio(elementPass1) | !noVacio(elementPass2)) {
        return false;
    }
    else if (elementPass1.value !== elementPass2.value) {
        elementPass1.alert.innerText = "Las contraseñas no coiciden."
        elementPass1.alert.className = elementPass1.alert.className.replace("alertHidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("inputError", "");
        elementPass1.input.className = elementPass1.input.className + " inputError";
        elementPass2.input.className = elementPass2.input.className.replace("inputError", "");
        elementPass2.input.className = elementPass2.input.className + " inputError";
        return false;
    }
    else {
        elementPass1.alert.className = elementPass1.alert.className.replace("alertHidden", "");
        elementPass1.input.className = elementPass1.input.className.replace("inputError", "");
        elementPass1.alert.className = elementPass1.alert.className + " alertHidden";
        elementPass2.input.className = elementPass2.input.className.replace("inputError", "");
        return true;
    }
}

let validarFecha = function(elementos){
    let nacimento = new Date(elementos.value);
    nacimento = new Date(nacimento.getUTCFullYear() + "-" + (nacimento.getUTCMonth() + 1) + "-" + nacimento.getUTCDate());
    if (nacimento == 'Invalid Date') {
        elementos.alert.innerText = "Seleccione una fecha."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    else{
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.alert.className = elementos.alert.className + " alertHidden";
        elementos.input.className = elementos.input.className.replace("inputError", "");
        return true;
    }
}

let validarFechaMayorActual = function(elementos){
    let nacimento = new Date(elementos.value);
    nacimento = new Date(nacimento.getUTCFullYear() + "-" + (nacimento.getUTCMonth() + 1) + "-" + nacimento.getUTCDate());
    if (nacimento > new Date()) {
        elementos.alert.innerText = "Seleccione una fecha menor a la actual."
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.input.className = elementos.input.className.replace("inputError", "");
        elementos.input.className = elementos.input.className + " inputError";
        return false;
    }
    else{
        elementos.alert.className = elementos.alert.className.replace("alertHidden", "");
        elementos.alert.className = elementos.alert.className + " alertHidden";
        elementos.input.className = elementos.input.className.replace("inputError", "");
        return true;
    }
}

let validarMapa = function () {
    if (markers.length === 0) {
        mapaAlert.className = mapaAlert.className.replace("alertHidden", "");
        return true;
    }
    else {
        mapaAlert.className = mapaAlert.className.replace("alertHidden", "");
        mapaAlert.className = mapaAlert.className + " alertHidden";
        return false;
    }
}