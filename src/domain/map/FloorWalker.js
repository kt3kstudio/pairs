

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.FloorWalker = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    var ON = {};

    /**
     * @constructor
     * @param {jQuery} elem
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.chr = new domain.common.Ma(elem);

        this.chr.load();

        this.elem.mapEvent(this, ON);

    };

    /**
     * Makes the character appear in the scene
     *
     * @param {domain.map.WallObject} wo The wall object
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

    ON['door-knock'] = 1;
    pt['door-knock'] = function (e, wo) {

        this.moveToWallObject(wo);

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

        var camera = $('.camera').getRole('camera');

        var goOutDur = 150;
        var moveOnCorridor = 300;
        var goIntoDur = goOutDur;

        var goOutDistance = 80;

        this.elem.trigger('character-focus', [this.chr]);

        current.close();

        return this.chr.moveTo('y', current.centerY() + goOutDistance, goOutDur).then(function () {

            that.elem.trigger('character-move', [wo.centerX(), moveOnCorridor]);

            wo.open();

            return that.chr.moveTo('x', wo.centerX(), moveOnCorridor);

        }).then(function () {

            return that.chr.moveTo('y', wo.centerY(), goIntoDur);

        }).then(function () {

            that.current = wo;

            wo.onGetWalker(that);

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


$.assignClassComponent('floor-walker', domain.map.FloorWalker);
