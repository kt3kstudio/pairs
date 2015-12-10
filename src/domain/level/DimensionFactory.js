/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
domain.level.DimensionFactory = subclass(domain.common.DimensionFactory, function (pt, parent) {
    'use strict'

    pt.marginTop = 50 // the height of the score board at the top
    pt.marginBottom = 50 // the height of the banner ad at the bottom of the screen

    pt.widthRate = 2
    pt.heightRate = 3

    /**
     * @constructor
     */
    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.UNIT = this.width() / 4
        this.LEFT = this.left + this.width() / 8
        this.TOP = this.top

    }

    pt.playGrid = function () {

        return new domain.common.Grid({
            x: this.left + this.UNIT,
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
            x: this.left + this.UNIT,
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
            x: this.left + this.UNIT * 2,
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
            x: this.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5
        })

    }

    /**
     * Returns the dimension for the result pane.
     *
     * @return {domain.common.Rect}
     */
    pt.resultPaneRect = function () {

        return new domain.common.Rect({
            left: this.left,
            top: this.top + this.UNIT,
            right: this.right,
            bottom: this.bottom
        })

    }

    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {domain.common.Rect}
     */
    pt.scoreboardRect = function () {

        return new domain.common.Rect({
            left: this.left,
            top: 0,
            right: this.left + this.UNIT * 2,
            bottom: this.top
        })

    }

})
