import StaticSprite from '../../ui/sprite/static-sprite'
import RelativeBody from '../../ui/sprite/relative-body'
import Speaker from '../../ui/screenplay/speaker'
import {traits} from 'traits-decorator'
import {Body} from 'spn'

@traits(RelativeBody)
@traits(StaticSprite)
@traits(Speaker)
export default class Resident extends Body {

    ratioX() { return 0.5 }
    ratioY() { return 1 }

    constructor(elem) {

        super(elem)

        this.initSprite()

        const [x, y] = elem.attr('xy').split(/\s+/)

        this.relX = x / 100
        this.relY = y / 100
        this.relW = 1 / 8
        this.relH = 1 / 8

    }

    willShow() {

        this.updateSprite()

        return super.willShow()

    }

}
