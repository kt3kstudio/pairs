const { toPromise, flatten } = require('../rx')

describe('Rx', () => {
  describe('helpers', () => {
    describe('isFlatMappable', () => {
      it('checkes if the given object is flatMappable', () => {
        expect(Rx.helpers.isObservableLike(new Promise(() => {}))).to.be.true
        expect(Rx.helpers.isObservableLike(Rx.Observable.of(1))).to.be.true

        expect(Rx.helpers.isObservableLike(1)).to.be.false
        expect(Rx.helpers.isObservableLike('string')).to.be.false
        expect(Rx.helpers.isObservableLike([])).to.be.false
      })
    })
  })

  describe('Observable', () => {
    describe('pipe', () => {
      it('returns Observable', () => {
        expect(Rx.Observable.of(1).pipe(x => x)).to.be.instanceof(Rx.Observable)
      })
    })

    describe('filterNull', () => {
      it('filters null equivalents', done => {
        Rx.Observable.of(1, null, 2, undefined, 3).filterNull().toArray().forEach(x => {
          expect(x).to.eql([1, 2, 3])

          done()
        })
      })
    })
    describe('emitInto', () => {
      it('supposes the observable is the stream of the event and emit them into the given element', done => {
        var elem = $('<div />')

        elem.on('click', () => {
          done()
        })

        Rx.Observable.of(1).map('click').emitInto(elem)
      })
    })
  })
})

describe('Array', () => {
  describe('toFlatStream', () => {
    it('returns a stream', () => {
      expect([1, 2, new Promise(() => {})].toFlatStream()).to.be.instanceof(Rx.Observable)
    })
  })
})

describe('flatten', () => {
  it('returns Observable', () => {
    expect(flatten(Rx.Observable.of(1, new Promise(() => {})))).to.be.instanceof(Rx.Observable)
  })

  it('flattens stream values if they are Observable or Promise', done => {
    flatten(Rx.Observable.of(10, Rx.Observable.of(20, 30), Promise.resolve(40))).toArray().forEach(x => {
      expect(x).to.eql([10, 20, 30, 40])

      done()
    })
  })
})

describe('toPromise', () => {
  it('returns a promise', () => {
    expect(toPromise(Rx.Observable.of(1))).to.be.instanceof(Promise)
  })

  it('returns a promise which resolves with the last value', () => {
    return toPromise(Rx.Observable.of(1, 2, 3, 7)).then(x => {
      expect(x).to.equal(7)
    })
  })

  it('returns a promise which resolves with undefined when observable is empty', () => {
    return toPromise(Rx.Observable.empty()).then(x => {
      expect(x).to.be.undefined
    })
  })
})
