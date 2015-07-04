

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

        this.elem.streamOf('character-loaded').pipe(function (e) {

            that.elem.attr('data-floor-id', e.character.position.floorId);

            return that.load();

        }).pipe(function () {

            return 'floor-loaded';

        }).emitInto(this.elem);

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

        this.elem.prepend($(data));

        return $.CC.init('door', 'staircase');

    };

}));
