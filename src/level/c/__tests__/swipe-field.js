describe('SwipeField', function () {
  'use strict'

  let elem

  beforeEach(function () {
    elem = $('<div />')

    elem.cc.init('swipe-field')
  })

  it('binds swipe events on the element', function (done) {
    let c = 0

    elem.on('swipeup swipedown swipeleft swiperight', function () {
      c++

      if (c === 4) {
        done()
      }
    })

    $(document).trigger('upkey')
    $(document).trigger('downkey')
    $(document).trigger('leftkey')
    $(document).trigger('rightkey')
  })
})
