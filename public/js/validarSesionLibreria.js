
if (!sessionStorage.tipoUsuario) {
    window.location.href = "http://localhost:3000";
}
else if (sessionStorage.tipoUsuario !== 'Adminitrador librería') {
    if (sessionStorage.tipoUsuario === 'Lector') {
        window.location.href = "http://localhost:3000/indexLector.html";
    }
    else if (sessionStorage.tipoUsuario === 'Adminitrador plataforma') {
        window.location.href = "http://localhost:3000/indexPlataforma.html";
    }
}
