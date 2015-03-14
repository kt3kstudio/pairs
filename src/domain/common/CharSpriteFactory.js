



domain.common.CharSpriteFactory = subclass(function (pt) {
    'use strict';

    /**
     * Creates a charSprite from the character object.
     *
     * @param {datadomain.Character} character The character
     * @return {domain.common.CharSprite}
     */
    pt.createFromCharacter = function (character) {

        if (!(character instanceof datadomain.Character)) {
            throw Error('cannot create CharSprite by the parameter: ' + character);
        }

        if (character.id === 'ma') {
            return new domain.common.Ma(character);
        }

        throw Error('unknown (or not yet implemented) character: ' + character.id);

    };

});
