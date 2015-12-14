/**
 * Camera handles the screen position.
 *
 * @class
 * @extends domain.common.Role
 */
domain.map.Camera = subclass(domain.common.Role, function (pt, parent) {
    'use strict'

    /**
     * Gets the window width.
     *
     * @return {Number}
     */
    pt.getWindowWidth = function () {

        return $(window).width()

    }

    /**
     * Sets up the initial position
     */
    pt.setUp = function () {

        this.scrollSet($('.floor-asset-collection').cc.getActor().findById($('.floor-walker').cc.getActor().getPosition().floorObjectId).centerX())

    }

    pt.focusOnCharacter = function () {

        if (!that.visible(x)) {
            that.scrollSet(x)
        }

    }.event('character-focus')

    /**
     * Sets the horizontal scroll position
     */
    pt.scrollSet = function (x) {

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
    pt.scrollTo = function (e, x, dur) {

        this.elem.animate({scrollLeft: x - this.getWindowWidth() / 2}, dur)

        return wait(dur)

    }.event('character-move')

    /**
     * Check if the character is visible on the screen.
     *
     * @param {Number} x The focus position
     * @returns {Boolean}
     */
    pt.visible = function (x) {

        return x > this.elem.scrollLeft() && x < this.elem.scrollLeft() + this.getWindowWidth()

    }

})

$.cc.assign('camera', domain.map.Camera)
