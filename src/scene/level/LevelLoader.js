/**
 * @class
 * LevelLoader loads level information.
 */
scene.level.LevelLoader = subclass(scene.common.Scene, function (pt) {
    'use strict';

    pt.constructor = function () {
        this.lvRepo = new datadomain.LevelRepository();
        this.charPosRepo = new datadomain.CharPositionRepository();
        this.chr = new domain.common.Ma();
    };


    pt.start = function () {
        var that = this;

        this.getCharPosition().then(function (charPos) {

            return that.getLevel(charPos.getLevel());

        }).then(function (level) {

            that.level = level;

            that.finish();

        });
    };


    pt.getCharPosition = function () {
        return this.charPosRepo.getCharPosition(this.chr.name);
    };


    pt.getLevel = function (level) {
        return this.lvRepo.loadByLevel(level);
    };

});
