let obtenerInformacionLibro = async function () {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    let libro = await obtenerLibrosId(id);
    if (libro.success) {
        document.getElementById('titulo').innerHTML = libro.listaLibro.titulo;
        document.getElementById('caratula').src = libro.listaLibro.caratula;
        document.getElementById('contraportada').src = libro.listaLibro.contraportada;
        document.getElementById('autor').innerHTML = libro.listaLibro.autor.nombre;
        // document.getElementById('resenna').innerHTML = libro.listaLibro.autor.resenna;
        // document.getElementById('fechaNacimiento').innerHTML = libro.listaLibro.autor.fechaNacimiento;
        // document.getElementById('fechaMuerte').innerHTML = libro.listaLibro.autor.fechaMuerte;
        document.getElementById('nombreArtistico').innerHTML = libro.listaLibro.autor.nombreArtistico;
        // document.getElementById('nacionalidad').innerHTML = libro.listaLibro.autor.nacionalidad;
        // document.getElementById('lugarNacimiento').innerHTML = libro.listaLibro.autor.lugarNacimiento;
        document.getElementById('fotoAutor').src = libro.listaLibro.autor.foto;
        document.getElementById('annoEdicion').innerHTML = libro.listaLibro.annoEdicion;
        document.getElementById('categoria').innerHTML = libro.listaLibro.categoria.nombre;
        document.getElementById('genero').innerHTML = libro.listaLibro.genero.nombre;
        document.getElementById('edicion').innerHTML = libro.listaLibro.edicion;
        document.getElementById('editorial').innerHTML = libro.listaLibro.editorial;
        document.getElementById('isbn10').innerHTML = libro.listaLibro.isbn_10;
        document.getElementById('isbn13').innerHTML = libro.listaLibro.isbn_13;
        document.getElementById('precio').innerHTML = libro.listaLibro.precio;
        animationVotes();
    }
}

obtenerInformacionLibro();