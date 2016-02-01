import {Animation} from 'spn'

const STAIRCASE_ANIMATION_DUR = 400

/**
 * Staircase class represents the staircases in the map view.
 */
@$.cc.Component('staircase')
export default class Staircase extends domain.map.FloorAsset {

    showAnim() { return new Animation('door-appear', STAIRCASE_ANIMATION_DUR) }

    hideAnim() { return new Animation('door-disappear', STAIRCASE_ANIMATION_DUR) }

    constructor(elem) {

        super(elem)

        this.goto = elem.data('goto') // must be parsed position object, not string

        this.locked = true

    }

    /**
     * Sets up the dom.
     */
    willShow(dur) {

        super.willShow(dur)

        if (this.locked) {

            this.spawnFrog()

        } else {

            this.enableDoorKnock()

        }

    }

    /**
     * Enables the knock interaction.
     */
    enableDoorKnock() {

        this.elem.one('click', () => this.doorKnock())

    }

    /**
     * Disables the knock interaction.
     */
    disableDoorKnock() {

        this.elem.off('click')

    }

    /**
     * Triggers the reload event.
     */
    onGetWalker() {

        this.elem.trigger($.Event('character-goto', {goto: this.goto}))

    }

}
