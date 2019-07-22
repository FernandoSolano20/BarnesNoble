const categoriaSelect = document.getElementById('categoria');

let listaObtenerCategoria = [];

let crearSectionCategorias = async () => {

    listaObtenerCategoria = await obtenerCategoria();

    categoriaSelect.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una categoría--';
    categoriaSelect.appendChild(optionElemento);

    for (let i =0; i < listaObtenerCategoria.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', listaObtenerCategoria[i]._id);
        optionElemento.innerHTML = listaObtenerCategoria[i].nombre;
        categoriaSelect.appendChild(optionElemento);
    }
};

crearSectionCategorias();