/*
 * Nombre de archivo: js/libros/controladorEditarLibros
 * Last Modified: Aug 23, 2019
 * Modified by: Fran A. Wilson
 */
'use strict' //archivo controlador para editar Sucursal

const botonModificar = document.querySelector('btnModificar');

const nombreInput1 = document.getElementById('nombre-input');
const nombreAlert1 = document.getElementById('alert-nombre1');

const correoInput = document.getElementById('correo-input');
const correoAlert = document.getElementById('alert-correo');

const telefonoInput = document.getElementById('telefono-input');
const telefonoAlert = document.getElementById('alert-telefono');

const provinciaAlert = document.getElementById('alert-provincia');
const provinciaInput = document.querySelector('provincias');

const cantonAlert = document.getElementById('alert-canton');
const cantonInput = document.querySelector('canton');

const distritoAlert = document.getElementById('alert-distrito');
const distritoInput = document.querySelector('distrito');

const favAlert = document.getElementById('alert-favorito');
const mapaAlert = document.getElementById('alert-mapa');

const alertLibreria = document.getElementById('alertLibreria');

const successMessage = 'Se ha modificado la sucusal exitosamente';
const errorMessage = 'No se ha moficado la sucusal.';

let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let lista_sucursales = [];
// sucursal = await obtenerSucursalPorId(id);
// libreria = await obtenerLibreriaPorIdSucursal(id);

let cargar_formulario = async () => {
    let sucursal = await obtenerSucursalPorId(id);
    if (sucursal.success) {
        sucursal = sucursal.sucursal;
        nombreInput1.value = sucursal['nombre'];
        telefonoInput.value = sucursal['telefono'];
        correoInput.value = sucursal['correo'];
        let selectSectionProvincia = document.getElementById('provincias');
        let listaProvincias = selectSectionProvincia.children;

        for (let i = 0; i < listaProvincias.length; i++) {

            let provincia = listaProvincias[i];

            if (provincia.innerHTML == sucursal.provincia) {
                selectSectionProvincia.value = provincia.value;

                await crearSectionCantones();

                let selectSectionCantones = document.getElementById('cantones');
                let listaCantones = selectSectionCantones.children;

                for (let i = 0; i < listaCantones.length; i++) {

                    let canton = listaCantones[i];

                    if (canton.innerHTML == sucursal.canton) {
                        selectSectionCantones.value = canton.value;

                        await crearSectionDistritos();

                        let selectSectionDistritos = document.getElementById('distritos');
                        let listaDistritos = selectSectionDistritos.children;

                        for (let i = 0; i < listaDistritos.length; i++) {

                            let distrito = listaDistritos[i];

                            if (distrito.innerHTML == sucursal.distrito) {
                                selectSectionDistritos.value = distrito.value;
                            }
                        }
                    }
                }
            }
        }

        if(sucursal.localizacionLatitud && sucursal.localizacionLongitud){
            let position = {lat: parseFloat(sucursal.localizacionLatitud), lng: parseFloat(sucursal.localizacionLongitud)};
            addMarker(position);
        }
    }
};


let validarModificacion = async function () {
    let error = validarNombre1() | validarCorreo() | validarTelefono() | validarProvincia() | validarCanton() | validarDistrito() | validarMapa();
    if (!error) {
        let sucursal = {
            nombre: nombreInput1.value,
            telefono: telefonoInput.value,
            correo: correoInput.value,
            provincia: sectionProvincia.value,
            canton: sectionCantones.value,
            distrito: sectionDistritos.value
    
        }
        let editarSucural = await modificarSucursal(id,sucursal);
        if (editarSucural.success) {
            Swal.fire({
                type: 'success',
                title: successMessage,
                text: 'Se ha relizado la modificación correctamente',
                confirmButtonText:
                    '<a href="http://localhost:3000/sucursales.html" class="linkPage">Ok</a>'
            });
        }
        else {
            Swal.fire({
                title: errorMessage,
                type: 'error'

            });
        }
    }
    else {
        Swal.fire({
            type: 'warning',
            title: errorMessage,
            text: 'Revise los campos resaltados e intételo de nuevo'
        });
    }
};
cargar_formulario();
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
document.getElementById('registrar').addEventListener('click', validarModificacion);
document.getElementById('map').addEventListener('click', validarMapa);
cargar_formulario();