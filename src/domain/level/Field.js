/**
 * @class
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of Map class and BallMoveMobLeaveService class.
 */
domain.level.Field = (function () {
    'use strict';

    var TRAN_DUR = 200;

    var exports = function (metrics) {
        var gutter = 6;
        this.left = metrics.left - gutter;
        this.top = metrics.top - gutter;
        this.unit = metrics.unit;
        this.width = metrics.width + gutter * 2;
        this.dur = TRAN_DUR;
    };

    var fPrototype = exports.prototype;

    fPrototype.appear = function () {
        var that = this;

        return loadImage('images/field.svg', 'field-grid', document.body).then(function ($img) {
            that.$dom = $img;

            $img.css('left', that.left + 'px');
            $img.css('top', that.top + 'px');
            $img.css('width', that.width + 'px');

            return $img.anim('field-appear', that.dur);
        });
    };

    fPrototype.disappear = function () {
        var that = this;

        return this.$dom.anim('field-disappear', 400).then(function () {
            that.$dom.remove();
        });
    };

    return exports;
}());
