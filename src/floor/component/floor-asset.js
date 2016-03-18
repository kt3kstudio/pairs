import {Grid} from 'spn'
import Body from '../../domain/common/body'

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */
export default class FloorAsset extends Body {

    /**
     * @override
     */
    width() { return 80 }

    /**
     * @override
     */
    height() { return 100 }

    /**
     * @override
     */
    ratioX() { return 0.5 }

    /**
     * @override
     */
    ratioY() { return 1 }

    constructor(elem) {

        super(elem)

        this.x = +this.elem.attr('x')
        this.y = +this.elem.attr('y')

        this.id = this.elem.attr('id')

    }

    /**
     * Knocks the door (figuratively).
     */
    doorKnock() {

        this.elem.trigger('door-knock', [this])

    }

    /**
     * @abstract
     */
    open() {

        return Promise.resolve()

    }

    /**
     * @abstract
     */
    close() {

        return Promise.resolve()

    }

    /**
     * The handler when it gets the walker.
     *
     * @abstract
     */
    onGetWalker() {

        return Promise.resolve()

    }

    /**
     * Spawn the frog to the front of the floor asset.
     */
    spawnFrog() {

        const frog = $('<img />').css({zIndex: 2}).appendTo(this.elem).cc.init('frog')

        frog.setGrid(new Grid({x: 35, y: 130, unitWidth: 100, unitHeight: 100}))

        frog.show()

    }

    /**
     * Removes the frog in front of the floor asset.
     */
    removeFrog() {

        const frogDom = this.elem.find('.frog')

        if (frogDom.length === 0) {

            return

        }

        const frog = frogDom.cc.getActor()

        if (frog == null) {

            return

        }

        frog.runAwayRight()

    }

}
