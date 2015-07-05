


describe('Being', function () {
    'use strict';

    var elem;
    var being;

    beforeEach(function () {

        elem = $('<div />');

        being = new domain.common.Being(elem);

        being.showAnim = 'showing';
        being.showAnimDur = 500;

        being.hideAnim = 'abc';
        being.hideAnimDur = 37;

    });

    describe('show', function () {

        it('calls anim method of elem property with showAnim and showAnimDur properties', function (done) {


            being.elem.anim = function (showAnim, showAnimDur) {

                expect(showAnim).to.equal('showing');
                expect(showAnimDur).to.equal(500);

                done();

            };

            being.show();

        });

        it('calls willShow before the main animation', function (done) {

            being.elem.anim = function () {

                done(new Error('main animation should not called before willShow'));

            };

            being.willShow = function () {

                done();

            };

            being.show();

        });

        it('calls didShow after the main animation', function (done) {

            var animCalled = false;

            being.elem.anim = function () {

                animCalled = true;

            };

            being.didShow = function () {

                expect(animCalled).to.be.true;

                done();

            };

            being.show();

        });

    });


    describe('hide', function () {

        it('calls anim method of the elem with hideAnim and hideAnimDur properties', function (done) {

            being.elem.anim = function (hideAnim, hideAnimDur) {

                expect(hideAnim).to.equal('abc');
                expect(hideAnimDur).to.equal(37);

                done();

            };

            being.hide();

        });


        it('calls willHide method before the anim method of the elem is called', function (done) {

            being.elem.anim = function () {

                expect(true).to.be.false;

            };

            being.willHide = function () {

                done();

            };

            being.hide();

        });

        it('calls didHide method after the anim method of the elem is called', function () {

            var animCalled = false;

            being.elem.anim = function () {

                animCalled = true;

            };

            being.didHide = function () {

                expect(animCalled).to.be.true;

            };

            being.hide();

        });
    
    });


    describe('appear', function () {});
    describe('disappear', function () {});

});
