
/**
 * @class
 * @extends scene.common.Scene
 * IntroScene class handles the introduction scene of the level page.
 */
scene.level.IntroScene = (function () {
    'use strict';

    var exports = function (level) {
        this.level = level;
        this.gt = new pages.common.GoalTranslator();

        this.pos = new pages.level.Positioner();

        this.paper = new domain.level.PieceOfPaper();

        this.chr = new domain.common.Ma();
        this.ball = new domain.level.Ball(this.pos.fieldMetrics());
    };

    var isPt = exports.prototype = new scene.common.Scene();

    isPt.start = function () {

        var that = this;

        var paperPos = this.pos.paperPos();

        this.chr.x = paperPos.left;
        this.chr.y = 800;

        this.chr.put();

        this.paper.x = paperPos.left;
        this.paper.y = paperPos.top;

        this.paper.put();

        pages.common.BackgroundService.turnWhite();

        Promise.resolve().then(function () {

            return that.chr.moveTo('y', paperPos.top, 600);

        }).then(function () {

            // the character takes the paper in the room.
            that.paper.disappear(1000);

            var goals = $('<p />').text(that.gt.translate(that.level.goals));

            // the character read up the goals of the room
            return that.chr.speak(goals);

        }).then(function (sb) {

            that.speechPromise = new Promise(function (resolve) {

                setTimeout(function () {
                    resolve(sb);
                }, 5000);

                $('.wrapper').css('z-index', 2).one('click', function () {
                    resolve(sb);
                });

            }).then(function (speechBubble) {

                $('.wrapper').off('click').css('z-index', '');

                return speechBubble.hide();

            });

            that.chr.disappear(1000);
            return that.ball.appear();

        }).then(function () {

            return that.finish();

        });
    };

    return exports;

}());
