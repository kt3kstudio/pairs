window.scene = window.scene || {};
scene.level = scene.level || {};

/**
 * @class
 * PhaseController controlls phase of processes of things in the level page.
 */
scene.level.PlayScene = (function ($) {
    'use strict';

    var FIELD_TOP = 180; // top of main field in px
    var FIELD_WIDTH = 70; // width of main field in percent
    var FIELD_NUM = 3; // number of columns or rows in main field

    var EVAL_TOP = 80; // top of eval box in px
    var EVAL_WIDTH = 50; // width of eval box in %
    var EVAL_DIV = 2; // horizontal division number of eval box

    var exports = function () {
        // construct each class

        // prepare metrics
        var mapMetrics = new pages.level.Positioner(FIELD_TOP, FIELD_WIDTH, FIELD_NUM).metrics();
        var evalBoxMetrics = new pages.level.Positioner(EVAL_TOP, EVAL_WIDTH, EVAL_DIV).metrics();
        var trashBoxMetrics = {left: 0, top: 0, unit: 1};
        var fusionBoxMetrics = new pages.level.Positioner(EVAL_TOP, 10, 1).metrics();
        var exitQueueMetrics = new pages.level.Positioner(EVAL_TOP - 50, 10, 1).metrics();

        // models
        this.map = new domain.level.Map(mapMetrics);
        this.field = new domain.level.Field(mapMetrics);

        // boxes
        this.evalBox = new domain.level.EvalBox(evalBoxMetrics);
        this.trashBox = new domain.level.TrashBox(trashBoxMetrics);
        this.fusionBox = new domain.level.FusionBox(fusionBoxMetrics);
        this.exitQueue = new domain.level.ExitQueue(exitQueueMetrics);

        this.ball = new domain.level.Ball(mapMetrics);

        // debug things
        this.pointBox = debug.PointBox; // singleton
        this.scoreBox = debug.ScoreBox;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));
    };

    var psPrototype = exports.prototype = new scene.common.Scene();

    psPrototype.loadLevel = function (level) {
        this.map.loadFromBomList(level.boms);

        return this;
    };

    psPrototype.start = function () {
        var that = this;

        var p = pages.common.BackgroundService.turnWhite().then(function () {

            return that.field.appear();

        }).then(function () {

            return that.ball.appear();

        }).then(function () {

            return that.map.appear('#main');

        }).then(function () {

            return that.menuButton.show();

        });

        var bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map, this.evalBox);
        var erp = new domain.level.EvalResultProcessor(this.trashBox, this.fusionBox, this.exitQueue);

        var process = function (result) {

            if (result == null) {
                return;
            }

            that.scoreBox.add(result.score);
            that.pointBox.countUp(result.left.gender, result.right.gender);

            erp.process(result);

        };

        var up = function () { bms.up().then(process); };
        var down = function () { bms.down().then(process); };
        var left = function () { bms.left().then(process); };
        var right = function () { bms.right().then(process); };

        this.bindEvents(up, down, left, right);

        return p;
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

    psPrototype.bindEvents = function (up, down, left, right) {

        this.swipe$dom = $('.wrapper')
            .swipeCross()
            .on('swipeup', function () { _console.log('swipeup'); up();})
            .on('swiperight', function () { _console.log('swiperight'); right(); })
            .on('swipeleft', function () { _console.log('swipeleft'); left(); })
            .on('swipedown', function () { _console.log('swipedown'); down(); })
            .on('swipecancel', function () { _console.log('swipecancel'); });

        $(document)
            .arrowkeys()
            .on('upkey', function () { _console.log('upkey'); up();})
            .on('rightkey', function () { _console.log('rightkey'); right(); })
            .on('leftkey', function () { _console.log('leftkey'); left(); })
            .on('downkey', function () { _console.log('downkey'); down(); });

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
            .off('rightkey')
            .off('leftkey')
            .off('downkey');
    };

    return exports;

}(window.jQuery));
