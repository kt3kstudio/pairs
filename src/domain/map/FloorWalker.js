

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.map.FloorWalker = subclass(domain.common.CharSprite, function (pt, parent) {
    'use strict';

    var ON = {};

    /**
     * @constructor
     * @param {jQuery} elem
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

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

        this.x = wo.centerX();
        this.y = wo.centerY();

        var that = this;

        return wo.open().then(function () {

            return that.appear();

        });

    };

    ON['door-knock'] = 1;
    pt['door-knock'] = function (e, wo) {

        this.moveToWallObject(wo);

    };


    pt.getPosition = function () {

        return {
            floorId: this.elem.attr('floor-id'),
            floorObjectId: this.elem.attr('floor-object-id')
        };

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

        this.elem.trigger('set-character-floor-object-id', wo.id);

        var goOutDur = 150;
        var moveOnCorridor = 300;
        var goIntoDur = goOutDur;

        var goOutDistance = 80;

        this.elem.trigger('character-focus', [current.centerX()]);

        current.close();

        return this.moveTo('y', current.centerY() + goOutDistance, goOutDur).then(function () {

            that.elem.trigger('character-move', [wo.centerX(), moveOnCorridor]);

            wo.open();

            return that.moveTo('x', wo.centerX(), moveOnCorridor);

        }).then(function () {

            return that.moveTo('y', wo.centerY(), goIntoDur);

        }).then(function () {

            that.current = wo;

            wo.onGetWalker(that);

            return that.turn('down');

        });

    };


    /**
     * Gets the character into the door.
     */
    pt.getIntoDoor = function () {
        var that = this;

        this.turn('up');

        return this.disappear().then(function () {

            return that.current.close();

        });
    };

});


$.assignClassComponent('floor-walker', domain.map.FloorWalker);
