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

        this.$doorFrame = $('<div />').addClass('door-frame').css('opcaity', 0).click(function () {
            that.cls.moveToDoorByLevel(that.level).then(function () {

                // ms means MapScene instance 
                window.ms.askGoLevel(that.level);

            });
        });

        this.$door = $('<div />').addClass('door').appendTo(this.$doorFrame);

        return this.$doorFrame;
    };

    doorPt.open = function () {
        this.$door.addClass('open');

        return wait(this.doorActionDur);
    };

    doorPt.close = function () {
        this.$door.removeClass('open');

        return wait(this.doorActionDur);
    };

    doorPt.doorActionDur = 400;

    doorPt.appearAnim = 'door-appear';
    doorPt.appearDur = DOOR_APPEAR_DUR;
    doorPt.disappearAnim = 'door-disappear';
    doorPt.disappearDur = DOOR_APPEAR_DUR;

    return exports;

}(window.jQuery));
