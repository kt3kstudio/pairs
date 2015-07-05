


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


    describe('doorKnock', function () {

        it('triggers `door-knock` event with the first argument itself', function (done) {

            var wo = new domain.map.WallObject(this.$dom);

            wo.elem.one('door-knock', function (e, knocked) {

                expect(knocked).to.equal(wo);

                done();

            });

            wo.doorKnock();

        });

    });



    describe('centerX', function () {

        it('returns the center x-axis coodinate', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.centerX()).to.equal(200);

        });

    });


    describe('centerY', function () {

        it('returns the center y-axis coodinate', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.centerY()).to.equal(300);

        });

    });


    describe('open', function () {

        it('returns an empty promise', function () {

            return new domain.map.WallObject(this.$dom).open();

        });

    });


    describe('close', function () {

        it('returns an empty promise', function () {

            return new domain.map.WallObject(this.$dom).close();

        });

    });


    describe('onGetWalker', function () {

        it('returns an empty promise', function () {

            return new domain.map.WallObject(this.$dom).onGetWalker();

        });

    });

});
