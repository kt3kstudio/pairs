const LevelKey = require('./level-key')

/**
 * The factory class of LevelKey.
 */
class LevelKeyFactory {
  /**
   * @param {object[]} array The array
   * @return {LevelKey[]}
   */
  createFromArray (array) {
    if (array == null) {
      return []
    }

    return array.map(obj => this.createFromObject(obj))
  }

  /**
   * @param {object} obj The object
   * @return {LevelKey}
   */
  createFromObject (obj) {
    if (obj == null) {
      return null
    }

    return new LevelKey(obj.levelId)
  }
}

module.exports = LevelKeyFactory
