

let registrarAutor = (pnombre, pnomArtistico, pnacionalidad, pnacimento, pmuerte, presenna, pestado) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrarAutor',
        responseType: 'json',
        data: {
            nombre: pnombre,
            nombreArtistico: pnomArtistico,
            nacimiento: pnacimento,
            nacionalidad: pnacionalidad,
            muerte: pmuerte,
            resenna: presenna,
            estado: pestado
        }
    });
};



let obtenerAutores = async () => {
    let response = await fetch('http://localhost:4000/api/autor/listarAutores', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
    let result = await response.json();
    return result.listaAutores;
}