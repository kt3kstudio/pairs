import User from './user'
import UserStatistics from './user-statistics'

const DEFAULT_CHAR_ID = 'ma'

/**
 * Factory class of User
 */
export default class UserFactory {

  createFromObject(obj = {}) {

    if (obj.charId == null) {
      obj.charId = DEFAULT_CHAR_ID
    }

    return new User(obj.charId, new UserStatistics(obj.stat))

  }

}
