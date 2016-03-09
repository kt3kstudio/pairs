import UserFactory from './user-factory'

const KEY = 'LD-user-key'

/**
 * The repository class for the user model.
 */
export default class UserRepository {

    /**
     * Saves the user.
     */
    save(user) {

        return infrastructure.storage.set(KEY, user).then(() => user)
    }

    /**
     * Gets the user.
     */
    get() {

        return infrastructure.storage.get(KEY, {}).then(data => new UserFactory().createFromObject(data))

    }

}
