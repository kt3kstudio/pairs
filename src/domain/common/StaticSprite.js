


domain.common.StaticSprite = subclass(domain.common.Sprite, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.dirStateImage = {
            down: { default: new domain.common.Image(this.image) }
        };

    };

});
