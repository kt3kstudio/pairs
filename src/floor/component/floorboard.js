import {wait, Being} from 'spn'

const {component} = $.cc
const FLOORBOARD_MOVE_DUR = 400
const HEIGHT_RATE = 0.35

/**
 * Floor class handles the behaviour of floor of the Map view
 */
@component('floorboard')
export default class Floorboard extends Being {

  static get HEIGHT_RATE() {

    return 0.35

  }

  /**
   * Returns the y coordinate of the ground line.
   *
   * @return {Number}
   */
  static groundLevel() {

    return $(window).height() * (1 - HEIGHT_RATE)

  }

  /**
   * Returns the visual height of the ground on the screen.
   *
   * @return {Number}
   */
  static groundHeight() {

    return $(window).height() * HEIGHT_RATE

  }

  willShow() {

    this.elem.css('height', this.constructor.groundHeight())
    this.elem.css('top', this.constructor.groundLevel())
    this.elem.css('transform', 'scale(1)')

    return wait(FLOORBOARD_MOVE_DUR)

  }

  willHide() {

    this.elem.css('transform', 'scale(1, 0)')

    return wait(FLOORBOARD_MOVE_DUR)

  }

}
