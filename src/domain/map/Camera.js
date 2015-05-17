



domain.map.Camera = $.defineRole('camera', function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.windowWidth = $(window).width();

        var that = this;

        elem.on('floor-complete', function () {

            that.scrollSet($('.wall').getActor().findById($('.floor-walker').getActor().getPosition().floorObjectId).centerX());

        });

        elem.on('character-focus', function (e, chr) {

            if (!that.visible(chr)) {

                that.scrollSet(chr.x);

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

    pt.scroll = function (x, dur) {

        this.elem.animate({scrollLeft: this.elem.scrollLeft() + x}, dur);

        return wait(dur);

    };

    pt.scrollTo = function (x, dur) {

        this.elem.animate({scrollLeft: x - this.windowWidth / 2}, dur);

        return wait(dur);

    };

    /**
     * Check if the character is visible on the screen.
     *
     * @param {domain.common.CharSprite} chr The character
     * @returns {Boolean}
     */
    pt.visible = function (chr) {

        return chr.rightLimit() > this.elem.scrollLeft() && chr.leftLimit() < this.elem.scrollLeft() + this.windowWidth;

    };

});
