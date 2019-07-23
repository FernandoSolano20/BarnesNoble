let modal = document.getElementById("modal");
let tbody = document.querySelector("#tabla-elementos tbody");

function eventosCategoria(event) {
  let elemento = event.target;
  let accion = elemento.getAttribute('data-action');
  if (accion) {
    let tituloModal = document.getElementById('titulo-modal');
    let cuerpoModal = document.getElementById('cuerpo-modal');
    let textoModal = document.getElementById('texto-modal');

    if (accion === 'crear') {
      modal.setAttribute('data-action', 'crear');
      tituloModal.innerText = 'Crear categoría';
      textoModal.innerText = '';
      crearFomrulario(cuerpoModal);
    }
    else {
      let trCategoria = elemento.parentElement.parentElement;
      let categoria = {
        id: trCategoria.getAttribute('data-id'),
        nombre: trCategoria.children[0].innerText,
        descripcion: trCategoria.children[1].innerText
      };
      cuerpoModal.setAttribute("data-categoria", categoria.id);

      if (accion === 'editar') {
        modal.setAttribute('data-action', 'editar');
        tituloModal.innerText = 'Editar categoría ' + categoria.nombre;
        textoModal.innerText = '¿Está seguro que quiere editar esta categoría?';

        crearFomrulario(cuerpoModal, categoria);
      } else if (accion === 'borrar') {
        modal.setAttribute('data-action', 'borrar');
        tituloModal.innerText = 'Elimnar categoría ' + categoria.nombre;
        textoModal.innerText = '¿Está seguro que quiere elimnar esta categoría?';
      } else if (accion === 'estado') {
        modal.setAttribute('data-action', 'estado');
        let checkBoxEstado = document.getElementById(categoria.id);
        if (!checkBoxEstado.checked) {
          tituloModal.innerText = 'Desactilet categoría ' + categoria.nombre;
          textoModal.innerText = '¿Está seguro que quiere desactilet esta categoría?';
        }
        else {
          tituloModal.innerText = 'Actilet categoría ' + categoria.nombre;
          textoModal.innerText = '¿Está seguro que quiere actilet esta categoría?';
        }
      }
    }
    modal.style.display = "block";
  }
}

function crearFomrulario(cuerpoModal, categoria) {
  let form = document.createElement('form');
  form.setAttribute('id', 'formulario-modal');
  cuerpoModal.appendChild(form);

  let inputNombre = document.createElement('input');
  inputNombre.setAttribute('type', 'text');
  inputNombre.setAttribute('onkeypress', "return soloLetras(event)");
  inputNombre.setAttribute('placeholder', 'Nombre categoría');
  inputNombre.setAttribute('id', 'nombre-categoria');
  inputNombre.setAttribute('name', 'nombre');

  let inputDescripcion = document.createElement('textarea');
  inputDescripcion.setAttribute('type', 'text');
  inputDescripcion.setAttribute('placeholder', 'Descripción categoría');
  inputDescripcion.setAttribute('id', 'descripcion-categoria');
  inputDescripcion.setAttribute('name', 'descripcion');

  if (categoria) {
    inputNombre.setAttribute('value', categoria.nombre);
    inputDescripcion.innerText = categoria.descripcion;
  }

  form.appendChild(inputNombre);
  form.appendChild(inputDescripcion);
}

let removerForm = function () {
  modal.style.display = "none";
  let formEditar = document.getElementById("formulario-modal");
  if (formEditar) {
    formEditar.remove();
  }
}

let closeModal = function (event) {
  if (event.target == modal || event.target.getAttribute('data-close') === 'closeModal') {
    if (event.target.id !== "confirm" && modal.getAttribute('data-action') === 'estado') {
      let categoriaId = document.querySelector('#cuerpo-modal').getAttribute('data-categoria');
      let inputChecked = document.getElementById(categoriaId);
      inputChecked.checked = !inputChecked.checked;
    }
    removerForm();
  }
}
let soloLetras = function (e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  especiales = [];

  tecla_especial = false;
  for (let i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}

window.addEventListener('click', closeModal);
tbody.addEventListener('click', eventosCategoria);
document.getElementById('crear-elemento').addEventListener('click', eventosCategoria);