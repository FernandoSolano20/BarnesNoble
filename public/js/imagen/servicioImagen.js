
let crearImagen = async (img) => {
    let photo = img.files[0];
    let formData = new FormData();
    formData.append('photo', photo);
    let response = await fetch('http://localhost:4000/api/imagen/crear', {
        method: "POST",
        body: formData
    });
    let result = await response.json();
    return result;
}