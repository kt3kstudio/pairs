import Grid from '../../../src/domain/common/Grid'
import Sprite from '../../../src/domain/common/Sprite'
import Image from '../../../src/domain/common/Image'
import DirStateImageMap from '../../../src/domain/common/dir-state-image-map'

describe('Sprite', () => {
    'use strict'

    let sprite, elem

    class MySprite extends Sprite {

        constructor(elem) {

            super(elem)

            this.dirStateImage = new DirStateImageMap([
                ['up', 'run', new Image('up-run.svg')],
                ['up', 'stay', new Image('up-stay.svg')],
                ['down', 'run', new Image('down-run.svg')],
                ['down', 'stay', new Image('down-stay.svg')]
            ])

        }

        defaultDir() { return 'up' }

        defaultState() { return 'stay' }

        dirStateImage() {
            return {

            }
        }

    }

    beforeEach(() => {

        elem = $('<img />')

        sprite = new MySprite(elem)

        sprite.setGrid(new Grid())

    })

    describe('willShow', () => {

        it("sets the default state & dir image to the elem's src attr", () => {

            sprite.willShow()

            expect(sprite.elem.attr('src')).to.equal('up-stay.svg')

        })

    })

    describe('setDirState', () => {

        it('changes the image of elem according to the given dir and state', () => {

            sprite.setDirState('up', 'run')
            expect(sprite.elem.attr('src')).to.equal('up-run.svg')

            sprite.setDirState('up', 'stay')
            expect(sprite.elem.attr('src')).to.equal('up-stay.svg')

            sprite.setDirState('down', 'run')
            expect(sprite.elem.attr('src')).to.equal('down-run.svg')

            sprite.setDirState('down', 'stay')
            expect(sprite.elem.attr('src')).to.equal('down-stay.svg')

        })

        it('throws error when the image unavailable', () => {

            expect(() => {

                sprite.setDirState('foo', 'bar')

            }).to.throw(Error)

        })

        it('throws error when the dir state image is not set at all', () => {

            sprite.dirStateImage = new DirStateImageMap([])

            expect(() => {

                sprite.setDirState('up', 'run')

            }).to.throw(Error)

        })

    })

})
