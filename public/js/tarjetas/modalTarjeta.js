let modal = document.getElementById("modal");
let tbody = document.querySelector("#tbl_tarjetas tbody");

function eventosTarjeta(event) {
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
      let trTarjeta = elemento.parentElement.parentElement;
      let tarjeta = {
        id: trTarjeta.getAttribute('data-id'),
        nombre1: trTarjeta.children[0].innerText,
        tipoTarjeta: trTarjeta.children[1].innerText,
        numTarjeta: trTarjeta.children[2].innerText,
        expiracionMM: trTarjeta.children[3].innerText,
        expiracionMM: trTarjeta.children[4].innerText,
        cvv: trTarjeta.children[5].innerText
     };

      cuerpoModal.setAttribute("data-tarjeta", tarjeta.id);

      if (accion === 'editar') {
        modal.setAttribute('data-action', 'editar');
        tituloModal.innerText = 'Editar tarjeta ' + genero.nombre;
        textoModal.innerText = '¿Está seguro que quiere editar esta tarjeta?';

        crearFomrulario(cuerpoModal, tarjeta);
      } else if (accion === 'borrar') {
        modal.setAttribute('data-action', 'borrar');
        tituloModal.innerText = 'Elimnar tarjeta ';
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
  inputNombre.setAttribute('placeholder', 'Nombre');
  inputNombre.setAttribute('id', 'nombre1');
  inputNombre.setAttribute('name', 'nombre');

  let inputTipoTarjeta = document.createElement('input');
  inputTipoTarjeta.setAttribute('type', 'text');
  inputTipoTarjeta.setAttribute('onkeypress', "return soloLetras(event)");
  inputTipoTarjeta.setAttribute('placeholder', 'Tipo de Tarjeta');
  inputTipoTarjeta.setAttribute('id', 'tipoTarjeta');
  inputTipoTarjeta.setAttribute('name', 'tipo');

  let inputNumTarjeta = document.createElement('input');
  inputNumTarjeta.setAttribute('type', 'text');
  inputNumTarjeta.setAttribute('onkeypress', "return soloNumeros(event)");
  inputNumTarjeta.setAttribute('placeholder', 'Numero de Tarjeta');
  inputNumTarjeta.setAttribute('id', 'numTarjeta');
  inputNumTarjeta.setAttribute('name', 'numero');

    let inputExpiracionMM = document.createElement('input');
  inputExpiracionMM.setAttribute('type', 'text');
  inputExpiracionMM.setAttribute('onkeypress', "return soloNumeros(event)");
  inputExpiracionMM.setAttribute('placeholder', 'Mes de expericion');
  inputExpiracionMM.setAttribute('id', 'expiracionMM');
  inputExpiracionMM.setAttribute('name', 'expiracionMM');

  let inputExpiracionYY = document.createElement('input');
  inputExpiracionYY.setAttribute('type', 'text');
  inputExpiracionYY.setAttribute('onkeypress', "return soloNumeros(event)");
  inputExpiracionYY.setAttribute('placeholder', 'Mes de expericion');
  inputExpiracionYY.setAttribute('id', 'expiracionYY');
  inputExpiracionYY.setAttribute('name', 'expiracionYY');

  let inputCvv = document.createElement('input');
  inputCvv.setAttribute('type', 'text');
  inputCvv.setAttribute('onkeypress', "return soloNumeros(event)");
  inputCvv.setAttribute('placeholder', 'Numero CVV');
  inputCvv.setAttribute('id', 'cvv');
  inputCvv.setAttribute('name', 'cvv');

  if (tarjeta) {
    inputNombre.setAttribute('value', tarjeta.nombre1);
    inputTipoTarjeta.setAttribute('value', tarjeta.tipoTarjeta);
    inputNumTarjeta.setAttribute('value', tarjeta.numTarjeta);
    inputExpiracionMM.setAttribute('value', tarjeta.expiracionMM);
    inputExpiracionYY.setAttribute('value', tarjeta.expiracionYY);
    inputCvv.setAttribute('value', tarjeta.cvv);
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
function soloNumeros(evt) {
  var iKeyCode = (evt.which) ? evt.which : evt.keyCode
  if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
      return false;

  return true;
} 

window.addEventListener('click', closeModal);
tbody.addEventListener('click', eventosGenero);
document.getElementById('crear-elemento').addEventListener('click', eventosGenero);