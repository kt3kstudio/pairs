
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
