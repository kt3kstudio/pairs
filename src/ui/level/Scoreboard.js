
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

    //pt.hideAnim = new domain.common.Animation('bom-disappear', {dur: 400});


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

        this.originX = 0;
        this.originY = 0;

    };


    /**
     * Set up the initial dom state.
     */
    pt.willShow = function () {

        parent.willShow.call(this);

        this.elem.css('line-height', this.h + 'px');

        this.update();

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
     * Gets the current score.
     *
     * @return {Number}
     */
    pt.getScore = function () {

        return this.score;

    };

});

$.cc.assign('scoreboard', ui.level.Scoreboard);
