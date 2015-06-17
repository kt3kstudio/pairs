



describe('CharacterRepository', function () {
    'use strict';

    var repo = new datadomain.CharacterRepository();

    beforeEach(function () {

        window.infrastructure = {};

        window.infrastructure.storage = {
            get: spy(function () {}),
            set: spy(function () {})
        };

    });

    describe('save', function () {

        it('saves the character', function () {

            var character = new datadomain.Character();

            when(infrastructure.storage.set)().then(function () {

                return Promise.resolve({});

            });

            return repo.save(character).then(function (character) {

                expect(character).to.be.instanceof(datadomain.Character);

            });

        });

    });


    describe('getById', function () {

        it('gets a character by the id', function () {

            when(infrastructure.storage.get)('character-ma').then(function () {

                return Promise.resolve({id: 'ma'});

            });

            when(infrastructure.storage.get)('level-history-ma-7').then(function () {

                return Promise.resolve([]);

            });

            when(infrastructure.storage.get)('playing-state-ma').then(function () {

                return Promise.resolve([]);

            });

            when(infrastructure.storage.get)('level-lock-ma-7').then(function () {

                return Promise.resolve([]);

            });

            return repo.getById('ma').then(function (character) {

                expect(character).to.be.instanceof(datadomain.Character);

            });

        });

    });

});
