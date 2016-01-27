import DimensionFactory from '../../domain/common/DimensionFactory'

const BOTTOM_AD_SAFETY_HEIGHT = 50 // The ad safety zone
/**
 * The layout manager for intro scene
 */
export default class IntroSceneLayout extends DimensionFactory {

    constructor() {

        super({
            marginBottom: BOTTOM_AD_SAFETY_HEIGHT,
            widthRate: 2,
            heightRate: 3
        })

    }

    /**
     * Returns the grid for the paper.
     *
     * @return {Grid}
     */
    centerGrid() {

        return this
        .main
        .shiftDown(0.21)
        .toGrid()
        .override({
            cellWidth: 70,
            cellHeight: 70
        })

    }

    /**
     * Returns the grid for residents.
     *
     * @return {Grid}
     */
    residentGrid() {

        return this
        .main
        .scaleRight(1 / 3)
        .scaleBottom(1 / 2)
        .toGrid()

    }

}
