var crearTabla = async (event) => {
    var tbody = document.querySelector('#tabla-elementos tbody');
    if (!event) {
        listaAutores = await obtenerAutores();
    }
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';
    for (let i = 0; i < listaAutores.length; i++) {
        if (listaAutores[i].nombre.toLowerCase().includes(filtro.toLowerCase())) {
            agregarFilaCategoria(listaAutores[i]);
        }
    }
    filaNoDatos();
};

inputFiltro.addEventListener('keyup', crearTabla);
crearTabla();