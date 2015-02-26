




/**
 * The factory of Floor
 */
datadomain.FloorFactory = subclass(function (pt) {
    'use strict';

    pt.createFromObject = function (obj) {

        return new datadomain.Floor(
            obj.id,
            new datadomain.FloorObjectFactory().createCollectionFromArray(obj.floorObjects)
        );

    };

});
