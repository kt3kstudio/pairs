



/**
 * The factory class of LevelLocks.
 */
datadomain.LevelLockFactory = subclass(function (pt) {
    'use strict';

    /**
     * Creates a LevelLock from the object.
     *
     * @param {Object} obj The object
     * @return {datadomain.LevelLock}
     */
    pt.createFromObject = function (obj) {

        if (obj == null) {

            return null;

        }

        return new datadomain.LevelLock(obj.levelId, obj.locked);

    };

    /**
     * Creates a LevelLockCollection from the list of the object.
     *
     * @param {Array}
     * @return {Array}
     */
    pt.createCollectionFromObjectList = function (objList) {

        objList = objList || [];

        return new datadomain.LevelLockCollection(objList.map(function (obj) {

            return this.createFromObject(obj);

        }, this));

    };

});
