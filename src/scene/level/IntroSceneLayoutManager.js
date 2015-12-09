/**
 * The layout manager for intro scene
 *
 * @class
 */
scene.level.IntroSceneLayoutManager = subclass(domain.common.DimensionFactory, function (pt) {
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
     * Returns the grid for the paper.
     *
     * @return {domain.common.Grid}
     */
    pt.centerGrid = function () {

        return new domain.common.Grid({
            x: this.main.centerX(),
            y: this.TOP + this.UNIT * 4,
            unitHeight: this.UNIT * 2 + 50 + 200,
            cellWidth: 70,
            cellHeight: 70
        })

    }

})
