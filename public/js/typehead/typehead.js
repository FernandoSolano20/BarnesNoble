var prevValue;
var SearchBox = function () {
    var valueToSearch;
    var response;
    var regex;


    var requestApi = debounce(function (event) {
        valueToSearch = document.getElementById("input-filtro").value.trim();
        var url;
        regex = new RegExp(valueToSearch, 'i');
        if (prevValue !== valueToSearch) {
            if (valueToSearch && event.keyCode !== 13) {
                url = "http://localhost:4000/api/libros/titulo/" + valueToSearch + "";
                xmlHttpRequest(url);
            }
            else {
                deleteListOfSuggestion();
                deleteSuggestionWriter();
            }
        }
    }, 250);

    var xmlHttpRequest = function (url) {
        var xmlhttp = new XMLHttpRequest();
        response = {};
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(xmlhttp.responseText);
                showResponses();
            }
            else if (this.status === 404 && this.readyState === 2) {
                var labelCont = document.getElementById("changePlaceholder");
                labelCont.textContent = "";
                handleError();
            }
            else if (this.status !== 0) {
                var labelCont = document.getElementById("changePlaceholder");
                labelCont.textContent = "";
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.onerror = handleError;
        xmlhttp.send();
    }

    var handleError = function () {
        alert('An error occurred \uD83D\uDE1E');
    }

    var showResponses = function () {
        orderElements();
        sugggestionWriter();
        createSuggestionInDOM();
    }

    var orderElements = function () {
        var objLength = response.listaLibro.length;
        var index2, temporal;
        var elementTemporal;

        for (var index1 = 1; index1 < objLength; index1++) {
            index2 = index1;
            temporal = response.listaLibro[index1];
            elementTemporal = temporal.titulo.search(regex);
            elementTemporal = elementTemporal >= 0 ? elementTemporal : 1000;
            nextElement = response.listaLibro[index2 - 1].titulo.search(regex);
            nextElement = nextElement >= 0 ? nextElement : 1000;

            while (index2 > 0 && nextElement > elementTemporal) {
                response.listaLibro[index2] = response.listaLibro[index2 - 1];
                index2--;
                if (index2 > 0) {
                    nextElement = response.listaLibro[index2 - 1].titulo.search(regex);
                    nextElement = nextElement >= 0 ? nextElement : 1000;
                }
            }
            response.listaLibro[index2] = temporal;
        }
    }

    var sugggestionWriter = function () {
        prevValue = valueToSearch;
        var labelCont = document.getElementById("changePlaceholder");
        if (response.listaLibro[0].titulo.search(regex) != 0) {
            var deleteCharacters = response.listaLibro[0].titulo.split(regex);
            delete deleteCharacters[0];
            var replaceCharacters = deleteCharacters.join(valueToSearch);
        }
        else {
            var replaceCharacters = response.listaLibro[0].titulo.replace(regex, valueToSearch);
        }
        labelCont.textContent = replaceCharacters;
    }

    var deleteSuggestionWriter = function () {
        document.getElementById("changePlaceholder").textContent = "";
    }

    var createSuggestionInDOM = function () {
        var containerList = document.getElementById("container");
        deleteListOfSuggestion();

        var ul = document.createElement('ul');
        ul.setAttribute('id', 'listResult');
        ul.setAttribute('tabindex', '0');
        containerList.appendChild(ul);

        for (var index = 0; index < response.listaLibro.length; index++) {
            if (response.listaLibro[index].titulo.search(regex) === -1) {
                break;
            }
            else {
                var li = document.createElement('li');
                li.setAttribute('class', 'elements');
                li.setAttribute('data-id', response.listaLibro[index]._id);
                li.addEventListener("click", setElementInBox);
                li.innerHTML = response.listaLibro[index].titulo.replace(regex, valueToSearch.bold());
                ul.appendChild(li);
            }
        }
        ul.firstChild.className += " elementHover";
    }

    var setElementInBox = function () {
        for (var index = 0; index < event.path.length; index++) {
            if (event.path[index].nodeName === "LI") {
                document.getElementById("input-filtro").value = event.path[index].textContent;
                deleteListOfSuggestion();
                deleteSuggestionWriter();
                break;
            }
        }
    }

    var deleteListOfSuggestion = function () {
        var ulExist = document.getElementById("listResult");

        if (ulExist) {
            ulExist.parentNode.removeChild(ulExist);
        }
    }

    var selectElement = function () {
        var ulExist = document.getElementById("listResult");
        if (ulExist) {
            var actualLI = document.getElementsByClassName("elementHover")[0];
            if (event.keyCode === 40) {
                ulExist.scrollBy(0, (actualLI.scrollHeight));
                var nextLI = actualLI.nextElementSibling;
                actualLI.classList.remove("elementHover");
                if (!nextLI) {
                    nextLI = document.getElementById("listResult").firstElementChild;
                    ulExist.scrollTo(0, 0);
                }
                nextLI.className += " elementHover";
            }
            else if (event.keyCode === 38) {
                ulExist.scrollBy(0, -(actualLI.scrollHeight));
                var previousLI = actualLI.previousElementSibling;
                actualLI.classList.remove("elementHover");
                if (!previousLI) {
                    ulExist.scrollTop = ulExist.scrollHeight;
                    previousLI = document.getElementById("listResult").lastElementChild;
                }
                previousLI.className += " elementHover";
                event.preventDefault();
            }
            else if (event.keyCode === 13) {
                prevValue = "";
                document.getElementById("input-filtro").value = actualLI.textContent;
                event.preventDefault();
            }
        }
    }

    var attachEvents = function () {
        var search = document.getElementById("input-filtro");
        search.addEventListener("keydown", selectElement);
        search.addEventListener("keyup", function () { requestApi(event) });
    }
    return {
        attachEvents: attachEvents
    }
};

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var searchBox = SearchBox();
searchBox.attachEvents();