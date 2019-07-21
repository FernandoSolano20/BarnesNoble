
var crearImagen = async (img) => {
    var photo = img.files[0];
    var formData = new FormData();
    formData.append('photo', photo);
    var response = await fetch('http://localhost:4000/api/imagen/crear', {
        method: "POST",
        body: formData
    });
    var result = await response.json();
    return result;
}