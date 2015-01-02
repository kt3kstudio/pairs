/**
 * FieldIndexGenerator class creates the list of indices of the field.
 *
 * The list is like a snake on the wall, inspired by the charactor arrangment of the mayan scripture.
 */
util.FieldIndexGenerator = (function () {
    'use strict';

    /**
     * @constructor
     * @param {Number} [max] The max number of colums on each row
     */
    var exports = function (max) {
        this.max = max || 3;
    };

    var figPt = exports.prototype;

    /**
     * Generates indices.
     *
     * @param {Number} need The necessary number
     * @param {Array} used The used (unavailable) indices
     * @return {Array}
     */
    figPt.generate = function (need, used) {
        var results = [];
        var ip = new IndexPointer(this.max);

        used = used || [];
        used = used.map(function (x) { return x.toString(); });

        while (results.length < need) {

            if (used.indexOf(ip.get().toString()) === -1) {
                results.push(ip.get());
            }

            ip.next();

        }

        return results;
    };

    /**
     * IndexPointer represents the current position of generating sequence of indices.
     *
     * @class util.FieldIndexGenerator
     * @private
     */
    var IndexPointer =

    /**
     * @constructor
     * @param {Number} max The max of number of columns
     */
    function (max) {
        this.x = 0;
        this.y = 0;
        this.max = max;
        this.maxIndex = max - 1;
    };

    var ipPt = IndexPointer.prototype;

    /**
     * Gets the current index as an array.
     *
     * @return {Array}
     */
    ipPt.get = function () {
        return [this.x, this.y];
    };

    /**
     * The pointer goes to the next position.
     */
    ipPt.next = function () {

        if (this.x % 2 === 0) {

            if (this.y >= this.maxIndex) {

                this.x += 1;

            } else {

                this.y += 1;

            }

        } else {

            if (this.y <= 0) {

                this.x += 1;

            } else {

                this.y -= 1;

            }

        }

        return this.get();

    };

    return exports;

}());
