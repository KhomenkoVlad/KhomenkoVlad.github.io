var wrapper = document.getElementById('wrapper');
var form = document.getElementById('filter-form');
var backPage = document.getElementById('back-page');
var nextPage = document.getElementById('next-page');

function requestExoplanets(filter) {
    return get('https://api.arcsecond.io/exoplanets/' + filter)
        .then(function (array) {
            var arrayOfExoplanets = JSON.parse(array.responseText);
            arrayOfExoplanets.status == 404 || arrayOfExoplanets.detail
                ? wrapper.innerHTML = arrayOfExoplanets.detail //вывод ошибки
                : getExoplanets(arrayOfExoplanets);
        })
        .catch(function () {
            console.log('catch error');
        });
}

function getExoplanets(arrayOfExoplanets) {
    console.log('getExoplanets: ', arrayOfExoplanets);
    wrapper.innerHTML = '';
    if (arrayOfExoplanets.results) {
        arrayOfExoplanets.results.forEach(function (exoplanet) {
            addExoplanet(exoplanet);
            getNumberPage(arrayOfExoplanets);
        });
    } else {
        addExoplanet(arrayOfExoplanets); //вывод одного найденого элемента
    }
    pageButtons(arrayOfExoplanets);
}

//сохранение ссылки на след. страницу в аттрибутах кнопки
function pageButtons(arrayOfExoplanets) {
    if (arrayOfExoplanets.previous) { //в объекте есть ссылка на пред. страницу
        backPage.setAttribute('data-page', arrayOfExoplanets.previous)
    }
    if (arrayOfExoplanets.next) { //в объекте есть ссылка на след. страницу
        nextPage.setAttribute('data-page', arrayOfExoplanets.next);
    }
}

//вывод номера страницы
function getNumberPage(arrayOfExoplanets) {
    var number = arrayOfExoplanets.next.indexOf('=');
    document.getElementById('page-number').innerHTML = arrayOfExoplanets.next.slice(++number) - 1;
}

//вывод результата при загрузке
window.addEventListener('load', function () {
    requestExoplanets('');
});

//задержка поиска
var inputSearch = debounce(function () {
    requestExoplanets(this.value || '');
}, 200);

//поиск
form.elements.exoplanetName.addEventListener('input', function (e) {
    inputSearch.call(this);
    e.preventDefault();
});

//переключение страниц
backPage.addEventListener('click', function () {
    get(backPage.getAttribute('data-page')).then(function (array) {
        var arrayOfExoplanets = JSON.parse(array.responseText);
        getExoplanets(arrayOfExoplanets);
    });
});
nextPage.addEventListener('click', function () {
    get(nextPage.getAttribute('data-page')).then(function (array) {
        var arrayOfExoplanets = JSON.parse(array.responseText);
        getExoplanets(arrayOfExoplanets);
    });
});
