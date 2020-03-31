// Основываясь на предыдущем задании добавить следующий функционал:
//     При нажатии на красную полоску уменьшать количество жизни на 10%
//         Если уровень жизни упал ниже 0 - удалить карточку
//     При нажатии на желтую полоску уменьшать количество выносливости на 10%
//         При падении выносливости ниже 0 - добавлять карточке серый фон


//Выбираем тип персонажа и создаём
document.getElementById("create-type").addEventListener("click", function () {
    var selector = document.getElementById("select-type");
    var selectedType = selector[selector.selectedIndex]; 
    var health = Number(selectedType.getAttribute("data-health")); 
    var stamina = Number(selectedType.getAttribute("data-stamina"));
    renderMilitaryResource(new MilitaryResource(selectedType.value, health, stamina));
});

//Добавляем персонажа на страницу
function renderMilitaryResource(object) {
    squad = document.getElementById("squad"); 
    var military = document.createElement("div"); 
    military.classList.add("military-resource");
    military.setAttribute("id", object.id); 
    squad.append(military);
    addHealthIndicator(military, object); 
    addDistanceIndicator(military, object); 
    addTypeName(military, object.type); 
    addPicture(military, object.type); 
}

//Добавляем очки здоровья
function addHealthIndicator(parentElement, object) {
    var indicator = document.createElement("div"); 
    indicator.classList.add("health");
    indicator.setAttribute("id", object.id + "-health");
    addBorderOfIndicator(parentElement, "health").append(indicator); 
    indicator.style.cssText = widthOfFeature(object.health, object.maxHealth);

    document.getElementById(object.id + "-border-health").addEventListener("click", function () {
        if(object.damageHealth(10)){
            parentElement.remove();
        } else{
            document.getElementById(object.id + "-health").style.cssText = widthOfFeature(object.health, object.maxHealth);
        }
    });
}

//Добавляем очки выносливости
function addDistanceIndicator(parentElement, object) {
    var indicator = document.createElement("div"); 
    indicator.classList.add("distance");
    indicator.setAttribute("id", object.id + "-distance");
    addBorderOfIndicator(parentElement, "distance").append(indicator); 
    indicator.style.cssText = widthOfFeature(object.distance, object.maxDistance);

    document.getElementById(object.id + "-border-distance").addEventListener("click", function () {
        if(object.damageDistance(10)){
            document.getElementById(object.id).style.cssText = "background-color: gray;"
        } else{
            document.getElementById(object.id + "-distance").style.cssText = widthOfFeature(object.distance, object.maxDistance);
        }
    });
}

//Границы для полосы здоровья или выносливости
function addBorderOfIndicator(parentElement, _class) {
    var border = document.createElement("div");
    border.classList.add("border");
    border.setAttribute("id", parentElement.getAttribute("id") + "-border-" + _class);
    return parentElement.appendChild(border); 
}

//Добавляем тип персонажа
function addTypeName(parentElement, text) {
    var typeName = document.createElement("div");
    typeName.classList.add("type-name"); 
    parentElement.append(typeName);
    typeName.append(text); 
}

//Добавляем картинку
function addPicture(parentElement, typeName){
    var picture = document.createElement("img");
    picture.setAttribute("src", typeName + ".png"); 
    parentElement.append(picture);
}

//Функция для определения значения в процентном отношенни
function widthOfFeature(width, maxWidth) {
    return "width: " + (width * 100) / maxWidth + "%";
}