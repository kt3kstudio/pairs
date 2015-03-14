



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

});
