
describe('wait', function () {
    it('returns a promise which resolves after given time', function (done) {
        var p = wait(250);
        var t = +new Date();

        expect(p).to.be.an.instanceof(Promise);

        p.then(function () {
            expect(+new Date()).to.be.within(250, 251);

            done();
        });
    });
});
