import Sprite from './Sprite'
import Image from './Image'

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

        this.dirStateImage = () => ({
            down: { default: new Image(this.image()) }
        })

    }

}
