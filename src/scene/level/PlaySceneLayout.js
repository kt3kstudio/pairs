import DimensionFactory from '../../domain/common/DimensionFactory'

/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */
export default class PlaySceneLayout extends DimensionFactory {

    /**
     * @constructor
     */
    constructor() {

        super({
            marginTop: 50, // The top ui component height
            marginBottom: 50, // The ad safety zone
            widthRate: 2,
            heightRate: 3
        })

        this.UNIT = this.width() / 4
        this.LEFT = this.left + this.width() / 8
        this.TOP = this.top

    }

    playGrid() {

        return this.grid({

            x: this.left + this.UNIT,
            y: this.TOP + this.UNIT * 2.5,
            unitWidth: this.UNIT,
            unitHeight: this.UNIT

        })

    }

    /**
     * Returns the dimension for the field.
     *
     * @return {Rect}
     */
    fieldRect() {

        return this.rect({

            left: this.LEFT,
            right: this.LEFT + this.UNIT * 3,
            top: this.TOP + this.UNIT * 2,
            bottom: this.TOP + this.UNIT * 5

        })

    }

    /**
     * Returns the dimension for the evaluation room.
     *
     * @return {Grid}
     */
    evalRoomGrid() {

        return this.grid({

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
     * @return {Grid}
     */
    queueGrid() {

        return this.grid({

            x: this.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 0.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5

        })

    }

    /**
     * Returns the dimension for the fusion box.
     *
     * @return {Grid}
     */
    fusionBoxGrid() {

        return this.grid({

            x: this.left + this.UNIT * 2,
            y: this.TOP + this.UNIT * 1.5,
            unitWidth: this.UNIT * 0.5,
            unitHeight: this.UNIT * 0.5

        })

    }

    /**
     * Returns the dimension for the result pane.
     *
     * @return {Rect}
     */
    resultPaneRect() {

        return this.rect({

            left: this.left,
            top: this.top + this.UNIT,
            right: this.right,
            bottom: this.bottom

        })

    }

    /**
     * Returns the dimension for the scoreboard.
     *
     * @return {Rect}
     */
    scoreboardRect() {

        return this.rect({

            left: this.left,
            top: 0,
            right: this.left + this.UNIT * 2,
            bottom: this.top

        })

    }

}
