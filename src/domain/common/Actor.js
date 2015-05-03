


domain.common.Actor = subclass(function (pt) {
    'use strict';

    pt.constructor = function (elem) {

        this.elem = elem;

        this.elem.registerActor(this);

    };

});
