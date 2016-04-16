import CharSprite from '../../ui/sprite/char-sprite'
import GridWalker from '../../domain/common/GridWalker'
import Speaker from '../../ui/sprite/speaker'
import {traits} from 'traits-decorator'

const {component} = $.cc

/**
 * The main character on the level scene.
 */
@traits(Speaker)
@traits(CharSprite)
@component('character-on-level')
export default class Character extends GridWalker {

    constructor(elem) {
        super(elem)

        this.initSprite()
    }

    ratioX() { return 0.5 }
    ratioY() { return 1 }

    /**
     * @param {number} dur The duration
     */
    willShow(dur) {

        this.elem.css('display', 'inline')
        this.updateSprite()

        return super.willShow(dur)

    }

    /**
     * @param {number} dur The duration
     */
    didHide(dur) {

        this.elem.css('display', 'none')

        return super.didHide(dur)

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