'user strict'

const botonRegistrar = docuement.querySelector ('#boton_registrar');
const inputNombre = document.querySelector ('#input_nombre');
const inputSegundoNombre = document.querySelector ('#input_nombre2');
const inputApellido = docuemnte.querySelector ('#input_apellido1');
const inputSegundoApellido = document.querySelector ('#input_apellido2');
const inputNacimiento = document.querySelector ('#input_nacimiento');
// // const img = document.querySelector ('#input_img');
// // const inputSexo = document.querySelector ('#input_masculino');
// // const inputSexo = document.querySelector ('#input_femenino');
// // const inputSexo = document.querySelector ('#input_otro');
// const inputCorreo = docuemte.querySelector ('#input_email');
// const inputCedula = docuemnte.querySelector ('#input_cedula');
// const inputPass = docuemnt.querySelector ('#input_pass');
// const inputTelefono = docuement.querySelector ('input_telefono');

// const inputLector = docuement.querySelector ('#input_alias');
// const inputGenero = docuemnt.querySelector ('#input_genero');
// const inputLibro = docuemnt.querySelector ('#input_libros');

// const inputNombreFantasia = document.querySelector ('#input_nomFantasia');
// const inputNombreComercial = docuemnt.querySelector ('#input_nomComercial');


let validar = (pnombre, pnombre2, papellido1, papellido2, pnacimiento) => {
    
    let error = false;

if (pnombre == '') {
    error = true;
    inputNombre.classList.add('input_error')
} else {
    error = false;
    inputNombre.classList.remove('input_error')
}

if (pnombre2 == '' ) {
    error = true;
    inputSegundoNombre.classList.add('input_error')
} else {
    error = false;
    inputSegundoNombre.classList.remove('input_error')
}
    if (papellido1 == '') {
        error = true;
        inputApellido.classList.add('input_error')
    } else {
        error = false;
        inputApellido.classList.remove('input_error')
        
    } 
    if (papellido2 == '') {
        error = true;
        inputSegundoApellido.classList.add('input_error')
    } else {
        error = false;
        inputSegundoNombre.classList.remove('input_error')
        
    }

    return error;
};

let valore = () =>{
    let nombre = inputNombre.value;
    let nombre2 = inputSegundoApellido.value;
    let apellido = inputApellido.value;
    let apellido2 = inputSegundoApellido.value;
    let fecha = new Date (inputNacimiento.value);
    let fecha_formateada = fecha.getUTCDate() + '-' + Number
    (fecha.getUTCMonth() + 1 ) + '-' + fecha.getFullYear();
}

botonRegistrar.addEventListener ('click', saludar);








