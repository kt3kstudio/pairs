


datadomain.LevelLock = subclass(function (pt) {
    'use strict';

    pt.constructor = function (levelId, locked) {

        this.levelId = levelId;
        this.locked = locked;

    };

    pt.isLocked = function () {

        return this.locked;

    };

    pt.unlock = function () {

        this.locked = false;

    };

});
