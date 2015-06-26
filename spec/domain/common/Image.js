



describe('Image', function () {
    'use strict';

    var Image = domain.common.Image;

    describe('apply', function () {

        it('applies the src and style to the jquery img element', function () {

            var img = $('<img />');

            new Image('foo.svg', false, false).apply(img);
            expect(img.attr('src')).to.equal('foo.svg');
            expect(img.css('transform')).to.equal('scale(1, 1)');

            new Image('foo.svg', false, true).apply(img);
            expect(img.attr('src')).to.equal('foo.svg');
            expect(img.css('transform')).to.equal('scale(1, -1)');

            new Image('foo.svg', true, false).apply(img);
            expect(img.attr('src')).to.equal('foo.svg');
            expect(img.css('transform')).to.equal('scale(-1, 1)');

            new Image('foo.svg', true, true).apply(img);
            expect(img.attr('src')).to.equal('foo.svg');
            expect(img.css('transform')).to.equal('scale(-1, -1)');

        });

    });

});
