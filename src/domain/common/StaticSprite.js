import Sprite from './Sprite'
import {Image} from 'spn'
import DirStateImageMap from './dir-state-image-map'

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

        this.dirStateImage = new DirStateImageMap([
            ['down', 'default', new Image(this.image())]
        ])

    }

}
