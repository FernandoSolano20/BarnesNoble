var regexISBN10 = /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
var regexISBN13 = /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;

const tipoLibroSelect = document.getElementById('tipoLibro');
const tipoLibroAlert = document.getElementById('alertTipoLibro');

const isbn10Input = document.getElementById('isbn10');
const isbn10Alert = document.getElementById('alertIsbn10');

const isbn13Input = document.getElementById('isbn13');
const isbn13Alert = document.getElementById('alertIsbn13');

const cantidadInput = document.getElementById('cantidad');
const cantidadAlert = document.getElementById('alertCantidad');

const precioInput = document.getElementById('precio');
const precioAlert = document.getElementById('alertPrecio');

const edicionInput = document.getElementById('edicion');
const edicionAlert = document.getElementById('alertEdicion');

const editorialInput = document.getElementById('editorial');
const editorialAlert = document.getElementById('alertEditorial');

const annoEdicionInput = document.getElementById('annoEdicion');
const annoEdicionAlert = document.getElementById('alertAnnoEdicion');

let obtenerDatosEjemplar = async function () {
    let error = validarTipoLibro() | validarISBN10() | validarISBN13() | validarCantidad() | validarPrecio() | validarEdicion() | validarEditorial() | validarAnnoEdicion();
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    if (!error && id) {

        document.body.className = "loading";
        let ejemplar = {
            tipo: tipoLibroSelect.value,
            precio: precioInput.value,
            isbn10: isbn10Input.value,
            isbn13: isbn13Input.value,
            editorial: editorialInput.value,
            edicion: edicionInput.value,
            annoEdicion: annoEdicionInput.value,
            cantidad: cantidadInput.value,
            libro: id
        }

        let nuevoEjemplar = await crearEjemplar(ejemplar);
        document.body.className = "";
        if (nuevoEjemplar.success) {
            Swal.fire({
                type: 'success',
                title: nuevoEjemplar.message,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<a href="http://localhost:3000/listarLibrosCards.html" class="linkPage">Ok</a>'
            });
        }
        else {
            Swal.fire({
                type: 'error',
                title: nuevoEjemplar.message
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

let validarTipoLibro = function () {
    let elementSelect = {
        value: tipoLibroSelect.value,
        alert: tipoLibroAlert,
        input: tipoLibroSelect
    }
    return !(validarSelect(elementSelect));
}

let validarISBN10 = function () {
    let elementNumber = {
        value: isbn10Input.value,
        alert: isbn10Alert,
        input: isbn10Input
    }
    if (!validarNumeros(elementNumber))
        return true;
    else if (elementNumber.value.length != 10) {
        isbn10Alert.innerText = "Debe tener 10 dígitos."
        isbn10Alert.className = isbn10Alert.className.replace("alertHidden", "");
        isbn10Input.className = isbn10Input.className.replace("inputError", "");
        isbn10Input.className = isbn10Input.className + " inputError";
        return true;
    }
    else if (!regexISBN10.test(elementNumber.value)) {
        isbn10Alert.innerText = "No cumple con el formato."
        isbn10Alert.className = isbn10Alert.className.replace("alertHidden", "");
        isbn10Input.className = isbn10Input.className.replace("inputError", "");
        isbn10Input.className = isbn10Input.className + " inputError";
        return true;
    }
    isbn10Alert.className = isbn10Alert.className.replace("alertHidden", "");
    isbn10Alert.className = isbn10Alert.className + " alertHidden";
    isbn10Input.className = isbn10Input.className.replace("inputError", "");
    return false;
}

let validarISBN13 = function () {
    let elementNumber = {
        value: isbn13Input.value,
        alert: isbn13Alert,
        input: isbn13Input
    }
    if (!validarNumeros(elementNumber))
        return true;
    else if (elementNumber.value.length != 13) {
        isbn13Alert.innerText = "Debe tener 13 dígitos."
        isbn13Alert.className = isbn13Alert.className.replace("alertHidden", "");
        isbn10Input.className = isbn10Input.className.replace("inputError", "");
        isbn10Input.className = isbn10Input.className + " inputError";
        return true;
    }
    else if (!regexISBN13.test(elementNumber.value)) {
        isbn13Alert.innerText = "No cumple con el formato."
        isbn13Alert.className = isbn13Alert.className.replace("alertHidden", "");
        isbn13Input.className = isbn13Input.className.replace("inputError", "");
        isbn13Input.className = isbn13Input.className + " inputError";
        return true;
    }
    isbn13Alert.className = isbn13Alert.className.replace("alertHidden", "");
    isbn13Alert.className = isbn13Alert.className + " alertHidden";
    isbn13Input.className = isbn13Input.className.replace("inputError", "");
    return false;
}

let validarCantidad = function () {
    let elementNumber = {
        value: cantidadInput.value,
        alert: cantidadAlert,
        input: cantidadInput
    }
    return !validarNumeros(elementNumber);
}

let validarPrecio = function () {
    let elementNumber = {
        value: precioInput.value,
        alert: precioAlert,
        input: precioInput
    }
    return !validarNumeros(elementNumber);
}

let validarEdicion = function () {
    let elementText = {
        value: edicionInput.value,
        alert: edicionAlert,
        input: edicionInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarEditorial = function () {
    let elementText = {
        value: editorialInput.value,
        alert: editorialAlert,
        input: editorialInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarAnnoEdicion = function () {
    let elementNumber = {
        value: annoEdicionInput.value,
        alert: annoEdicionAlert,
        input: annoEdicionInput
    }
    return !validarNumeros(elementNumber);
}

tipoLibroSelect.addEventListener('change', validarTipoLibro);
isbn10Input.addEventListener('blur', validarISBN10);
isbn13Input.addEventListener('blur', validarISBN13);
cantidadInput.addEventListener('blur', validarCantidad);
precioInput.addEventListener('blur', validarPrecio);
edicionInput.addEventListener('blur', validarEdicion);
editorialInput.addEventListener('blur', validarEditorial);
annoEdicionInput.addEventListener('blur', validarAnnoEdicion);
const botonRegistrar = document.querySelector('#registrar');
botonRegistrar.addEventListener('click', obtenerDatosEjemplar);