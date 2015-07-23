
/**
 * IntroScene class handles the introduction scene of the level page.
 *
 * @class
 * @extends scene.common.Scene
 */
scene.level.IntroScene = subclass(scene.common.Scene, function (pt) {
    'use strict';

    pt.constructor = function (prevScene) {

        this.character = prevScene.character;
        this.level = prevScene.level;

        this.pos = new domain.level.PositionFactory();

        this.paper = new domain.level.PieceOfPaper();

        this.chr = prevScene.charSprite;

        this.ball = new domain.level.Ball(this.pos.fieldPosition(), {x: 1, y: 1}, '#main');
    };

    pt.start = function () {

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

});
