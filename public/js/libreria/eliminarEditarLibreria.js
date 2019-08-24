let tbodyLibreria = document.querySelector('#tbl_librerias tbody');
let borrar = function (event) {
  let element = event.target;
  if (element.getAttribute("data-action") == "borrar") {
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar esta librería?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f2a5a0',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.value) {
        let response = await eliminarLibreria(idElemento);
        if (response.success) {
          Swal.fire(
            'Eliminado',
            response.message,
            'success'
          ).then((result) => {
            if (result.value)
              window.location.href = "listarLibrerias.html";
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
  if (element.getAttribute("data-action") == "estado") {
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    let inputRadio = document.getElementById(idElemento);
    if (inputRadio.checked) {
      Swal.fire({
        title: 'Activar',
        text: "¿Está seguro que quiere activar esta librería?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          let libreria = {
            estado: true
          }
          let response = await estadoLibreria(libreria, idElemento);
          if (response.success) {
            Swal.fire(
              'Activado',
              'El autor se activo con éxito',
              'success'
            )
          } else {
            Swal.fire({
              type: 'error',
              title: 'No se pudo activar',
            })
          }
        } else {
          inputRadio.checked = true;
        }
      })
    }
    else {
      Swal.fire({
        title: 'Desactivar?',
        text: "¿Está seguro que quiere desactivar esta librería?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f2a5a0',
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          let libreria = {
            estado: false
          }
          let response = await estadoLibreria(libreria, idElemento);
          if (response.success) {
            Swal.fire(
              'Desactivado',
              'La librería se desactivo con éxito',
              'success'
            )
          } else {
            Swal.fire({
              type: 'error',
              title: 'No se pudo desactivar'
            })
          }
        } else {
          inputRadio.checked = false;
        }
      })
    }
  }
}

tbodyLibreria.addEventListener("click", borrar);
tbodyLibreria.addEventListener("click", estado);