'user strict'

const botonRegistrar = document.querySelector ('#boton_registrar');
const inputNombre = document.querySelector ('#input_nombre');
const inputSegundoNombre = document.querySelector ('#input_nombre2');
const inputApellido = document.querySelector ('#input_apellido1');
const inputSegundoApellido = document.querySelector ('#input_apellido2');
const inputNacimiento = document.querySelector ('#input_nacimiento');
// // const img = document.querySelector ('#input_img');
// // const inputSexo = document.querySelector ('#input_masculino');
// // const inputSexo = document.querySelector ('#input_femenino');
// // const inputSexo = document.querySelector ('#input_otro');
const inputCorreo = document.querySelector ('#input_email');
const inputCedula = document.querySelector ('#input_cedula');
// const inputPass = document.querySelector ('#input_pass');
const inputTelefono = document.querySelector ('#input_telefono');

// const inputLector = document.querySelector ('#input_alias');
// const inputGenero = document.querySelector ('#input_genero');
// const inputLibro = document.querySelector ('#input_libros');

// const inputNombreFantasia = document.querySelector ('#input_nomFantasia');
// const inputNombreComercial = document.querySelector ('#input_nomComercial');
    
    
    if(!registro.checked ){
      alert('Debe aceptar el registro');
      return false;
    }

let validarCorreo = (element) => {
    let email = element.value;
    if(email == ''){
        return false;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

let validarTexto = (element) => {
    if (element.value == '') {
        error = true;
        element.classList.add('input_error')
    } else {
        error = false;
        element.classList.remove('input_error')
    }
    return error;
}

let validarTelefono = (element) => {
    let telefono = element.value;
    if(telefono == ''){
        return false;
    }
    let re = /^\d{4}-?\d{4}$/;
    return re.test(String(telefono));
}

let validarCedula = (element) => {
    let cedula = element.value;
    if(cedula == ''){
        return false;
    }
    let re = /^[1-9]-?\d{4}-?\d{4}$/;
    return re.test(String(cedula));
}

let validar = () => {
    
    let error = false;

    if (! validarTexto(inputNombre) ) {
        error = true;
    }

    if (! validarTexto(inputSegundoNombre) ) {
        error = true;
    }

    if (! validarTexto(inputApellido) ) {
        error = true;
    }

    if (! validarTexto(inputSegundoApellido) ) {
        error = true;
    }

    if (! validarCorreo(inputCorreo) ) {
        error = true;
    }

    if (! validarCedula(inputCedula) ) {
        error = true;
    }

    if (! validarTelefono(inputTelefono) ) {
        error = true;
    }

     valor = document.getElementById('input_masculino').value;
    

    let fecha = new Date (inputNacimiento.value);

    let fecha_formateada = fecha.getUTCDate() + '-' + Number
    (fecha.getUTCMonth() + 1 ) + '-' + fecha.getFullYear();

     if( valor == null || valor.length == 0) {
      alert('Error, rellena el campo de sexo');
    return false;
    }
    




    if (!error) {
        //registrarContacto(nombre, correo, fecha, comentario)
        Swal.fire(
            { //formato JSON
                type: 'success',
                title: 'Se ha enviado su mensaje exitosamente',
                text: 'Nos pondremos en contacto tan pronto como sea posible'
            }
        )
    } else {
        Swal.fire(
            {
                title: 'No se ha enviado su mensaje',
                type: 'warning',
                text: 'Revise los campos resaltados e intentelo de nuevo'
            }
        )
        
    }
}


botonRegistrar.addEventListener ('click', validar);








