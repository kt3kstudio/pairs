describe('SplashScene', function () {
    'use strict'

    var elem, scene

    beforeEach(function () {
        elem = $('<dvi />')

        scene = elem.cc.init('splash-scene')
    })

    describe('main', function () {
        it('calls performSplash and goto the title', function () {
            var classNames = []

            scene.performSplash = function (className) {
                classNames.push(className)

                return Promise.resolve()
            }

            var goToTitleCalled = false

            scene.goToTitle = function () {
                goToTitleCalled = true
            }

            return scene.main().then(function () {
                expect(classNames).to.eql(['studio', 'straw'])

                expect(goToTitleCalled).to.be.true
            })
        })
    })

    describe('performSplash', function () {
        it('performs the logo of the given class name', function () {
            var logo = $('<img class="foo" />').appendTo(elem).cc.init('splash-logo')

            var logoPerformed = false

            logo.perform = function () {
                logoPerformed = true

                return Promise.resolve()
            }

            scene.performSplash('foo')

            expect(logoPerformed).to.be.true
        })
    })

    describe('goToTitle', function () {})
})
