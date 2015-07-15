



domain.map.FloorWalkerLoader = $.CC.defineRole('floor-walker-loader', function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        elem.on('character-loaded', function (e) {

            that.insertWalker(e.character);

        });

    };

    pt.insertWalker = function (character) {

        $('<img />', {

            addClass: 'floor-walker sub-door-knock',
            appendTo: this.elem,
            data: {character: character}

        });

        return $.CC.init('floor-walker', this.elem);

    };

});
