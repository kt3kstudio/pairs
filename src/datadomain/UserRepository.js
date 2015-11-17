datadomain.UserRepository = subclass(function (pt) {
  'use strict'

  var KEY = 'LD-user-key'

  pt.save = function (user) {
    return infrastructure.storage.set(KEY, user).then(function () {
      return user

    })

  }

  pt.get = function () {
    return infrastructure.storage.get(KEY, {}).then(function (data) {
      return new datadomain.UserFactory().createFromObject(data)

    })

  }

})
