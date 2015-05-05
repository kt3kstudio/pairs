


describe('domain.map.Door', function () {
    'use strict';

    beforeEach(function () {

        this.$dom = $('<div w="100" h="90" x="200" y="300" level="701" id="701" />');
        this.$dom.appendTo(document.body);

        this.door = new domain.map.Door(this.$dom);

    });

    afterEach(function () {

        this.$dom.remove();

    });

    describe('constructor', function () {

        it('sets level property', function () {

            expect(this.door.level).to.equal('701');

        });

    });


    describe('setupDom', function () {

        it('sets up the dom', function () {

            this.door.setupDom();

            expect(this.$dom.find('.doorknob').size()).to.equal(1);
            expect(this.$dom.find('.door-body').size()).to.equal(1);
            expect(this.$dom.find('.door-info-content').size()).to.equal(1);
            expect(this.$dom.find('.door-info-content button').size()).to.equal(1);

        });

        it('binds doorKnock to click events of .door-body', function (done) {

            this.door.setupDom();

            this.door.doorKnock = function () {

                done();

            };

            this.$dom.find('.door-body').trigger('click');

        });

        it('binds goToLevel to click events of `.door-info-content button`', function (done) {

            this.door.setupDom();

            this.$dom.on('goToLevel', function () {

                done();

            });

            this.$dom.find('.door-info-content button').trigger('click');

        });

    });


    describe('open', function () {

        it('opens the door', function () {

            var that = this;

            this.door.setupDom();

            return this.door.open().then(function () {

                expect(that.$dom.find('.door-body').hasClass('open')).to.be.true;

            });

        });

    });


    describe('close', function () {

        it('closes the door', function () {

            var that = this;

            this.door.setupDom();

            return this.door.open().then(function () {
                
                return that.door.close();

            }).then(function () {

                expect(that.$dom.find('.door-body').hasClass('open')).to.be.false;

            });

        });

        it('binds doorKnock to click events of .door-body', function (done) {

            var that = this;

            this.door.setupDom();

            this.$dom.on('door-knock', function () {

                done();

            });

            return this.door.open().then(function () {

                return that.door.close();

            }).then(function () {

                that.$dom.find('.door-body').trigger('click');

            });

        });

    });

});
