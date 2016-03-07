import {Rect, LayoutFactory} from 'spn'

const TOP_UI_HEIGHT = 50 // The top ui component height
const BOTTOM_AD_SAFETY_HEIGHT = 50 // The ad safety zone
/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
export default class PlaySceneLayout extends LayoutFactory {

    /**
     * @constructor
     */
    constructor() {

        super()

        this.main = Rect.windowAsRect().margin({
            top: TOP_UI_HEIGHT,
            bottom: BOTTOM_AD_SAFETY_HEIGHT
        }).getBestRect({
            horizontal: 2,
            vertical: 3
        })

        // The unit rect on the left top corner.
        this.unit = this.main.scaleBottom(1 / 6).scaleRight(1 / 4)

    }

    playGrid() {

        return this.unit
        .shiftRight(0.5)
        .shiftDown(2)
        .toGrid()

    }

    /**
     * Returns the dimension for the field.
     *
     * @return {Rect}
     */
    fieldRect() {

        return this.unit
        .shiftRight(0.5)
        .shiftDown(2)
        .scaleRight(3)
        .scaleBottom(3)

    }

    /**
     * Returns the dimension for the evaluation room.
     *
     * @return {Grid}
     */
    evalRoomGrid() {

        return this.unit
        .scaleBottom(1.7)
        .scaleRight(2)
        .shiftDown(0.4)
        .toGrid()

    }

    /**
     * Returns the dimension for the exit queue. (The unit is a bit smaller.)
     *
     * @return {Grid}
     */
    queueGrid() {

        return this
        .unit
        .scaleBottom(0.5)
        .scaleRight(0.5)
        .shiftDown(0.5)
        .shiftRight(3.5)
        .toGrid()

    }

    /**
     * Returns the dimension for the fusion box.
     *
     * @return {Grid}
     */
    fusionBoxGrid() {

        return this
        .unit
        .scaleRight(0.5)
        .scaleBottom(0.5)
        .shiftDown(2.5)
        .shiftRight(3.5)
        .toGrid()

    }

    /**
     * Returns the dimension for the result pane.
     *
     * @return {Rect}
     */
    resultPaneRect() {

        return this
        .main
        .scaleTop(4.5 / 6)
        .scaleBottom(4 / 4.5)

    }

    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {Rect}
     */
    scoreboardRect() {

        return this
        .main
        .scaleRight(0.5)
        .extCutTop(50)

    }

}
