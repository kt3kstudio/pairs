import { wait } from 'spn'
const Dur = 700

/**
 * BackgroundService handles the animation of background colors.
 */
export default class BackgroundService {

  /**
   * Turns the bg color white.
   *
   * @param {Number} dur The duration
   * @return {Promise}
   */
  static turnWhite (dur) {
    return this.turn('', dur, false)
  }

  /**
   * Turns the bg color white.
   *
   * @param {Number} dur The duration
   * @return {Promise}
   */
  static turnBlack (dur) {
    return this.turn('', dur, true)
  }

  /**
   * Turns the bg color to the given color.
   *
   * @private
   * @param {String} color The color in css color
   * @param {Number} dur The duration
   * @param {Boolean} darkBg True if use dark background format
   * @return {Promise}
   */
  static turn (color, dur, darkBg) {
    dur = dur || Dur

    $(document.body).toggleClass('dark-bg', darkBg).css('background-color', color)

    return wait(dur)
  }

}
