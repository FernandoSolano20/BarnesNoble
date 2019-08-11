let arrayEjemplar = []
let obtenerInformacionLibro = async function () {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    let libro = await obtenerLibrosId(id);
    if (libro.success) {

        if (sessionStorage.tipoUsuario != 'Adminitrador plataforma') {
            let divButton = document.getElementById('contenedorBotonCompra');

            let btnCompra = document.createElement('button');
            btnCompra.setAttribute('type', 'button');
            btnCompra.setAttribute('class', 'material-blue');
            btnCompra.addEventListener('click',modalComprarLibroBarnesNoble);
            btnCompra.setAttribute('data-libro', libro.listaLibro._id);
            divButton.appendChild(btnCompra);

            let label = document.createTextNode((sessionStorage.tipoUsuario == 'Lector'? 'Agregar a carrito':'Comprar'));
            btnCompra.appendChild(label);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-plus-circle');
            btnCompra.insertBefore(icon, label);
        }

        let ejemplares = await obtenerEjemplaresPorIdLibro(id);
        if (ejemplares.success) {
            document.getElementById('titulo').innerHTML = libro.listaLibro.titulo;
            document.getElementById('caratula').src = libro.listaLibro.caratula;
            document.getElementById('contraportada').src = libro.listaLibro.contraportada;
            document.getElementById('autor').innerHTML = libro.listaLibro.autor.nombre;
            document.getElementById('perfilAutor').href = "verPerfilAutor.html?_id=" + libro.listaLibro.autor._id;

            document.getElementById('nombreArtistico').innerHTML = libro.listaLibro.autor.nombreArtistico;
            document.getElementById('fotoAutor').src = libro.listaLibro.autor.foto;
            document.getElementById('categoria').innerHTML = libro.listaLibro.categoria.nombre;
            document.getElementById('genero').innerHTML = libro.listaLibro.genero.nombre;

            let radioTipoLibro = document.getElementById('tipoLibro');
            let infoLibro = document.getElementById('infoLibro');
            ejemplares = ejemplares.listaLibros;
            for (let i = 0; i < ejemplares.length; i++) {
                let input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'id');
                input.setAttribute('id', 'input' + i);
                input.setAttribute('value', i);
                input.addEventListener('change', changeText);
                radioTipoLibro.appendChild(input);

                let label = document.createElement('label');
                label.setAttribute('for', 'input' + i);
                label.setAttribute('class', 'labelRadio');
                label.innerText = ejemplares[i].tipo;
                radioTipoLibro.appendChild(label);

                arrayEjemplar[i] = `<div><span><i class="fas fa-newspaper"></i>Edición:</span><p id="edicion">${ejemplares[i].edicion}</p>
            </div>
            <div>
                <span><i class="fas fa-newspaper"></i>Editorial:</span>
                <p id="editorial">${ejemplares[i].editorial}</p>
            </div>
            <div>
                <span><i class="far fa-book"></i>ISBN:</span>
                <p id="isbn10">${ejemplares[i].isbn10}</p>
            </div>
            <div>
                <span><i class="far fa-book"></i>ISBN:</span>
                <p id="isbn13">${ejemplares[i].isbn13}</p>
            </div>
            <div>
                <span><i class="far fa-money-bill"></i>Precio:</span>
                <p id="precio">${ejemplares[i].precio}</p>
            </div>
            <div>
                <span><i class="far fa-calendar-week"></i>Año de edición:</span>
                <p id="annoEdicion">${ejemplares[i].annoEdicion}</p>
            </div>`
            }
            let firstInput = document.getElementById("input0")
            if (firstInput)
                firstInput.checked = true;

            if (arrayEjemplar[0])
                infoLibro.innerHTML = arrayEjemplar[0];
            animationVotes();
        }
    }
}

let changeText = function (event) {
    document.getElementById('infoLibro').innerHTML = arrayEjemplar[event.target.value];
}

obtenerInformacionLibro();