'use strict'

describe('Rx', function () {
  describe('helpers', function () {
    describe('isFlatMappable', function () {
      it('checkes if the given object is flatMappable', function () {
        expect(Rx.helpers.isObservableLike(new Promise(function () {}))).to.be.true()
        expect(Rx.helpers.isObservableLike(Rx.Observable.of(1))).to.be.true()

        expect(Rx.helpers.isObservableLike(1)).to.be.false()
        expect(Rx.helpers.isObservableLike('string')).to.be.false()
        expect(Rx.helpers.isObservableLike([])).to.be.false()

      })

    })

  })

  describe('Observable', function () {
    describe('pipe', function () {
      it('returns Observable', function () {
        expect(Rx.Observable.of(1).pipe(function (x) { return x; })).to.be.instanceof(Rx.Observable)

      })

    })

    describe('flattenObservable', function () {
      it('returns Observable', function () {
        expect(Rx.Observable.of(1, new Promise(function () {})).flattenObservable()).to.be.instanceof(Rx.Observable)

      })

      it('flattens stream values if they are Observable or Promise', function (done) {
        Rx.Observable.of(10, Rx.Observable.of(20, 30), Promise.resolve(40)).flattenObservable().toArray().forEach(function (x) {
          expect(x).to.eql([10, 20, 30, 40])

          done()

        })

      })

    })

    describe('filterNull', function () {
      it('filters null equivalents', function (done) {
        Rx.Observable.of(1, null, 2, undefined, 3).filterNull().toArray().forEach(function (x) {
          expect(x).to.eql([1, 2, 3])

          done()

        })

      })

    })

    describe('getPromise', function () {
      it('returns a promise', function () {
        expect(Rx.Observable.of(1).getPromise()).to.be.instanceof(Promise)

      })

      it('returns a promise which resolves with the last value', function (done) {
        Rx.Observable.of(1, 2, 3, 7).getPromise().then(function (x) {
          expect(x).to.equal(7)

          done()

        })

      })

      it('returns a promise which resolves with undefined when observable is empty', function (done) {
        Rx.Observable.empty().getPromise().then(function (x) {
          expect(x).to.be.undefined

          done()

        })

      })

    })

    describe('emitInto', function () {
      it('supposes the observable is the stream of the event and emit them into the given element', function (done) {
        var elem = $('<div />')

        elem.on('click', function () {
          done()

        })

        Rx.Observable.of(1).map('click').emitInto(elem)

      })

    })

  })

})

describe('Array', function () {
  describe('toFlatStream', function () {
    it('returns a stream', function () {
      expect([1, 2, new Promise(function () {})].toFlatStream()).to.be.instanceof(Rx.Observable)
    })

  })

})
