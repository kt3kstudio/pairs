/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 * @class
 */
domain.common.DimensionFactory = subclass(function (pt) {
    'use strict'

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
            marginTop: this.top,
            marginRight: this.right,
            marginBottom: this.bottom,
            marginLeft: this.left
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

    /**
     * Calculates things which are needed for providing the dimensions of the objects in the level scene.
     *
     * @protected
     */
    pt.calcMainArea = function () {

        var available = this.getAvailableDimension($(window).width(), $(window).height())

        var bestDim = this.getBestDimension(available)

        var mainTop = this.top + (available.actualHeight() - bestDim.actualHeight()) / 2
        var mainLeft = this.left + (available.actualWidth() - bestDim.actualWidth()) / 2

        this.main = new domain.common.Rect({
            top: mainTop,
            left: mainLeft,
            bottom: mainTop + bestDim.actualHeight(),
            right: mainLeft + bestDim.actualWidth()
        })

    }

})
