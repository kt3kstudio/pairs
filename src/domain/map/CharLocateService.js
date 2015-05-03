

/**
 * @class
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 */
domain.map.FloorWalker = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {domain.map.Wall} wall
     * @param {domain.common.CharSprite} chr
     */
    pt.constructor = function (elem) {

        this.chr = new domain.common.Ma(elem);

        this.chr.load();

        this.elem = elem;

        elem.registerActor(this);

        this.bindWalkEvent();

    };

    /**
     * Makes the character appear in the scene
     *
     * @param {domain.map.WallObject}
     * @return {Promise}
     */
    pt.appearAt = function (wo) {

        this.current = wo;

        var chr = this.chr;

        chr.x = wo.centerX();
        chr.y = wo.centerY();

        return chr.loaded().then(function () {

            return wo.open();

        }).then(function () {

            return chr.appear();

        });

    };

    pt.bindWalkEvent = function () {

        var that = this;

        this.elem.on('door-knock', function (e, wo) {

            that.moveToWallObject(wo);

        });

    };

    pt.getPosition = function () {

        return this.chr.getPosition();

    };


    pt.setPosition = function (position) {

        return this.chr.setPosition(position);

    };


    /**
     * Moves the character sprite to wall object
     *
     * @param {domain.map.WallObject} wo The wall object to go to
     * @return {Promise}
     */
    pt.moveToWallObject = function (wo) {
        var that = this;

        var current = this.current;

        this.chr.setFloorObjectId(wo.id);

        var wall = $.getActor('.wall');

        var goOutDur = 400;
        var moveOnCorridor = 1000;
        var goIntoDur = 400;

        var goOutDistance = 80;

        if (!wall.visible(this.chr)) {
            wall.scrollSet(current.centerX());
        }

        current.close();

        return this.chr.moveTo('y', wall.groundLevel + goOutDistance, goOutDur).then(function () {

            wall.scrollTo(wo.centerX(), moveOnCorridor);

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

});


$.assignClass('floor-walker', domain.map.FloorWalker);
