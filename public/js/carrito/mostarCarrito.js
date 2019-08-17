let carritoLibrosContainer = document.getElementById('carritoLibros');
let removeCard = function (event) {
    var element = event.target;
    var idCard;
    if(element){
        idCard = element.getAttribute('data-id');
    }else{
        idCard = event;
    }
    var containerCard = document.getElementById(idCard);
    if ((containerCard.parentElement.childElementCount - 3) == 0) {
        containerCard.parentElement.remove();
    }
    else {
        containerCard.remove();
    }
    removerCarrito(idCard);
    filaNoDatos();
}

let comprar = async (event) => {
    let element = event.target;
    let idLibreria = element.getAttribute('id');
    let compras = localStorage.getItem(idLibreria);
    compras = JSON.parse(compras);
    let err = [];
    if (compras[0].tienda == "libreria") {
        for (let i = 1; i < compras.length; i++) {
            let compra = {
                idLibreria: compras[0].idtienda,
                idUsuario: sessionStorage.id,
                cantidad: document.getElementById("input" + compras[0].idtienda + "" + compras[i].idEjemplar).value,
                ejemplar: compras[i].idEjemplar
            }
            let response = await comprarLibroEnLibreria(compra);
            if (response.success)
                removeCard(compras[0].idtienda + "-" + compras[i].idEjemplar);
            err.push(response);
        }
        var error = false;
        var index = 0;
        for (let i = 0; i < err.length; i++) {
            if (!err[i].success) {
                error = true;
                index = i;
            }
        }
        if (!error) {
            Swal.fire({
                type: 'success',
                title: err[0].message
            });
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'Ocurrio un error en la compra de los libros',
                text: err[index].message
            });
        }
    } else if (compras[0].tienda == "sucursal") {
        for (let i = 1; i < compras.length; i++) {
            let compra = {
                idSucursal: compras[0].idtienda,
                idUsuario: sessionStorage.id,
                cantidad: document.getElementById("input" + compras[0].idtienda + "" + compras[i].idEjemplar).value,
                ejemplar: compras[i].idEjemplar
            }
            let response = await comprarLibroEnSucursal(compra);
            if (response.success)
                removeCard(compras[0].idtienda + "-" + compras[i].idEjemplar);
            err.push(response);
        }
        var error = false;
        var index = 0;
        for (let i = 0; i < err.length; i++) {
            if (!err[i].success) {
                error = true;
                index = i;
            }
        }
        if (!error) {
            Swal.fire({
                type: 'success',
                title: err[0].message
            });
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'Ocurrio un error en la compra de los libros',
                text: err[index].message
            });
        }
    }
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
                                            <div class="basket-price">${Number(listaLibrosCarrito[i].tienda[j].precio) * Number(listaLibrosCarrito[i].tienda[j].cantidad)}</div>
                                        </div>
                                    </div>
                                    <button class="fa fa-close remove" data-id="${listaLibrosCarrito[i].tienda[0].idtienda}-${listaLibrosCarrito[i].tienda[j].idEjemplar}"></button>
                                </div>
                                <div class="quantity-buttons">
                                    <input id="input${listaLibrosCarrito[i].tienda[0].idtienda}${listaLibrosCarrito[i].tienda[j].idEjemplar}" type="text" value="${listaLibrosCarrito[i].tienda[j].cantidad}" class="input quanity-input" />
                                </div>
                            </div>`;
            total += Number(listaLibrosCarrito[i].tienda[j].precio) * Number(listaLibrosCarrito[i].tienda[j].cantidad);
        }
        carritoHTML += `<div class="subcontenedor" id="compra"><div class="crear-contenedor">
                            <button type="button" class="material-blue" data-action="comprar" id="${listaLibrosCarrito[i].tienda[0].idtienda}">
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
    var btnComprar = document.querySelectorAll("[data-action='comprar']");
    Array.from(cardsElements).forEach((ele) => ele.addEventListener('click', removeCard));
    Array.from(btnComprar).forEach((ele) => ele.addEventListener('click', comprar));
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

let removerCarrito = function (idCard) {
    idCard = idCard.split("-");
    let ejemplarLibreria = JSON.parse(localStorage.getItem(idCard[0]));
    ejemplarLibreria = ejemplarLibreria.filter(number => number.idEjemplar !== idCard[1])
    if (ejemplarLibreria.length - 1) {
        localStorage.setItem(idCard[0], JSON.stringify(ejemplarLibreria));
    }
    else {
        localStorage.removeItem(idCard[0]);
    }
    allStorage();
    let carritoNumber = document.getElementById('numCarrito');
    carritoNumber.dataset.count = countBooksCart;
}