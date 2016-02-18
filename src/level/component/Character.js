import CharSprite from '../../domain/common/CharSprite'
import Speaker from '../../domain/common/Speaker'
import {traits} from 'traits-decorator'

const {component} = $.cc

/**
 * The main character on the level scene.
 */
@traits(Speaker)
@component('character-on-level')
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
