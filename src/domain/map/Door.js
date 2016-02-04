import {wait, Animation} from 'spn'
import FloorAsset from './FloorAsset'

const DOOR_APPEAR_DUR = 400
/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
@$.cc.Component('door')
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

        this.elem.css('opcaity', 0)

        this.$doorBody = $('<div />').addClass('door-body').appendTo(this.elem)

        $('<div />').addClass('door-front').text(this.id).appendTo(this.$doorBody)

        $('<div />').addClass('doorknob').text('●').appendTo(this.$doorBody)

        this.infoPane = $('<div><div class="door-info-content"><p>' + this.id + '</p><hr /><p><small>♛ Best ♛</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
            width: '150px',
            height: '150px',
            top: '-200px',
            left: '-40px'
        }).appendTo(this.elem).infoPane(3, 5, {bgcolor: '#393F44'})

        $('<button />').text('▶').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {

            event.preventDefault()
            $(this).trigger('goToLevel')

        })

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

        this.infoPane.show()

        this.$doorBody.addClass('open')

        this.removeFrog()

        this.disableDoorKnock()

        return wait(this.doorActionDur)

    }

    /**
     * Closes the door.
     */
    close() {

        this.infoPane.hide()

        this.$doorBody.removeClass('open')

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

        this.$doorBody.one('click', () => this.doorKnock())

    }

    /**
     * Disables the door knock.
     */
    disableDoorKnock() {

        this.$doorBody.off('click')

    }

}
