import DimensionFactory from '../../domain/common/DimensionFactory'

/**
 * The layout manager for intro scene
 */
export default class IntroSceneLayout extends DimensionFactory {

    constructor() {

        super({
            marginBottom: 50, // The ad safety zone
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

        return this.grid({

            x: this.main.centerX(),
            y: this.main.top + this.main.width(),
            unitHeight: this.main.width() / 2 + 50 + 200,
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

        return

    }

}
