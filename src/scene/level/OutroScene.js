
/**
 * @class
 * @extends scene.common.Scene
 * OutroScene handles the scene after finishing main play.
 */
scene.level.OutroScene = (function () {
    'use strict';

    var exports = function (prevScene) {
        this.prevScene = prevScene;

        this.ball = prevScene.ball;
        this.chr = prevScene.prevScene.chr;
        this.field = prevScene.field;
        this.menuButton = prevScene.menuButton;
    };

    var osPt = exports.prototype = new scene.common.Scene();

    osPt.start = function () {

        var that = this;

        return Promise.resolve().then(function () {

            domain.level.Wanderer.disappear();

            that.menuButton.hide();

            return that.field.disappear();

        }).then(function () {

            return that.ball.goCenter();

        }).then(function () {

            return Promise.all([
                that.chr.appear(400),
                that.ball.disappear()
            ]);

        }).then(function () {

            return that.chr.moveTo('y', 800, 1000);

        }).then(function () {

            return pages.common.BackgroundService.turnBlack();

        });
    };

    return exports;

}());
