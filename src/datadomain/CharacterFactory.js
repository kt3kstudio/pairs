import Character from '../domain/character'

const {subclass} = $.cc

/**
 * The factory of Character.
 */
datadomain.CharacterFactory = subclass(function (pt) {
    'use strict'

    /**
     * Creates a character from the object
     *
     * @param {Object} obj The object
     * @return {Character}
     */
    pt.createFromObject = function (obj) {
        return new Character(
            obj.id,
            obj.name,
            new datadomain.CharPositionFactory().createFromObject(obj.position)
        )
    }

    /**
     * Creates the character of the initial state.
     *
     * @param {String} id The character id
     * @return {Character}
     */
    pt.createInitialById = function (id) {
        if (id === 'ma') {
            return new Character(
                id,
                'Ma',
                new datadomain.CharPositionFactory().createFromObject()
            )
        } else if (id === 'ellen') {
            return new Character(
                id,
                'Ellen',
                new datadomain.CharPositionFactory().createFromObject()
            )
        } else if (id === 'emma') {
            return new Character(
                id,
                'Emma',
                new datadomain.CharPositionFactory().createFromObject()
            )
        }

        throw new Error('unknown character: ' + id)
    }
})
