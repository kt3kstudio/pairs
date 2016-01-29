import Being from '../../../src/domain/common/Being'
import {Animation} from 'spn'

describe('Being', function () {
    'use strict'

    var elem
    var being

    beforeEach(function () {

        elem = $('<div />')

        being = new Being(elem)

        being.showAnim = () => new Animation('showing', 500)

        being.hideAnim = () => new Animation('abc', 37)

    })

    describe('show', function () {

        it('applies the show animation to the elem', function (done) {

            const anim = { apply(elem) {

                expect(elem).to.equal(being.elem)

                done()

            } }

            being.showAnim = () => anim

            being.show().catch(function (e) {

                console.log(e)
                console.log(e.stack)

            })

        })

        it('calls willShow before the main animation', function (done) {

            const anim = { apply() {

                done(new Error('main animation should not called before willShow'))

            } }

            being.showAnim = () => anim

            being.willShow = function () {

                done()

            }

            being.show()

        })

        it('calls didShow after the main animation', function (done) {

            var animCalled = false

            const anim = { apply() {

                animCalled = true

            } }

            being.showAnim = () => anim

            being.didShow = function () {

                expect(animCalled).to.be.true

                done()

            }

            being.show()

        })

    })

    describe('hide', function () {

        it('applies the hide animation to the elem', function (done) {

            const anim = { apply(elem) {

                expect(elem).to.equal(being.elem)

                done()

            } }

            being.hideAnim = () => anim

            being.hide()

        })

        it('calls willHide method before the main animation', function (done) {

            const anim = { apply() {

                expect(true).to.be.false

            } }

            being.hideAnim = () => anim

            being.willHide = function () {

                done()

            }

            being.hide()

        })

        it('calls didHide method after the main animation', function (done) {

            var animCalled = false

            const anim = { apply() {

                animCalled = true

            } }

            being.hideAnim = () => anim

            being.didHide = function () {

                expect(animCalled).to.be.true

                done()

            }

            being.hide()

        })

    })

    describe('disappear', function () {

        it('hides and removes the element', function () {

            var hideCalled

            being.hide = function (dur) {

                expect(dur).to.equal(15)

                hideCalled = true

                return Promise.resolve()

            }

            return being.disappear(15).then(function () {

                expect(hideCalled).to.be.true
                expect(being.elem.parent().length).to.equal(0)

            })

        })

    })

})
