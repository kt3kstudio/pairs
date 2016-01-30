import CharSprite from '../common/CharSprite'

/**
 * The main character on the level scene.
 */
@$.cc.Component('character-on-level')
export default class Character extends CharSprite {

    /**
     * @param {number} dur The duration
     */
    willShow(dur) {

        super.willShow(dur)

        this.elem.css('display', 'inline')

    }

    /**
     * @param {number} dur The duration
     */
    didHide(dur) {

        super.didHide(dur)

        this.elem.css('display', 'none')

    }

}
