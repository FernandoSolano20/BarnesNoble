let estado = function (event){
  let element = event.target;
  if(element.getAttribute("data-action") == "estado"){
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    let inputRadio = document.getElementById(idElemento);
    if(inputRadio.checked){
      Swal.fire({
        title: 'Activar',
        text: "¿Está seguro que quiere activar este libro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          let libro = {
            estado: true
          }
          let response = await estadoAutor(libro,idElemento);
          if(response.success){
            Swal.fire(
              'Activado',
              'El libro se activo con éxito',
              'success'
            )
          }else{
            Swal.fire({
              type: 'error',
              title: 'No se pudo activar',
            })
          }
        }else{
          inputRadio.checked = true;
        }
      })
    }
    else{
      Swal.fire({
        title: 'Desactivar?',
        text: "¿Está seguro que quiere desactivar este libro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          let autor = {
            estado: false
          }
          let response = await estadoAutor(autor,idElemento);
          if(response.success){
            Swal.fire(
              'Desactivado',
              'El libro se desactivo con éxito',
              'success'
            )
          }else{
            Swal.fire({
              type: 'error',
              title: 'No se pudo desactivar'
            })
          }
        }else{
          inputRadio.checked = false;
        }
      })
    }
  }
}

tbodyAutor.addEventListener("click",borrar);
tbodyAutor.addEventListener("click",estado);