


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


    describe('rightLimit', function () {

        it('returns the right limit x-axis coordinate', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.rightLimit()).to.equal(300);

        });

    });


    describe('centerX', function () {

        it('returns the center x-axis coodinate', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.centerX()).to.equal(250);

        });

    });


    describe('centerY', function () {

        it('returns the center y-axis coodinate', function () {

            var wo = new domain.map.WallObject(this.$dom);

            expect(wo.centerY()).to.equal(380);

        });

    });


    describe('appear', function () {

        it('sets up the dom', function () {

            var wo = new domain.map.WallObject(this.$dom);

            wo.appear();

            expect(this.$dom.width()).to.equal(100);
            expect(this.$dom.height()).to.equal(80);
            expect(this.$dom.offset().top).to.equal(300);
            expect(this.$dom.offset().left).to.equal(200);

        });

        it('sets animation according to the appearAnim and AppearDur field', function () {
            var wo = new domain.map.WallObject(this.$dom);

            wo.appearAnim = 'appear';
            wo.appearDur = 500;

            return wo.appear().then(function () {

                expect(wo.elem.css('-webkit-animation-name')).to.equal('appear');
                //expect(wo.elem.css('-webkit-animation-duration')).to.equal('0.5s');

            });

        });

    });


    describe('disappear', function () {

        it('sets animation according to the disappearAnim and disappearDur fields', function () {

            var wo = new domain.map.WallObject(this.$dom);

            wo.disappearAnim = 'disappear';
            wo.disappearDur = 500;

            return wo.disappear().then(function () {

                expect(wo.elem.css('-webkit-animation-name')).to.equal('disappear');
                //expect(wo.elem.css('-webkit-animation-duration')).to.equal('0.5s');

            });

        });

        it('removes element from the document tree', function () {

            var wo = new domain.map.WallObject(this.$dom);

            wo.disappearAnim = 'disappear';
            wo.disappearDur = 500;

            return wo.disappear().then(function () {

                expect(wo.elem[0].parentElement).to.not.exist;

            });

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
