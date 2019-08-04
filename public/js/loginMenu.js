if(sessionStorage.conectado){
    document.getElementById("signIn").remove();
    let logout = document.getElementById('login');
    logout.innerHTML = "";
    logout.innerHTML = `<a href="#"><i class="far fa-sign-out-alt"></i>Cerrar Sesión</a>`;
    logout.id = 'logout';
}