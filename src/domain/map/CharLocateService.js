

/**
 * @class
 * MaLocateService class provide the functionality to move character among the doors in a floor.
 */
domain.map.CharLocateService = (function () {
    'use strict';

    var exports = function (wall, chr) {
        this.wall = wall;
        this.chr = chr;
    };

    var clsPt = exports.prototype;

    clsPt.charAppear = function (wo) {
        var x = wo.centerX();
        var y = wo.centerY();

        this.chr.x = x;
        this.chr.y = y;

        return this.chr.appear();
    };

    clsPt.moveToDoor = function (wo) {
        var that = this;

        return this.chr.moveTo('y', this.wall.groundLevel + 150, 1000).then(function () {

            that.wall.scrollTo(wo.centerX());

            return that.chr.moveTo('x', wo.centerX(), 1000);

        }).then(function () {

            return that.chr.moveTo('y', wo.centerY(), 1000);

        }).then(function () {

            return that.chr.disappear();
        });
    };

    return exports;

}());
