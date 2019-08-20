'use strict';

const nombreInput = document.getElementById('nombre');
const nombreAlert = document.getElementById('alertNombre');

const descuentoInput = document.getElementById('descuento');
const descuentoAlert = document.getElementById('alertDescuento');

const estadoSelect = document.getElementById('estado');


const tipoOfertaSelect = document.getElementById('tipoOferta');

const descripcionInput = document.getElementById('descripcion');
const descripcionAlert = document.getElementById('alertDescripcion');

const estadoInput = document.getElementById('estado');


//const autorInput = document.getElementById('alertAutor');
const estadoAlert = document.getElementById('alertEstado');
const tipoOfertaAlert = document.getElementById('alertTipoOferta');
const sucursalAlert = document.getElementById('alertSucursal');
const favAlert = document.getElementById('alertAutor');

//const favAlert = document.getElementById('alertFavorito');

let obtenerDatosUsuarios = async function () {
    let error = validarNombre() | validarDescripcion() | validarDescuento() | validarSucursal() | validarOferta() | validarTipoOferta() | validarEstado();
    if (!error) {
        let txtTienda;
        txtTienda = sucursalSelect.value;
        txtTienda = sucursalSelect.querySelector('[value="'+txtTienda+'"]').getAttribute('data-tienda');
        let oferta = {
            tipoOferta : tipoOfertaSelect.value,
            nombre: nombreInput.value,
            descuento: descuentoInput.value,
            descripcion: descripcionInput.value,
            estado: estadoInput.value
        }
        if (autorSelect.value)
            oferta.autor = autorSelect.value;
        if (generoSelect.value)
            oferta.genero = generoSelect.value;
        if (categoriaSelect.value)
            oferta.categoria = categoriaSelect.value;
        if (libroSelect.value)
            oferta.libro = libroSelect.value;
        if(txtTienda == "Libreria")
            oferta.libreria = sucursalSelect.value;
        else
            oferta.sucursal = sucursalSelect.value;

        let nuevaOferta = await modificarOferta(oferta);
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

let validarOferta = function () {
    if (autorSelect.value === '' && generoSelect.value === '' && categoriaSelect.value === '' && libroSelect.value === '') {
        favAlert.className = favAlert.className.replace("alertHidden", "");
        autorSelect.className = autorSelect.className.replace("selectError", "");
        autorSelect.className = autorSelect.className + " selectError";
        generoSelect.className = generoSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className + " selectError";
        categoriaSelect.className = categoriaSelect.className.replace("selectError", "");
        categoriaSelect.className = categoriaSelect.className + " selectError";
        libroSelect.className = libroSelect.className.replace("selectError", "");
        libroSelect.className = libroSelect.className + " selectError";
        return true;
    }
    else {
        autorSelect.className = autorSelect.className.replace("selectError", "");
        generoSelect.className = generoSelect.className.replace("selectError", "");
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
estadoSelect.addEventListener('change', validarEstado);
tipoOfertaSelect.addEventListener('change', validarTipoOferta);
sucursalSelect.addEventListener('change', validarSucursal);
autorSelect.addEventListener('change', validarOferta);
generoSelect.addEventListener('change', validarOferta);
categoriaSelect.addEventListener('change', validarOferta);
libroSelect.addEventListener('change', validarOferta);
document.getElementById('editar').addEventListener('click', obtenerDatosUsuarios);


let llenarDatosOferta = async () => {
   
    console.log(JSON.parse(localStorage.getItem("ofertaEditar")));
    let oferta = JSON.parse(localStorage.getItem("ofertaEditar"));
    console.log(oferta);
    //llena el select de genero
    let listaObtenerGenero = await obtenerGenero();
    let OfertaEncontrada = listaObtenerGenero.find( obj => obj.nombre == oferta.genero.nombre );
    console.log(OfertaEncontrada);
    document.getElementById("genero").value = OfertaEncontrada._id;

    //llena el select de libro
    let listaObtenerLibro = await obtenerLibrosFetch();
    let libroEncontrado = listaObtenerLibro.find( obj => obj.titulo == oferta.libro.titulo );
    console.log(libroEncontrado);
    document.getElementById("libro").value = libroEncontrado._id;

    //llena el select de categoria
    let listaObtenerCategoria = await obtenerCategoria();
    let categoriaEncontrada = listaObtenerCategoria.find( obj => obj.nombre == oferta.categoria.nombre );
    console.log(categoriaEncontrada);
    document.getElementById("categoria").value = categoriaEncontrada._id;

    //llena el select de autor
    let listaObtenerAutor = await obtenerAutores();
    let autorEncontrado = listaObtenerAutor.find( obj => obj.nombre == oferta.autor.nombre );
    console.log(autorEncontrado);
    document.getElementById("autor").value = autorEncontrado._id;

    //llena el select de estado
    let estadoOferta = oferta.estado;
    document.getElementById("estado").value = estadoOferta;

    //llena el select de tipo de oferta
    let tipoOfertaOferta = oferta.tipoOferta;
    document.getElementById("tipoOferta").value = tipoOfertaOferta;

    //llena el campo de nombreInput
    let nombreInputOferta = oferta.nombre;
    document.getElementById("nombre").value = nombreInputOferta;

     //llena el campo de descuento
     let descuentoOferta = oferta.descuento;
     document.getElementById("descuento").value = descuentoOferta;

     //llena el campo de descuento
     let descripcionOferta = oferta.descripcion;
     document.getElementById("descripcion").value = descripcionOferta;


    //llena el select de sucursal
    let listaObtenerSucursal = await obtenerUsuarioPorIdFetchTiendas(sessionStorage.id);
    //let sucursalEncontrada = listaObtenerSucursal.find( obj => obj.nombre == oferta.sucursal.nombre );
    let sucursalEncontrada = listaObtenerSucursal.usuario.libreria.sucursales
    console.log(sucursalEncontrada);
    document.getElementById("sucursal").value = sucursalEncontrada._id;
}

llenarDatosOferta();
