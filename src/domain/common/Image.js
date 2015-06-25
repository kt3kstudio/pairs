


/**
 * The image object
 */
domain.common.Image = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} src The url of the image
     * @param {Boolean} mirrorX If the image is mirrored by x-axis
     * @param {Boolean} mirrorY If the image is mirrored by y-axis
     */
    pt.constructor = function (src, mirrorX, mirrorY) {

        this.src = src;
        this.mirrorX = mirrorX;
        this.mirrorY = mirrorY;

    };

});
