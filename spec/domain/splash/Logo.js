




describe('domain.splash.Logo', function () {
    'use strict';

    var elem, logo;

    beforeEach(function () {

        elem = $('<img />');

        logo = elem.cc.init('splash-logo');

    });

    describe('perform', function () {

        it('shows and hides the component', function () {

            var showCalled = false;
            var hideCalled = false;

            logo.show = function () {

                showCalled = true;

                expect(hideCalled).to.be.false;

                return Promise.resolve();

            };

            logo.hide = function () {

                expect(showCalled).to.be.true;

                hideCalled = true;

                return Promise.resolve();

            };

            return logo.perform().then(function () {

                expect(showCalled).to.be.true;
                expect(hideCalled).to.be.true;

            });

        });

    });

    describe('willShow', function () {

        it('returns the imageLoaded promise', function () {

            var dummyPromise = Promise.resolve();

            logo.elem = {imageLoaded: function () { return dummyPromise; }};

            expect(logo.willShow()).to.equal(dummyPromise);

        });

    });

    describe('didShow', function () {

        it('sets opacity 1', function () {

            logo.didShow();

            expect(logo.elem.css('opacity')).to.equal('1');

        });

    });

    describe('didHide', function () {

        it('sets opacity 0', function () {

            logo.didHide();

            expect(logo.elem.css('opacity')).to.equal('0');

        });

    });

});
