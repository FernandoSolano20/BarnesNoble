var modal = document.getElementById("modal");
var tbody = document.querySelector("#tabla-elementos tbody");

function eventosSucursal(event) {
  var elemento = event.target;
  var accion = elemento.getAttribute('data-action');
  if (accion) {
    var tituloModal = document.getElementById('titulo-modal');
    var cuerpoModal = document.getElementById('cuerpo-modal');
    var textoModal = document.getElementById('texto-modal');

    if (accion === 'registrar') {
      modal.setAttribute('data-action', 'registrar');
      tituloModal.innerText = 'registrar sucursal';
      textoModal.innerText = '';
      registrarFormulario(cuerpoModal);
    }
    else {
      var trSucursal = elemento.parentElement.parentElement;
      var sucursal = {
        id: trSucursal.getAttribute('data-id'),
        nombre: trSucursal.children[0].innerText,
        correo: trSucursal.children[1].innerText
      };
      cuerpoModal.setAttribute("data-sucursal", sucursal.id);

      if (accion === 'editar') {
        modal.setAttribute('data-action', 'editar');
        tituloModal.innerText = 'Editar sucursal ' + sucursal.nombre;
        textoModal.innerText = '¿Está seguro que quiere editar esta sucursal?';

        registrarFormulario(cuerpoModal, sucursal);
      } else if (accion === 'borrar') {
        modal.setAttribute('data-action', 'borrar');
        tituloModal.innerText = 'Elimnar sucursal ' + sucursal.nombre;
        textoModal.innerText = '¿Está seguro que quiere elimnar esta sucursal?';
      } else if (accion === 'estado') {
        modal.setAttribute('data-action', 'estado');
        var checkBoxEstado = document.getElementById(sucursal.id);
        if (!checkBoxEstado.checked) {
          tituloModal.innerText = 'Desactivar sucursal ' + sucursal.nombre;
          textoModal.innerText = '¿Está seguro que quiere desactivar esta sucursal?';
        }
        else {
          tituloModal.innerText = 'Activar sucursal ' + sucursal.nombre;
          textoModal.innerText = '¿Está seguro que quiere activar esta sucursal?';
        }
      }
    }
    modal.style.display = "block";
  }
}

function registrarFormulario(cuerpoModal, sucursal) {
  var form = document.createElement('form');
  form.setAttribute('id', 'formulario-modal');
  cuerpoModal.appendChild(form);

  var inputNombre = document.createElement('input');
  inputNombre.setAttribute('type', 'text');
  inputNombre.setAttribute('onkeypress', "return soloLetras(event)");
  inputNombre.setAttribute('placeholder', 'Nombre sucursal');
  inputNombre.setAttribute('id', 'nombre-sucursal');
  inputNombre.setAttribute('name', 'nombre');

  var inputCorreo = document.createElement('input');
  inputCorreo.setAttribute('type', 'text');
  inputCorreo.setAttribute('placeholder', 'correo sucursal');
  inputCorreo.setAttribute('id', 'correo-sucursal');
  inputCorreo.setAttribute('name', 'correo');

   var inputTelefono = document.createElement('input');
   inputTelefono.setAttribute('type', 'text');
   inputTelefono.setAttribute('placeholder', 'telefono sucursal');
   inputTelefono.setAttribute('id', 'telefono-sucursal');
   inputTelefono.setAttribute('name', 'cortelefonoreo');

  var inputLocalizacionLongitud = document.createElement('input');
  inputLocalizacionLongitud.setAttribute('type', 'text');
  inputLocalizacionLongitud.setAttribute('placeholder', 'localizacionLongitud sucursal');
  inputLocalizacionLongitud.setAttribute('id', 'localizacionLongitud-sucursal');
  inputLocalizacionLongitud.setAttribute('name', 'localizacionLongitud');

  var inputLocalizacionLatitud = document.createElement('input');
  inputLocalizacionLatitud.setAttribute('type', 'text');
  inputLocalizacionLatitud.setAttribute('placeholder', 'localizacionLatitud sucursal');
  inputLocalizacionLatitud.setAttribute('id', 'localizacionLatitud-sucursal');
  inputLocalizacionLatitud.setAttribute('name', 'localizacionLatitud');

  if (sucursal) {
    inputNombre.setAttribute('value', sucursal.nombre);
    inputCorreo.innerText = sucursal.correo;
    inputTelefono.innerText = sucursal.telefono;
    inputLocalizacionLongitud.innerText = sucursal.localizacionLongitud;
    inputLocalizacionLatitud.innerText = sucursal.localizacionLatitud;
  }

  form.appendChild(inputNombre);
  form.appendChild(inputCorreo);
  form.appendChild(inputTelefono);
  form.appendChild(inputLocalizacionLongitud);
  form.appendChild(inputLocalizacionLatitud);
}

var removerForm = function () {
  modal.style.display = "none";
  var formEditar = document.getElementById("formulario-modal");
  if (formEditar) {
    formEditar.remove();
  }
}

var closeModal = function (event) {
  if (event.target == modal || event.target.getAttribute('data-close') === 'closeModal') {
    if (event.target.id !== "confirm" && modal.getAttribute('data-action') === 'estado') {
      var sucursalId = document.querySelector('#cuerpo-modal').getAttribute('data-sucursal');
      var inputChecked = document.getElementById(sucursalId);
      inputChecked.checked = !inputChecked.checked;
    }
    removerForm();
  }
}
var soloLetras = function (e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  especiales = [];

  tecla_especial = false;
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}

window.addEventListener('click', closeModal);
tbody.addEventListener('click', eventosSucursal);
document.getElementById('registrar-elemento').addEventListener('click', eventosSucursal);