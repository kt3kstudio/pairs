import {commaNumber, chainPromise} from '../../src/util/util'
import {wait} from 'spn'

describe('$', () => {

    describe('streamOf', () => {

        it('returns the stream of the events', done => {

            const $dom = $(document.body)

            const stream = $dom.streamOf('an-event')

            expect(stream).to.be.instanceof(Rx.Observable)

            stream.forEach(() => done())

            $dom.trigger('an-event')

        })

    })

})

describe('commaNumber', () => {

    it('Add a comma to separate each group of three digits in a text.', () => {

        expect(commaNumber(1)).to.equal('1')
        expect(commaNumber(12)).to.equal('12')
        expect(commaNumber(123)).to.equal('123')
        expect(commaNumber(1234)).to.equal('1,234')
        expect(commaNumber(12345)).to.equal('12,345')
        expect(commaNumber(123456)).to.equal('123,456')
        expect(commaNumber(1234567)).to.equal('1,234,567')
        expect(commaNumber(12345678)).to.equal('12,345,678')
        expect(commaNumber(123456789)).to.equal('123,456,789')
        expect(commaNumber(1234567890)).to.equal('1,234,567,890')
        expect(commaNumber(12345678901)).to.equal('12,345,678,901')
        expect(commaNumber(123456789012)).to.equal('123,456,789,012')

    })

})

describe('chainPromise', () => {

    it('chains the items of the array by tranforming them into promises using the given function', () => {

        var x550 = false
        var x650 = false

        wait(550).then(() => { x550 = true })
        wait(650).then(() => { x650 = true })

        return chainPromise([100, 200, 300], n => wait(n)).then(() => {

            expect(x550).to.be.true
            expect(x650).to.be.false

        })

    })

})
