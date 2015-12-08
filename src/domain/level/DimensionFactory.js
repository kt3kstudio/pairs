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
     * @return {domain.common.Rect}
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
     * @return {domain.common.Grid}
     */
    pt.evalRoomGrid = function () {

        return new domain.common.Grid({
            x: this.main.left + this.UNIT,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 2,
            unitHeight: this.UNIT * 2,
            cellWidth: this.UNIT * 1.7,
            cellHeight: this.UNIT * 1.7
        })

    }

    /**
     * Returns the dimension for the exit queue. (The unit is a bit smaller.)
     *
     * @return {domain.common.Grid}
     */
    pt.queueGrid = function () {

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
     * @return {domain.common.Grid}
     */
    pt.fusionBoxGrid = function () {

        return new domain.common.Grid({
            x: this.main.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5
        })

    }

    /**
     * Returns the grid for the paper.
     *
     * @return {domain.common.Grid}
     */
    pt.paperGrid = function () {

        return new domain.common.Grid({
            x: this.LEFT + this.UNIT * 1.5,
            y: this.TOP + this.UNIT * 4
        })

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
     * @return {domain.common.Rect}
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
