const User = require('./user')
const UserStatistics = require('./user-statistics')

const DEFAULT_CHAR_ID = 'ma'

/**
 * Factory class of User
 */
class UserFactory {
  createFromObject (obj = {}) {
    if (obj.charId == null) {
      obj.charId = DEFAULT_CHAR_ID
    }

    return new User(obj.charId, new UserStatistics(obj.stat))
  }
}

module.exports = UserFactory
