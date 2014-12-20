

/**
 * FloorRepository is the repository class of Floor model
 */
datadomain.FloorRepository = (function () {
    'use strict';

    /**
     * @constructor
     */
    var exports = function () {
    };

    var frPt = exports.prototype;

    /**
     * Gets floor entity by the name
     *
     * @param {String} name The floor name
     * @return {Promise}
     */
    frPt.getByName = function (name) {
        return Promise.resolve($.getJSON(this.floorUrl(name))).then(function (data) {
            return new datadomain.Floor(data.name, data.wallObjects);
        });
    };

    /**
     * Gets the floor's url.
     *
     * @param {String} name The floor name
     * @return {String} The floor url
     */
    frPt.floorUrl = function (name) {
        return 'data/floor/' + name + '.json';
    };

    return exports;

}());
