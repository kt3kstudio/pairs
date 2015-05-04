


describe('$.assignClass', function () {
    'use strict';

    it('assign the given class as the defining class of the given name custom class', function () {

        // Sorry I don't know what should be asserted about this...
        $.assignClass('custom', function () { });

    });

});

describe('$', function () {
    'use strict';

    describe('registerActor', function () {

        it('registerActor for the element', function () {

            var actor = {a: 1}; // actor could be anything

            var div = $('<div />');

            div.registerActor(actor);

            expect(div.getActor()).to.equal(actor);

        });

    });

    describe('getActor', function () {

        it('gets the actor on the element', function () {

            var actor = {};

            var div = $('<div />').registerActor(actor);

            expect(div.getActor()).to.equal(actor);

        });

        it('gets the actor on the given selector under the element', function () {

            var actor = {};

            var div = $('<div><div class="abc" /></div>');

            div.find('.abc').registerActor(actor);

            expect(div.getActor('.abc')).to.equal(actor);

        });

    });


    describe('setPosition', function () {

        it('sets the left and top property of the element', function () {

            var div = $('<div />');

            div.setPosition({left: 100, top: 160});

            expect(div.css('left')).to.equal('100px');
            expect(div.css('top')).to.equal('160px');

        });

    });

});
