/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 * @class
 */
domain.common.DimensionFactory = subclass(domain.common.Rect, function (pt) {
    'use strict'

    /**
     * @property {Number} marginTop The top margin for the main area.
     */
    pt.marginTop = 0

    /**
     * @property {Number} marginRight The right margin for the main area.
     */
    pt.marginRight = 0

    /**
     * @property {Number} marginBottom The bottom margin for the main area.
     */
    pt.marginBottom = 0

    /**
     * @property {Number} marginLeft The left margin for the main area.
     */
    pt.marginLeft = 0

    /**
     * Calculates things which are needed for providing the dimensions of the objects in the level scene.
     *
     * @protected
     */
    pt.constructor = function () {

        var available = this.getAvailableDimension($(window).width(), $(window).height())

        var bestDim = this.getBestDimension(available)

        this.top = this.marginTop + (available.actualHeight() - bestDim.actualHeight()) / 2
        this.left = this.marginLeft + (available.actualWidth() - bestDim.actualWidth()) / 2
        this.bottom = this.top + bestDim.actualHeight()
        this.right = this.left + bestDim.actualWidth()

    }

    /**
     * Gets the available dimension in the play scene.
     *
     * @private
     * @param {Number} width The width of the target area
     * @param {Number} height The height of the target area
     * @return {domain.common.Dimension}
     */
    pt.getAvailableDimension = function (width, height) {

        return new domain.common.Dimension({
            width: width,
            height: height,
            marginTop: this.marginTop,
            marginRight: this.marginRight,
            marginBottom: this.marginBottom,
            marginLeft: this.marginLeft
        })

    }

    /**
     * Gets the best fitting playable area for the level scene.
     *
     * @private
     * @param {domain.common.Dimension}
     * @return {domain.common.Dimension}
     */
    pt.getBestDimension = function (available) {

        return new domain.common.Dimension({

            width: this.widthRate,
            height: this.heightRate

        }).similarInnerTangent(available.actualWidth(), available.actualHeight())

    }

})
