import DirStateImageMap from '../../../src/domain/common/dir-state-image-map'
import {Image} from 'spn'

describe('DirStateImageMap', () => {

    let image, dirStateImageMap

    beforeEach(() => {

        image = new Image('foo.png')

        dirStateImageMap = new DirStateImageMap()
        dirStateImageMap.addImageByDirState(image, 'up', 'run')

    })

    describe('get', () => {

        it('gets the corresponding image for the dir and state', () => {

            expect(dirStateImageMap.get('up', 'run')).to.equal(image)

        })

        it('throws when the corresponding image does not exist', () => {

            expect(() => dirStateImageMap.get('down', 'run')).to.throw()
            expect(() => dirStateImageMap.get('up', 'stay')).to.throw()

        })

    })

})
