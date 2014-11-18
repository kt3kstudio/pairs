window.pages = window.pages || {};

pages.level = {};

/**
 * @class
 * PhaseController controlls phase of processes of things in the level page.
 */
pages.level.PhaseController = (function () {
    'use strict';

    var FIELD_TOP = 180; // top of main field in px
    var FIELD_WIDTH = 70; // width of main field in percent
    var FIELD_NUM = 3; // number of columns or rows in main field

    var EVAL_TOP = -40; // top of eval box in px
    var EVAL_WIDTH = 50; // width of eval box in %
    var EVAL_DIV = 7; // horizontal division number of eval box

    var exports = function () {
        // construct each class

        // prepare metrics
        var mapMetrics = new pages.level.Positioner(FIELD_TOP, FIELD_WIDTH, FIELD_NUM).metrics();
        var evalBoxMetrics = new pages.level.Positioner(EVAL_TOP, EVAL_WIDTH, EVAL_DIV).metrics();
        var trashBoxMetrics = {left: 0, top: 0, unit: 1};

        // models
        this.map = new domain.level.Map(mapMetrics);
        this.field = new domain.level.Field(mapMetrics);

        // boxes
        this.evalBox = new domain.level.EvalBox(evalBoxMetrics);
        this.trashBox = new domain.level.TrashBox(trashBoxMetrics);
        this.evalBox.trashBox = this.trashBox;

        this.ball = new domain.level.Ball(mapMetrics);

        // debug things
        this.pointBox = debug.PointBox; // singleton
        this.scoreBox = debug.ScoreBox;
    };

    var lpcPrototype = exports.prototype;

    lpcPrototype.init = function (level) {
        var that = this;

        this.map.loadFromBomList(level.boms);

        this.field.appear()
            .then(function () { return that.ball.appear(); })
            .then(function () { return that.map.appear('#main'); });

        var bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map, this.evalBox);

        var up = function () { bms.up(); };
        var down = function () { bms.down(); };
        var left = function () { bms.left(); };
        var right = function () { bms.right(); };

        bindEvents(up, down, left, right, this.reset.bind(this), this.score.bind(this));
    };

    lpcPrototype.loadCurrentLevel = function () {
        var path = (window.location.hash.substring(1) || 0) + '.json';

        var that = this;

        return this.getLevel(path);
    };

    lpcPrototype.reset = function () {

        console.log('lpc reset');

        this.map.empty();
        this.pointBox.reset();
        this.evalBox.reset();
        this.scoreBox.reset();

        var that = this;

        wait(500).then(function () {

            return that.loadCurrentLevel();

        }).then(function (level) {

            that.init(level);

        });
    };

    lpcPrototype.score = function (event, params) {
        this.scoreBox.add(params.score);
        this.pointBox.countUp(params.left, params.right);
    };

    lpcPrototype.getLevel = function (path) {
        return Promise.resolve($.getJSON('level/' + path));
    };

    lpcPrototype.onMoveSuccess = function () {
    };

    lpcPrototype.onMoveFailure = function () {
    };

    return exports;

}());


// Util
// calculate TOP, LEFT, UNIT, M, N when given top, fieldWidthPercent, M

pages.level.Positioner = (function () {
    var exports = function (top, fieldWidthPercent, m) {
        this.top = top;
        this.fwp = fieldWidthPercent;
        this.m = m;
        this.calc();
    };

    var positionerPt = exports.prototype;

    positionerPt.calc = function () {
        this.width = $(window).width();
        this.height = $(window).height();

        var shorter = Math.min(this.width, this.height - this.top);

        this.fieldWidth = shorter * this.fwp / 100;

        this.LEFT = Math.floor((this.width - this.fieldWidth) / 2);
        this.TOP = this.top;

        this.UNIT = Math.floor(this.fieldWidth / this.m);
    };

    positionerPt.metrics = function () {
        return {top: this.TOP, left: this.LEFT, unit: this.UNIT, width: this.UNIT * this.m};
    };

    return exports;
}());
