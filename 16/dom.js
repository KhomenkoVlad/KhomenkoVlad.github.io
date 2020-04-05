function appendProperties(el, props) {
    var classes = props.classes;
    delete props.classes;

    if (classes) {
        el.className = classes.join(' ');
    }

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const value = props[key];
            el.setAttribute(key, value);
        }
    }

    return el;
}

function element(elementName, props, children) {
    var el = document.createElement(elementName);
    (children || []).forEach(function (childElement) {
        el.append(childElement);
    });

    return appendProperties(el, props || {});
}

function createElements(parent) {
    var exoplanetName = element('div', { classes: ['exoplanet-name'] }),
        exoplanetStar = element('div', { classes: ['exoplanet-star'] }),
        exoplanetDiameter = element('div', { classes: ['exoplanet-diameter'] }),
        orbitalPeriod = element('div', { classes: ['exoplanet-period'] }),
        mass = element('div', { classes: ['exoplanet-mass'] }),
        inclination = element('div', { classes: ['exoplanet-inclination'] });
    var card = element('div',
        { classes: ['exoplanet'] },
        [exoplanetName, exoplanetStar, exoplanetDiameter, orbitalPeriod, mass, inclination]);
    parent.append(card);

    return {
        exoplanetName: exoplanetName,
        exoplanetStar: exoplanetStar,
        exoplanetDiameter: exoplanetDiameter,
        orbitalPeriod: orbitalPeriod,
        mass: mass,
        inclination: inclination,
        el: card
    };
}

function addExoplanet(object) {
    var el = createElements(wrapper);
    el.exoplanetName.innerText = 'Название: ' + object.name;
    el.exoplanetStar.innerText = 'Родительская звезда: ' + object.parent_star;
    object.radius
        ? el.exoplanetDiameter.innerText = 'Радиус: ' + object.radius.value + ' от радиуса Юпитера'
        : el.exoplanetDiameter.innerText = 'Радиус: неизвестно';
    object.mass
        ? el.mass.innerText = 'Масса: ' + object.mass.value + ' от массы Юпитера'
        : el.mass.innerText = 'Масса: неизвестно';
    object.orbital_period
        ? el.orbitalPeriod.innerText = 'Период обращения: ' + object.orbital_period.value 
            + ' ' + object.orbital_period.unit
        : el.orbitalPeriod.innerText = 'Период обращения: неизвестно';
    object.inclination
        ? el.inclination.innerText = 'Наклон орбиты: ' + object.inclination.value + object.inclination.unit
        : el.inclination.innerText = 'Наклон орбиты: неизвестно';
}