//Реализовать отображение задания с отрядом в следующем виде

//Выбираем тип персонажа и создаём
document.getElementById("create-type").addEventListener("click", function () {
    var selector = document.getElementById("select-type");
    var selectedType = selector[selector.selectedIndex]; //определяем выбранный тип
    var health = Number(selectedType.getAttribute("data-health")); //Получаем из option в index.html
    var stamina = Number(selectedType.getAttribute("data-stamina"));
    objectOfMilitaryResource(new MilitaryResource(selectedType.value, health, stamina));
});

//Добавляем персонажа на страницу
function objectOfMilitaryResource(object) {
    squad = document.getElementById("squad"); //div в котором будут все персонажи
    var military = document.createElement("div"); //создаём div для персонажа
    military.classList.add("military-resource");
    military.setAttribute("id", object.id); //генерируем уникальный id из объекта MilitaryResource
    squad.append(military); //добавляем персонажа в squad
    featureOfMilitaryResource(military, "health", object.health, object.maxHealth); //очки здоровья
    featureOfMilitaryResource(military, "stamina", object.distance, object.maxDistance); //очки выносливости
    typeOfMilitaryResource(military, "type-name", object.type); //имя, тип
    picture(military, object.type); //картинка
    damageHealth(military, object); //кнопка
    damageStamina(military, object); //кнопка
    restore(military, object); //кнопка
}

//Добавляем очки зздоровья и выносливости
function featureOfMilitaryResource(parentElement, _class, width, maxWidth) {
    var el = document.createElement("div"); //div для полосы состояния характеристики
    el.classList.add(_class);
    el.setAttribute("id", parentElement.getAttribute("id") + _class);
    borderOfFeature(parentElement).append(el); //добавляем в div.border
    el.style.cssText = widthOfFeature(width, maxWidth);
}

//Границы для полосы здоровья или выносливости
function borderOfFeature(parentElement) {
    var border = document.createElement("div");
    border.classList.add("border");
    return parentElement.appendChild(border); //возвращаем div border
}

//Добавляем тип персонажа
function typeOfMilitaryResource(parentElement, _class, text) {
    var el = document.createElement("div");
    el.classList.add(_class); //класс: type-name
    parentElement.append(el);
    el.append(text); //Отображаем текст с типом
}

//Добавляем картинку
function picture(parentElement, type){
    var el = document.createElement("img");
    el.setAttribute("src", type + ".jpg"); //имя файла картинки совпадает с типом персонажа
    parentElement.append(el);
}

//Кнопка отнимает очки здоровья
function damageHealth(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-damage-health");
    parentElement.appendChild(button);
    button.append("Damage health");

    document.getElementById(object.id + "-damage-health").addEventListener("click", function () {
        object.damageHealth(10); //урон 10
        document.getElementById(object.id + "health").style.cssText = widthOfFeature(object.health, object.maxHealth);
    });
}

//Кнопка отнимает очки выносливости
function damageStamina(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-damage-stamina");
    parentElement.appendChild(button);
    button.append("Damage stamina");

    document.getElementById(object.id + "-damage-stamina").addEventListener("click", function () {
        object.damageStamina(1); //минус 1 очко
        document.getElementById(object.id + "stamina").style.cssText = widthOfFeature(object.distance, object.maxDistance);
    });
}

//Кнопка пополняет очки здоровья и выносливости
function restore(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-restore");
    parentElement.appendChild(button);
    button.append("Restore");

    document.getElementById(object.id + "-restore").addEventListener("click", function () {
        object.restore(); //восстановление до максимума
        document.getElementById(object.id + "stamina").style.cssText = widthOfFeature(object.distance, object.maxDistance);
        document.getElementById(object.id + "health").style.cssText = widthOfFeature(object.health, object.maxHealth);
    });
}

//Функция для определения значения в процентном отношенни
function widthOfFeature(width, maxWidth) {
    return "width: " + (width * 100) / maxWidth + "%";
}