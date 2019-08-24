const tbody = document.querySelector('#tbl_sucursales tbody');
let lista_sucursales = [];
let txt_filtro = document.querySelector('#txt_filtro');
const thead = document.querySelector('#tbl_sucursales thead');
let listaLibreria;
let myLib;


let mostrar_tabla = async (event) => {
  if (!event) {
    tbody.innerHTML = '';
    let fila = document.createElement('tr');
    thead.appendChild(fila);
    let tr = document.createElement('th');
    tr.innerHTML = 'Nombre';
    fila.appendChild(tr);
    tr = document.createElement('th');
    tr.innerHTML = 'Teléfono';
    fila.appendChild(tr);

    if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
      tr = document.createElement('th');
      tr.innerHTML = 'Librería';
      fila.appendChild(tr);
    }
    if (sessionStorage.tipoUsuario != 'Lector') {
      tr = document.createElement('th');
      tr.innerHTML = 'Editar';
      fila.appendChild(tr);
      tr = document.createElement('th');
      tr.innerHTML = 'Eliminar';
      fila.appendChild(tr);
      tr = document.createElement('th');
      tr.innerHTML = 'Activar/Desactivar';
      fila.appendChild(tr);
      fila.appendChild(tr);
    }

    tr = document.createElement('th');
    tr.innerHTML = 'Perfil';
    fila.appendChild(tr);

    if (sessionStorage.tipoUsuario != 'Lector') {
      let btn = document.createElement('a');
      btn.type = "button";
      btn.setAttribute('class', 'material-blue');
      btn.href = "registrarSucursal.html";
      document.getElementById('boton').appendChild(btn);

      let label = document.createTextNode('Crear');
      btn.appendChild(label);

      let icon = document.createElement('i');
      icon.setAttribute('class', 'far fa-plus-circle');
      btn.insertBefore(icon, label);

    }
    if (sessionStorage.tipoUsuario != 'Adminitrador librería') {
      lista_sucursales = await obtenerTiendas();
      listaLibreria = lista_sucursales;
      lista_sucursales = lista_sucursales.listaLibrerias;

    }
    else {
      lista_sucursales = await obtenerUsuarioPorIdFetch(sessionStorage.id);
      myLib = lista_sucursales.usuario.libreria._id;
      lista_sucursales = lista_sucursales.usuario.libreria.sucursales;
    }
  }

  tbody.innerHTML = '';
  if (lista_sucursales) {
    for (let i = 0; i < lista_sucursales.length; i++) {
      if (sessionStorage.tipoUsuario == 'Adminitrador librería') {
        agregarFilaSucursal(lista_sucursales[i].sucursal);
      }
      else {
        for (let j = 0; j < lista_sucursales[i].sucursales.length; j++) {
          agregarFilaSucursal(lista_sucursales[i].sucursales[j].sucursal, lista_sucursales[i]);
        }
      }
    }
  }
  filaNoDatos();
};
let agregarFilaSucursal = function (sucursal, libreria) {
  let filtro = txt_filtro.value.toLowerCase();

  if (sucursal['nombre'].toLowerCase().includes(filtro) || sucursal['correo'].toLowerCase().includes(filtro) || sucursal['telefono'].toLowerCase().includes(filtro) || (libreria ? libreria : "").toLowerCase().includes(filtro)) {
    let fila = tbody.insertRow();
    fila.insertCell().innerHTML = sucursal['nombre'];
    fila.insertCell().innerHTML = sucursal['telefono'];

    if (libreria) {
      fila.insertCell().innerHTML = libreria.nombreFantasia;
    }

    if (sessionStorage.tipoUsuario != 'Lector') {
      let editarCelda = fila.insertCell();
      let editar = document.createElement('i');
      editar.setAttribute('class', 'far fa-edit');
      editar.setAttribute('data-action', 'editar');
      editar.addEventListener('click', function () {
        window.location.href = "editarSucursal.html?id=" + sucursal._id;
      })

      editarCelda.appendChild(editar);

      let eliminarCelda = fila.insertCell();
      let eliminar = document.createElement('i');
      eliminar.setAttribute('data-id', sucursal._id);
      eliminar.setAttribute('data-idLib', libreria? libreria._id:myLib);
      eliminar.setAttribute('class', 'fal fa-trash-alt');
      // eliminar.setAttribute('data-action', 'borrar');
      eliminar.addEventListener('click', function (event) {
        let elemento = event.target;
        let idElemento = elemento.getAttribute('data-id');
        Swal.fire({
          title: '¿Está seguro de eliminar esta sucursal?',
          text: "Ésta acción no se puede revertir",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#315c74',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, estoy seguro'
        }).then(async (result) => {
          if (result.value) {
            let sucursal = {
              libreria: elemento.getAttribute('data-idLib'),
              sucursal: idElemento

            }
            let response = await eliminarSucursal(sucursal);
            if (response.success) {
              Swal.fire(
                '¡Sucursal eliminada!',
                response.message
              ).then((result) => {
                window.location.href = 'sucursales.html';
              });
            }
            else{
              Swal.fire({
                type: 'error',
                title: 'La sucursal no se pudo eliminar',
              })
            }
          }
        })
      });

      eliminarCelda.appendChild(eliminar);

      let estadoCelda = fila.insertCell();

      let estadoInput = document.createElement('input');
      estadoInput.setAttribute('class', 'switch');
      estadoInput.setAttribute('id', sucursal._id);
      estadoInput.setAttribute('type', 'checkbox');
      estadoCelda.appendChild(estadoInput);
      estadoInput.checked = !sucursal.estado;

      let estadoLabel = document.createElement('label');
      // estadoLabel.setAttribute('data-action', 'estado');
      estadoLabel.setAttribute('for', sucursal._id);
      estadoInput.addEventListener('click', function (event) {
          let element = event.target;
            idElemento = element.id;
            let inputRadio = document.getElementById(idElemento);
            if (!inputRadio.checked) {
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
                  let sucursal = {
                    estado: true
                  }
                  let response = await estadoSucursal(sucursal, idElemento);
                  if (response.success) {
                    Swal.fire(
                      'Activado',
                      'La sucursal se activo con éxito',
                      'success'
                    )
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'La sucursal no se pudo activar',
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
                text: "¿Está seguro que quiere desactivar esta surcursal?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#f2a5a0',
                confirmButtonText: 'Desactivar',
                cancelButtonText: 'Cancelar'
              }).then(async (result) => {
                if (result.value) {
                  let sucursal = {
                    estado: false
                  }
                  let response = await estadoSucursal(sucursal, idElemento);
                  if (response.success) {
                    Swal.fire(
                      'Desactivado',
                      'La sucursal se activo con éxito',
                      'success'
                    )
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'La sucursal No se pudo desactivar'
                    })
                  }
                } else {
                  inputRadio.checked = false;
                }
              })
            }
      })

      estadoCelda.appendChild(estadoLabel);
    }

    let celda_perfil = fila.insertCell();
    let divContendor = document.createElement("div");
    let btnPerfil = document.createElement('button');

    divContendor.setAttribute('class', 'crear-contenedor')

    celda_perfil.appendChild(divContendor);


    btnPerfil.innerText = 'Ver perfil'
    btnPerfil.dataset._id = sucursal['_id'];
    btnPerfil.setAttribute('class', 'material-blue')
    btnPerfil.addEventListener('click', function () {
      window.location.href = "perfilSucursal.html?id=" + sucursal._id;
    });
    divContendor.appendChild(btnPerfil);

  }
}

let filaNoDatos = function () {
  let tbody = document.querySelector('#tbl_sucursales tbody');
  if (!lista_sucursales || tbody.childElementCount === 0) {
    tbody.innerHTML = '';
    let fila = tbody.insertRow();
    fila.setAttribute('id', 'no-data');
    let celda = fila.insertCell()
    celda.innerHTML = 'No se encontró datos';
    celda.setAttribute('colspan', '8');
  }
}

mostrar_tabla();

txt_filtro.addEventListener('keyup', mostrar_tabla);
