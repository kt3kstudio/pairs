
/**
 * @class
 * @extends scene.common.Scene
 *
 * PlayScene controlls the main playing scene of the level page.
 */
scene.level.PlayScene = (function ($) {
    'use strict';

    var exports = function (prevScene) {

        this.prevScene = prevScene;

        var pos = this.pos = prevScene.pos;

        // continuous actors
        this.ball = prevScene.ball;
        this.level = prevScene.level;
        this.chr = prevScene.chr;

        // prepare metrics
        var mapPosition = pos.fieldPosition();
        var evalBoxPosition = pos.evalRoomPosition();
        var trashBoxPosition = pos.leftDoorPosition();
        var exitQueuePosition = pos.queuePosition();
        var fusionBoxPosition = pos.fusionBoxPosition();

        // models
        this.map = new domain.level.Map(mapPosition);
        this.field = new domain.level.Field(mapPosition);

        // boxes
        this.evalBox = new domain.level.EvalBox(evalBoxPosition);
        this.trashBox = new domain.level.TrashBox(trashBoxPosition);
        this.fusionBox = new domain.level.FusionBox(fusionBoxPosition);
        this.exitQueue = new domain.level.ExitQueue(exitQueuePosition);

        // ui components
        this.scoreBoard = new ui.level.Scoreboard(pos.scoreboardDimension());

        // debug things
        this.pointBox = debug.PointBox; // singleton
        this.scoreBox = debug.ScoreBox;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));
    };

    var psPrototype = exports.prototype = new scene.common.Scene();

    psPrototype.loadLevel = function () {
        this.map.loadFromBomList(this.level.cells);

        return this;
    };

    psPrototype.start = function () {
        var that = this;

        this.loadLevel();

        var resProcessor = function (result) {

            var p = Promise.resolve();

            if (result.fusionPair) {

                p = that.fusionBox.take(result.fusionPair).then(function (newCell) {

                    that.exitQueue.take(newCell);

                });
            }

            // debug code
            if (result.score) {
                that.scoreBox.add(result.score);

                that.scoreBoard.addScore(result.score);
            }

            if (result.left && result.right) {
                that.pointBox.countUp(result.left.gender, result.right.gender);
            }

            if (result.isLastOne) {
                p = p.then(function () {
                    that.finish();
                });
            }

            return p;

        };

        var bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map);


        this.streamOfSwipes().pipe(function (dir) {

            return bms.ballMoveAndLeaveOne(dir);

        }).pipe(function (cell) {

            console.log(cell);

            return that.evalBox.take(cell);

        }).pipe(function (evalResult) {

            return resProcessor(evalResult);

        }).forEach(function () {});


        this.scoreBoard.appear();
        this.menuButton.show();

        return that.field.appear().then(function () {

            return that.chr.speechEndPromise;

        }).then(function () {

            return that.map.appear('#main');

        });

    };

    psPrototype.streamOfSwipes = function () {

        var $swipeTarget = this.swipe$dom = $('.wrapper').swipeCross();

        var swipeup = $swipeTarget.streamOf('swipeup').map('up');
        var swipedown = $swipeTarget.streamOf('swipedown').map('down');
        var swipeleft = $swipeTarget.streamOf('swipeleft').map('left');
        var swiperight = $swipeTarget.streamOf('swiperight').map('right');

        var $document = $(document).arrowkeys();

        var upkey = Rx.Observable.fromEvent($document, 'upkey').map('up');
        var downkey = Rx.Observable.fromEvent($document, 'downkey').map('down');
        var leftkey = Rx.Observable.fromEvent($document, 'leftkey').map('left');
        var rightkey = Rx.Observable.fromEvent($document, 'rightkey').map('right');

        return Rx.Observable.merge(swipeup, swipedown, swipeleft, swiperight,
            upkey, downkey, leftkey, rightkey);

    };

    psPrototype.unbindEvents = function () {

        this.swipe$dom
            .swipeCrossUnbind()
            .off('swipeup')
            .off('swipedown')
            .off('swipeleft')
            .off('swiperight')
            .off('swipecancel');

        $(document)
            .arrowkeysUnbind()
            .off('upkey')
            .off('downkey')
            .off('leftkey')
            .off('rightkey');
    };

    return exports;

}(window.jQuery));
