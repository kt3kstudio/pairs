import Sprite from './Sprite'
import {wait, Image, DirStateImageMap} from 'spn'

/**
 * The sprite class for stay-run creatures.
 */
export default class StayRunSprite extends Sprite {

    awayDur() { return 400 }
    awayAnim() { return null }

    defaultDir() { return 'left' }
    defaultState() { return 'stay' }

    leftStayImage() {}
    leftRunImage() {}

    constructor(elem) {

        super(elem)

        this.dirStateImage = new DirStateImageMap()

        this.dirStateImage.addImageByDirState(new Image(this.leftStayImage()), 'left', 'stay')
        this.dirStateImage.addImageByDirState(new Image(this.leftRunImage()), 'left', 'run')
        this.dirStateImage.addImageByDirState(new Image(this.leftStayImage(), true), 'right', 'stay')
        this.dirStateImage.addImageByDirState(new Image(this.leftRunImage(), true), 'right', 'run')

    }

    runAway(dir) {

        this.setDirState(dir, 'run')

        const isRight = dir === 'right'

        this.elem.css('transition-property', 'left, opacity')

        this.setTransitionDuration(this.awayDur())

        const awayDistance = 170

        this.moveToX(this.x - awayDistance + isRight * awayDistance * 2)

        return wait(this.awayDur())

        .then(() => this.awayAnim().apply(this.elem))

        .then(() => this.elem.remove())
    }

    runAwayRight() {

        return this.runAway('right')

    }

    runAwayLeft() {

        return this.runAway('left')

    }

}
