

/**
 * FloorRepository is the repository class of Floor model
 */
datadomain.FloorRepository = subclass(function (pt) {
    'use strict';

    /**
     * @param {String} id The id of the floor
     * @return {Promise}
     */
    pt.getById = function (id) {
        return Promise.resolve($.getJSON(this.floorUrl(id))).then(function (obj) {
            return new datadomain.FloorFactory().createFromObject(obj);
        });
    };

    /**
     * Gets the floor's url.
     *
     * @param {String} id The floor id
     * @return {String} The floor url
     */
    pt.floorUrl = function (id) {
        return 'data/floor/' + id + '.json';
    };

});
