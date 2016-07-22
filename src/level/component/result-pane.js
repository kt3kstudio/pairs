const {wait, Body} = require('spn')
const {div, ul, li} = require('dom-gen')

const {component} = $.cc

/**
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 */
@component('result-pane')
class ResultPane extends Body {
  /**
   * Sets the score.
   * @param {number} score The score to set
   */
  setScore (score) {
    this.score = score
  }

  /**
   * @param {boolean} isSuccess True iff the result is successful
   */
  setSuccess (isSuccess) {
    this.isSuccess = isSuccess
  }

  /**
   * Sets the number of the stars.
   * @param {number} star The number of stars
   */
  setStar (star) {
    this.star = star
  }

  /**
   * @override
   */
  willShow () {
    this.elem.append(
      div({addClass: 'result-content', css: {opacity: 0, position: 'relative'}},
        ul(
          li('score: ' + this.score),
          li('success: ' + this.isSuccess)
        )
      )
    )

    return super.willShow()
  }

  /**
   * Shows the result pane and it automatically hides timeout later.
   *
   * @param {number} timeout The time after which the pane hides itself
   * @return {Promise} The promise which resolves when the pane hides
   */
  show (timeout) {
    return super.show().then(() => this.showInfoPane(timeout))
  }

  /**
   * Shows the info pane with the given timeout.
   * @param {Number} timeout
   * @return {Promise}
   */
  showInfoPane (timeout) {
    return this.elem.attr({m: 9, n: 7}).cc.init('multiflip').show()

    .then(() => Promise.race([wait(timeout), this.elem.once('click touchstart')]))

    .then(() => this.elem.cc.get('multiflip').hide())
  }
}

module.exports = ResultPane
