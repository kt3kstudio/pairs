



describe('LevelHistoryCollection', function () {
    'use strict';

    var LevelHistory = datadomain.LevelHistory;
    var LevelHistoryCollection = datadomain.LevelHistoryCollection;

    beforeEach(function () {

        this.collection = new LevelHistoryCollection([

            new LevelHistory('701'),
            new LevelHistory('702'),
            new LevelHistory('703'),

        ]);
    });

    describe('getById', function () {

        it('gets the level history by the id', function () {

            var lv702 = this.collection.getById('702');

            expect(lv702).to.be.instanceof(datadomain.LevelHistory);
            expect(lv702.levelId).to.equal('702');

        });

    });

});
