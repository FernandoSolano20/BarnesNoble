const tbodyUsuario = document.querySelector('#tabla-elementos tbody');

let borrar = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "borrar") {
        let parent = element.parentElement.parentElement;
        let idElemento = parent.getAttribute("data-id");
        Swal.fire({
            title: 'Eliminar',
            text: "¿Está seguro que quiere eliminar este usuario?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            //llamar al servicio para borrar elemento
            if (result.value) {
                let response = await borrarUsuario(idElemento);
                if (response.success) {
                    Swal.fire(
                        'Eliminado',
                        response.message,
                        'success'
                    ).then((result) => {
                        window.location.href = "listar-usuarios.html";
                    })

                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: response.message,
                        text: 'Algo salió mal!'
                    })
                }
            }
        })
    }
}

let editar = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "editar") {
        let parent = element.parentElement.parentElement;
        let idElemento = parent.getAttribute("data-id");
        if (element.getAttribute("data-usuario") == "Lector") {
            window.location.href = "http://localhost:3000/editarPerfilUsuarios.html?id=" + idElemento;
        }
        else if (element.getAttribute("data-usuario") == "Adminitrador librería") {
            window.location.href = "http://localhost:3000/editarLibreria.html?id=" + idElemento;
        }
        else {
            //sussy admin plataforma
        }


    }
}

let estado = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "estado") {
        parent = element.parentElement.parentElement;
        idElemento = parent.getAttribute("data-id");
        let inputRadio = document.getElementById(idElemento);
        if (inputRadio.checked) {
            Swal.fire({
                title: 'Activar',
                text: "¿Está seguro que quiere activar este autor?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Activar'
            }).then(async (result) => {
                if (result.value) {
                    let user = {
                        estado: true
                    }
                    let response = await estadoUser(user, idElemento);
                    if (response.success) {
                        Swal.fire(
                            'Activado',
                            'El usuario se activó con éxito',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Ocurrio un error',
                            'Intentelo de nuevo',
                            'error'
                        )
                    }
                } else {
                    inputRadio.checked = true;
                }
            })
        }
        else {
            Swal.fire({
                title: 'Desactivar?',
                text: "¿Está seguro que quiere desactivar este autor?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Desactivar'
            }).then(async (result) => {
                if (result.value) {
                    let user = {
                        estado: false
                    }
                    let response = await estadoUser(user, idElemento);
                    if (response.success) {
                        Swal.fire(
                            'Desactivado',
                            'El usuario se desactivo con éxito',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            'Ocurrio un error',
                            'Intentelo de nuevo',
                            'error'
                        )
                    }
                } else {
                    inputRadio.checked = false;
                }
            })
        }
    }
}

tbodyUsuario.addEventListener("click", editar);
tbodyUsuario.addEventListener("click", borrar);
tbodyUsuario.addEventListener("click", estado);