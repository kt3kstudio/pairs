



/**
 * The object on a floor.
 *
 * [ValueObject]
 *
 * @class
 */
datadomain.FloorObject = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} id The id
     * @param {String} type The type
     * @param {Object} offset The offset
     * @param {Number} offset.x The x coordinate
     * @param {Number} offest.y The y coordinate
     * @param {Object} size The size
     * @param {Number} size.w The width
     * @param {Number} size.h The height
     * @param {Object} opts The options
     */
    pt.constructor = function (id, type, offset, size, opts) {
        this.id = id;
        this.type = type;
        this.offset = offset;
        this.size = size;
        this.opts = opts;
    };

});
