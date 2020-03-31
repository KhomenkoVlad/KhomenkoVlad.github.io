var MilitaryResource = (function () {
    function MilitaryResource(type, health, distance, id) {
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.distance = distance;
        this.maxDistance = distance;
        this.id = Math.random().toString(36); //Создаём строку уникального id
    }

    MilitaryResource.prototype.isReadyToMove = function (askDistance) {
        return this.distance >= askDistance;
    }
    MilitaryResource.prototype.isReadyToFight = function () {
        return this.health > 0;
    }
    MilitaryResource.prototype.restore = function () {
        this.health = this.maxHealth;
        this.distance = this.maxDistance;
    }
    MilitaryResource.prototype.clone = function () {
        return obj = new MilitaryResource(this.type, this.health, this.distance);
    }
    MilitaryResource.prototype.damageHealth = function (damagePercent) {
        var damage = (damagePercent * this.maxHealth) / 100;
        if(this.health < damage){
            return true;
        }
        this.health -= damage;
    }
    MilitaryResource.prototype.damageDistance = function (damagePercent) {
        var damage = (damagePercent * this.maxDistance) / 100;
        if(this.distance < damage){
            return true;
        }
        this.distance -= damage;
    }

    return MilitaryResource;
})();