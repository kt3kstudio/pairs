
/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends scene.common.Scene
 */
scene.level.OutroScene = (scene.common.Scene, function (pt) {
    'use strict';

    pt.constructor = function (prevScene) {

        this.prevScene = prevScene;

        this.pos = this.prevScene.pos;

        this.ball = new Ball(prevScene.ball);
        this.chr = prevScene.chr;
        this.field = prevScene.field;
        this.menuButton = prevScene.menuButton;
        this.scoreBoard = prevScene.scoreBoard;

        var panePos = this.pos.resultPanePosition();

        this.resPane = new ui.level.ResultPane(panePos, panePos.width, panePos.height, '#main', '.wrapper');
    };

    pt.start = function () {

        var that = this;

        this.resPane.setScore(this.scoreBoard.score);

        return this.resPane.show(30000000).then(function () {

            domain.level.Cell.disappear();

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

});
