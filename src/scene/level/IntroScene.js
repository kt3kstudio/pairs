
/**
 * @class
 * IntroScene class handles the introduction scene of the level page.
 */
scene.level.IntroScene = (function () {
    'use strict';

    var exports = function (level) {
        this.level = level;

        this.chr = new domain.common.Ma();
    };

    var isPt = exports.prototype = new scene.common.Scene();

    isPt.start = function () {

        var that = this;

        this.chr.x = 250;
        this.chr.y = 800;

        that.chr.put();

        pages.common.BackgroundService.turnWhite();

        Promise.resolve().then(function () {

            return that.chr.moveTo('y', 500, 2000);

        }).then(function () {

        }).then(function () {

            return that.chr.disappear();

        }).then(function () {

            return that.finish();

        });
    };

    return exports;

}());
