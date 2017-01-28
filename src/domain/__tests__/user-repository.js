const UserRepository = require('../user-repository')
const UserFactory = require('../user-factory')
const User = require('../user')
const UserStatistics = require('../user-statistics')

describe('UserRepository', () => {
  const repo = new UserRepository()
  const origGet = infrastructure.storage.get
  const origSet = infrastructure.storage.set

  beforeEach(() => {
    infrastructure.storage.get = spy(() => {})
    infrastructure.storage.set = spy(() => {})
  })

  afterEach(() => {
    infrastructure.storage.get = origGet
    infrastructure.storage.set = origSet
  })

  describe('save', () => {
    it('calls the set of the infrastructure', () => {
      const user = new UserFactory().createFromObject({})

      when(infrastructure.storage.set)().then(() => Promise.resolve({}))

      return repo.save(user).then(user => {
        expect(user).to.be.instanceof(User)

        verify(infrastructure.storage.set)('LD-user-key')
      })
    })
  })

  describe('get', () => {
    it('gets the User', () => {
      when(infrastructure.storage.get)('LD-user-key').then(() => Promise.resolve({charId: 'ma'}))

      return repo.get().then(user => {
        expect(user).to.be.instanceof(User)
        expect(user.charId).to.equal('ma')

        expect(user.stat).to.be.instanceof(UserStatistics)
      })
    })
  })
})
