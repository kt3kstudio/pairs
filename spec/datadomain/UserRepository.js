describe('UserRepository', function () {
  'use strict'

  beforeEach(function () {
    window.infrastructure = {}

    window.infrastructure.storage = {
      get: spy(function () {}),
      set: spy(function () {})
    }

    this.repo = new datadomain.UserRepository()
  })

  describe('save', function () {
    it('calls the set of the infrastructure', function () {
      var user = new datadomain.UserFactory().createFromObject({})

      when(infrastructure.storage.set)().then(function () {
        return Promise.resolve({})
      })

      return this.repo.save(user).then(function (user) {
        expect(user).to.be.instanceof(datadomain.User)

        verify(infrastructure.storage.set)('LD-user-key')
      })
    })
  })

  describe('get', function () {
    it('gets the User', function () {
      when(infrastructure.storage.get)('LD-user-key').then(function () {
        return Promise.resolve({charId: 'ma'})
      })

      return this.repo.get().then(function (user) {
        expect(user).to.be.instanceof(datadomain.User)
        expect(user.charId).to.equal('ma')
      })
    })
  })
})
