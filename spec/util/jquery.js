


describe('$.assignClass', function () {
    'use strict';

    it('assign the given class as the defining class of the given name custom class', function () {

        // Sorry I don't know what should be asserted about this...
        $.assignClass('custom', function () { });

    });

});

describe('$', function () {
    'use strict';


    describe('setPosition', function () {

        it('sets the left and top property of the element', function () {

            var div = $('<div />');

            div.setPosition({left: 100, top: 160});

            expect(div.css('left')).to.equal('100px');
            expect(div.css('top')).to.equal('160px');

        });

    });

});
