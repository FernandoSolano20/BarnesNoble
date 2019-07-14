let mostarMenuIzquierdo = (event) => {
    let element = event.target;
    let nav = document.querySelector('.menuIzquierdo');
    if(element.getAttribute("data-menu") == 'mostrar-nav-izq'){
        if(nav.classList[1] == 'mostrar'){
            nav.className = nav.className.replace(' mostrar','');
        }else{
            nav.className = nav.className + ' mostrar';
        }
    }else if(!element.offsetParent || !(element.offsetParent.classList[0] == 'menuIzquierdo')){
        nav.className = nav.className.replace(' mostrar','');
    }
}

document.querySelector('body').addEventListener('click', mostarMenuIzquierdo);