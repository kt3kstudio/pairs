
/**
 * Scoreboard handles the behaviour of the score board of the level view.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
ui.level.Scoreboard = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict';

    var MARGIN = 6;

    /**
     * @constructor
     */
    pt.constructor = function () {

        parent.constructor.apply(this, arguments);

        this.score = 0;

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

        this.x = this.dimension.left;
        this.y = this.dimension.top;

        this.w = this.dimension.width - MARGIN * 2;
        this.h = this.dimension.height - MARGIN * 2;

        this.marginLeft = MARGIN;
        this.marginTop = MARGIN;

    };

    /**
     * Returns the top limit of the sprite.
     *
     * @override
     * @return {Number}
     */
    pt.topLimit = function () {

        return this.y;

    };

    /**
     * Returns the left limit of the sprite.
     *
     * @override
     * @return {Number}
     */
    pt.leftLimit = function () {

        return this.x;

    }


    /**
     * Set up the initial dom state.
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        parent.willShow.call(this);

        this.elem
        .css('line-height', this.h + 'px')
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
