



/**
 * The model of size of things on the screen.
 */
datadomain.Size = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {Number} width The width
     * @param {Number} height The height
     */
    pt.constructor = function (width, height) {

        /**
         * @property {Number} width The width
         */
        this.width = width;

        /**
         * @property {Number} height The height
         */
        this.height = height;

    };

});
