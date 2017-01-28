const td = require('testdouble')

const Location = require('../location')
const Character = require('../character')
const CharacterPosition = require('../character-position')
const LevelKey = require('../level-key')
const LevelKeyCollection = require('../level-key-collection')

describe('CharacterRepository', () => {
  const repo = new Character.Repository()
  const factory = new Character.Factory()

  beforeEach(() => {
    td.replace(infrastructure.storage, 'get')
    td.replace(infrastructure.storage, 'set')
  })

  afterEach(() => {
    td.reset()
  })

  describe('save', () => {
    it('saves the character', () => {
      const character = new Character('ma')

      td.when(infrastructure.storage.set('character-ma', td.matchers.anything())).thenReturn(Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })

    it('saves the character\'s position and keys', () => {
      const character = new Character('ma', 'Ma', new CharacterPosition('7', '701'), new LevelKeyCollection([new LevelKey('702')]))

      td.when(infrastructure.storage.set('character-ma', td.matchers.anything())).thenReturn(Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })

    it('saves the character\'s tower location', () => {
      const location = new Location({
        place: Location.PLACE.TOWER,
        detail: new Location.TowerLocationDetail({
          floorId: '1',
          assetId: 'entrance'
        })
      })

      const character = factory.createFromObject({id: 'ma', location})

      td.when(infrastructure.storage.set('character-ma', td.matchers.isA(Object))).thenReturn(Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })

    it('saves the character\'s road location', () => {
      const location = new Location({
        place: Location.PLACE.ROAD,
        detail: new Location.RoadLocationDetail({
          place: Location.PLACE.TOWER
        })
      })

      const character = factory.createFromObject({id: 'ma', location})

      td.when(infrastructure.storage.set('character-ma', td.matchers.isA(Object))).thenReturn(Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })
  })

  describe('getById', () => {
    it('gets a character by the id', () => {
      td.when(infrastructure.storage.get('character-ma', td.matchers.anything())).thenReturn(Promise.resolve({id: 'ma'}))

      td.when(infrastructure.storage.get('level-history-ma-7', [])).thenReturn(Promise.resolve([]))

      td.when(infrastructure.storage.get('playing-state-ma', null)).thenReturn(Promise.resolve([]))

      td.when(infrastructure.storage.get('level-lock-ma-7', [])).thenReturn(Promise.resolve([]))

      return repo.getById('ma').then(character => expect(character).to.be.instanceof(Character))
    })
  })
})
