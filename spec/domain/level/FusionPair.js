

describe('FusionPair', function () {
    'use strict';

    var FusionPair = domain.level.FusionPair;
    var Cell = domain.level.Cell;

    describe('isEvolving', function () {

        it('returns true if the fusion is evolving and false otherwise', function () {

            expect(new FusionPair(new Cell('f'), new Cell('f')).isEvolving()).to.be.false;
            expect(new FusionPair(new Cell('m'), new Cell('m')).isEvolving()).to.be.false;
            expect(new FusionPair(new Cell('f'), new Cell('m')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('m'), new Cell('f')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('fm'), new Cell('m')).isEvolving()).to.be.false;
            expect(new FusionPair(new Cell('fm'), new Cell('f')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('mf'), new Cell('f')).isEvolving()).to.be.false;
            expect(new FusionPair(new Cell('mf'), new Cell('m')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('fm'), new Cell('mf')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('fm'), new Cell('fm')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('mf'), new Cell('mf')).isEvolving()).to.be.true;
            expect(new FusionPair(new Cell('mf'), new Cell('fm')).isEvolving()).to.be.true;

        });

    });

});
