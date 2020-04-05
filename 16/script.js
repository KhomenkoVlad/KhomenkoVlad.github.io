var wrapper = document.getElementById('wrapper');
var form = document.getElementById('filter-form');
var backPage = document.getElementById('back-page');
var nextPage = document.getElementById('next-page');

function requestExoplanets(filter) {
    get('https://api.arcsecond.io/exoplanets/' + filter, function (arrayOfExoplanets) {
        getExoplanets(arrayOfExoplanets);
    });
}

function getExoplanets(arrayOfExoplanets) {
    console.log('getExoplanets: ', arrayOfExoplanets);
    wrapper.innerHTML = '';
    if (arrayOfExoplanets.results) {
        arrayOfExoplanets.results.forEach(function (exoplanet) {
            addExoplanet(exoplanet);
        });
    } else {
        notFoundArrayOfExoplanets(arrayOfExoplanets);
    }
    pageButtons(arrayOfExoplanets);
    getNumberPage(arrayOfExoplanets);
}

//если не получен массив объектов (arrayOfExoplanets.results)
function notFoundArrayOfExoplanets(arrayOfExoplanets) {
    arrayOfExoplanets.detail
        ? wrapper.innerHTML = arrayOfExoplanets.detail //вывод ошибки
        : addExoplanet(arrayOfExoplanets); //вывод одного найденого элемента
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
function getNumberPage(arrayOfExoplanets){
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
    get(backPage.getAttribute('data-page'), function (arrayOfExoplanets) {
        getExoplanets(arrayOfExoplanets);
    });
});
nextPage.addEventListener('click', function () {
    get(nextPage.getAttribute('data-page'), function (arrayOfExoplanets) {
        getExoplanets(arrayOfExoplanets);
    });
});




