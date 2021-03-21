window.addEventListener('load', () => {
    const inputField = document.getElementsByClassName('main-form__input');
    const dateInput = document.getElementsByClassName('main-form__input-birthday');
    const birthdayWarning = document.getElementById('birthday-invalid-warning');

    firstFocusOfInputs(inputField);
    showBirthdayInputWarning(dateInput, birthdayWarning);
    checkValidFormByClick(inputField, dateInput, birthdayWarning);
    showValidGenderInputs();
    openAndCloseAdvertise();
    modalPageInit();
});

//Если после первого фокуса поля ввода не валидное значение 
//или пусто - применяется стиль согласно класу 'has-first-focus'
function firstFocusOfInputs(inputField) {
    for (const el of inputField) {
        el.addEventListener('blur', () => {
            el.classList.add('has-first-focus');
        }, true);
    }
}

//Показать или убрать предупреждение у поля ввода дня рождения
function showBirthdayInputWarning(dateInput, birthdayWarning) {
    for (const el of dateInput) {
        el.addEventListener('focus', () => {
            birthdayWarning.classList.remove('main-form__invalid-warning_visible');
        });
        el.addEventListener('blur', () => {
            if (!checkValidBirthdayInputs(dateInput)) {
                birthdayWarning.classList.add('main-form__invalid-warning_visible');
            }
        }, true);
    }
}

//Проверка на наличие первого фокуса на полях ввода дня рождения и валидны ли таковы
function checkValidBirthdayInputs(dateInput) {
    let areBirthdayInputsValid = true;
    for (const el of dateInput) {
        if (el.classList.contains('has-first-focus') && !el.checkValidity()) {
            areBirthdayInputsValid = false;
        }
    }
    return areBirthdayInputsValid;
}

//При клике на выбор пола убирается предупреждение и стиль
function showValidGenderInputs() {
    const genderWarning = document.getElementById('gender-invalid-warning');
    const genderInputLabels = document.getElementsByClassName('main-form__radio-label');
    const genderInputs = document.getElementsByName('gender');
    for (const el of genderInputLabels) {
        el.addEventListener('click', () => {
            genderInputs.forEach(element => {
                element.classList.remove('main-form__radio_invalid');
            });
            genderWarning.classList.remove('main-form__invalid-warning_visible');
        });
    }
}

//При клике на кнопку отправки проверяются все поля формы
function checkValidFormByClick(inputField, dateInput, birthdayWarning) {
    const submit = document.getElementById('form-button-submit');
    const genderWarning = document.getElementById('gender-invalid-warning');
    const genderInputs = document.getElementsByName('gender');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        for (const el of inputField) {
            el.classList.add('has-first-focus');
        }
        if (!checkValidBirthdayInputs(dateInput)) {
            birthdayWarning.classList.add('main-form__invalid-warning_visible');
        }
        if (!genderInputs[0].checked && !genderInputs[1].checked) {
            genderInputs.forEach(element => {
                element.classList.add('main-form__radio_invalid');
            });
            genderWarning.classList.add('main-form__invalid-warning_visible');
        }
    });
}

//Открытие и закрытие окна рекламы
function openAndCloseAdvertise() {
    const adLink = document.getElementById('advertise-link');
    const adLayer = document.getElementById('advertise-layer');
    const adCloser = document.getElementById('advertise-closer');
    adLink.addEventListener('click', (e) => {
        adLayer.style.visibility = 'visible';
        e.preventDefault();
    });
    adCloser.addEventListener('click', () => {
        adLayer.style.visibility = 'hidden';
    });
}

//Открытие и закрытие модального окна
function modalPageInit() {
    const documentContent = document.getElementById('content');
    const modalPage = document.getElementById('modal-page');
    const modalPageLinks = document.getElementsByClassName('modal-page-link');

    let cssIframeLink = document.createElement("link");
    cssIframeLink.href = "./assets/iframe-style.css";
    cssIframeLink.rel = "stylesheet";
    cssIframeLink.type = "text/css";

    for (const el of modalPageLinks) {
        const modalPagePath = el.href;
        el.addEventListener('click', (e) => {
            modalPageLoad(modalPagePath, cssIframeLink);
            window.scrollTo(0, 0);

            modalPage.style.display = 'block';
            document.body.style.overflow = 'hidden';
            documentContent.style.display = 'none';
            modalPage.style.minHeight = '100%';

            e.preventDefault();
        });
    }
    const modalPageCloser = document.getElementById('modal-page__closer');
    modalPageCloser.addEventListener('click', () => {
        modalPage.style.display = 'none';
        document.body.style.overflow = 'auto';
        documentContent.style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    });
}

//Наполнение модального окна контентом и стилями
function modalPageLoad(modalPagePath, cssIframeLink) {
    fetch(modalPagePath)
        .then(response => response.text())
        .then(data => {
            const iframe = document.getElementById('modal-iframe');
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.body.innerHTML = data;
            iframeDocument.head.appendChild(cssIframeLink);
        });
}