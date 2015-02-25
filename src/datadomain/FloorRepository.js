

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
     * Gets the floor by the id
     *
     * @param {String} id The id of the floor
     * @return {Promise}
     */
    frPt.getById = function (id) {
        return Promise.resolve($.getJSON(this.floorUrl(id))).then(function (data) {
            return new datadomain.Floor(data.name, data.wallObjects);
        });
    };

    /**
     * Gets the floor's url.
     *
     * @param {String} id The floor id
     * @return {String} The floor url
     */
    frPt.floorUrl = function (id) {
        return 'data/floor/' + id + '.json';
    };

    return exports;

}());
