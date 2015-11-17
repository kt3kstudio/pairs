



describe('domain.map.FloorAsset', function () {
    'use strict';

    var floorAsset;

    beforeEach(function () {

        this.$dom = $('<div x="200" y="300" id="abc" />');
        this.$dom.appendTo(document.body);

        floorAsset = new domain.map.FloorAsset(this.$dom);

    });

    afterEach(function () {

        this.$dom.remove();

    });

    describe('constructor', function () {

        it('registers as actor', function () {

            expect(this.$dom.cc.getActor()).to.equal(floorAsset);

        });

        it('gets w, h, x, y and id properties from the given dom', function () {

            expect(floorAsset.x).to.equal(200);
            expect(floorAsset.y).to.equal(300);
            expect(floorAsset.id).to.equal('abc');

        });

    });


    describe('doorKnock', function () {

        it('triggers `door-knock` event with the first argument itself', function (done) {

            floorAsset.elem.one('door-knock', function (e, knocked) {

                expect(knocked).to.equal(floorAsset);

                done();

            });

            floorAsset.doorKnock();

        });

    });



    describe('centerX', function () {

        it('returns the center x-axis coodinate', function () {

            expect(floorAsset.centerX()).to.equal(200);

        });

    });


    describe('centerY', function () {

        it('returns the center y-axis coodinate', function () {

            expect(floorAsset.centerY()).to.equal(250);

        });

    });


    describe('open', function () {

        it('returns an empty promise', function () {

            return floorAsset.open();

        });

    });


    describe('close', function () {

        it('returns an empty promise', function () {

            return floorAsset.close();

        });

    });


    describe('onGetWalker', function () {

        it('returns an empty promise', function () {

            return floorAsset.onGetWalker();

        });

    });

});
