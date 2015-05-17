

/**
 * Loads the floor
 *
 * @class
 * @extends domain.common.Loader
 */
domain.map.FloorLoader = $.assignClassComponent('floor-loader', subclass(domain.common.Loader, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        this.elem.on('character-loaded', function (e, character) {

            that.load({floorId: character.position.floorId});

        });

    };

    pt.didLoad = function (data) {

        var that = this;

        this.elem.prepend($(data));

        return $('.cci').getRole('cci').init('door', 'staircase').then(function () {

            that.elem.trigger('floor-loaded');

        });

    };

}));