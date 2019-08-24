let terminarIntercambioFunction = function (event) {
    let element = event.target;
    let idElemento = element.getAttribute('data-id');
    Swal.fire({
        title: 'Terminar',
        text: "¿Está seguro que quiere terminar el intercambio?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Terminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.value) {
            let intercambio = {
                terminado: true,
                fechaFin: new Date()
            }
            let response = await terminarIntercambio(intercambio, idElemento);
            if (response.success) {
                Swal.fire(
                    'Terminado',
                    'Califique al usuario',
                    'success'
                ).then(()=>{
                    window.location.href= 'misIntercambios.html'
                });
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'No se pudo terminar el intercambio',
                })
            }
        }
    })
}

let votarUsuario = function (event) {
    let elemento = event.target;
    Swal.fire({
        title: 'Califique del intercambio',
        html: `<div class="table-div">
                    <div class="table-cell-div">
                        <div>
                            <span class="container">
                                <span><i class="far fa-book-alt"></i><i class="otr fas fa-book-alt"></i></span>
                                <span><i class="far fa-book-alt"></i><i class="otr fas fa-book-alt"></i></span>
                                <span><i class="far fa-book-alt"></i><i class="otr fas fa-book-alt"></i></span>
                                <span><i class="far fa-book-alt"></i><i class="otr fas fa-book-alt"></i></span>
                                <span><i class="far fa-book-alt"></i><i class="otr fas fa-book-alt"></i></span>
                            </span>
                        </div>
                    </div>
                </div>
                <span class="left alertHidden" id="alertComentario">La identificación debe tener 9 dígitos.</span>
                <textarea id="comentario" class="swal2-textarea" placeholder="Comentario del para el usuario" style="display: flex;"></textarea>
            `
    }).then(async () => {
        let err1 = validarComentario();
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let comentarioTxt = document.getElementById('comentario').value;
        if (currentStars && !err1) {
            let voto = {
                idIntercambio: elemento.getAttribute('data-id'),
                idUser: elemento.getAttribute('data-userVotado'),
                usuario: sessionStorage.id,
                voto: currentStars,
                comentario: comentarioTxt
            }
            let response = await votarPorUsuario(voto);
            if(response.success){
                elemento.remove();
                Swal.fire({
                    type: 'success',
                    title: response.message
                });
            }
            else{
                Swal.fire({
                    type: 'error',
                    title: response.message
                });
            }
        }
        else {
            Swal.fire({
                type: 'warning',
                title: "El voto no se pudo guardar"
            })
        }

    });
    animationVotes();
    document.getElementById('comentario').addEventListener('blur', validarComentario);
}

let validarComentario = function () {
    let textareaComentario = document.getElementById('comentario');
    let alertComentario = document.getElementById('alertComentario');
    let comenatario = {
        value: textareaComentario.value,
        alert: alertComentario,
        input: textareaComentario,
    }

    return !(noVacio(comenatario));
}