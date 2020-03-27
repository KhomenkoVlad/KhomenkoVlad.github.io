document.getElementById("create-type").addEventListener("click", function () {
    var selector = document.getElementById("select-type");
    var selectedType = selector[selector.selectedIndex];
    var health = Number(selectedType.getAttribute("data-health"));
    var stamina = Number(selectedType.getAttribute("data-stamina"));
    objectOfMilitaryResource(new MilitaryResource(selectedType.value, health, stamina));
    console.log(selectedType.value, "health:", health, "stamina:", stamina);
});

function objectOfMilitaryResource(object) {
    squad = document.getElementById("squad");
    var military = document.createElement("div");
    military.classList.add("military-resource");
    military.setAttribute("id", object.id);
    squad.append(military);
    featureOfMilitaryResource(military, "health", object.health, object.maxHealth);
    featureOfMilitaryResource(military, "stamina", object.distance, object.maxDistance);
    typeOfMilitaryResource(military, "type-name", object.type);
    picture(military, object.type);
    damageHealth(military, object);
    damageStamina(military, object);
    restore(military, object);
}

function featureOfMilitaryResource(parentElement, _class, width, maxWidth) {
    var el = document.createElement("div");
    el.classList.add(_class);
    el.setAttribute("id", parentElement.getAttribute("id") + _class);
    borderOfElement(parentElement).append(el);
    el.style.cssText = widthOfFeature(width, maxWidth);
}

function borderOfElement(parentElement) {
    var border = document.createElement("div");
    border.classList.add("border");
    return parentElement.appendChild(border);
}

function typeOfMilitaryResource(parentElement, _class, text) {
    var el = document.createElement("div");
    el.classList.add(_class);
    parentElement.append(el);
    el.append(text);
}

function picture(parentElement, type){
    var el = document.createElement("img");
    el.setAttribute("src", type + ".jpg");
    parentElement.append(el);
}

function damageHealth(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-damage-health");
    parentElement.appendChild(button);
    button.append("Damage health");

    document.getElementById(object.id + "-damage-health").addEventListener("click", function () {
        object.damageHealth(10);
        document.getElementById(object.id + "health").style.cssText = widthOfFeature(object.health, object.maxHealth);
        console.log(object.health);
    });
}

function damageStamina(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-damage-stamina");
    parentElement.appendChild(button);
    button.append("Damage stamina");

    document.getElementById(object.id + "-damage-stamina").addEventListener("click", function () {
        object.damageStamina(1);
        document.getElementById(object.id + "stamina").style.cssText = widthOfFeature(object.distance, object.maxDistance);
        console.log(object.distance);
    });
}

function restore(parentElement, object) {
    var button = document.createElement("button");
    button.setAttribute("id", object.id + "-restore");
    parentElement.appendChild(button);
    button.append("Restore");

    document.getElementById(object.id + "-restore").addEventListener("click", function () {
        object.restore();
        document.getElementById(object.id + "stamina").style.cssText = widthOfFeature(object.distance, object.maxDistance);
        document.getElementById(object.id + "health").style.cssText = widthOfFeature(object.health, object.maxHealth);
        console.log(object.distance, object.health);
    });
}

function widthOfFeature(width, maxWidth) {
    return "width: " + (width * 100) / maxWidth + "%";
}