'use strict'

describe('wait', function () {
  it('returns a promise which resolves after given time', function () {
    var p = wait(250)
    var t = +new Date()

    expect(p).to.be.instanceof(Promise)

    return p.then(function () {
      expect(+new Date() - t).to.be.within(250, 400)

    })

  })
})

describe('$', function () {
  describe('streamOf', function () {
    it('returns the stream of the events', function (done) {
      var $dom = $(document.body)

      var stream = $dom.streamOf('an-event')

      expect(stream).to.be.instanceof(Rx.Observable)

      stream.forEach(function () {
        done()

      })

      $dom.trigger('an-event')

    })

  })

})

describe('commaNumber', function () {
  it('Add a comma to separate each group of three digits in a text.', function () {
    expect(window.commaNumber(1)).to.equal('1')
    expect(window.commaNumber(12)).to.equal('12')
    expect(window.commaNumber(123)).to.equal('123')
    expect(window.commaNumber(1234)).to.equal('1,234')
    expect(window.commaNumber(12345)).to.equal('12,345')
    expect(window.commaNumber(123456)).to.equal('123,456')
    expect(window.commaNumber(1234567)).to.equal('1,234,567')
    expect(window.commaNumber(12345678)).to.equal('12,345,678')
    expect(window.commaNumber(123456789)).to.equal('123,456,789')
    expect(window.commaNumber(1234567890)).to.equal('1,234,567,890')
    expect(window.commaNumber(12345678901)).to.equal('12,345,678,901')
    expect(window.commaNumber(123456789012)).to.equal('123,456,789,012')
  })
})

describe('util.chainPromise', function () {
  it('chains the items of the array by tranforming them into promises using the given function', function () {
    var x550 = false
    var x650 = false

    wait(550).then(function () { x550 = true; })
    wait(650).then(function () { x650 = true; })

    return util.chainPromise([100, 200, 300], function (n) {
      return wait(n)

    }).then(function () {
      expect(x550).to.be.true
      expect(x650).to.be.false

    })

  })

})
