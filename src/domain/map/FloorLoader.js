

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

        this.characterLoaded(this.elem.streamOf('character-loaded')).emitInto(this.elem);

    };


    /**
     * @param {Rx.Observable} source The event stream
     * @return {Rx.Observable}
     */
    pt.characterLoaded = function (source) {

        var that = this;

        return source.pipe(function (e) {

            that.elem.attr('data-floor-id', e.character.position.floorId);

            return that.load();

        }).pipe(function () {

            return 'floor-loaded';

        });
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
