const td = require('testdouble')

const { Location } = require('../../domain')
const { checkLocation } = require('../location')

describe('checkLocation', () => {
  it('resolves when the given location is the same as the current window.location', done => {
    const windowLocation = td.object({replace () {}})
    windowLocation.pathname = '/floor.html'

    checkLocation(new Location({place: Location.PLACE.TOWER}), windowLocation).then(() => {
      done()
    })
  })

  it('does not resolve when the given location is not the same as the current window.location', done => {
    const windowLocation = td.object({replace () {}})
    windowLocation.pathname = '/road.html'

    checkLocation(new Location({place: Location.PLACE.TOWER}), windowLocation).then(() => {
      done(new Error('checkLocation does not resolve'))
    })

    setTimeout(() => done(), 100)
  })

  it('calls window.location.replace() when the given location is not the same as the current window.location', () => {
    const windowLocation = td.object({replace () {}})
    windowLocation.pathname = '/road.html'

    checkLocation(new Location({place: Location.PLACE.TOWER}), windowLocation)

    td.verify(windowLocation.replace('/floor.html'))
  })
})
