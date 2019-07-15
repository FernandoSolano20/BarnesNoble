
if (!sessionStorage.tipoUsuario) {
    window.location.href = "http://localhost:3000";
}
else if (sessionStorage.tipoUsuario !== 'Lector') {
    if (sessionStorage.tipoUsuario === 'Adminitrador librería') {
        window.location.href = "http://localhost:3000/indexAdminLibreria.html";
    }
    else if (sessionStorage.tipoUsuario === 'Adminitrador plataforma') {
        window.location.href = "http://localhost:3000/indexPlataforma.html";
    }
}
