'use strict';

const nombreInput = document.getElementById('nombre');
const nombreAlert = document.getElementById('alertNombre');

const descuentoInput = document.getElementById('descuento');
const descuentoAlert = document.getElementById('alertDescuento');

const descripcionInput = document.getElementById('descripcion');
const descripcionAlert = document.getElementById('alertDescripcion');

const estadoInput = document.getElementById('estado');


const autorInput = document.getElementById('alertAutor');
//const estadoAlert = document.getElementById('alertEstado');
const tipoOfertaAlert = document.getElementById('alertTipoOferta');
const sucursalAlert = document.getElementById('alertSucursal');
const autorAlert = document.getElementById('alertAutor');
const generoAlert = document.getElementById('alertGenero');
const categoriaAlert = document.getElementById('alertCategoria');
const libroAlert = document.getElementById('alertLibro');

//const favAlert = document.getElementById('alertFavorito');




let obtenerDatosUsuarios = async function () {
    let error = validarNombre() | validarDescripcion() | validarDescuento() | validarSucursal() | validarAutor() | validarGenero() |validarCategoria() | validarLibro();
    if (!error) {

       document.body.className = "loading";
        let imgValue = document.getElementById('img');
        let imgResult = await crearImagen(imgValue);
        if (imgResult.success) {
            let sexoValue;
            for (let i = 0; i < sexoInput.length; i++) {
                if (sexoInput[i].checked) {
                    sexoValue = sexoInput[i].value;
                    break;
                }
            } 
            
                      
           
            
            
            let oferta = {
                
                nombre: nombreInput.value,
                descuento: descuentoInput.value,
                descripcion: descripcionInput.value,
                estado: estadoInput.value,                            
                autor: autorSelect.value,
                genero: generoSelect.value,
                libro: libroSelect.value,
                categoria: categoriaSelect.value,
                autor: autorSelect.value,
                sucursal: autorSelect.value,
              
            }
            let nuevaOferta = await registrarOfertas(oferta);
            document.body.className = "";
            if (nuevaOferta.success) {
                Swal.fire({
                    type: 'success',
                    title: nuevaOferta.message,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<a href="http://localhost:3000/inicioSesion.html" class="linkPage">Ok</a>'
                });
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: nuevaOferta.message
                });
            }
        }
        else {
            document.body.className = "";
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





let validarNombre = function () {
    let elementText = {
        value: nombreInput.value,
        alert: nombreAlert,
        input: nombreInput
    }
    return !(noVacio(elementText) && validarTexto(elementText));
}

let validarDescuento = function () {
    let elementText = {
        value: descuentoInput.value,
        alert: descuentoAlert,
        input: descuentoInput
    }
    return !(noVacio(elementText) && validarNumeros(elementText));
}

let validarDescripcion = function () {
    let elementText = {
        value: descripcionInput.value,
        alert: descripcionAlert,
        input: descripcionInput
    }
    return !(noVacio(elementText));
}

let validarEstado = function () {
    let elementSelect = {
        value: estadoSelect.value,
        alert: estadoAlert,
        input: estadoSelect
    }
    return !(validarSelect(elementSelect));
}

let validarTipoOferta = function () {
    let elementSelect = {
        value: tipoOfertaSelect.value,
        alert: tipoOfertaAlert,
        input: tipoOfertaSelect
    }
     
    return !(validarSelect(elementSelect));
    
}

let validarSucursal = function () {
    let elementSelect = {
        value: sucursalSelect.value,
        alert: sucursalAlert,
        input: sucursalSelect
    }
    return !(validarSelect(elementSelect));
}

let validarAutor = function () {
    let elementSelect = {
        value: autorSelect.value,
        alert: autorAlert,
        input: autorSelect
    }
    return !(validarSelect(elementSelect));
}

let validarGenero = function () {
    let elementSelect = {
        value: generoSelect.value,
        alert: generoAlert,
        input: generoSelect
    }
    return !(validarSelect(elementSelect));
}

let validarCategoria = function () {
    let elementSelect = {
        value: categoriaSelect.value,
        alert: categoriaAlert,
        input: categoriaSelect
    }
    return !(validarSelect(elementSelect));
}

let validarLibro = function () {
    let elementSelect = {
        value: libroSelect.value,
        alert: libroAlert,
        input: libroSelect
    }
    return !(validarSelect(elementSelect));
}



nombreInput.addEventListener('blur', validarNombre);
descuentoInput.addEventListener('blur', validarDescuento);
descripcionInput.addEventListener('blur', validarDescripcion);
//estadoSelect.addEventListener('change', validarEstado);
//tipoOfertaSelect.addEventListener('change', validarTipoOferta);
sucursalSelect.addEventListener('change', validarSucursal);
autorSelect.addEventListener('change', validarAutor);
generoSelect.addEventListener('change', validarGenero);
categoriaSelect.addEventListener('change', validarCategoria);
libroSelect.addEventListener('change', validarLibro);
document.getElementById('registrar').addEventListener('click', obtenerDatosUsuarios);