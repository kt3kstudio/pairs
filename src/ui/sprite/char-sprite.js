import Sprite from './sprite'
import Ma from './ma'
import {wait, Image, DirStateImageMap} from 'spn'
import {traits} from 'traits-decorator'

const CHR_TABLE = {
    ma: Ma
}

/**
 * CharSprite class handles the character sprite.
 *
 * Component
 */
@traits(Sprite)
export default class CharSprite {

    /**
     * Returns the default direction.
     */
    defaultDir() { return 'down' }

    /**
     * Returns the default state.
     */
    defaultState() { return 'default' }

    initSprite() {

        this.character = this.elem.data('character')

        CHR_TABLE[this.character.id].call(this)

        this.dirStateImage = new DirStateImageMap()

        this.dirStateImage.addImageByDirState(new Image(this.upImage()), 'up', 'default')
        this.dirStateImage.addImageByDirState(new Image(this.downImage()), 'down', 'default')
        this.dirStateImage.addImageByDirState(new Image(this.leftImage()), 'left', 'default')
        this.dirStateImage.addImageByDirState(new Image(this.rightImage()), 'right', 'default')

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

}