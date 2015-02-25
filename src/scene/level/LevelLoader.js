/**
 * LevelLoader loads level information.
 *
 * @class
 */
scene.level.LevelLoader = subclass(scene.common.Scene, function (pt) {
    'use strict';


    /**
     * @constructor
     */
    pt.constructor = function () {

        this.lvRepo = new datadomain.LevelRepository();
        this.charPosRepo = new datadomain.CharPositionRepository();
        this.chr = new domain.common.Ma();

    };


    /**
     * Starts the scene.
     */
    pt.start = function () {
        var that = this;

        this.charPosRepo.getCharPosition(this.chr.name).then(function (charPos) {

            return that.lvRepo.getById(charPos.floorObjectId);

        }).then(function (level) {

            that.level = level;

            that.finish();

        });
    };

});
