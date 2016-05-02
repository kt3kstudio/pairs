import ScreenplayManager from '../../../src/ui/manager/screenplay-manager'

import {expect} from 'chai'
import domGen from 'dom-gen'

const script = domGen('script')

describe('screenplay-manager', () => {

    let elem, sm

    beforeEach(() => {

        elem = script `
            #moo0 Hey!
            #moo1 Hi!
            #moo2 Yay!
        `.attr('type', 'text/x-screenplay')

        sm = elem.cc.init('screenplay-manager')

    })

    it('stores the parsed screenplay-lines', () => {

        expect(sm.lines.length).to.equal(3)
        expect(sm.lines[0].selector).to.equal('#moo0')
        expect(sm.lines[0].line).to.equal('Hey!')
        expect(sm.lines[1].selector).to.equal('#moo1')
        expect(sm.lines[1].line).to.equal('Hi!')
        expect(sm.lines[2].selector).to.equal('#moo2')
        expect(sm.lines[2].line).to.equal('Yay!')

    })

    describe('start', () => {

        it('starts dispatching the screenplay reading by its actors', () => {
        })

    })

})
