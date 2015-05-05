


/**
 * The factory of FloorObject
 */
datadomain.FloorObjectFactory = subclass(function (pt) {
    'use strict';

    /**
     * Creates a collection class from the array.
     *
     * @param {Array} array The array
     * @return {datadomain.FloorObjectCollection}
     */
    pt.createCollectionFromArray = function (array) {

        var that = this;

        if (array == null) {
            return new datadomain.FloorObjectCollection();
        }

        return new datadomain.FloorObjectCollection(array.map(function (obj) {

            return that.createFromObject(obj);

        }));
    };


    /**
     * Creates a FloorObject from the object
     *
     * @param {Object} obj The object
     * @return {datadomain.FloorObject}
     */
    pt.createFromObject = function (obj) {

        return new datadomain.FloorObject(
            obj.id,
            obj.type,
            new datadomain.Offset(obj.offset[0], obj.offset[1]),
            new datadomain.Size(obj.size[0], obj.size[1]),
            obj.opts
        );

    };
});
