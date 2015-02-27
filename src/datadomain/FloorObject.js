



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
     * @param {datadomain.Offset} offset The offset
     * @param {datadomain.Size} size The size
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
