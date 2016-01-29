import {Animation} from 'spn'
import StaticSprite from '../common/StaticSprite'

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 */
class Paper extends StaticSprite {

    width() { return 50 }
    height() { return 50 }

    image() { return 'images/paper.svg' }

    showAnim() { return new Animation('paper-appear', 500) }
    hideAnim() { return new Animation('paper-disappear', 500) }

}

$.cc.assign('paper', Paper)
