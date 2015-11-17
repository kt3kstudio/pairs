/**
 * The repository of Level.
 */
datadomain.LevelRepository = subclass(function (pt) {
  'use strict'

  /**
   * Gets the level by the id.
   *
   * @param {String} id The id
   * @return {Promise}
   */
  pt.getById = function (id) {
    var that = this

    return new Promise(function (resolve) {
      $.getJSON(that.levelUrl(id)).then(function (data) {
        resolve(new datadomain.LevelFactory().createFromObject(data))

      })

    })
  }

  /**
   * Gets the url of the level
   *
   * @private
   * @param {String} id The id of the level
   * @return {String} The url of the level
   */
  pt.levelUrl = function (id) {
    return 'data/level/' + id + '.json'
  }

})
