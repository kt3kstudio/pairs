const UserRepository = require('../../src/domain/user-repository')
const UserFactory = require('../../src/domain/user-factory')
const User = require('../../src/domain/user')

describe('UserRepository', () => {
  let repo

  beforeEach(() => {
    window.infrastructure = {}

    window.infrastructure.storage = {
      get: spy(() => {}),
      set: spy(() => {})
    }

    repo = new UserRepository()
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
      })
    })
  })
})
