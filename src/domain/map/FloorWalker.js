

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.map.FloorWalker = subclass(domain.common.CharSprite, function (pt) {
    'use strict';

    /**
     * Makes the character appear in the scene
     *
     * @param {domain.map.FloorAsset} floorAsset The wall object
     * @return {Promise}
     */
    pt.appearAt = function (floorAsset) {

        this.current = floorAsset;

        this.x = floorAsset.centerX();
        this.y = floorAsset.centerY();

        var that = this;

        return floorAsset.open().then(function () {

            return that.appear();

        });

    };

    pt.doorKnock = function (e, floorAsset) {

        this.moveToFloorAsset(floorAsset);

    }.event('door-knock');


    /**
     * Character goes to another floor.
     *
     * @param {Event} e The event object
     */
    pt.characterGoto = function (e) {

        this.character.position.floorId = e.goto.floorId;
        this.character.position.floorObjectId = e.goto.floorObjectId;

        var that = this;

        this.saveCharacter().then(function () {

            that.elem.trigger($.Event('sceneReload'));

        });

    }.event('character-goto');


    /**
     * Gets the character's position.
     *
     * @return {datadomain.CharPosition}
     */
    pt.getPosition = function () {

        return this.character.position;

    };


    /**
     * Sets the floor object id.
     *
     * @param {String} floorObjectId The floor object id
     */
    pt.setFloorObjectId = function (floorObjectId) {

        this.character.position.floorObjectId = floorObjectId;

        this.saveCharacter();

    };


    /**
     * Saves the character data.
     */
    pt.saveCharacter = function () {

        return this.characterRepository.save(this.character);

    };


    /**
     * Moves the character sprite to wall object
     *
     * @param {domain.map.FloorAsset} floorAsset The wall object to go to
     * @return {Promise}
     */
    pt.moveToFloorAsset = function (floorAsset) {

        var that = this;

        var current = this.current;

        this.setFloorObjectId(floorAsset.id);

        var goOutDur = 150;
        var moveOnCorridor = 300;
        var goIntoDur = goOutDur;

        var goOutDistance = 80;

        this.elem.trigger('character-focus', [current.centerX()]);

        current.close();

        return this.moveTo('y', current.centerY() + goOutDistance, goOutDur).then(function () {

            that.elem.trigger('character-move', [floorAsset.centerX(), moveOnCorridor]);

            floorAsset.open();

            return that.moveTo('x', floorAsset.centerX(), moveOnCorridor);

        }).then(function () {

            return that.moveTo('y', floorAsset.centerY(), goIntoDur);

        }).then(function () {

            that.current = floorAsset;

            floorAsset.onGetWalker(that);

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


$.cc.assign('floor-walker', domain.map.FloorWalker);
