let modal = document.getElementById("modal");
let tbody = document.querySelector("#tbl_tarjetas tbody");

function eventosLibreria(event) {
  let elemento = event.target;
  let accion = elemento.getAttribute('data-action');
  if (accion) {
    let tituloModal = document.getElementById('titulo-modal');
    let cuerpoModal = document.getElementById('cuerpo-modal');
    let textoModal = document.getElementById('texto-modal');

    if (accion === 'crear') {
      modal.setAttribute('data-action', 'crear');
      tituloModal.innerText = 'Crear Tarjeta';
      textoModal.innerText = '';
      crearFomrulario(cuerpoModal);
    }
    else {
      let trTarjeta = elemento.parentElement.parentElement;
      let tarjeta = {
        id: trTarjeta.getAttribute('data-id'),
        nombre1: trTarjeta.children[0].innerText,
        tipoTarjeta: trTarjeta.children[1].innerText,
        numTarjeta: trTarjeta.children[2].innerText,
        expiracionMM: trTarjeta.children[3].innerText,
        expiracionYY: trTarjeta.children[4].innerText,
        cvv: trTarjeta.children[5].innerText

      };
      cuerpoModal.setAttribute("data-tarjeta", tarjeta.id);

      if (accion === 'editar') {
        modal.setAttribute('data-action', 'editar');
        tituloModal.innerText = 'Editar tarjeta ' + tarjeta.tipoTarjeta;
        textoModal.innerText = '¿Está seguro que quiere editar esta tarjeta?';

        crearFomrulario(cuerpoModal, tarjeta);
      } else if (accion === 'borrar') {
        modal.setAttribute('data-action', 'borrar');
        tituloModal.innerText = 'Elimnar tarjeta ' + tarjeta.tipoTarjeta;
        textoModal.innerText = '¿Está seguro que quiere elimnar esta tarjeta?';
      } 
    }
    modal.style.display = "block";
  }
}

function crearFomrulario(cuerpoModal, tarjeta) {
  let form = document.createElement('form');
  form.setAttribute('id', 'formulario-modal');
  cuerpoModal.appendChild(form);

  let inputNombre = document.createElement('input');
  inputNombre.setAttribute('type', 'text');
  inputNombre.setAttribute('onkeypress', "return soloLetras(event)");
  inputNombre.setAttribute('placeholder', 'Nombre en la Tarjeta');
  inputNombre.setAttribute('id', 'nombre1');
  inputNombre.setAttribute('name', 'nombre');

  let inputTipoTarjeta = document.createElement('input');
  inputTipoTarjeta.setAttribute('type', 'text');
  inputTipoTarjeta.setAttribute('onkeypress', "return (event)");
  inputTipoTarjeta.setAttribute('placeholder', 'Tipo de Tarjeta');
  inputTipoTarjeta.setAttribute('id', 'tipo');
  inputTipoTarjeta.setAttribute('name', 'tipo');

  let inputNumTarjeta = document.createElement('input');
  inputNumTarjeta.setAttribute('type', 'text');
  inputNumTarjeta.setAttribute('onkeypress', "return soloNumeros(event)");
  inputNumTarjeta.setAttribute('placeholder', 'Número de tarjeta');
  inputNumTarjeta.setAttribute('id', 'tarjeta');
  inputNumTarjeta.setAttribute('name', 'tarjeta');

  let inputExpiracionMM = document.createElement('input');
  inputExpiracionMM.setAttribute('type', 'text');
  inputExpiracionMM.setAttribute('onkeypress', "return soloNumeros(event)");
  inputExpiracionMM.setAttribute('placeholder', 'Mes de expiración');
  inputExpiracionMM.setAttribute('id', 'mes');
  inputExpiracionMM.setAttribute('name', 'mes');

  let inputExpiracionYY = document.createElement('input');
  inputExpiracionYY.setAttribute('type', 'text');
  inputExpiracionYY.setAttribute('onkeypress', "return soloNumeros(event)");
  inputExpiracionYY.setAttribute('placeholder', 'Año de expiración');
  inputExpiracionYY.setAttribute('id', 'year');
  inputExpiracionYY.setAttribute('name', 'year');

  if (tarjeta) {
    inputNombre.setAttribute('value', tarjeta.nombre1);
    inputNombre.innerText = tarjeta.nombre1;

    inputTipoTarjeta.setAttribute('value', tarjeta.tipoTarjeta);
    inputTipoTarjeta.innerText = tarjeta.tipoTarjeta;

    inputNumTarjeta.setAttribute('value', tarjeta.numTarjeta);
    inputNumTarjeta.innerText = tarjeta.numTarjeta;

    inputExpiracionMM.setAttribute('value', tarjeta.numTarjeta);
    inputExpiracionMM.innerText = tarjeta.numTarjeta;

    inputExpiracionYY.setAttribute('value', tarjeta.expiracionYY);
    inputExpiracionYY.innerText = tarjeta.numTarjeta;

    inputCvv.setAttribute('value', tarjeta.cvv);
    inputCvv.innerText = tarjeta.cvv;

  }

  form.appendChild(inputNombre);
  form.appendChild(inputTipoTarjeta);
  form.appendChild(inputNumTarjeta);
  form.appendChild(inputExpiracionMM);
  form.appendChild(inputExpiracionYY);
  form.appendChild(inputCvv);
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
      let tarjetaId = document.querySelector('#cuerpo-modal').getAttribute('data-tarjeta');
      let inputChecked = document.getElementById(tarjetaId);
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

function soloNumeros(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}

window.addEventListener('click', closeModal);
tbody.addEventListener('click', eventosLibreria);
document.getElementById('crear-elemento').addEventListener('click', eventosLibreria);