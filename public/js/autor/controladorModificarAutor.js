const botonModificar = document.querySelector('#btnModificar');
const alertNombre = document.querySelector('#alertNombre')
const inputnombre = document.querySelector('#nombre');
const alertNomArtistico = document.querySelector('#alertNomArtistico')
const inputNomArtistico = document.querySelector('#nomArtistico');
const alertNac = document.querySelector('#alertaNac')
const inputNacimiento = document.querySelector('#nacimiento');
const alertMuerte = document.querySelector('#alertaMuerte')
const inputMuerte = document.querySelector('#muerte');
const alertNacionalidad = document.querySelector('#alertNacionalidad')
const inputNacionalidad = document.querySelector('#paises');
const alertResenna = document.querySelector('#alertResenna')
const inputResenna = document.querySelector('#resenna');
const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let cargarFormulario = async() => {
    let autor = await obtenerAutorId(_id);
    if (autor) {
        inputnombre.value = autor['nombre'];
        inputNomArtistico.value = autor['nombreArtistico'];
        inputResenna.value = autor['resenna'];
        await crearSectionPaises();
        inputNacionalidad.value  = autor['nacionalidad'];

        let fechaNacFormateada = new Date(autor['fechaNacimiento']);
        let mesNac = fechaNacFormateada.getUTCMonth() + 1;
        if (mesNac < 10) {
            mesNac = '0' + mesNac;
        }
        let diaNac = fechaNacFormateada.getDate();
        if (diaNac < 10) {
            diaNac = '0' + diaNac;
        }
        inputNacimiento.value = fechaNacFormateada.getFullYear() + '-' + mesNac + '-' + diaNac;
       
        let fechaMuerFormateada = new Date(autor['fechaMuerte']);
        let mes = fechaMuerFormateada.getUTCMonth() + 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        let dia = fechaMuerFormateada.getDate();
        if (dia < 10) {
            dia = '0' + dia;
        }
        inputMuerte.value = fechaMuerFormateada.getFullYear() + '-' + mes + '-' + dia;
    }
};

let editar = async () => {
    let autor = {
        nombre: inputnombre.value, 
        nombreArtistico: inputNomArtistico.value, 
        nacionalidad: inputNacionalidad.value, 
        resenna: inputResenna.value, 
        fechaNacimiento :new Date(inputNacimiento.value), 
        
    } 
    if(inputMuerte.value){
        autor.fechaMuerte = new Date(inputMuerte.value)
    }
    
    return await modificarAutor(_id, autor);
};

let validarModificacion = async () =>{
let error = validarNombre() | validarNombreArtistico() | validarFechaNacimiento() | validarFechaMuerte() | validarNacionalidad() | validarResenna();
if (!error) { 
let editarUsuario = await editar();
if (editarUsuario.success) {
    Swal.fire({
        title: editarUsuario.message,
        type: 'success',
        text: 'Se ha relizado la modificación correctamente',
        confirmButtonText:'<a href="autor.html" style="display: inline-block; border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);color: #fff;text-decoration: none">Ok</a>'
    })
} else {
    Swal.fire({
        title: editarUsuario.message,
        type: 'error'
    })
}
}
else {
Swal.fire({
    title: 'No se ha realizado la modificación',
    type: 'warning',
    text: 'Revise los campos resaltados e inténtelo de nuevo'
})
}
}

let validarNombre = function () {

    let validarNomAutor = {
        value: inputnombre.value,
        alert: alertNombre,
        input: inputnombre
    }

    return !(noVacio(validarNomAutor) && validarTexto(validarNomAutor));
};

let validarNombreArtistico = function () {
    let validarNomArtistico = {
        value: inputNomArtistico.value,
        alert: alertNomArtistico,
        input: inputNomArtistico
    }

    return !(noVacio(validarNomArtistico) && validarTexto(validarNomArtistico));
};

let validarFechaNacimiento = function () {
    let validarFechaNac = {
        value: inputNacimiento.value,
        alert: alertNac,
        input: inputNacimiento
    }

    return !(validarFecha(validarFechaNac) && validarFechaMayorActual(validarFechaNac));
};

let validarFechaMuerte = function () {
    let validarFechaMuer = {
        value: inputMuerte.value,
        alert: alertMuerte,
        input: inputMuerte
    }
    if (validarFechaMuer.value != '') {
        if (!(validarFecha(validarFechaMuer) && validarFechaMayorActual(validarFechaMuer) && validarMuerte(validarFechaMuer))) {
            return true
        }
    }
}
function validarMuerte(elementos) {
    let nacimento = inputNacimiento.value;
    nacimento = new Date(nacimento);
    let muerte = new Date(elementos.value);

    if (muerte < nacimento) {
        elementos.alert.innerText = "Seleccione una fecha posterior a la fecha de nacimiento."
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
};

let validarNacionalidad = function () {
    let validarNac = {
        value: inputNacionalidad.value,
        alert: alertNacionalidad,
        input: inputNacionalidad
    }

    return !(validarSelect(validarNac));
};

let validarResenna = function () {
    let validarRes = {
        value: inputResenna.value,
        alert: alertResenna,
        input: inputResenna
    }
    return !(noVacio(validarRes) && validarTextoNumero(validarRes));
};


inputnombre.addEventListener('blur', validarNombre);
inputNomArtistico.addEventListener('blur', validarNombreArtistico);
inputNacimiento.addEventListener('blur', validarFechaNacimiento);
inputMuerte.addEventListener('blur', validarFechaMuerte);
inputNacionalidad.addEventListener('blur', validarNacionalidad);
inputResenna.addEventListener('blur', validarResenna);
document.getElementById('btnModificar').addEventListener('click', validarModificacion);
cargarFormulario();