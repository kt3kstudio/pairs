


domain.level.Character = subclass(domain.common.CharSprite, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

    };

});

$.CC.assign('character-on-level', domain.level.Character);
