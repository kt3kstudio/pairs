


/**
 * The factory class for LevelHistory.
 */
datadomain.LevelHistoryFactory = subclass(function (pt) {
    'use strict';


    /**
     * Creates a LevelHistoryCollection from the array.
     *
     * @param {Array} array The array of the LevelHistories
     * @return {datadomain.LevelHistoryCollection}
     */
    pt.createCollectionFromArray = function (array) {

        var that = this;

        return new datadomain.LevelHistoryCollection(array.map(function (obj) {

            return that.createFromObject(obj);

        }));
    };


    /**
     * Creates a LevelHistory from the object.
     *
     * @param {Object} obj The object
     * @return {datadomain.LevelHistory}
     */
    pt.createFromObject = function (obj) {

        return new datadomain.LevelHistory(

            obj.levelName,
            obj.score,
            obj.highestGene,
            obj.cleared,
            obj.clearedAt

        );

    };

});
