



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


    describe('getByCharId', function () {

        it('gets a PlayingState by the character id', function () {

            when(infrastructure.storage.get)('playing-state-ma').then(function () {

                return Promise.resolve({
                    id: 'ma',
                    rounds: [['up']]
                });

            });

            return repo.getByCharId('ma').then(function (playingState) {

                expect(playingState).to.be.instanceof(datadomain.PlayingState);
                expect(playingState.charId).to.equal('ma');
                expect(playingState.rounds).to.eql([['up']]);

            });

        });


        it('resolves with an empty PlayingState when the data unavailable', function () {

            when(infrastructure.storage.get)('playing-state-ma').then(function () {

                return Promise.resolve(null);

            });

            return repo.getByCharId('ma').then(function (playingState) {

                expect(playingState).to.be.instanceof(datadomain.PlayingState);
                expect(playingState.charId).to.equal('ma');
                expect(playingState.rounds).to.eql([[]]);

            });

        });

    });

});
