



describe('PlayingStateRepository', function () {
    'use strict';

    var repo = new datadomain.PlayingStateRepository();

    beforeEach(function () {

        window.infrastructure = {};

        window.infrastructure.storage = {
            get: spy(function () {}),
            set: spy(function () {})
        };

    });

    describe('save', function () {

        it('saves the playing state', function () {

            var playingState = new datadomain.PlayingState('ma', []);

            when(infrastructure.storage.set)().then(function () {

                return Promise.resolve({});

            });

            return repo.save(playingState).then(function (playingState) {

                expect(playingState).to.be.instanceof(datadomain.PlayingState);

            });

        });

    });


    describe('getByCharIdLevelId', function () {

        it('gets a PlayingState by the character id', function () {

            when(infrastructure.storage.get)('playing-state-ma').then(function () {

                return Promise.resolve({
                    charId: 'ma',
                    levelId: '701',
                    rounds: [['up']]
                });

            });

            return repo.getByCharIdLevelId('ma', '701').then(function (playingState) {

                expect(playingState).to.be.instanceof(datadomain.PlayingState);
                expect(playingState.charId).to.equal('ma');
                expect(playingState.levelId).to.equal('701');
                expect(playingState.rounds).to.eql([['up']]);

            });

        });


        it('resolves with an empty PlayingState when the data unavailable', function () {

            when(infrastructure.storage.get)('playing-state-ma').then(function () {

                return Promise.resolve(null);

            });

            return repo.getByCharIdLevelId('ma', '701').then(function (playingState) {

                expect(playingState).to.be.instanceof(datadomain.PlayingState);
                expect(playingState.charId).to.equal('ma');
                expect(playingState.levelId).to.equal('701');
                expect(playingState.rounds).to.eql([[]]);

            });

        });

    });


    describe('clearByCharId', function () {

        it('clears the playing state by the character id', function () {

            when(infrastructure.storage.set)('playing-state-ma', null).then(function () {

                return Promise.resolve(true);

            });

            return repo.clearByCharId('ma').then(function (res) {

                expect(res).to.be.true;

            });

        });

    });

});
