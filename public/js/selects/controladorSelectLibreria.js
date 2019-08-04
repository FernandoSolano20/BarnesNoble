const libreriaSelect = document.getElementById('libreria');

let listaObtenerLibreria = [];

let crearSectionLibreria = async () => {

    if (sessionStorage.tipoUsuario == "Adminitrador plataforma") {
        let divCont = document.getElementById('selecttSucursal');
        divCont.className = divCont.className.replace("alertHidden", "");
        listaObtenerLibreria = await obtenerLibrerias();

        libreriaSelect.innerHTML = '';

        let optionElemento = document.createElement('option');
        optionElemento.setAttribute('value', '');
        optionElemento.innerHTML = '--Seleccione una tienda--';
        libreriaSelect.appendChild(optionElemento);

        for (let i = 0; i < listaObtenerLibreria.length; i++) {
            let optionElemento = document.createElement('option');
            optionElemento.setAttribute('value', listaObtenerLibreria[i]._id);
            optionElemento.setAttribute('data-tienda', 'Sucursal');
            optionElemento.innerHTML = listaObtenerLibreria[i].nombreFantasia;
            libreriaSelect.appendChild(optionElemento)
        }
    }
};
crearSectionLibreria();