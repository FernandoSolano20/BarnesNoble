let crearGenero = (genero) => {
    var response = fetch('http://localhost:4000/api/genero/registrarGenero', {
        method: "POST",
        body: JSON.stringify(genero),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(
        response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}