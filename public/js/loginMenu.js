if (sessionStorage.conectado) {
    document.getElementById("signIn").remove();
    let logout = document.getElementById('login');
    logout.innerHTML = "";
    logout.innerHTML = `<a href="#"><i class="far fa-sign-out-alt"></i>Cerrar Sesión</a>`;
    logout.id = 'logout';

    let li = document.createElement('li');
    let anchorBurguer = document.createElement('a');
    anchorBurguer.setAttribute('data-menu', 'mostrar-nav-izq');
    li.appendChild(anchorBurguer);

    let iconMenu = document.createElement('i');
    iconMenu.setAttribute('class', 'fas fa-bars');
    iconMenu.setAttribute('data-menu', 'mostrar-nav-izq');
    anchorBurguer.appendChild(iconMenu);
    
    let verticalMenu =  document.getElementById('menuVertical');
    verticalMenu.className = verticalMenu.className + " list-menuLPFour";
    verticalMenu.prepend(li);

    document.getElementById('headerMenu').innerHTML += `<nav class="menuIzquierdo"><ul class="menu" id="menuDinamico"></ul></nav>`;
}