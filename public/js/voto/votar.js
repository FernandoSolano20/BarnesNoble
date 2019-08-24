let votar = function () {
    Swal.fire({
        title: 'Ingrese califique al libro',
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
                <textarea id="comentario" class="swal2-textarea" placeholder="Comentario del libro" style="display: flex;"></textarea>
            `
    }).then(async () => {
        let err1 = validarComentario();
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let comentarioTxt = document.getElementById('comentario').value;
        if (currentStars && !err1) {
            let voto = {
                idLibro: id,
                idUsuario: sessionStorage.id,
                voto: currentStars,
                comentario: comentarioTxt
            }
            let response = await votarPorLibro(voto);
            if(response.success){
                let divVoto = document.querySelector("#promVoto");
                let promVoto = Number(divVoto.style.width.replace("%",""));
                if(promVoto){
                    promVoto = promVoto/20*libro.listaLibro.voto.length;
                }
                let noDato = document.getElementById('noDatos');
                noDato?noDato.remove():"";
                promVoto += currentStars;
                promVoto = (promVoto/(libro.listaLibro.voto.length+1))*20;
                divVoto.setAttribute('style','width: ' + promVoto + '%');
                document.getElementById('btnVoto').remove();
                let usuario = await obtenerUsuarioPorIdFetch(sessionStorage.id);
                let drawVoto = {
                    comentario: voto.comentario,
                    calificacion: voto.voto
                }
                drawDivReview(drawVoto,usuario.usuario)
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