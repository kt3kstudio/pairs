


describe('domain.common.SplashScene', function () {
    'use strict';

    var elem, scene;

    beforeEach(function () {

        elem = $('<dvi />');

        scene = elem.cc.init('splash-scene');

    });

    describe('main', function () {
    });

    describe('performSplash', function () {

        it('performs the logo of the given class name', function () {

            var logo = $('<img class="foo" />').appendTo(elem).cc.init('splash-logo');

            var logoPerformed = false;

            logo.perform = function () {

                logoPerformed = true;

                return Promise.resolve();

            };

            scene.performSplash('foo');

            expect(logoPerformed).to.be.true;

        });

    });

    describe('goToTitle', function () {
    });

});
