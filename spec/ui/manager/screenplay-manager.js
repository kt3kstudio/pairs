import '../../../src/ui/manager/screenplay-manager'

import {expect} from 'chai'
import domGen from 'dom-gen'

const {component, Actor} = $.cc

const script = domGen('script')

describe('screenplay-manager', () => {

    let elem, sm

    before(() => {

        class TestSpeaker extends Actor {
            speak(line) {
                this.elem.attr('stored-message', line)
            }
        }

        component('test-speaker')(TestSpeaker)

    })

    beforeEach(() => {

        elem = script `
            #moo0 Hey!
            #moo1 Hi!
            #moo2 Yay!
        `.attr('type', 'text/x-screenplay')

        sm = elem.cc.init('screenplay-manager')

        $('<div id="moo0" />').appendTo(document.body).cc.init('test-speaker')
        $('<div id="moo1" />').appendTo(document.body).cc.init('test-speaker')
        $('<div id="moo2" />').appendTo(document.body).cc.init('test-speaker')

    })

    afterEach(() => {

        $('.test-speaker').remove()

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

    describe('actorsReady', () => {

        it('returns true when all the actors are ready', () => {

            expect(sm.actorsReady()).to.be.true

        })

    })

    describe('start', () => {

        it('starts the screenplay', done => {

            sm.play().then(() => {
                expect($('#moo0').attr('stored-message')).to.equal('Hey!')
                expect($('#moo1').attr('stored-message')).to.equal('Hi!')
                expect($('#moo2').attr('stored-message')).to.equal('Yay!')
                done()
            }).catch(done)

        })

    })

})
