/**
 * SwipeEvent class provides the stream of the swipe events.
 */
ui.level.SwipeField = subclass($.cc.Coelement, function (pt, parent) {
    'use strict'

    pt.constructor = function (elem) {
        parent.constructor.apply(this, arguments)

        this.elem.swipeCross()
        $(document).arrowkeys()

        $(document).on('upkey', function () { elem.trigger('swipeup') })
        $(document).on('downkey', function () { elem.trigger('swipedown') })
        $(document).on('leftkey', function () { elem.trigger('swipeleft') })
        $(document).on('rightkey', function () { elem.trigger('swiperight') })
    }
})

$.cc.assign('swipe-field', ui.level.SwipeField)
