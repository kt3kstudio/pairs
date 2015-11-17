describe('$', function () {
  'use strict'

  describe('setPosition', function () {
    it('sets the left and top property of the element', function () {
      var div = $('<div />')

      div.setPosition({left: 100, top: 160})

      expect(div.css('left')).to.equal('100px')
      expect(div.css('top')).to.equal('160px')

    })

  })

})
