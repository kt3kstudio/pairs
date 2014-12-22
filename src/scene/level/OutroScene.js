
/**
 * @class
 * @extends scene.common.Scene
 * OutroScene handles the scene after finishing main play.
 */
scene.level.OutroScene = (function () {
    'use strict';

    var exports = function (prevScene) {
        this.prevScene = prevScene;

        this.pos = this.prevScene.pos;

        this.ball = new Ball(prevScene.ball);
        this.chr = prevScene.prevScene.chr;
        this.field = prevScene.field;
        this.menuButton = prevScene.menuButton;
        this.scoreBoard = prevScene.scoreBoard;

        var panePos = this.pos.resultPanePosition();

        this.resPane = new ui.level.ResultPane(panePos, panePos.width, panePos.height, '#main', '.wrapper');
    };

    var osPt = exports.prototype = new scene.common.Scene();

    osPt.start = function () {

        var that = this;

        return this.resPane.show(30000).then(function () {

            domain.level.Wanderer.disappear();

            that.menuButton.hide();

            that.scoreBoard.disappear();

            return that.field.disappear();

        }).then(function () {

            return that.ball.goCenterX();

        }).then(function () {

            return that.ball.goCenterY();

        }).then(function () {

            return Promise.all([
                that.chr.appear(400),
                that.ball.disappear()
            ]);

        }).then(function () {

            return that.chr.moveTo('y', 800, 1000);

        }).then(function () {

            return ui.common.BackgroundService.turnBlack();

        }).then(function () {

            that.finish();

        });

    };

    // Ball role in OutroScene
    var Ball = function (ball) {
        this.ball = ball;
    };

    var ballPt = Ball.prototype;

    ballPt.goCenterX = function () {
        var pos = this.ball.pos();
        pos.x = 1;

        return this.ball.setPos(pos);
    };

    ballPt.goCenterY = function () {
        var pos = this.ball.pos();
        pos.y = 1;

        return this.ball.setPos(pos);
    };

    ballPt.disappear = function () {
        return this.ball.disappear();
    };

    return exports;

}());
