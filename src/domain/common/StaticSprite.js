import Sprite from './Sprite'

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
            down: { default: new domain.common.Image(this.image) }
        })

    }

}
