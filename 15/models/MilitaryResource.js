var MilitaryResource = (function () {
    function MilitaryResource(type, health, distance, id) {
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.distance = distance;
        this.maxDistance = distance;
        this.id = Math.random().toString(36);
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
    MilitaryResource.prototype.damageHealth = function (damage) {
        if(this.health > damage){
            this.health -= damage;
        } else {
            this.health = 0;
        }
    }
    MilitaryResource.prototype.damageStamina = function (damage) {
        if(this.distance > damage){
            this.distance -= damage;
        } else {
            this.distance = 0;
        }
    }

    return MilitaryResource;
})();