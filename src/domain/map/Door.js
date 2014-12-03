/**
 * @class
 */
domain.map.Door = (function ($) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    var exports = function (name, star, score) {
        this.name = name;
        this.star = star;
        this.score = score;
    };

    exports.createFromObject = function (obj) {
        return new exports(obj.name, obj.star, obj.score).setPos(obj.pos).setSize(obj.size);
    };

    var doorPt = exports.prototype = new domain.map.WallObject();

    doorPt.createDom = function () {
        return $('<div />').addClass('door').css('opcaity', 0);
    };

    doorPt.appearAnim = 'door-appear';
    doorPt.appearDur = DOOR_APPEAR_DUR;
    doorPt.disappearAnim = 'door-disappear';
    doorPt.disappearDur = DOOR_APPEAR_DUR;

    return exports;
}(window.jQuery));
