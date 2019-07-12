var crearTabla = async () => {
    var tbody = document.querySelector('#tabla-genero tbody');
    var listaGeneros = [];
    listaGeneros = await obtenerGenero();
    
    tbody.innerHTML = '';

    for (let i = 0; i < listaGeneros.length; i++) {
        let fila = tbody.insertRow();
        fila.setAttribute('data-id', listaGeneros[i]._id);
        fila.insertCell().innerHTML = listaGeneros[i].nombre;
        fila.insertCell().innerHTML = listaGeneros[i].descripcion;

        var editarCelda = fila.insertCell();
        var editar = document.createElement('i');
        editar.setAttribute('class', 'far fa-edit');
        editar.setAttribute('data-action', 'editar');
        editarCelda.appendChild(editar);

        var eliminarCelda = fila.insertCell();
        var eliminar = document.createElement('i');
        eliminar.setAttribute('class', 'fal fa-trash-alt');
        eliminar.setAttribute('data-action', 'borrar');
        eliminarCelda.appendChild(eliminar);

        var estadoCelda = fila.insertCell();

        var estadoInput = document.createElement('input');
        estadoInput.setAttribute('class', 'switch');
        estadoInput.setAttribute('id', listaGeneros[i]._id);
        estadoInput.setAttribute('type', 'checkbox');
        estadoCelda.appendChild(estadoInput);

        var estadoLabel = document.createElement('label');
        estadoLabel.setAttribute('data-action', 'estado');
        estadoLabel.setAttribute('for', listaGeneros[i]._id);
        estadoLabel.innerText = '&nbsp;';
        estadoCelda.appendChild(estadoLabel);
    }
};

document.getElementById('confirm').addEventListener('click',generoFunciones);

var generoFunciones = () => {
    var accion = document.getElementById("modal").getAttribute('data-action');
    //if()
}

var crearGenero = () => {

}

crearTabla();

