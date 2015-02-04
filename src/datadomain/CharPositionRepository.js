
/**
 * @class
 * CharPositionRepository handles the persistence of CharPosition data
 */
datadomain.CharPositionRepository = subclass(function (pt) {
    'use strict';

    var CHAR_POSITION_KEY = '-char-position';

    /**
     * @constructor
     */
    pt.constructor = function () {

        this.factory = new datadomain.CharPositionFactory();

    };

    pt.getCharPosition = function (name) {

        var that = this;

        return infrastructure.storage.get(this.createKey(name), null).then(function (data) {

            return data ? that.factory.createFromObject(data)
                        : that.factory.createStartPosition();
        });

    };

    pt.setCharPosition = function (name, position) {
        return infrastructure.storage.set(this.createKey(name), position.toObject());
    };

    pt.createKey = function (name) {
        return name + CHAR_POSITION_KEY;
    };

});
