import StayRunSprite from '../common/StayRunSprite'
import {Animation} from 'spn'

const {component} = $.cc

/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */
@component('frog')
export default class FrogSprite extends StayRunSprite {

    leftStayImage() { return 'img/frog-stay.out.svg' }
    leftRunImage() { return 'img/frog-run.out.svg' }

    awayDur() { return 400 }
    awayAnim() { return new Animation('foo', 400) }

    width() { return 100 }
    height() { return 50 }
    ratioX() { return 0.5 }
    ratioY() { return 1 }

}
