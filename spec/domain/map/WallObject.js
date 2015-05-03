


describe('domain.map.WallObject', function () {
    'use strict';

    beforeEach(function () {

        this.$dom = $('<div w="100" h="80" x="200" y="300" id="abc" />');
        this.$dom.appendTo(document.body);

    });

    afterEach(function () {

        this.$dom.remove();

    });

    describe('constructor', function () {

        it('registers as actor', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(this.$dom.getActor()).to.equal(wo);

        });

        it('gets w, h, x, y and id properties from the given dom', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.w).to.equal(100);
            expect(wo.h).to.equal(80);
            expect(wo.x).to.equal(200);
            expect(wo.y).to.equal(300);
            expect(wo.id).to.equal('abc');

        });

    });


    describe('setupDom', function () {

        it('sets the dimensions of the element appropriately', function () {

            var wo = new domain.map.WallObject(this.$dom);

            wo.setupDom();

            expect(this.$dom.width()).to.equal(100);
            expect(this.$dom.height()).to.equal(80);
            expect(this.$dom.offset().top).to.equal(300);
            expect(this.$dom.offset().left).to.equal(200);

        });

    });

});
