

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

        this.elem.on('character-loaded', function () {

            that.load();

        });

    };


    /**
     Loads the floor in dom.
     */
    pt.load = function () {

        var that = this;

        $.get(this.elem.attr('url').replace('{floor}', this.elem.find('.floor-walker').getActor().chr.getPosition().floorId)).then(function (data) {

            that.elem.prepend($(data));

            $('.cci').getRole('cci').init('door', 'staircase').then(function () {

                that.elem.trigger('floor-loaded');

            });

        });

    };

});
