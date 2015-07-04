


/**
 * Character data interface on the screen (experimental).
 */
domain.data.Character = $.defineRole('character-repository', function (pt, parent) {
    'use strict';

    var ONE = {};

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.repository = new datadomain.CharacterRepository();

        this.elem.mapEvent(this, ONE);

    };


    ONE['load-character'] = 1;
    pt['load-character'] = function (e, charId) {

        var that = this;

        return this.repository.getById(charId).then(function (character) {

            that.character = character;

            var ev = $.Event('character-loaded', {character: character});

            that.elem.trigger(ev);

        });

    };

    ONE['set-character-position'] = 1;
    pt['set-character-position'] = function (e, position) {

        this.character.position = position;

        return this.save(this.character);

    };

    ONE['set-character-floor-object-id'] = 1;
    pt['set-character-floor-object-id'] = function (e, floorObjectId) {

        this.character.position.floorObjectId = floorObjectId;

        return this.save(this.character);

    };

    pt.save = function (character) {

        return this.repository.save(character);

    };

});
