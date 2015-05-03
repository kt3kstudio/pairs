


describe('domain.map.WallObject', function () {
    'use strict';

    beforeEach(function () {
        this.$dom = $('<div w="100" h="80" x="200" y="300" />');
    });

    describe('constructor', function () {

        it('registers as actor', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(this.$dom.getActor()).to.equal(wo);

        });

        it('gets w, h, x, y properties from the given dom', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.w).to.equal(100);
            expect(wo.h).to.equal(80);
            expect(wo.x).to.equal(200);
            expect(wo.y).to.equal(300);

        });

    });

});
