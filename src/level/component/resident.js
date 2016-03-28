import StaticSprite from '../../domain/common/StaticSprite'
import RelativeBody from '../../ui/sprite/relative-body'
import {traits} from 'traits-decorator'

@traits(RelativeBody)
export default class Resident extends StaticSprite {

    constructor(elem) {

        super(elem)

        console.log('Resident constructor')
        console.log(this.image())

        const [x, y] = elem.attr('xy').split(/\s+/)

        this.relX = x / 100
        this.relY = y / 100
        this.relW = 1 / 8
        this.relH = 1 / 8

    }

    willShow() {

        this.updateElemByDirState()

        return this.updateElem()

    }

}
