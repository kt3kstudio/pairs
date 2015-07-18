

/**
 * Loads the floor
 *
 * @class
 * @extends domain.common.Loader
 */
domain.map.FloorLoader = $.assignClassComponent('floor-loader', subclass($.CC.Role, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.characterLoaded(this.elem.streamOf('character-loaded')).emitInto(this.elem);

    };


    /**
     * Loads the floor assets from the url and output the floor-loaded event.
     *
     * @param {Rx.Observable} source The event stream
     * @return {Rx.Observable}
     */
    pt.characterLoaded = function (source) {

        var that = this;

        return source.pipe(function (e) {

            return that.elem.spawn('/data/floor/' + e.character.position.floorId + '.html', 'door staircase', {prepend: true});

        }).pipe(function () {

            return 'floor-loaded';

        });
    };

}));
