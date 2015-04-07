

/**
 * @class
 * MaLocateService class provide the functionality to move character among the doors in a floor.
 */
domain.map.CharLocateService = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {domain.map.Wall} wall
     * @param {domain.common.CharSprite} chr
     */
    pt.constructor = function (wall, chr) {

        this.wall = wall;
        this.chr = chr;

    };

    /**
     * Makes the character appear in the scene
     *
     * @return {Promise}
     */
    pt.charAppear = function () {
        var wo = this.wall.findById(this.chr.getPosition().floorObjectId);
        this.current = wo;
        var chr = this.chr;

        var x = wo.centerX();
        var y = wo.centerY();

        chr.x = x;
        chr.y = y;

        return wo.open().then(function () {
            chr.appear();
        });
    };

    /**
     * @param {String} name TODO: this should be changed to id
     */
    pt.moveToWallObjectByName = function (name) {
        return this.moveToWallObject(this.wall.findById(name));
    };

    /**
     * Moves the character sprite to wall object
     *
     * @param {domain.map.WallObject} wo The wall object to go to
     * @return {Promise}
     */
    pt.moveToWallObject = function (wo) {
        var that = this;

        var current = this.wall.findById(this.chr.getPosition().floorObjectId);

        this.chr.setFloorObjectId(wo.id);

        var goOutDur = 400;
        var moveOnCorridor = 1000;
        var goIntoDur = 400;

        var goOutDistance = 80;

        if (!this.wall.visible(this.chr)) {
            this.wall.scrollSet(current.centerX());
        }

        current.close();

        return this.chr.moveTo('y', this.wall.groundLevel + goOutDistance, goOutDur).then(function () {

            that.wall.scrollTo(wo.centerX(), moveOnCorridor);

            wo.open();

            return that.chr.moveTo('x', wo.centerX(), moveOnCorridor);

        }).then(function () {

            return that.chr.moveTo('y', wo.centerY(), goIntoDur);

        }).then(function () {

            that.current = wo;

            return that.chr.turn('down');

        });
    };

    /**
     * Gets the character into the door.
     */
    pt.getIntoDoor = function () {
        var that = this;

        this.chr.turn('up');

        return this.chr.disappear().then(function () {
            return that.current.close();
        });
    };

    /**
     * Loads the character's position.
     */
    pt.load = function () {
        var that = this;

        return this.chr.sync().then(function () {

            return that;

        });
    };

});
