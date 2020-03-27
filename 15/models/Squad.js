var Squad = (function () {
    function Squad(defaultResources) {
        this.squad = [];
        if (defaultResources) this.combineResources(defaultResources);
    }

    Squad.prototype.areReadyToMove = function (askDistance) {
        for (var i = 0; i < this.squad.length; i++) {
            return this.squad[i].isReadyToMove(askDistance);
        }
    }
    Squad.prototype.areReadyToFight = function () {
        console.log( this.squad);
        for (var i = 0; i < this.squad.length; i++) {
            return this.squad[i].isReadyToFight();
        }
    }
    Squad.prototype.restoreAll = function () {
        for (let i = 0; i < this.squad.length; i++) {
            this.squad[i].restore();
        }
    }
    Squad.prototype.getReadyToMoveResources = function (askDistance) {
        return this.squad.filter(function (element) { 
            return element.isReadyToMove(askDistance);
        });
    }
    Squad.prototype.combineResources = function (defaultResources) {
        var self = this.squad;
        defaultResources.forEach(function(element){
            Array.prototype.push.call(self, element);
        });
    }
    Squad.prototype.cloneResource = function () {
        return obj = new Squad(this.squad);
    }

    return Squad;
})();