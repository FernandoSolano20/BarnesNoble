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

    for (elementos in listaObtenerPaises) {
        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', elementos);
        optionElemento.innerHTML = listaObtenerPaises[elementos];
        sectionPaises.appendChild(optionElemento);
    }
};
crearSectionPaises();