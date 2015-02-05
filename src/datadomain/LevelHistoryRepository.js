


/**
 * LevelHistoryRepository is the repository class for LevelHistory model.
 */
datadomain.LevelHistoryRepository = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     */
    pt.constructor = function () {

        this.factory = new datadomain.LevelHistoryFactory();

    };


    /**
     * Gets the level histories by the floor.
     *
     * @param {String} floorId The floor id
     * @return {Promise}
     */
    pt.getCollectionByFloorName = function (floorId) {

        return infrastructure.storage.get(this.createStorageKeyForFloorData(floorId), []).then(function (array) {

            return that.factory.createCollectionFromObject(obj);

        });

    };


    /**
     * Creates storage key name for the floor.
     *
     * @param {String} floorId The floor id
     * @return {Promise}
     */
    pt.createStorageKeyForFloorData = function (floorId) {
        return 'level-history-' + floorId;
    };

});
