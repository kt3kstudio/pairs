

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

    });

});
