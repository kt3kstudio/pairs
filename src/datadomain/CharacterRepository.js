


/**
 * The repository of Character.
 *
 */
datadomain.CharacterRepository = subclass(function (pt) {
    'use strict';

    var STORAGE_KEY = 'character-';

    /**
     * Saves the character.
     *
     * @param {datadomain.Character} character The Character
     * @return {Promise}
     */
    pt.save = function (character) {

        var obj = this.toObject(character);

        return infrastructure.storage.set(STORAGE_KEY + character.id, obj).then(function () {

            return character;

        });

    };


    /**
     * Gets a character by the id.
     *
     * @param {String} id The id
     * @return {Promise} A promise of a character
     */
    pt.getById = function (id) {

        return infrastructure.storage.get(STORAGE_KEY + id, null).then(function (obj) {

            var character;

            var factory = new datadomain.CharacterFactory();

            if (obj == null) {

                character = factory.createInitialById(id);

            } else {

                character = factory.createFromObject(obj);

            }

            return Promise.all([

                character,
                character.reloadHistories(),
                character.reloadPlayingState()

            ]);

        }).then(function (array) {

            return array[0];

        });

    };


    /**
     * @private
     * Converts the Character object into js object.
     *
     * @param {datadomain.Character} character The Character
     * @return {Object}
     */
    pt.toObject = function (character) {

        return {

            id: character.id,
            name: character.name,
            position: this.positionToObject(character.position)

        };

    };


    /**
     * @private
     * Converts the CharPosition object into js object.
     *
     * @param {datadomain.CharPosition} position
     * @return {Object}
     */
    pt.positionToObject = function (position) {

        if (position == null) {

            return null;

        }

        return {

            floorId: position.floorId,
            floorObjectId: position.floorObjectId

        };

    };

});
