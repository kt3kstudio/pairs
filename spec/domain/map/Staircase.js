


describe('domain.map.Staircase', function () {

    beforeEach(function () {

        this.$dom = $('<div data-goto=\'{"floorId": "abc", "floorObjectId": "def"}\' />');

    });

    describe('constructor', function () {

        it('sets the goto property', function () {

            var staircase = new domain.map.Staircase(this.$dom);

            expect(staircase.goto).to.eql({
                floorId: 'abc',
                floorObjectId: 'def'
            });

        });

    });


    describe('setupDom', function () {

        it('sets up the dom', function () {

            var staircase = new domain.map.Staircase(this.$dom);

            staircase.setupDom();

        });

    });


    describe('onGetWalker', function () {

        it('triggers the reload event', function (done) {

            var staircase = new domain.map.Staircase(this.$dom);

            staircase.elem.on('reload', function () {

                done();

            });

            staircase.onGetWalker();

        });

    });


});
