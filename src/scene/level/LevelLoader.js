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
        this.charRepo = new datadomain.CharacterRepository();

    };


    /**
     * Starts the scene.
     */
    pt.start = function () {

        var that = this;

        return this.charRepo.getById('ma').then(function (character) {

            that.character = character;

            that.charSprite = new domain.common.CharSpriteFactory().createFromCharacter(character);

            window.character = character;

            return that.lvRepo.getById(character.position.floorObjectId);

        }).then(function (level) {

            that.level = level;

            window.level = level;

            that.finish();

        });
    };

});
