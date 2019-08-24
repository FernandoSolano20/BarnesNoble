
/*
 * Nombre de archivo: js/libros/controladorEditarLibros
 * Last Modified: Aug 23, 2019
 * Modified by: Fran A. Wilson
 */
'use strict' //archivo controlador para registarlibros

const botonModificar = document.querySelector('#btnModificar');

const tituloAlert = document.querySelector('#alertitulo');
const tituloInput = document.querySelector('#titulo');

const portadaImgInput = document.querySelector('#img1');

const contraportadaImgInput2 = document.querySelector('#img2');

const autorAlert = document.querySelector('#alertAutor');
const autorInput = document.querySelector('#autor');

const generoAlert = document.querySelector('#alertGenero');
const generoInput = document.querySelector('#genero');

const categoriaAlert = document.querySelector('#alertCategoria');
const categoriaInput = document.querySelector('#categoria');

const resennaAlert = document.querySelector('#alertResenna');
const resennaInput = document.querySelector('#resenna');


let url = new URL(window.location.href);
let id = url.searchParams.get("id");

let cargar_formulario = async () => {
    let libros = await obtenerLibrosId(id);
    if (libros.success) {
        libros = libros.listaLibro;
        tituloInput.value = libros['titulo'];
        await crearSectionAutores();
        autorInput.value = libros['autor']._id;
        await crearSectionGeneros();
        generoInput.value = libros['genero']._id;
        await crearSectionCategorias();
        categoriaInput.value = libros['categoria']._id;
        resennaInput.value = libros['resenna'];
    }
};

let editar = async () => {
    let libro = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        portada: portadaImgInput.value,
        contraportada: contraportadaImgInput2.value,
        genero: generoInput.value,
        categoria: categoriaInput.value,
        resenna: resennaInput.value

    }
    return await modificarLibro(id, libro);
};

let validarModificacion = async function () {
    let error = validarTitulo() | validarAutor() | validarGenero() | validarCategoria() | validarResenna();

    if (!error) {
        let editarLibro = await editar();
        if (editarLibro.success) {
            Swal.fire({
                type: 'success',
                title: editarLibro.message,
                text: 'Se ha relizado la modificación correctamente',
                confirmButtonText:
             '<a href="http://localhost:3000/listarLibrosCards.html" class="linkPage">Ok</a>'
            });
        }
        else {
            Swal.fire({
                title: editarLibro.message,
                type: 'error'

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
};
let validarTitulo = function () {
    let elementText = {
        value: tituloInput.value,
        alert: tituloAlert,
        input: tituloInput
    }
    return !(noVacio(elementText) && validarTextoNumero(elementText));
};

// let validarFotoPortada = function () {
//     let elementPicture = {
//         value: imgInput1.value,
//         alert: imgAlert1,
//         input: imgInput1
//     }
//     return !(noVacio(elementPicture) && validarFotos(elementPicture));
// }

// let validarFotoContraPortada = function () {
//     let elementPicture = {
//         value: imgInput2.value,
//         alert: imgAlert2,
//         input: imgInput2
//     }
//     return !(noVacio(elementPicture) && validarFotos(elementPicture));
// }

let validarResenna = function () {
    let validarRes = {
        value: resennaInput.value,
        alert: resennaAlert,
        input: resennaInput
    }
    return !(noVacio(validarRes) && validarTextoNumero(validarRes));
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

tituloInput.addEventListener('blur', validarTitulo);
autorSelect.addEventListener('change', validarAutor);
generoSelect.addEventListener('change', validarGenero);
resennaInput.addEventListener('blur', validarResenna);
categoriaSelect.addEventListener('change', validarCategoria);
document.getElementById('btnModificar').addEventListener('click', validarModificacion);
cargar_formulario();







