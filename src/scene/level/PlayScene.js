
/**
 * @class
 * @extends scene.common.Scene
 * PhaseController controlls phase of processes of things in the level page.
 */
scene.level.PlayScene = (function ($) {
    'use strict';

    var exports = function (prevScene) {

        this.prevScene = prevScene;

        var pos = prevScene.pos;

        // continuous actors
        this.ball = prevScene.ball;
        this.level = prevScene.level;

        // prepare metrics
        var mapMetrics = pos.fieldMetrics();
        var evalBoxMetrics = pos.evalRoomMetrics();
        var trashBoxMetrics = pos.leftDoorMetrics();
        var exitQueueMetrics = pos.queueMetrics();
        var fusionBoxMetrics = pos.fusionBoxMetrics();

        // models
        this.map = new domain.level.Map(mapMetrics);
        this.field = new domain.level.Field(mapMetrics);

        // boxes
        this.evalBox = new domain.level.EvalBox(evalBoxMetrics);
        this.trashBox = new domain.level.TrashBox(trashBoxMetrics);
        this.fusionBox = new domain.level.FusionBox(fusionBoxMetrics);
        this.exitQueue = new domain.level.ExitQueue(exitQueueMetrics);

        // debug things
        this.pointBox = debug.PointBox; // singleton
        this.scoreBox = debug.ScoreBox;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));
    };

    var psPrototype = exports.prototype = new scene.common.Scene();

    psPrototype.loadLevel = function () {
        this.map.loadFromBomList(this.level.boms);

        return this;
    };

    psPrototype.start = function () {
        var that = this;

        this.loadLevel();

        var erp = new domain.level.EvalResultProcessor(this.trashBox, this.fusionBox, this.exitQueue);
        var pmds = new domain.level.PossibleMoveDetectionService(this.ball, this.map);

        var resProcessor = function (result) {
            var p = erp.process(result, function (result) {
                console.log('eval result');
                console.log(result);

                // debug code
                if (result.score) {
                    that.scoreBox.add(result.score);
                }

                if (result.left && result.right) {
                    that.pointBox.countUp(result.left.gender, result.right.gender);
                }
            });

            if (result.isLastOne) {
                p = p.then(function () {
                    that.finish();
                });
            };

            return p;

        };

        var bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map, this.evalBox, resProcessor);

        this.bindEvents(function (dir) {

            return bms.ballMoveAndLeaveOne(dir);

        });

        this.menuButton.show();

        return that.field.appear().then(function () {

            return that.map.appear('#main');

        });

    };

    psPrototype.cease = function () {

        var that = this;

        this.menuButton.hide();

        this.unbindEvents();

        return this.ball.disappear().then(function () {

            return domain.level.Wanderer.disappear();

        }).then(function () {

            return that.field.disappear();

        }).then(function () {

            return pages.common.BackgroundService.turnBlack();

        }).then(function () {

            that.map.empty();
            that.pointBox.reset();
            that.evalBox.reset();
            that.scoreBox.reset();
            that.exitQueue.reset();

            return wait(300);

        }).then(function () {

            that.finish();

        });
    };

    psPrototype.bindEvents = function (onSwipe) {

        this.swipe$dom = $('.wrapper')
            .swipeCross()
            .on('swipeup', function () { onSwipe('up') ;})
            .on('swipedown', function () { onSwipe('down'); })
            .on('swipeleft', function () { onSwipe('left'); })
            .on('swiperight', function () { onSwipe('right'); })
            .on('swipecancel', function () { });

        $(document)
            .arrowkeys()
            .on('upkey', function () { onSwipe('up'); })
            .on('downkey', function () { onSwipe('down'); })
            .on('leftkey', function () { onSwipe('left'); })
            .on('rightkey', function () { onSwipe('right'); });

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
