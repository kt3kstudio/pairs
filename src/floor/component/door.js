import {wait, Animation} from 'spn'
import domGen, {div, hr, br, p, small} from 'dom-gen'
import FloorAsset from './floor-asset'

const button = domGen('button')

const {component} = $.cc
const DOOR_APPEAR_DUR = 400

/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
@component('door')
export default class Door extends FloorAsset {

    showAnim() { return new Animation('door-appear', DOOR_APPEAR_DUR) }
    hideAnim() { return new Animation('door-disappear', DOOR_APPEAR_DUR) }

    /**
     * @constructor
     */
    constructor(elem) {

        super(elem)

        this.level = elem.attr('level')
        this.star = 0
        this.score = 0

        this.doorActionDur = 400

        this.locked = true

    }

    /**
     * Constructs the contents of the door. (Maybe not a good thing to do here)
     *
     * @override
     */
    willShow() {

        super.willShow()

        this.elem.css('opcaity', 0).append(
            div({addClass: 'door-body'},
                div({addClass: 'door-front'}, this.id),
                div({addClass: 'doorknob'}, '●')
            ),

            div({
                addClass: 'door-info multiflip',
                attr: {m: 3, n: 5, bgcolor: '#393F44'},
                css: {
                    width: '150px',
                    height: '150px',
                    top: '-200px',
                    left: '-40px'
                }
            },
                div({addClass: 'door-info-content'},
                    p(this.id),
                    hr(),
                    p(small`♛ Best ♛`, br(), this.score),
                    hr(),
                    button`▶`.click(function (event) {

                        event.preventDefault()
                        $(this).trigger('goToLevel')

                    })
                )
            ).cc()
        )

        this.doorBody = this.elem.find('.door-body')
        this.informationPanel = this.elem.find('.door-info').cc.get('multiflip')


        if (!this.locked) {

            this.enableDoorKnock()

        } else {

            return this.spawnFrog()

        }

    }

    /**
     * Opens the door.
     */
    open() {

        this.informationPanel.show()

        this.doorBody.addClass('open')

        this.removeFrog()

        this.disableDoorKnock()

        return wait(this.doorActionDur)

    }

    /**
     * Closes the door.
     */
    close() {

        this.informationPanel.hide()

        this.doorBody.removeClass('open')

        this.enableDoorKnock()

        return wait(this.doorActionDur)

    }

    /**
     * Unlocks the door.
     */
    unlocks() {

        this.locked = false

        this.enableDoorKnock()

        this.removeFrog()

    }

    /**
     * Enables the door knock.
     */
    enableDoorKnock() {

        this.doorBody.one('click', () => this.doorKnock())

    }

    /**
     * Disables the door knock.
     */
    disableDoorKnock() {

        this.doorBody.off('click')

    }

}
