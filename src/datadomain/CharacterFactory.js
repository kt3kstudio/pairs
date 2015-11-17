/**
 * The factory of Character.
 */
datadomain.CharacterFactory = subclass(function (pt) {
  'use strict'

  /**
   * Creates a character from the object
   *
   * @param {Object} obj The object
   * @return {datadomain.Character}
   */
  pt.createFromObject = function (obj) {
    return new datadomain.Character(
      obj.id,
      obj.name,
      new datadomain.CharPositionFactory().createFromObject(obj.position)
    )

  }

  /**
   * Creates the character of the initial state.
   *
   * @param {String} id The character id
   * @return {datadomain.Character}
   */
  pt.createInitialById = function (id) {
    if (id === 'ma') {
      return new datadomain.Character(
        id,
        'Ma',
        new datadomain.CharPositionFactory().createFromObject()
      )

    } else if (id === 'ellen') {
      return new datadomain.Character(
        id,
        'Ellen',
        new datadomain.CharPositionFactory().createFromObject()
      )

    } else if (id === 'emma') {
      return new datadomain.Character(
        id,
        'Emma',
        new datadomain.CharPositionFactory().createFromObject()
      )

    }

    throw new Error('unknown character: ' + id)

  }

})
