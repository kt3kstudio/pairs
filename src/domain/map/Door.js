/**
 * @class
 */
domain.map.Door = (function ($) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    var exports = function (name, level, star, score) {
        this.name = name;
        this.level = level;
        this.star = star;
        this.score = score;
    };

    exports.createFromObject = function (obj) {
        return new exports(obj.name, obj.level, obj.star, obj.score)
            .setPos(obj.pos)
            .setSize(obj.size);
    };

    var doorPt = exports.prototype = new domain.map.WallObject();

    doorPt.createDom = function () {
        var that = this;

        return $('<div />').addClass('door').css('opcaity', 0).click(function () {
            that.cls.moveToDoor(that).then(function () {

                ms.goToLevel(that.level);
            });
        });
    };

    doorPt.setCharLocateService = function (cls) {
        this.cls = cls;

        return this;
    };

    doorPt.appearAnim = 'door-appear';
    doorPt.appearDur = DOOR_APPEAR_DUR;
    doorPt.disappearAnim = 'door-disappear';
    doorPt.disappearDur = DOOR_APPEAR_DUR;

    return exports;
}(window.jQuery));
