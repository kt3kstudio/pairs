/**
 * The collection class of the level key.
 */
class LevelKeyCollection {
  /**
   * @param {LevelKey[]} keys The keys
   */
  constructor (keys = []) {
    this.keys = []
    this.dict = []

    keys.forEach(key => this.add(key))
  }

  /**
   * Adds the key. If the key of the same levelId already exists, does nothing.
   * @param {LevelKey} key The key
   */
  add (key) {
    if (this.has(key)) {
      return
    }

    this.keys.push(key)
    this.dict[key.levelId] = key
  }

  /**
   * Returns true iff it has the key.
   * @param {LevelKey} key The key
   * @return {boolean}
   */
  has (key) {
    return this.dict[key.levelId] != null
  }

  /**
   * @return {boolean}
   */
  hasAny () {
    return this.keys.length > 0
  }

  /**
   * Reduces the level keys by the given 2-arity function starting with the given value.
   * @param {Function} func The reducer
   * @param {any} [init] The initial value
   */
  reduce (func, init) {
    return this.keys.slice(0).reduce(func, init)
  }

  /**
   * Deletes the key by the given level id.
   * @param {string} levelId The level id
   */
  deleteByLevelId (levelId) {
    if (!this.dict[levelId]) {
      return
    }

    this.keys = this.keys.filter(key => key.levelId !== levelId)
    delete this.dict[levelId]
  }
}

module.exports = LevelKeyCollection
