var modal = document.getElementById("modal");
var tbody = document.querySelector("#tabla-genero tbody");

tbody.onclick = function (event) {
  var elemento = event.target;
  var accion = elemento.getAttribute('data-action');
  if (accion) {
    var tituloModal = document.getElementById('titulo-modal');
    var cuerpoModal = document.getElementById('cuerpo-modal');
    var textoModal = document.getElementById('texto-modal');
    var trGenero = elemento.parentElement.parentElement;
    var genero = {
      id: trGenero.getAttribute('data-id'),
      nombre : trGenero.children[0].innerText,
      descripcion : trGenero.children[1].innerText
    };
    cuerpoModal.setAttribute("data-genero",genero.id);
    if (accion === 'editar') {
      modal.setAttribute('data-action', 'editar');
      tituloModal.innerText = 'Editar género ' + genero.nombre;
      textoModal.innerText = '¿Está seguro que quiere editar este género?';
      
      crearFomrulario(cuerpoModal,genero);
    } else if (accion === 'borrar') {
      modal.setAttribute('data-action', 'borrar');
      tituloModal.innerText = 'Elimnar género ' + genero.nombre;
      textoModal.innerText = '¿Está seguro que quiere elimnar este género?';
    } else if (accion === 'estado') {
      modal.setAttribute('data-action', 'estado');
      var checkBoxEstado = document.getElementById(genero.id);
      if (!checkBoxEstado.checked) {
        tituloModal.innerText = 'Desactivar género ' + genero.nombre;
        textoModal.innerText = '¿Está seguro que quiere desactivar este género?';
      }
      else {
        tituloModal.innerText = 'Activar género ' + genero.nombre;
        textoModal.innerText = '¿Está seguro que quiere activar este género?';
      }
    }
    modal.style.display = "block";
  }
}

function crearFomrulario(cuerpoModal,genero) {
  var form = document.createElement('form');
  form.setAttribute('id', 'formulario-modal');
  cuerpoModal.appendChild(form);

  var inputNombre = document.createElement('input');
  inputNombre.setAttribute('type', 'text');
  inputNombre.setAttribute('placeholder', 'Nombre género');
  inputNombre.setAttribute('id', 'nombre-genero');
  inputNombre.setAttribute('name', 'nombre');
  inputNombre.setAttribute('value', genero.nombre);
  form.appendChild(inputNombre);

  var inputDescripcion = document.createElement('textarea');
  inputDescripcion.setAttribute('type', 'text');
  inputDescripcion.setAttribute('placeholder', 'Descripción género');
  inputDescripcion.setAttribute('id', 'descripcion-genero');
  inputDescripcion.setAttribute('name', 'descripcion');
  inputDescripcion.innerText = genero.descripcion;
  form.appendChild(inputDescripcion);
}

window.onclick = function (event) {
  if (event.target == modal || event.target.getAttribute('data-close') === 'closeModal') {
    if(event.target.id !== "confirm" && modal.getAttribute('data-action') === 'estado'){
      var generoId = document.querySelector('#cuerpo-modal').getAttribute('data-genero');
      var inputChecked = document.getElementById(generoId);
      inputChecked.checked = !inputChecked.checked;
    }
    modal.style.display = "none";
    var formEditar = document.getElementById("formulario-modal");
    if (formEditar) {
      formEditar.remove();
    }
  }
}