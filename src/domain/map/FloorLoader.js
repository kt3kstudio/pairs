

/**
 * Loads the floor
 *
 * @class
 * @extends domain.common.Loader
 */
domain.map.FloorLoader = $.assignClassComponent('floor-loader', subclass(domain.common.Loader, function (pt, parent) {
    'use strict';

    var ONE = {};

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.elem.mapEventOne(this, ONE);

    };


    ONE['character-loaded'] = 1;
    /**
     * Handler of character-loaded event. Load the floor by the character object.
     *
     * @param {Object} e The event
     * @param {datadomain.Character} character The character
     */
    pt['character-loaded'] = function (e, character) {

        this.elem.attr('url', this.createUrlOfFloorId(character.position.floorId));

        this.load();

    };

    /**
     * Creates the url of the given floor id.
     *
     * @param {String} floorId
     * @return {String}
     */
    pt.createUrlOfFloorId = function (floorId) {

        return '/data/floor/' + floorId + '.html';

    };

    pt.didLoad = function (data) {

        var that = this;

        this.elem.prepend($(data));

        return $('.cci').getRole('cci').init('door', 'staircase').then(function () {

            that.elem.trigger('floor-loaded');

        });

    };

}));
