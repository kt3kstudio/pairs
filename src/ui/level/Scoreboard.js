
/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */
ui.level.Scoreboard = (function () {
    'use strict';

    var MARGIN = 4;

    /**
     * @constructor
     * @param {Object} dimension The dimension of the scoreboard
     * @param {Number} dimension.left
     * @param {Number} dimension.top
     * @param {Number} dimension.width
     * @param {Number} dimension.height
     * @param {Number} [score=0] The score
     */
    var exports = function (dimension, score) {
        this.dim = dimension;
        this.score = score || 0;
        this.margin = MARGIN;
    };


    var sbPt = exports.prototype = new domain.common.Sprite();


    sbPt.appearAnim = 'bom-appear';
    sbPt.appearDur = 400;
    sbPt.disappearAnim = 'bom-disappear';
    sbPt.disappearDur = 400;


    /**
     * Creates the dom for this class.
     *
     * @return {jQuery}
     */
    sbPt.createDom = function () {
        this.$dom = $('<div />').addClass('board scoreboard').offset(this.dim)
            .width(this.dim.width - this.margin * 2)
            .height(this.dim.height - this.margin * 2)
            .text(this.score);

        return this.$dom;
    };


    /**
     * Updates the scoreboard's number.
     */
    sbPt.update = function () {
        this.$dom.text(window.commaNumber(this.score));
    };

    /**
     * Add the score to the total score.
     *
     * @param {Number} score The score to add
     */
    sbPt.addScore = function (score) {
        this.score += score;

        this.update();

        return this;
    };

    /**
     * Sets (overwrites) the score.
     *
     * @param {Number} score The score
     */
    sbPt.setScore = function (score) {
        this.score = score;

        this.update();

        return this;
    };

    return exports;

}());
