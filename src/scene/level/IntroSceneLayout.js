/**
 * The layout manager for intro scene
 *
 * @class
 */
scene.level.IntroSceneLayout = subclass(domain.common.DimensionFactory, function (pt) {
    'use strict'

    pt.bottom = 50

    pt.widthRate = 2
    pt.heightRate = 3

    /**
     * Returns the grid for the paper.
     *
     * @return {domain.common.Grid}
     */
    pt.centerGrid = function () {

        return this.grid({

            x: this.centerX(),
            y: this.top + this.width(),
            unitHeight: this.width() / 2 + 50 + 200,
            cellWidth: 70,
            cellHeight: 70

        })

    }

    /**
     * Returns the grid for residents.
     *
     * @return {domain.common.Grid}
     */
    pt.residentGrid = function () {

        return

    }

})
