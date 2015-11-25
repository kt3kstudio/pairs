/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
domain.level.DimensionFactory = subclass(domain.common.DimensionFactory, function (pt) {
    'use strict'

    /**
     * @constructor
     */
    pt.constructor = function () {

        this.top = 50 // the height of the score board at the top
        this.right = 0
        this.bottom = 50 // the height of the banner ad at the bottom of the screen
        this.left = 0

        this.widthRate = 4
        this.heightRate = 6

        this.calcMainArea()

        this.UNIT = this.main.width / 4
        this.LEFT = this.main.left + this.main.width / 8
        this.TOP = this.main.top

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
            height: this.top
        })

    }

})
