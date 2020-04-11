function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.addEventListener('load', function () {
            resolve(this);
        });
        xhr.addEventListener('error', function () {
            reject(console.log('reject error'));
        }, true);
        xhr.send();
        return xhr;
    });
}

function get(url) {
    return request('GET', url);
}

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