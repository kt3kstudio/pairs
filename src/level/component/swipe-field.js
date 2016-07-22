const {component} = $.cc

/**
 * SwipeEvent class provides the stream of the swipe events.
 */
@component('swipe-field')
class SwipeField {
  constructor (elem) {
    elem.swipeCross()

    $(document).arrowkeys()

    $(document).on('upkey', () => elem.trigger('swipeup'))
    $(document).on('downkey', () => elem.trigger('swipedown'))
    $(document).on('leftkey', () => elem.trigger('swipeleft'))
    $(document).on('rightkey', () => elem.trigger('swiperight'))
  }
}

module.exports = SwipeField
