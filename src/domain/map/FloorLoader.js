

/**
 * Loads the floor
 *
 * @class
 * @extends domain.common.Role
 */
domain.map.FloorLoader = $.defineRole('floor-loader', function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        this.elem.on('character-loaded', function (e, character) {

            that.load(character.position.floorId);

        });

    };


    /**
     * Loads the floor in dom.
     *
     * @param {String} floorId The floor id
     */
    pt.load = function (floorId) {

        var that = this;

        $.get(this.elem.attr('url').replace('{floorId}', floorId)).then(function (data) {

            that.elem.prepend($(data));

            $('.cci').getRole('cci').init('door', 'staircase').then(function () {

                that.elem.trigger('floor-loaded');

            });

        });

    };

});
