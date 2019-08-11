let carritoLibrosContainer = document.getElementById('carritoLibros');
let removeCard = function (event) {
    element = event.target;
    idCard = element.getAttribute('data-id');
    var containerCard = document.getElementById(idCard);
    if ((containerCard.parentElement.childElementCount - 2) == 0) {
        containerCard.parentElement.remove();
    }
    else {
        containerCard.remove();
    }
    removerCarrito(idCard);
    filaNoDatos();
}

let mostarCarrito = function () {
    var listaLibrosCarrito = allStorage();
    let carritoHTML = ``;
    for (let i = 0; i < listaLibrosCarrito.length; i++) {
        carritoHTML += `<div class="basket-card--container"><h2>${listaLibrosCarrito[i].tienda[0].nombre}</h2>`;
        let total = 0;
        for (let j = 1; j < listaLibrosCarrito[i].tienda.length; j++) {
            carritoHTML += `<div class="info-container" id="${listaLibrosCarrito[i].tienda[0].idtienda}-${listaLibrosCarrito[i].tienda[j].idEjemplar}">
                                <div class="card-info">
                                    <img class="image" src="${listaLibrosCarrito[i].tienda[j].img}">
                                    <div class="info">
                                        <div class="name">${listaLibrosCarrito[i].tienda[j].titulo}</div>
                                        <div class="other-info">
                                            <div class="amount">${listaLibrosCarrito[i].tienda[j].tipo}</div>
                                            <div class="basket-price">${Number(listaLibrosCarrito[i].tienda[j].precio)*Number(listaLibrosCarrito[i].tienda[j].cantidad)}</div>
                                        </div>
                                    </div>
                                    <button class="fa fa-close remove" data-id="${listaLibrosCarrito[i].tienda[0].idtienda}-${listaLibrosCarrito[i].tienda[j].idEjemplar}"></button>
                                </div>
                                <div class="quantity-buttons">
                                    <input type="text" value="${listaLibrosCarrito[i].tienda[j].cantidad}" class="input quanity-input" />
                                </div>
                            </div>`;
                            total += Number(listaLibrosCarrito[i].tienda[j].precio)*Number(listaLibrosCarrito[i].tienda[j].cantidad);
        }
        carritoHTML += `<div class="subcontenedor" id="compra"><div class="crear-contenedor">
                            <button type="button" class="material-blue" data-action="crear" id="crear-elemento">
                                <i class="far fa-shopping-cart"></i>Comprar
                            </button>
                        </div>
                        <p id="total">Total:<span id="totalValor">${total}</span></p>
                        </div>
                        </div>`;
    }
    document.getElementById('carritoLibros').innerHTML = carritoHTML;
    filaNoDatos();
    var cardsElements = document.getElementsByClassName("remove");
    Array.from(cardsElements).forEach((ele) => ele.addEventListener('click', removeCard));
}

let filaNoDatos = function () {
    if (!carritoLibrosContainer.childElementCount) {
        let carritoHTML = '';
        carritoHTML += `<div class="basket-card--container"><h2>No hay libros </h2>`;
        carritoHTML += `<div class="info-container">
                                <div class="card-info">
                                    <img class="image">
                                    <div class="info">
                                        <div class="name">No hay libros en el carrito de compras</div>
                                        <div class="other-info">
                                            <div class="amount"></div>
                                            <div class="basket-price"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="quantity-buttons">
                                </div>
                            </div>`;
        carritoHTML += `</div>`;
        document.getElementById('carritoLibros').innerHTML = carritoHTML;
    }
}

mostarCarrito();

let removerCarrito= function(idCard){
    idCard = idCard.split("-");
    let ejemplarLibreria = JSON.parse(localStorage.getItem(idCard[0]));
    ejemplarLibreria = ejemplarLibreria.filter(number => number.idEjemplar !== idCard[1])
    if(ejemplarLibreria.length-1){
        localStorage.setItem(idCard[0], JSON.stringify(ejemplarLibreria));
    }
    else{
        localStorage.removeItem(idCard[0]);
    }
    allStorage();
    let carritoNumber = document.getElementById('numCarrito');
    carritoNumber.dataset.count = countBooksCart;
}