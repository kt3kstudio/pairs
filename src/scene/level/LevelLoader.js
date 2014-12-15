/**
 * @class
 * LevelLoader loads level information.
 */
scene.level.LevelLoader = (function () {
    'use strict';

    var exports = function () {
        this.lvRepo = new datadomain.LevelRepository();
        this.charPosRepo = new datadomain.CharPositionRepository();
    };

    var llPt = exports.prototype = new scene.common.Scene();

    llPt.start = function () {
        var that = this;

        this.getCharPosition().then(function (charPos) {

            return that.getLevel(charPos.level);

        }).then(function (level) {

            that.level = level;

            that.finish();

        });
    };

    llPt.getCharPosition = function () {
        return this.charPosRepo.getCharPosition();
    };

    llPt.getLevel = function (level) {
        return this.lvRepo.loadByLevel(level);
    };

    return exports;

}());
