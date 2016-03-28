import StaticSprite from '../../ui/sprite/static-sprite'
import RelativeBody from '../../ui/sprite/relative-body'
import {traits} from 'traits-decorator'
import {Body} from 'spn'

@traits(RelativeBody)
@traits(StaticSprite)
export default class Resident extends Body {

    constructor(elem) {

        super(elem)

        this.initDirStateImage()

        const [x, y] = elem.attr('xy').split(/\s+/)

        this.relX = x / 100
        this.relY = y / 100
        this.relW = 1 / 8
        this.relH = 1 / 8

    }

    willShow() {

        this.updateElemByDirState()

        return super.willShow()

    }

}
