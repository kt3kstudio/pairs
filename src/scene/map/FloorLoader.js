

/**
 * FloorLoader loads the floor data according to the current position of the character.
 */
scene.map.FloorLoader = subclass(scene.common.Scene, function (pt) {
    'use strict';

    pt.constructor = function () {

        this.charRepo = new datadomain.CharacterRepository();
        this.floorRepo = new datadomain.FloorRepository();
        this.chr = new domain.common.Ma();

    };

    pt.start = function () {

        var that = this;

        this.charRepo.getById(this.chr.name).then(function (character) {

            that.chr.character = character;

            return that.floorRepo.getById(character.position.floorId);

        }).then(function (floor) {

            that.floor = floor;

            that.finish();

        });
    };

});
