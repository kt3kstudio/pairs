/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
domain.level.DimensionFactory = subclass(function (pt) {
    'use strict'

    var TOP_UI_HEIGHT = 50 // the height of the score board at the top
    var BOTTOM_UI_HEIGHT = 50 // the height of the banner ad at the bottom of the screen

    /**
     * @constructor
     */
    pt.constructor = function () {

        this.top = TOP_UI_HEIGHT
        this.right = 0
        this.bottom = BOTTOM_UI_HEIGHT
        this.left = 0

        this.widthRate = 4
        this.heightRate = 6

        this.calc()

        this.UNIT = this.main.width / 4
        this.LEFT = this.main.left + this.main.width / 8
        this.TOP = this.main.top

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
     * @private
     */
    pt.calc = function (width, height) {

        var available = this.getAvailableDimension($(window).width(), $(window).height())

        var bestDim = this.getBestDimension(available)

        this.main = {}

        this.main.top = this.top + (available.actualHeight() - bestDim.actualHeight()) / 2
        this.main.left = this.left + (available.actualWidth() - bestDim.actualWidth()) / 2
        this.main.bottom = this.main.top + bestDim.actualHeight()
        this.main.right = this.main.left + bestDim.actualWidth()
        this.main.width = bestDim.actualWidth()
        this.main.height = bestDim.actualHeight()

    }


    /**
     * Returns the dimension for the top ui component.
     *
     * @return {domain.level.Dimension}
     */
    pt.topUIPosition = function () {

        return new domain.level.Dimension({top: 0, left: this.main.left})

    }


    /**
     * Returns the dimension for an object in the grid positions.
     *
     * @private
     * @return {domain.level.Dimension}
     */
    pt.gridPosition = function (x, y, w) {

        var u = this.UNIT

        return new domain.level.Dimension({top: this.TOP + u * y, left: this.LEFT + u * x, unit: u, width: u * w})

    }

    /**
     * Returns the dimension for the field.
     *
     * @return {domain.level.Dimension}
     */
    pt.fieldPosition = function () {

        return this.gridPosition(0, 2, 3)

    }


    /**
     * Returns the dimension for the evaluation room.
     *
     * @return {domain.level.Dimension}
     */
    pt.evalRoomPosition = function () {

        return this.gridPosition(0, 1, 2)

    }


    /**
     * Returns the dimension for the exit queue. (The unit is a bit smaller.)
     *
     * @return {domain.level.Dimension}
     */
    pt.queuePosition = function () {

        var pos = this.gridPosition(1, 0, 1)

        pos.unit /= 2
        pos.left -= pos.unit / 4

        return pos

    }

    /**
     * Returns the dimension for the fusion box.
     *
     * @return {domain.level.Dimension}
     */
    pt.fusionBoxPosition = function () {

        var pos = this.gridPosition(1, 1, 1)

        pos.unit /= 1.5
        pos.left -= pos.unit / 4

        return pos

    }


    /**
     * Returns the dimension for the paper.
     *
     * @return {domain.level.Dimension}
     */
    pt.paperPosition = function () {

        return new domain.level.Dimension({left: this.LEFT + this.UNIT * 1.5, top: this.TOP + this.UNIT * 4})

    }


    /**
     * Returns the dimension for the result pane.
     *
     * @return {domain.level.Dimension}
     */
    pt.resultPanePosition = function () {

        var pos = this.gridPosition(0, 2, 3)

        pos.left = this.main.left

        pos.height = pos.width
        pos.width = this.UNIT * 4

        return pos

    }


    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {domain.level.Dimension}
     */
    pt.scoreboardDimension = function () {

        return new domain.level.Dimension({

            left: this.main.left,
            top: 0,
            width: this.UNIT * 2,
            height: TOP_UI_HEIGHT

        })

    }

})
