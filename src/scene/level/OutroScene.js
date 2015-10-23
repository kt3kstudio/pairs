
/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.OutroScene = subclass(scene.level.Context, function (pt) {
    'use strict';

    pt.init = function () {

        var panePos = this.getDimensionFactory().resultPanePosition();

        this.resPane = new ui.level.ResultPane(panePos, panePos.width, panePos.height, '#main');

        this.start().then(function () {

            history.back();

        });

    }.event('play-scene-success play-scene-failure');


    pt.start = function () {

        var that = this;

        this.resPane.setScore(this.getScoreboard().score);

        return this.resPane.show(30000000).then(function () {

            domain.level.Cell.disappear();

            that.getMenuButton().hide();

            that.getScoreboard().disappear();

            return that.getField().disappear();

        }).then(function () {

            return that.getBall().goCenterX();

        }).then(function () {

            return that.getBall().goCenterY();

        }).then(function () {

            return Promise.all([
                that.getCharacter().appear(400),
                that.getBall().disappear()
            ]);

        }).then(function () {

            return that.getCharacter().moveTo('y', 800, 1000);

        }).then(function () {

            return ui.common.BackgroundService.turnBlack();

        });

    };

});


$.cc.assign('outro-scene', scene.level.OutroScene);
