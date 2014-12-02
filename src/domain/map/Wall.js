
var h = 100;
var w = 70;
window.woList = [
    {"type": "l", "name": "0", "pos": [100, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "1", "pos": [300, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "2", "pos": [500, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "3", "pos": [700, -h], "size": [w, h], "star": 3, "score": 5000, },
];

domain.map.Wall = (function () {
    'use strict';

    var exports = function () {
        this.wos = [];
        this.groundLevel = $(window).height() * (1 - domain.map.Floor.HEIGHT_RATE);
        this.$dom = $('.floor-wrapper');
    };

    var wallPt = exports.prototype;

    wallPt.loadFromObjectList = function (woList) {
        var that = this;

        this.wos = woList.map(function (wo) {

            that.transformCoordinates(wo);

            return domain.map.Door.createFromObject(wo).setParent(that.$dom);

        });

        this.expandRightLimit(100);
    };

    wallPt.transformCoordinates = function (wo) {
        wo.pos[1] += this.groundLevel;
    };

    wallPt.expandRightLimit = function (val) {
        var x = this.rightLimit() + val;

        $('<div />')
            .appendTo(this.$dom)
            .css({width: '1px', height: '1px', 'position': 'absolute'})
            .offset({left: x, top: this.groundLevel});
    };

    wallPt.rightLimit = function () {
        return Math.max.apply(Math, this.wos.map(function (wo) { return wo.rightLimit(); }));
    };

    wallPt.appear = function () {
        var p = Promise.resolve();

        this.wos.forEach(function (wo) {
            p = p.then(function () {
                wo.appear();

                return wait(100);
            });
        });

        return p;
    };

    wallPt.disappear = function () {
    };

    return exports;

}());
