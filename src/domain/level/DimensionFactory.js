/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
domain.level.DimensionFactory = subclass(function (pt) {
    'use strict'

    var TOP_UI_HEIGHT = 50 // the height of the score board at the top
    var BOTTOM_UI_HEIGHT = 50 // the height of the banner ad at the bottom of the screen

    // height / width
    var PLAY_FIELD_RATIO = 6 / 4

    /**
     * @constructor
     */
    pt.constructor = function (width, height) {

        this.calc(width, height)

    }

    /**
     * Gets the available area in the current window.
     *
     * @private
     * @return {Object}
     */
    pt.getAvailableArea = function (width, height) {

        return {
            height: height - TOP_UI_HEIGHT - BOTTOM_UI_HEIGHT,
            width: width
        }

    }


    /**
     * Gets the best fitting playable area for the level scene.
     *
     * @private
     */
    pt.getBestArea = function (width, height) {

        var available = this.getAvailableArea(width, height)

        if (available.width * PLAY_FIELD_RATIO > available.height) {

            // height dominant screen
            return {
                width: available.height / PLAY_FIELD_RATIO,
                height: available.height
            }

        } else {

            // width dominant screen
            return {
                width: available.width,
                height: available.width * PLAY_FIELD_RATIO
            }
        }

    }



    /**
     * Calculates things which are needed for providing the dimensions of the objects in the level scene.
     *
     * @private
     */
    pt.calc = function (width, height) {

        var bestArea = this.getBestArea(width, height)

        this.left = (width - bestArea.width) / 2

        this.UNIT = bestArea.width / 4
        this.LEFT = this.left + this.UNIT / 2
        this.TOP = TOP_UI_HEIGHT

    }


    /**
     * Returns the dimension for the top ui component.
     *
     * @return {domain.level.Dimension}
     */
    pt.topUIPosition = function () {

        return new domain.level.Dimension({top: 0, left: this.left})

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

        pos.left = this.left

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

            left: this.left,
            top: 0,
            width: this.UNIT * 2,
            height: TOP_UI_HEIGHT

        })

    }

})
