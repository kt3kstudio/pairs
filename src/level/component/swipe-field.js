const {component} = $.cc
const { trigger } = require('../../util')

/**
 * SwipeEvent class provides the stream of the swipe events.
 */
@component
class SwipeField {
  __init__ () {
    const elem = this.$el

    elem.swipeCross()

    $(document).arrowkeys()

    $(document).on('upkey', () => trigger(elem, 'swipeup'))
    $(document).on('downkey', () => trigger(elem, 'swipedown'))
    $(document).on('leftkey', () => trigger(elem, 'swipeleft'))
    $(document).on('rightkey', () => trigger(elem, 'swiperight'))
  }
}

module.exports = SwipeField
