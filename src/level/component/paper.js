import {Animation} from 'spn'
import StaticSprite from '../../domain/common/StaticSprite'

const {component} = $.cc

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 */
@component('paper')
export default class Paper extends StaticSprite {

    width() { return 50 }
    height() { return 50 }

    image() { return 'img/paper.svg' }

    showAnim() { return new Animation('paper-appear', 500) }
    hideAnim() { return new Animation('paper-disappear', 500) }

}
