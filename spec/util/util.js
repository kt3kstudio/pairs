


describe('commaNumber', function () {

    it('Add a comma to separate each group of three digits in a text.', function () {

        expect(window.commaNumber(1)).to.equal('1');
        expect(window.commaNumber(12)).to.equal('12');
        expect(window.commaNumber(123)).to.equal('123');
        expect(window.commaNumber(1234)).to.equal('1,234');
        expect(window.commaNumber(12345)).to.equal('12,345');
        expect(window.commaNumber(123456)).to.equal('123,456');
        expect(window.commaNumber(1234567)).to.equal('1,234,567');
        expect(window.commaNumber(12345678)).to.equal('12,345,678');
        expect(window.commaNumber(123456789)).to.equal('123,456,789');
        expect(window.commaNumber(1234567890)).to.equal('1,234,567,890');
        expect(window.commaNumber(12345678901)).to.equal('12,345,678,901');
        expect(window.commaNumber(123456789012)).to.equal('123,456,789,012');
    });
});
