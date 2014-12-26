
'use strict';

describe('wait', function () {

    it('returns a promise which resolves after given time', function () {

        var p = wait(250);
        var t = +new Date();

        expect(p).to.be.instanceof(Promise);

        return p.then(function () {

            expect(+new Date() - t).to.be.within(250, 400);

        });

    });
});



describe('$', function () {


    describe('streamOf', function () {

        it('returns the stream of the events', function (done) {

            var $dom = $(document.body);

            var stream = $dom.streamOf('an-event');

            expect(stream).to.be.instanceof(Rx.Observable);

            stream.forEach(function () {

                done();

            });

            $dom.trigger('an-event');

        });

    });

});


describe('Rx', function () {

    describe('helpers', function () {

        describe('isFlatMappable', function () {

            it('checkes if the given object is flatMappable', function () {

                expect(Rx.helpers.isObservableLike(new Promise(function () {}))).to.be.true();
                expect(Rx.helpers.isObservableLike(Rx.Observable.of(1))).to.be.true();

                expect(Rx.helpers.isObservableLike(1)).to.be.false();
                expect(Rx.helpers.isObservableLike('string')).to.be.false();
                expect(Rx.helpers.isObservableLike([])).to.be.false();

            });

        });

    });

    describe('Observable', function () {

        describe('pipe', function () {

            it('returns Observable', function () {

                expect(Rx.Observable.of(1).pipe(function (x) { return x; })).to.be.instanceof(Rx.Observable);

            });

        });

        describe('flattenObservable', function () {

            it('returns Observable', function () {

                expect(Rx.Observable.of(1, new Promise(function () {})).flattenObservable()).to.be.instanceof(Rx.Observable);

            });

        });

    });

});


describe('Array', function () {

    describe('toFlatStream', function () {

        it('returns a stream', function () {

            expect([1, 2, new Promise(function () {})].toFlatStream()).to.be.instanceof(Rx.Observable);
        });

    });

});
