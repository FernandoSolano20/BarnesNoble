let modal = document.getElementById("modal");
let tbody = document.querySelector("#tbl_librerias tbody");

function eventosLibreria(event) {
  let elemento = event.target;
  let accion = elemento.getAttribute('data-action');
  if (accion) {
    let tituloModal = document.getElementById('titulo-modal');
    let cuerpoModal = document.getElementById('cuerpo-modal');
    let textoModal = document.getElementById('texto-modal');

    let trLibreria = elemento.parentElement.parentElement;
      let libreria = {
        id: trLibreria.getAttribute('data-id'),
        nombreComercial: trLibreria.children[0].innerText,
        nombreFantasia: trLibreria.children[1].innerText,
        provincia: trLibreria.children[2].innerText,
        canton: trLibreria.children[3].innerText,
        distrito: trLibreria.children[4].innerText,
      };
//       cuerpoModal.setAttribute("data-libreria", libreria.id);

//       if (accion === 'editar') {
//         modal.setAttribute('data-action', 'editar');
//         tituloModal.innerText = 'Editar libreria ' + libreria.nombreComercial;
//         textoModal.innerText = '¿Está seguro que quiere editar esta libreria?';

//         crearFomrulario(cuerpoModal, libreria);
//       } else if (accion === 'borrar') {
//         modal.setAttribute('data-action', 'borrar');
//         tituloModal.innerText = 'Elimnar Libreria ' + libreria.nombreComercial;
//         textoModal.innerText = '¿Está seguro que quiere eliminar esta libreria?';
//       } else if (accion === 'estado') {
//         modal.setAttribute('data-action', 'estado');
//         let checkBoxEstado = document.getElementById(libreria.id);
//         if (!checkBoxEstado.checked) {
//           tituloModal.innerText = 'Desactivar Libreria ' + libreria.nombreComercial;
//           textoModal.innerText = '¿Está seguro que quiere desactivar esta libreria?';
//         }
//         else {
//           tituloModal.innerText = 'Activar libreria ' + libreria.nombreComercial;
//           textoModal.innerText = '¿Está seguro que quiere activar esta libreria?';
//         }
//       }
    
//     modal.style.display = "block";
//   }
// }

// function crearFomrulario(cuerpoModal, libreria) {
//   let form = document.createElement('form');
//   form.setAttribute('id', 'formulario-modal');
//   cuerpoModal.appendChild(form);

//   let labelNombreComercial = document.createElement('label');
//   labelNombreComercial.setAttribute('type', 'label');
//   labelNombreComercial.setAttribute('placeholder', 'Nombre Comercial');

//   let inputNombreComercial = document.createElement('input');
//   inputNombreComercial.setAttribute('type', 'text');
//   inputNombreComercial.setAttribute('onkeypress', "return soloLetras(event)");
//   inputNombreComercial.setAttribute('placeholder', 'Nombre Comercial');
//   inputNombreComercial.setAttribute('id', 'nombre-comercial-input');
//   inputNombreComercial.setAttribute('name', 'nombreComercial');
//   labelNombreComercial = document.createElement('label');

//   let inputNombreFantasia = document.createElement('input');
//   inputNombreFantasia.setAttribute('type', 'text');
//   inputNombreFantasia.setAttribute('onkeypress', "return soloLetras(event)");
//   inputNombreFantasia.setAttribute('placeholder', 'Nombre Fantasia');
//   inputNombreFantasia.setAttribute('id', 'nombre-fantasia-input');
//   inputNombreFantasia.setAttribute('name', 'nombreFantasia');

//   let inputProvincia = document.createElement('input');
//   inputProvincia.setAttribute('type', 'text');
//   inputProvincia.setAttribute('onkeypress', "return soloLetras(event)");
//   inputProvincia.setAttribute('placeholder', 'Provincia');
//   inputProvincia.setAttribute('id', 'provincia-input');
//   inputProvincia.setAttribute('name', 'provincia');

//   let inputCanton = document.createElement('input');
//   inputCanton.setAttribute('type', 'text');
//   inputCanton.setAttribute('onkeypress', "return soloLetras(event)");
//   inputCanton.setAttribute('placeholder', 'Cantón');
//   inputCanton.setAttribute('id', 'canton-input');
//   inputCanton.setAttribute('name', 'canton');

//   let inputDistrito = document.createElement('input');
//   inputDistrito.setAttribute('type', 'text');
//   inputDistrito.setAttribute('onkeypress', "return soloLetras(event)");
//   inputDistrito.setAttribute('placeholder', 'Distrito');
//   inputDistrito.setAttribute('id', 'Distrito-input');
//   inputDistrito.setAttribute('name', 'distrito');

//   if (libreria) {
//     inputNombreComercial.setAttribute('value', libreria.nombreComercial);
//     inputNombreFantasia.setAttribute('value', libreria.nombreFantasia);
//     inputProvincia.setAttribute('value', libreria.provincia);
//     inputCanton.setAttribute('value', libreria.canton);
//     inputDistrito.setAttribute('value', libreria.distrito);
//   }

//   form.appendChild(inputNombreComercial);
//   form.appendChild(inputNombreFantasia);
//   form.appendChild(inputProvincia);
//   form.appendChild(inputCanton);
//   form.appendChild(inputDistrito);
// }

// let removerForm = function () {
//   modal.style.display = "none";
//   let formEditar = document.getElementById("formulario-modal");
//   if (formEditar) {
//     formEditar.remove();
//   }
// }

// let closeModal = function (event) {
//   if (event.target == modal || event.target.getAttribute('data-close') === 'closeModal') {
//     if (event.target.id !== "confirm" && modal.getAttribute('data-action') === 'estado') {
//       let libreriaId = document.querySelector('#cuerpo-modal').getAttribute('data-libreria');
//       let inputChecked = document.getElementById(libreriaId);
//       inputChecked.checked = !inputChecked.checked;
//     }
//     removerForm();
//   }
// }
// let soloLetras = function (e) {
//   key = e.keyCode || e.which;
//   tecla = String.fromCharCode(key).toLowerCase();
//   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
//   especiales = [];

//   tecla_especial = false;
//   for (let i in especiales) {
//     if (key == especiales[i]) {
//       tecla_especial = true;
//       break;
//     }
//   }

//   if (letras.indexOf(tecla) == -1 && !tecla_especial)
//     return false;
// }

let estado = function (event){
  let element = event.target;
  if(element.getAttribute("data-action") == "estado"){
    parent = element.parentElement.parentElement;
    idElemento = parent.getAttribute("data-id");
    let inputRadio = document.getElementById(idElemento);
    if(inputRadio.checked){
      Swal.fire({
        title: 'Activar',
        text: "¿Está seguro que quiere activar esta Librería?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Activar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Activado!',
            'La librería se activó con éxito',
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
        text: "¿Está seguro que quiere desactivar esta librería?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Desactivar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Desactivado',
            'La librería se desactivo con éxito',
            'success'
          )
        }else{
          inputRadio.checked = false;
        }
      })
    }
  }
}

window.addEventListener('click', closeModal);
tbody.addEventListener('click', eventosLibreria);
document.getElementById('boton').addEventListener('click', eventosLibreria);
tbody.addEventListener("click", estado);
