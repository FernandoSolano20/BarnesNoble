let tbodyLib = document.querySelector('#tbl_librerias tbody');

let borrar = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "rechazar") {
        parent = element.parentElement.parentElement;
        idElemento = parent.getAttribute("data-id");
        Swal.fire({
            title: 'Eliminar',
            text: "¿Está seguro que quiere rechazar este librería?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rechazar'
        }).then(async (result) => {
            if (result.value) {
                let response = await borrarUsuario(idElemento);
                if (response.success) {
                    parent.remove();
                    Swal.fire(
                        'Eliminado',
                        response.message,
                        'success'
                    ).then((result) =>{
                        window.location.href = "solicitudLibreria.html";
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

let estado = function (event) {
    let element = event.target;
    if (element.getAttribute("data-action") == "aprobar") {
        parent = element.parentElement.parentElement;
        idElemento = parent.getAttribute("data-id");
        Swal.fire({
            title: 'Aprovar',
            text: "¿Está seguro que quiere aprobar esta librería?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar'
        }).then(async (result) => {
            if (result.value) {
                let user = {
                    estado: true
                }
                let response = await aprobarSolcitud(user,idElemento);
                parent.remove();
                Swal.fire(
                    'Activado!',
                    'La librería se aprobó con éxito',
                    'success'
                ).then((result) =>{
                    window.location.href = "solicitudLibreria.html";
                })
            }
        })
    }
}

tbodyLib.addEventListener("click", borrar);
tbodyLib.addEventListener("click", estado);