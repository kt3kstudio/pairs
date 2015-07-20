


/**
 * Camera handles the screen position.
 *
 * @class
 * @extends domain.common.Role
 */
domain.map.Camera = $.CC.defineRole('camera', function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.windowWidth = $(window).width();

        var that = this;

        elem.on('floor-built', function () {

            that.scrollSet($('.floor-asset-collection').getActor().findById($('.floor-walker').getActor().getPosition().floorObjectId).centerX());

        });

        elem.on('character-focus', function (e, x) {

            if (!that.visible(x)) {

                that.scrollSet(x);

            }

        });

        elem.on('character-move', function (e, to, dur) {

            that.scrollTo(to, dur);

        });

    };

    pt.scrollSet = function (x) {

        this.elem.scrollLeft(x - this.windowWidth / 2);

        return this;

    };


    /**
     * Scrolls the camera focus to the given x in given duration.
     *
     * @param {Number} x
     * @param {Number} dur
     * @return {Promise}
     */
    pt.scrollTo = function (x, dur) {

        this.elem.animate({scrollLeft: x - this.windowWidth / 2}, dur);

        return wait(dur);

    };

    /**
     * Check if the character is visible on the screen.
     *
     * @param {Number} x The focus position
     * @returns {Boolean}
     */
    pt.visible = function (x) {

        return x > this.elem.scrollLeft() && x < this.elem.scrollLeft() + this.windowWidth;

    };

});
