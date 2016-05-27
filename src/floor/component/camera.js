import {wait} from 'spn'

const {component, event} = $.cc
/**
 * Camera handles the screen position.
 */
@component('camera')
export default class Camera extends $.cc.Coelement {

    /**
     * Gets the window width.
     *
     * @return {Number}
     */
    getWindowWidth() {

        return $(window).width()

    }

    /**
     * Sets up the initial position
     */
    setUp() {

        this.scrollSet($('.floor-asset-collection').cc.get('floor-asset-collection').findById($('.floor-walker').cc.get('floor-walker').getPosition().floorObjectId).centerX())

    }

    /**
     * Moves the camera to the given position if the position isn't visible.
     *
     * @param {$.Event} e The event object
     * @param {Number} x The horizontal position
     */
    @event('character-focus')
    focusToX(e, x) {

        if (!this.visible(x)) {
            this.scrollSet(x)
        }

    }

    /**
     * Sets the horizontal scroll position
     */
    scrollSet(x) {

        this.elem.scrollLeft(x - this.getWindowWidth() / 2)

    }

    /**
     * Scrolls the camera focus to the given x in given duration.
     *
     * @param {Event} e The event object (unused)
     * @param {Number} x The x coordinate
     * @param {Number} dur The duration
     * @return {Promise}
     */
    @event('character-move')
    scrollTo(e, x, dur) {

        this.elem.animate({scrollLeft: x - this.getWindowWidth() / 2}, dur)

        return wait(dur)

    }

    /**
     * Check if the character is visible on the screen.
     *
     * @param {Number} x The focus position
     * @returns {Boolean}
     */
    visible(x) {

        return x > this.elem.scrollLeft() && x < this.elem.scrollLeft() + this.getWindowWidth()

    }

}
