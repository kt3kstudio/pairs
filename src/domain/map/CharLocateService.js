

/**
 * @class
 * MaLocateService class provide the functionality to move character among the doors in a floor.
 */
domain.map.CharLocateService = (function () {
    'use strict';

    var exports = function (wall, chr) {
        this.wall = wall;
        this.chr = chr;
        this.charPosRepo = new datadomain.CharPositionRepository();
    };

    var clsPt = exports.prototype;

    clsPt.charAppear = function () {
        var wo = this.wall.findDoorByLevel(this.position.level);

        var x = wo.centerX();
        var y = wo.centerY();

        this.chr.x = x;
        this.chr.y = y;

        return this.chr.appear();
    };

    clsPt.moveToDoorByLevel = function (level) {
        return this.moveToDoor(this.wall.findDoorByLevel(level));
    };

    clsPt.moveToDoor = function (wo) {
        var that = this;

        this.position.level = wo.level;
        this.charPosRepo.setCharPosition(this.chr.name, this.position);

        var goOutDur = 400;
        var moveOnCorridor = 1000;
        var goIntoDur = 400;

        var goOutDistance = 80;

        if (!that.wall.visible(this.chr)) {
            that.wall.scrollSet(this.current.centerX());
        }

        return this.chr.moveTo('y', this.wall.groundLevel + goOutDistance, goOutDur).then(function () {

            that.wall.scrollTo(wo.centerX(), moveOnCorridor);

            return that.chr.moveTo('x', wo.centerX(), moveOnCorridor);

        }).then(function () {

            return that.chr.moveTo('y', wo.centerY(), goIntoDur);

        }).then(function () {

            that.current = wo;

            return that.chr.turn('down');

        });
    };

    clsPt.getIntoDoor = function () {
        this.chr.turn('up');

        return this.chr.disappear();
    };

    clsPt.load = function () {
        var that = this;

        return this.charPosRepo.getCharPosition(this.chr.name).then(function (position) {
            that.position = position;

            return that;
        });
    };

    return exports;

}());
