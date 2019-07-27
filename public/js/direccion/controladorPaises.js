let listaObtenerPaises = [];
const sectionPaises = document.getElementById('paises');

let crearSectionPaises = async () => {

    listaObtenerPaises = await obtenerPaises();

    let sectionPaises = document.getElementById('paises');
    sectionPaises.innerHTML = '';

    let optionElemento = document.createElement('option');
    optionElemento.setAttribute('value', '');
    optionElemento.innerHTML = '--Seleccione una pais--';
    sectionPaises.appendChild(optionElemento);

    for (var i = 0; i < listaObtenerPaises.length; i++) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value',listaObtenerPaises[i].name);
        optionElemento.innerHTML = listaObtenerPaises[i].name;
        sectionPaises.appendChild(optionElemento);
    }
};
crearSectionPaises();