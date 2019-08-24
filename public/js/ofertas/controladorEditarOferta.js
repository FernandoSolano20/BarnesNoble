'use strict';
const nombreInput = document.getElementById('nombre');
const nombreAlert = document.getElementById('alertNombre');
const descuentoInput = document.getElementById('descuento');
const descuentoAlert = document.getElementById('alertDescuento');
const descripcionInput = document.getElementById('descripcion');
const descripcionAlert = document.getElementById('alertDescripcion');
//const estadoInput = document.getElementById('estado');
const sucursalAlert = document.getElementById('alertSucursal');
const libroAlert = document.getElementById('alertLibro');
const generoAlert = document.getElementById('alertGenero');
const categoriaAlert = document.getElementById('alertCategoria');
const autorAlert = document.getElementById('alertAutor');
const favAlert = document.getElementById('alertAutor');
const urlParams = new URLSearchParams(window.location.search);
let ofertaAEditar;

let cargarFormulario = async () => {
    ofertaAEditar = JSON.parse(localStorage.getItem("ofertaEditar"));
    console.log(ofertaAEditar);
    if (ofertaAEditar) {

        nombreInput.value = ofertaAEditar.nombre;
        descuentoInput.value = ofertaAEditar.descuento;
        descripcionInput.value = ofertaAEditar.descripcion;

        let listaObtenerLibro = await obtenerLibrosFetch();
        let libro = listaObtenerLibro.find(obj => obj.titulo === ofertaAEditar.libro.titulo);

        let listaObtenerGenero = await obtenerGenero();
        let genero = listaObtenerGenero.find(obj => obj.genero === ofertaAEditar.libro.genero);

        let listaObtenerAutor = await obtenerAutores();
        let autor = listaObtenerAutor.find(obj => obj.autor === ofertaAEditar.libro.autor);
        let sucursal;
        await crearSectionSucursal();
        if (ofertaAEditar.sucursal)
            document.getElementById("sucursal").value = ofertaAEditar.sucursal._id;
        else
            document.getElementById("sucursal").value = ofertaAEditar.libreria._id;

        let listaObtenerCategoria = await obtenerCategoria();
        let categoria = listaObtenerCategoria.find(obj => obj.categoria === ofertaAEditar.libro.categoria);

        document.getElementById("libro").value = libro._id;
        document.getElementById("genero").value = genero._id;
        document.getElementById("autor").value = autor._id;
        document.getElementById("categoria").value = categoria._id;
        


    }
}



//const autorInput = document.getElementById('alertAutor');
//const estadoAlert = document.getElementById('alertEstado');
//const tipoOfertaAlert = document.getElementById('alertTipoOferta');


//const favAlert = document.getElementById('alertFavorito');

let obtenerDatosUsuarios = async function () {
    let error = validarNombre() | validarDescripcion() | validarDescuento() | validarSucursal() | validarOferta();
    if (!error) {
        let txtTienda;
        txtTienda = sucursalSelect.value;
        txtTienda = sucursalSelect.querySelector('[value="' + txtTienda + '"]').getAttribute('data-tienda');
        let oferta = {
            nombre: nombreInput.value,
            descuento: descuentoInput.value,
            descripcion: descripcionInput.value,
        }
        if (autorSelect.value)
            oferta.autor = autorSelect.value;
        if (generoSelect.value)
            oferta.genero = generoSelect.value;
        if (categoriaSelect.value)
            oferta.categoria = categoriaSelect.value;
        if (libroSelect.value)
            oferta.libro = libroSelect.value;
        if (txtTienda == "Libreria")
            oferta.libreria = sucursalSelect.value;
        else
            oferta.sucursal = sucursalSelect.value;

        let nuevaOferta = await modificarOferta(oferta,ofertaAEditar._id);
        document.body.className = "";
        if (nuevaOferta.success) {
            Swal.fire({
                type: 'success',
                title: 'La oferta fue editada exitosamente',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<a href="http://localhost:3000/listarOfertas.html" class="linkPage">Ok</a>'
            });
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'Error al guardar los cambios, intente de nuevo'
            });



        }
    }

    else {
        Swal.fire({
            type: 'warning',
            title: 'Los cambios no fueron realizados',
            text: 'Valide los campos resaltados e inténtelo de nuevo'
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



let validarOferta = function () {
    if (autorSelect.value === '' && generoSelect.value === '' && categoriaSelect.value === '' && libroSelect.value === '') {
        favAlert.className = favAlert.className.replace("alertHidden", "");
        autorSelect.className = autorSelect.className.replace("selectError", "");
        //autorSelect.className = autorSelect.className + " selectError";
        generoSelect.className = generoSelect.className.replace("selectError", "");
        //generoSelect.className = generoSelect.className + " selectError";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        //categoriaSelect.className = categoriaSelect.className + " selectError";
        libroSelect.className = libroSelect.className.replace("selectError", "");
        //libroSelect.className = libroSelect.className + " selectError";
        return true;
    }
    else {
        autorSelect.className = autorSelect.className.replace("selectError", "");
        //autorSelect.className = autorSelect.className + " alertHidden";
        generoSelect.className = generoSelect.className.replace("selectError", "");
        //generoSelect.className = generoSelect.className + " alertHidden";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className.replace("selectError", "");
        favAlert.className = favAlert.className.replace("alertHidden", "");
        favAlert.className = favAlert.className + " alertHidden";
        return false;
    }
}



nombreInput.addEventListener('blur', validarNombre);
descuentoInput.addEventListener('blur', validarDescuento);
descripcionInput.addEventListener('blur', validarDescripcion);
sucursalSelect.addEventListener('change', validarSucursal);
autorSelect.addEventListener('change', validarAutor);
generoSelect.addEventListener('change', validarGenero);
categoriaSelect.addEventListener('change', validarCategoria);
libroSelect.addEventListener('change', validarLibro);
document.getElementById('modificar').addEventListener('click', obtenerDatosUsuarios);
window.addEventListener('load', cargarFormulario);
