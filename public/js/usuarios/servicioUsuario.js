// Listar Usuarios

let obtenerUsuarios = async() => {
    //try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarUsuarios',
            responseType: 'json'
        });

        var result = await response.data.listaUsuarios;

        return result;

    // } catch (error) {
    //     console.log(error);
    // }
};
