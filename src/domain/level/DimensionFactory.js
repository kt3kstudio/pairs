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

        this.UNIT = this.main.width() / 4
        this.LEFT = this.main.left + this.main.width() / 8
        this.TOP = this.main.top

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

    pt.playGrid = function () {

        return new domain.common.Grid({
            x: this.main.left + this.UNIT,
            y: this.TOP + this.UNIT * 2.5,
            unitWidth: this.UNIT,
            unitHeight: this.UNIT
        })

    }

    /**
     * Returns the dimension for the field.
     *
     * @return {domain.level.Dimension}
     */
    pt.fieldRect = function () {

        return new domain.common.Rect({
            left: this.LEFT,
            right: this.LEFT + this.UNIT * 3,
            top: this.TOP + this.UNIT * 2,
            bottom: this.TOP + this.UNIT * 5
        })

    }

    /**
     * Returns the dimension for the evaluation room.
     *
     * @return {domain.level.Dimension}
     */
    pt.evalRoomGrid = function () {

        return new domain.common.Grid({
            x: this.main.left + this.UNIT,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 2,
            unitHeight: this.UNIT * 2,
            cellWidth: this.UNIT * 0.7,
            cellHeight: this.UNIT* 0.7
        })

    }

    /**
     * Returns the dimension for the exit queue. (The unit is a bit smaller.)
     *
     * @return {domain.level.Dimension}
     */
    pt.queueGrid = function () {
/*
        var pos = this.gridPosition(1, 0, 1)

        pos.unit /= 2
        pos.left -= pos.unit / 4
*/
        return new domain.common.Grid({
            x: this.main.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 0.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5
        })

    }

    /**
     * Returns the dimension for the fusion box.
     *
     * @return {domain.level.Dimension}
     */
    pt.fusionBoxGrid = function () {

        var pos = this.gridPosition(1, 1, 1)

        pos.unit /= 1.5
        pos.left -= pos.unit / 4

        return new domain.common.Grid({
            x: this.main.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5
        })

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
     * @return {domain.common.Rect}
     */
    pt.resultPaneRect = function () {

        return new domain.common.Rect({
            left: this.main.left,
            top: this.main.top + this.UNIT,
            right: this.main.right,
            bottom: this.main.bottom
        })

    }

    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {domain.level.Dimension}
     */
    pt.scoreboardRect = function () {

        return new domain.common.Rect({
            left: this.main.left,
            top: 0,
            right: this.main.left + this.UNIT * 2,
            bottom: this.top
        })

    }

})
