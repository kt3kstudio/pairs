const CharacterPositionFactory = require('../character-position-factory')
const CharacterPosition = require('../character-position')

describe('CharacterPositionFactory', () => {
  'use strict'

  const factory = new CharacterPositionFactory()

  describe('createStartPosition', () => {
    it('creates a characterPosition of 701 at the floor 7', () => {
      const position = factory.createStartPosition()

      expect(position).to.be.instanceof(CharacterPosition)

      expect(position.floorId).to.equal('7')
      expect(position.floorObjectId).to.equal('701')
    })
  })

  describe('createFromObject', () => {
    it('creates a characterPosition according to the give object', () => {
      const position = factory.createFromObject({
        floorId: '8',
        floorObjectId: '802'
      })

      expect(position).to.be.instanceof(CharacterPosition)

      expect(position.floorId).to.equal('8')
      expect(position.floorObjectId).to.equal('802')
    })
  })
})
