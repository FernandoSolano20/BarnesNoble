var categoriaSelect = document.getElementById('categoria');

var listaObtenerCategoria = [];

var crearSectionCategorias = async () => {

    listaObtenerCategoria = await obtenerCategoria();

    categoriaSelect.innerHTML = '';

    var optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una categoría--';
    categoriaSelect.appendChild(optionElemento);

    for (var i =0; i < listaObtenerCategoria.length; i++) {
        var optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerCategoria[i]._id);
        optionElemento.innerHTML = listaObtenerCategoria[i].nombre;
        categoriaSelect.appendChild(optionElemento);
    }
};

crearSectionCategorias();