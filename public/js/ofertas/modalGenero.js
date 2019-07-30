let modal = document.getElementById("modal");
let tbody = document.querySelector("#tabla-elementos tbody");

function eventosGenero(event) {
  let elemento = event.target;
  let accion = elemento.getAttribute('data-action');
  if (accion) {
    let tituloModal = document.getElementById('titulo-modal');
    let cuerpoModal = document.getElementById('cuerpo-modal');
    let textoModal = document.getElementById('texto-modal');

    if (accion === 'crear') {
      modal.setAttribute('data-action', 'crear');
      tituloModal.innerText = 'Crear género';
      textoModal.innerText = '';
      crearFomrulario(cuerpoModal);
    }
    else {
      let trGenero = elemento.parentElement.parentElement;
      let genero = {
        id: trGenero.getAttribute('data-id'),
        nombre: trGenero.children[0].innerText,
        descripcion: trGenero.children[1].innerText
      };
      cuerpoModal.setAttribute("data-genero", genero.id);

      if (accion === 'editar') {
        modal.setAttribute('data-action', 'editar');
        tituloModal.innerText = 'Editar género ' + genero.nombre;
        textoModal.innerText = '¿Está seguro que quiere editar este género?';

        crearFomrulario(cuerpoModal, genero);
      } else if (accion === 'borrar') {
        modal.setAttribute('data-action', 'borrar');
        tituloModal.innerText = 'Elimnar género ' + genero.nombre;
        textoModal.innerText = '¿Está seguro que quiere elimnar este género?';
      } else if (accion === 'estado') {
        modal.setAttribute('data-action', 'estado');
        let checkBoxEstado = document.getElementById(genero.id);
        if (!checkBoxEstado.checked) {
          tituloModal.innerText = 'Desactilet género ' + genero.nombre;
          textoModal.innerText = '¿Está seguro que quiere desactilet este género?';
        }
        else {
          tituloModal.innerText = 'Actilet género ' + genero.nombre;
          textoModal.innerText = '¿Está seguro que quiere actilet este género?';
        }
      }
    }
    modal.style.display = "block";
  }
}

function crearFomrulario(cuerpoModal, genero) {
  let form = document.createElement('form');
  form.setAttribute('id', 'formulario-modal');
  cuerpoModal.appendChild(form);

  let inputNombre = document.createElement('input');
  inputNombre.setAttribute('type', 'text');
  inputNombre.setAttribute('onkeypress', "return soloLetras(event)");
  inputNombre.setAttribute('placeholder', 'Nombre género');
  inputNombre.setAttribute('id', 'nombre-genero');
  inputNombre.setAttribute('name', 'nombre');

  let inputDescripcion = document.createElement('textarea');
  inputDescripcion.setAttribute('type', 'text');
  inputDescripcion.setAttribute('placeholder', 'Descripción género');
  inputDescripcion.setAttribute('id', 'descripcion-genero');
  inputDescripcion.setAttribute('name', 'descripcion');

  if (genero) {
    inputNombre.setAttribute('value', genero.nombre);
    inputDescripcion.innerText = genero.descripcion;
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
      let generoId = document.querySelector('#cuerpo-modal').getAttribute('data-genero');
      let inputChecked = document.getElementById(generoId);
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
tbody.addEventListener('click', eventosGenero);
document.getElementById('crear-elemento').addEventListener('click', eventosGenero);