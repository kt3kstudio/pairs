/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
domain.map.FloorAsset = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.w = +elem.attr('w');
        this.h = +elem.attr('h');
        this.x = +elem.attr('x');
        this.y = +elem.attr('y');

        this.id = elem.attr('id');

    };


    /**
     * Knocks the door (figuratively).
     */
    pt.doorKnock = function () {

        this.elem.trigger('door-knock', [this]);

    };


    pt.centerX = function () {

        return this.x;

    };

    pt.centerY = function () {

        return this.y;

    };

    pt.open = function () {
        return Promise.resolve();
    };

    pt.close = function () {
        return Promise.resolve();
    };


    pt.onGetWalker = function () {
        return Promise.resolve();
    };


    /**
     * Spawn the frog to the front of the floor asset.
     */
    pt.spawnFrog = function () {

        $('<img class="frog">').css({zIndex: 2}).appendTo(this.elem);

        return $.cc.init('frog', this.elem).then(function (frogs) {

            var frog = frogs[0];

            if (frog) {

                return $(frog).getActor().show();

            }

        });

    };


    /**
     * Removes the frog in front of the floor asset.
     */
    pt.removeFrog = function () {

        var frog = this.elem.find('.frog').getActor();

        if (frog == null) {

            return;

        }

        frog.runAwayRight();

    };


});
