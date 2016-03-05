import Sprite from './Sprite'
import {Image, DirStateImageMap} from 'spn'

/**
 * StaticSprite is Sprite without dir-state change.
 */
export default class StaticSprite extends Sprite {

    /**
     * @abstract
     */
    image() { return null }

    constructor(elem) {

        super(elem)

        this.dirStateImage = new DirStateImageMap()

        this.dirStateImage.addImageByDirState(new Image(this.image()), 'down', 'default')

    }

}
