require('../../../src/ui/screenplay/message-balloon')

const {div} = require('dom-gen')

describe('message-balloon', () => {

    let elem, balloon

    beforeEach(() => {

        elem = div({data: {
            target: document.body,
            'skip-target': document.body,
            message: 'foo bar baz',
            timeout: 100
        }}).cc('message-balloon')

        balloon = elem.cc.get('message-balloon')

    })

    it('sets the given data params', () => {

        expect($(balloon.target)[0]).to.equal(document.body)
        expect($(balloon.skipTarget)[0]).to.equal(document.body)
        expect(balloon.timeout).to.equal(100)
        expect(balloon.message).to.equal('foo bar baz')

    })

    it('starts showing by the event `message-balloon.start` and fires `message-balloon.ended` when finished', done => {

        return elem.trigger('message-balloon.start').once('message-balloon.ended').then(() => {
            done()
        })

    })

})
