
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
        this.map.loadFromBomList(this.level.cells);
        this.field = new domain.level.Field(mapPosition);

        // boxes
        this.fps = new domain.level.FusionPreparationService(evalBoxPosition);
        this.fusionService = new domain.level.FusionService(fusionBoxPosition);
        this.exitQueue = new domain.level.ExitQueue(exitQueuePosition);

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map);

        // ui components
        this.scoreBoard = new ui.level.Scoreboard(pos.scoreboardDimension());

        // debug things
        this.pointBox = debug.PointBox; // singleton
        this.scoreBox = debug.ScoreBox;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));

    };


    var psPrototype = exports.prototype = new scene.common.Scene();


    psPrototype.start = function () {

        var that = this;


        this.subscription = this.streamOfSwipes().pipe(function (dir) {

            return that.bms.ballMoveAndLeaveOne(dir);

        }).pipe(function (cell) {

            return that.fps.take(cell);

        }).filter(function (pairs) {

            return pairs != null;

        }).map(function (pairs) {

            return new domain.level.FusionPair(pairs[0], pairs[1]);

        }).pipe(function (fusionPair) {

            that.scoreBoard.addScore(fusionPair.score());

            that.pointBox.countUp(fusionPair.leftGene(), fusionPair.rightGene());

            return that.fusionService.performFusion(fusionPair);

        }).pipe(function (newCell) {

            return that.exitQueue.take(newCell);

        }).filter(function (cell) {

            return cell.isLastOne;

        }).forEach(function () {

            that.unbindEvents();
            that.subscription.dispose();
            that.finish();

        });


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

        var upkey = $document.streamOf('upkey').map('up');
        var downkey = $document.streamOf('downkey').map('down');
        var leftkey = $document.streamOf('leftkey').map('left');
        var rightkey = $document.streamOf('rightkey').map('right');

        return Rx.Observable.merge(swipeup, swipedown, swipeleft, swiperight,
            upkey, downkey, leftkey, rightkey);

    };

    psPrototype.unbindEvents = function () {

        this.swipe$dom.swipeCrossUnbind();

        $(document).arrowkeysUnbind();
    };

    return exports;

}(window.jQuery));
