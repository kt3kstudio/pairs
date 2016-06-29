import BackgroundService from '../../../src/ui/common/background-service'

describe('BackgroundService', function () {
  'use strict'

  describe('turnBlack', function () {
    it('adds the dark-bg class to the body and returns a promise', function () {
      $('body').removeClass('dark-bg')

      var p = BackgroundService.turnBlack()

      expect($('body').hasClass('dark-bg')).to.be.true
      expect(p).to.be.instanceof(Promise)
    })
  })

  describe('turnWhite', function () {
    it('removes the dark-bg class from the body and returns a promise', function () {
      $('body').addClass('dark-bg')

      var p = BackgroundService.turnWhite()

      expect($('body').hasClass('dark-bg')).to.be.false
      expect(p).to.be.instanceof(Promise)
    })
  })
})
