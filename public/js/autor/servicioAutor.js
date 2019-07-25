let registrarAutor = async (autor) => {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/autor/registrarAutor',
        responseType: 'json',
        data: autor
    });
    return response.data;
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
