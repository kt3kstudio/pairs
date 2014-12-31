
/**
 * @class
 * @extends scene.common.Scene
 * IntroScene class handles the introduction scene of the level page.
 */
scene.level.IntroScene = (function () {
    'use strict';

    var exports = function (prevScene) {
        this.level = prevScene.level;

        this.pos = new domain.level.PositionFactory();

        this.paper = new domain.level.PieceOfPaper();

        this.chr = prevScene.chr;
        this.ball = new domain.level.Ball(this.pos.fieldPosition(), {x: 1, y: 1}, '#main');
    };

    var isPt = exports.prototype = new scene.common.Scene();

    isPt.start = function () {

        var that = this;

        var paperPos = this.pos.paperPosition();

        this.chr.x = paperPos.left;
        this.chr.y = 800;

        this.chr.put();

        this.paper.x = paperPos.left;
        this.paper.y = paperPos.top;

        this.paper.put();

        ui.common.BackgroundService.turnWhite();

        Promise.resolve().then(function () {

            return that.chr.moveTo('y', paperPos.top, 600);

        }).then(function () {

            // the character takes the paper in the room.
            that.paper.disappear(1000);

            var goals = $('<p />').text(that.level.goal.toString());

            // the character read up the goals of the room
            return that.chr.speak(goals, {cancelDom: '.wrapper'});

        }).then(function () {

            that.chr.disappear(1000);
            return that.ball.appear();

        }).then(function () {

            return that.finish();

        });
    };

    return exports;

}());
