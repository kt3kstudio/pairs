import Sprite from './Sprite'
import DirStateImageMap from './dir-state-image-map'
import Ma from './Ma'
import {wait, Image} from 'spn'

const CHR_TABLE = {
    ma: Ma
}

/**
 * CharSprite class handles the character sprite.
 *
 * Component
 */
export default class CharSprite extends Sprite {

    /** sprite's image when going up */
    upImage() { return '' }

    /** sprite's image when going down */
    downImage() { return '' }

    /** sprite's image when going left */
    leftImage() { return '' }

    /** sprite's image when going right */
    rightImage() { return '' }

    constructor(elem) {

        super(elem)

        this.character = elem.data('character')

        CHR_TABLE[this.character.id].call(this)

        const dirStateImage = new DirStateImageMap([
            ['up', 'default', new Image(this.upImage())],
            ['down', 'default', new Image(this.downImage())],
            ['left', 'default', new Image(this.leftImage())],
            ['right', 'default', new Image(this.rightImage())]
        ])

        this.dirStateImage = dirStateImage

    }


    /**
     * Changes the direction the character currently heading for.
     *
     * @param {string} dir The direction (one of up, down, left or right)
     */
    turn(dir) {

        this.setDir(dir)

    }

    /**
     * Gets the direction to the target point.
     *
     * @param {string} coordinate 'x' or 'y'
     * @param {number} to The position
     */
    getDirection(coordinate, to) {

        if (coordinate === 'x') {

            return to > this.x ? 'right' : 'left'

        }

        return to > this.y ? 'down' : 'up'

    }

    /**
     * Moves the sprite to the given position within the given duration.
     *
     * @param {string} coordinate 'x' or 'y'
     * @param {number} to The position to go
     * @param {number} dur The duration of movement in ms
     */
    moveTo(coordinate, to, dur) {

        const dir = this.getDirection(coordinate, to)

        this.turn(dir)

        this.setTransitionDuration(dur)

        if (dir === 'up' || dir === 'down') {

            this.moveToY(to)

        } else {

            this.moveToX(to)

        }

        return wait(dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    moveUpOnGrid() {

        this.turn('up')

        return super.moveUpOnGrid()

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    moveRightOnGrid() {

        this.turn('right')

        return super.moveRightOnGrid()

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    moveDownOnGrid() {

        this.turn('down')

        return super.moveDownOnGrid()

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    moveLeftOnGrid() {

        this.turn('left')

        return super.moveLeftOnGrid()

    }

}
