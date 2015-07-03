

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

        this.elem.attr('data-floor-id', character.position.floorId);

        this.load();

    };

    /**
     * Returns the url to request.
     *
     * @return {String}
     */
    pt.getUrl = function () {

        return '/data/floor/' + this.elem.attr('data-floor-id') + '.html';

    };

    /**
     * After-handler of load.
     */
    pt.didLoad = function (data) {

        var that = this;

        this.elem.prepend($(data));

        return $.CC.init('door', 'staircase').then(function () {

            that.elem.trigger('floor-loaded');

        });

    };

}));
