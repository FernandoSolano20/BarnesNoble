
/*
 * Nombre de archivo: js/libros/controladorRegistrarLibros
 * Last Modified: Aug 19, 2019
 * Modified by: Fran A. Wilson
 */
'use strict' //archivo controlador para registarlibros
const boton_enviar = document.querySelector('#registrar');


// const tituloInput = document.getElementById('titulo');
// const tituloAlert = document.getElementById('alertitulo');
const tituloInput = document.querySelector('#titulo');

// const portadaImgInput = document.getElementById('img1');
// const imgAlert1 = document.getElementById('alertImg1');
const portadaImgInput = document.querySelector('#img1');

// const contraportadaImgInput2 = document.getElementById('img2');
// const imgAlert2 = document.getElementById('alertImg2');
const contraportadaImgInput2 = document.querySelector('#img2');

// const autorInput = document.getElementById('autor');
// const autorAlert = document.getElementById('alertAutor');
const autorInput = document.querySelector('#autor');

// const generoInput = document.getElementById('genero');
// const generoAlert = document.getElementById('alertGenero');
const generoInput = document.querySelector('#genero');


// const categoriaInput = document.getElementById('categoria');
// const categoriaAlert = document.getElementById('alertCategoria');
const categoriaInput = document.querySelector('#categoria');

// const resennaInput = document.getElementById('resenna');
// const resennaAlert = document.getElementById('alerResenna');
const resennaInput = document.querySelector('#resenna');


let url = new URL(window.location.href);
let id = url.searchParams.get("id");


let editar = () => {

    modificar(id, tituloInput.value, portadaImgInput.value, contraportadaImgInput2.value, autorInput.value, generoInput.value, categoriaInput.value, resennaInput.value );
};

boton_enviar.addEventListener('click', editar);

let obtenerDatosLibro = async function () {
    let error = validarTitulo() | validarFotoPortada() | validarFotoContraPortada() | validarAutor() | validarGenero() | validarCategoria() | validarResenna();

    if (!error) {
        document.body.className = "loading";
        let imgValue = document.getElementById('img1');
        let imgResult1 = await crearImagen(imgValue);
        if (imgResult1.success) {
            imgValue = document.getElementById('img2');
            let imgResult2 = await crearImagen(imgValue);
            if (imgResult2.success) {

                let libro = {
                    titulo: tituloInput.value,
                    caratula: imgResult1.result.secure_url,
                    contraportada: imgResult2.result.secure_url,
                    autor: autorSelect.value,
                    genero: generoSelect.value,
                    categoria: categoriaSelect.value,
                    resenna: resennaInput.value
                }
                let nuevoLibro = await registrarLibros(libros);
                document.body.className = "";
                if (nuevoLibro.success) {
                    Swal.fire({
                        type: 'success',
                        title: nuevoLibro.message,
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<a href="http://localhost:3000/listarLibrosCards.html" class="linkPage">Ok</a>'
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: nuevoLibro.message
                    });
                }
            }
            else {
                document.body.className = "";
                Swal.fire({
                    type: 'error',
                    title: imgResult2.message
                });
            }
        }
        else {
            document.body.className = "";
            Swal.fire({
                type: 'error',
                title: imgResult1.message
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



let validarTitulo = function () {
    let elementText = {
        value: tituloInput.value,
        alert: tituloAlert,
        input: tituloInput
    }
    return !(noVacio(elementText) && validarTextoNumero(elementText));
}

let validarFotoPortada = function () {
    let elementPicture = {
        value: imgInput1.value,
        alert: imgAlert1,
        input: imgInput1
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}

let validarFotoContraPortada = function () {
    let elementPicture = {
        value: imgInput2.value,
        alert: imgAlert2,
        input: imgInput2
    }
    return !(noVacio(elementPicture) && validarFotos(elementPicture));
}

let validarResenna = function () {
    let elementText = {
        value: resennaInput.value,
        alert: resennaAlert,
        input: resennaInput
    }
    return !(noVacio(elementText) && validarTextoNumero(elementText));
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

// tituloInput.addEventListener('blur', validarTitulo);
// imgInput1.addEventListener('change', validarFotoPortada);
// imgInput2.addEventListener('change', validarFotoContraPortada);
// autorSelect.addEventListener('change', validarAutor);
// generoSelect.addEventListener('change', validarGenero);
// resennaInput.addEventListener('blur', validarResenna);
// categoriaSelect.addEventListener('change', validarCategoria);
// const botonRegistrar = document.querySelector('#registrar');
// botonRegistrar.addEventListener('click', obtenerDatosLibro);
boton_enviar.addEventListener('click', editar);






let cargar_formulario = async() => {
    let libros = await obtenerLibrosId(id);
    if (libros.success) {
        libros= libros.listaLibro;
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
cargar_formulario();