


describe('domain.map.Staircase', function () {
    'use strict';

    beforeEach(function () {

        this.$dom = $('<div data-goto=\'{"floorId": "abc", "floorObjectId": "def"}\' />');
        this.staircase = new domain.map.Staircase(this.$dom);

    });

    describe('constructor', function () {

        it('sets the goto property', function () {

            expect(this.staircase.goto).to.eql({
                floorId: 'abc',
                floorObjectId: 'def'
            });

        });

    });


    describe('willShow', function () {

        it('sets up the dom', function () {

            this.staircase.willShow();

            // TODO: some assertion

        });


        it('binds to click event', function (done) {

            this.staircase.willShow();

            this.staircase.elem.on('click', function () {

                done();

            });

            this.staircase.elem.trigger('click');

        });

    });


    describe('onGetWalker', function () {

        it('triggers the character-goto event', function (done) {

            this.staircase.elem.on('character-goto', function () {

                done();

            });

            this.staircase.onGetWalker();

        });

    });


});
