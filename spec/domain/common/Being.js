describe('Being', function () {
    'use strict'

    var elem
    var being

    beforeEach(function () {
        elem = $('<div />')

        being = new domain.common.Being(elem)

        being.showAnim = 'showing'
        being.showAnimDur = 500

        being.hideAnim = 'abc'
        being.hideAnimDur = 37
    })

    describe('show', function () {
        it('calls anim method of elem property with showAnim and showAnimDur properties', function (done) {
            being.elem.anim = function (showAnim, showAnimDur) {
                expect(showAnim).to.equal('showing')
                expect(showAnimDur).to.equal(500)

                done()
            }

            being.show()
        })

        it('calls willShow before the main animation', function (done) {
            being.elem.anim = function () {
                done(new Error('main animation should not called before willShow'))
            }

            being.willShow = function () {
                done()
            }

            being.show()
        })

        it('calls didShow after the main animation', function (done) {
            var animCalled = false

            being.elem.anim = function () {
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
        it('calls anim method of the elem with hideAnim and hideAnimDur properties', function (done) {
            being.elem.anim = function (hideAnim, hideAnimDur) {
                expect(hideAnim).to.equal('abc')
                expect(hideAnimDur).to.equal(37)

                done()
            }

            being.hide()
        })

        it('calls willHide method before the anim method of the elem is called', function (done) {
            being.elem.anim = function () {
                expect(true).to.be.false
            }

            being.willHide = function () {
                done()
            }

            being.hide()
        })

        it('calls didHide method after the anim method of the elem is called', function () {
            var animCalled = false

            being.elem.anim = function () {
                animCalled = true
            }

            being.didHide = function () {
                expect(animCalled).to.be.true
            }

            being.hide()
        })
    })

    describe('appear', function () {
        it('calls willAppear before calling show method', function (done) {
            var willAppearCalled = false

            being.willAppear = function () {
                willAppearCalled = true
            }

            being.show = function () {
                expect(willAppearCalled).to.be.true

                done()
            }

            being.appear()
        })

        it('calls didAppear after calling show method', function (done) {
            var showCalled = false

            being.didAppear = function () {
                expect(showCalled).to.be.true

                done()
            }

            being.show = function () {
                showCalled = true
            }

            being.appear()
        })
    })

    describe('disappear', function () {
        it('calls willDisappear before calling hide', function (done) {
            var willDisappearCalled = false

            being.willDisappear = function () {
                willDisappearCalled = true
            }

            being.hide = function () {
                expect(willDisappearCalled).to.be.true

                done()
            }

            being.disappear()
        })

        it('calls didDisappear after calling hide', function (done) {
            var hideCalled = false

            being.hide = function () {
                hideCalled = true
            }

            being.didDisappear = function () {
                expect(hideCalled).to.be.true

                done()
            }

            being.disappear()
        })
    })

})
