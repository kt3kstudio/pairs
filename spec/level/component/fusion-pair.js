import FusionPair from '../../../src/level/component/fusion-pair'
import Cell from '../../../src/level/component/cell'

describe('FusionPair', function () {
    'use strict'

    var createCell = function (gene) {
        var div = $('<div class="cell">').data('gene', gene)

        return new Cell(div)
    }

    describe('isEvolving', function () {
        it('returns true if the fusion is evolving and false otherwise', function () {
            expect(new FusionPair(createCell('f'), createCell('f')).isEvolving()).to.be.false
            expect(new FusionPair(createCell('m'), createCell('m')).isEvolving()).to.be.false
            expect(new FusionPair(createCell('f'), createCell('m')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('m'), createCell('f')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('fm'), createCell('m')).isEvolving()).to.be.false
            expect(new FusionPair(createCell('fm'), createCell('f')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('mf'), createCell('f')).isEvolving()).to.be.false
            expect(new FusionPair(createCell('mf'), createCell('m')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('fm'), createCell('mf')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('fm'), createCell('fm')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('mf'), createCell('mf')).isEvolving()).to.be.true
            expect(new FusionPair(createCell('mf'), createCell('fm')).isEvolving()).to.be.true
        })
    })
})
