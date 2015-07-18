

describe('Sprite', function () {
    'use strict';

    var sprite;
    var elem;

    var Image = domain.common.Image;

    beforeEach(function () {

        elem = $('<img />');

        sprite = new domain.common.Sprite(elem);

        sprite.dirStateImage = {
            up: {
                run: new Image('up-run.svg'),
                stay: new Image('up-stay.svg')
            },
            down: {
                run: new Image('down-run.svg'),
                stay: new Image('down-stay.svg')
            }
        };

    });

    describe('willShow', function () {

        it('sets the default state & dir image to the elem\'s src attr', function () {

            sprite.defaultDir = 'up';
            sprite.defaultState = 'stay';

            sprite.willShow();

            expect(sprite.elem.attr('src')).to.equal('up-stay.svg');

        });

    });

    describe('setDirState', function () {

        it('changes the image of elem according to the given dir and state', function () {

            sprite.setDirState('up', 'run');
            expect(sprite.elem.attr('src')).to.equal('up-run.svg');

            sprite.setDirState('up', 'stay');
            expect(sprite.elem.attr('src')).to.equal('up-stay.svg');

            sprite.setDirState('down', 'run');
            expect(sprite.elem.attr('src')).to.equal('down-run.svg');

            sprite.setDirState('down', 'stay');
            expect(sprite.elem.attr('src')).to.equal('down-stay.svg');

        });

        it('throws error when the image unavailable', function () {

            expect(function () {
                sprite.setDirState('foo', 'bar');
            }).to.throw(Error);

        });

        it('throws error when the dir state image is not set at all', function () {

            sprite.dirStateImage = null;

            expect(function () {

                sprite.setDirState('up', 'run');

            }).to.throw(Error);

        });

    });

});
