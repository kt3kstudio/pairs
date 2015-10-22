
/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.OutroScene = subclass(scene.level.Context, function (pt) {
    'use strict';

    pt.init = function () {

        this.pos = new domain.level.DimensionFactory();

        this.ball = new Ball(this.elem.find('.ball').cc.getActor());
        this.chr = this.elem.find('.character-on-level').cc.getActor();
        this.field = this.elem.cc.get('play-scene').field;
        this.scoreboard = this.elem.cc.get('play-scene').scoreboard;

        var panePos = this.pos.resultPanePosition();

        this.resPane = new ui.level.ResultPane(panePos, panePos.width, panePos.height, '#main', '.wrapper');

        this.start().then(function () {

            history.back();

        });

    }.event('play-scene-success play-scene-failure');


    pt.start = function () {

        var that = this;

        this.resPane.setScore(this.scoreboard.score);

        return this.resPane.show(30000000).then(function () {

            domain.level.Cell.disappear();

            that.getMenuButton().hide();

            that.scoreboard.disappear();

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

        });

    };

    /**
     * Ball role in OutroScene
     *
     * @private
     * @class domain.level.OutroScene.Ball
     */
    var Ball = subclass(function (pt) {

        pt.constructor = function (ball) {
            this.ball = ball;
        };

        pt.goCenterX = function () {
            var pos = this.ball.pos();
            pos.x = 1;

            return this.ball.setPos(pos);
        };

        pt.goCenterY = function () {
            var pos = this.ball.pos();
            pos.y = 1;

            return this.ball.setPos(pos);
        };

        pt.disappear = function () {
            return this.ball.disappear();
        };

    });

});


$.cc.assign('outro-scene', scene.level.OutroScene);
