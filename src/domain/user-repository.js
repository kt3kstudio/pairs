const UserFactory = require('./user-factory')

const {storage} = infrastructure
const KEY = 'LD-user-key'

/**
 * The repository class for the user model.
 */
class UserRepository {
  /**
   * Saves the user.
   */
  save (user) {
    return storage.set(KEY, user).then(() => user)
  }

  /**
   * Gets the user.
   */
  get () {
    return storage.get(KEY, {}).then(data => new UserFactory().createFromObject(data))
  }

  /**
   * Coverts the user to an object.
   * @private
   * @param {User}
   * @return {Object}
   */
  toObject (user) {
    return user // TODO: create an object.
  }
}

module.exports = UserRepository
