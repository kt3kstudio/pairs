
/**
 * Scoreboard handles the behaviour of the score board of the level view.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
ui.level.Scoreboard = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict';

    var MARGIN = Math.floor(Math.random() * 6) + 4;

    /**
     * @constructor
     * @param {jQuery} elem The scoreboard element
     * @param {Object} elem.data.dimension The dimension of the scoreboard
     * @param {Number} elem.data.dimension.left The left offset
     * @param {Number} elem.data.dimension.top The top offset
     * @param {Number} elem.data.dimension.width The width
     * @param {Number} elem.data.dimension.height The height
     * @param {Number} [score=0] The score
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.score = 0;
        this.margin = MARGIN;

    };


    pt.showAnim = 'bom-appear';
    pt.showAnimDur = 400;
    pt.hideAnim = 'bom-disappear';
    pt.hideAnimDur = 400;


    /**
     * Sets the dimension of the element.
     *
     * @param {domain.level.Dimension} dimension
     */
    pt.setDimension = function (dimension) {

        this.dimension = dimension;

    };


    /**
     * Set up the initial dom state.
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        parent.willShow.call(this);

        this.elem
        .css('top', this.dimension.top)
        .css('left', this.dimension.left)
        .css('line-height', this.dimension.height - this.margin * 2 + 'px')
        .css('margin', this.margin + 'px')
        .width(this.dimension.width - this.margin * 2)
        .height(this.dimension.height - this.margin * 2)
        .text(this.score);

    };


    /**
     * Updates the scoreboard's number.
     */
    pt.update = function () {

        this.elem.text(window.commaNumber(this.score));

    };

    /**
     * Add the score to the total score.
     *
     * @param {Number} score The score to add
     */
    pt.addScore = function (score) {

        this.score += score;

        this.update();

    };

    /**
     * Sets (overwrites) the score.
     *
     * @param {Number} score The score
     */
    pt.setScore = function (score) {

        this.score = score;

        this.update();

    };

});

$.cc.assign('scoreboard', ui.level.Scoreboard);
