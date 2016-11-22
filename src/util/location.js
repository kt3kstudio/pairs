const { Location } = require('../domain')
const { ROAD, ROOM, TOWER } = Location.PLACE

const PATHS = {
  [ROAD]: ['/road.html'],
  [ROOM]: ['/room.html'],
  [TOWER]: ['/floor.html', '/level.html']
}
/**
 * Checks the current location and move to the different place if necessary.
 * @param {Location} location domain model location
 * @param {Object} windowLocation window.location
 * @return {Promise}
 */
exports.checkLocation = (location, windowLocation) => {
  const place = location.place
  const pathname = windowLocation.pathname

  return new Promise(resolve => {
    const paths = PATHS[place]

    if (paths.some(path => pathname.includes(path))) {
      resolve()
      return
    }

    windowLocation.replace(global.BASEPATH + paths[0])
  })
}
