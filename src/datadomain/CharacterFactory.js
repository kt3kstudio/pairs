



/**
 * The factory of Character.
 */
datadomain.CharacterFactory = subclass(function (pt) {
    'use strict';


    /**
     * Creates a character from the object
     *
     * @param {Object} obj The object
     * @return {datadomain.Character}
     */
    pt.createFromObject = function (obj) {

        return datadomain.Character(
            obj.id,
            obj.name,
            new datadomain.CharPositionFactory().createFromObject(obj.position),
            new datadomain.LevelHistoryFactory().createCollectionFromArray(obj.histories)
        );

    };

});
