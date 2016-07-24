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
}

module.exports = LevelKeyCollection
