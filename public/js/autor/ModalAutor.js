let tbodyAutor = document.querySelector('#tabla-elementos tbody');
let borrar = function (event){
  let element = event.target;
  if(element.getAttribute("data-action") == "borrar"){
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar este autor?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then(async (result) => {
      //llamar al servicio para borrar elemento
      if (result.value) {
        let response = await eliminarAutor(idElemento);
        if(response.success){
          Swal.fire(
            'Eliminado',
            response.message,
            'success'
          )
          window.location.href = "autor.html";
        }
        else{
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

let estado = function (event){
  let element = event.target;
  if(element.getAttribute("data-action") == "estado"){
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    let inputRadio = document.getElementById(idElemento);
    if(inputRadio.checked){
      Swal.fire({
        title: 'Activar',
        text: "¿Está seguro que quiere activar este autor?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Activar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Activado!',
            'El autor se activó con éxito',
            'success'
          )
        }else{
          inputRadio.checked = true;
        }
      })
    }
    else{
      Swal.fire({
        title: 'Desactivar?',
        text: "¿Está seguro que quiere desactivar este autor?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Desactivar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Desactivado',
            'El autor se desactivo con éxito',
            'success'
          )
        }else{
          inputRadio.checked = false;
        }
      })
    }
  }
}

tbodyAutor.addEventListener("click",borrar);
tbodyAutor.addEventListener("click",estado);