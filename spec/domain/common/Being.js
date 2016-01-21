import Being from '../../../src/domain/common/Being'

describe('Being', function () {
    'use strict'

    var elem
    var being

    beforeEach(function () {

        elem = $('<div />')

        being = new Being(elem)

        being.showAnim = new domain.common.Animation('showing', 500)

        being.hideAnim = new domain.common.Animation('abc', 37)

    })

    describe('show', function () {

        it('applies the show animation to the elem', function (done) {

            being.showAnim.apply = function (elem) {

                expect(elem).to.equal(being.elem)

                done()

            }

            being.show().catch(function (e) {
                console.log(e)
                console.log(e.stack)
            })

        })

        it('calls willShow before the main animation', function (done) {

            being.showAnim.apply = function () {

                done(new Error('main animation should not called before willShow'))

            }

            being.willShow = function () {

                done()

            }

            being.show()

        })

        it('calls didShow after the main animation', function (done) {

            var animCalled = false

            being.showAnim.apply = function () {

                animCalled = true

            }

            being.didShow = function () {

                expect(animCalled).to.be.true

                done()

            }

            being.show()

        })

    })

    describe('hide', function () {

        it('applies the hide animation to the elem', function (done) {

            being.hideAnim.apply = function (elem) {

                expect(elem).to.equal(being.elem)

                done()

            }

            being.hide()

        })

        it('calls willHide method before the main animation', function (done) {

            being.hideAnim.apply = function () {

                expect(true).to.be.false

            }

            being.willHide = function () {

                done()

            }

            being.hide()

        })

        it('calls didHide method after the main animation', function (done) {

            var animCalled = false

            being.hideAnim.apply = function () {

                animCalled = true

            }

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
