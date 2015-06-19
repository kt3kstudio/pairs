


describe('StateSprite', function () {
    'use strict';

    describe('setState', function () {

        it('sets the image for the appropriate state', function () {

            var sprite = new domain.common.StateSprite($('<img />'));

            sprite.stateImage = {run: '/test.png'};

            sprite.setState('run');

            expect(sprite.elem.attr('src')).to.equal('/test.png');

        });

        it('throws when no image of the given state', function () {

            var sprite = new domain.common.StateSprite($('<img />'));

            sprite.stateImage = {run: '/test.png'};

            expect(function () {

                sprite.setState('walk');

            }).to.throw(Error);

        });

        it('throws then no stateImage property set', function () {

            var sprite = new domain.common.StateSprite($('<img />'));

            expect(function () {

                sprite.setState('run');

            }).to.throw(Error);

        });

    });

});
