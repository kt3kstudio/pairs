


describe('Being', function () {
    'use strict';

    var elem;
    var being;

    beforeEach(function () {

        elem = $('<div />');

        being = new domain.common.Being(elem);

    });

    describe('show', function () {

        it('calls anim method of elem property with showAnim and showAnimDur properties', function (done) {

            being.showAnim = 'showing';
            being.showAnimDur = 500;

            being.elem.anim = function (showAnim, showAnimDur) {

                expect(showAnim).to.equal('showing');
                expect(showAnimDur).to.equal(500);

                done();

            };

            being.show();

        });

        it('calls willShow before the main animation', function (done) {

            being.showAnim = 'showing';
            being.showAnimDur = 500;

            being.elem.anim = function () {

                done(new Error('main animation should not called before willShow'));

            };

            being.willShow = function () {

                done();

            };

            being.show();

        });

        it('calls didShow after the main animation', function (done) {

            being.showAnim = 'showing';
            being.showAnimDur = 500;

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


    describe('hide', function () {});
    describe('appear', function () {});
    describe('disappear', function () {});

});
