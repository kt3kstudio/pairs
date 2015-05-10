/**
 * @class
 * @extends scene.common.Scene
 * MapScene handles the scene of map
 */
scene.map.MapScene = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    var ONE = {};

    /**
     * @constructor
     * @param {jQuery} elem jQuery object
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.elem.mapEventOne(this, ONE);

        setTimeout(function () {

            elem.trigger('init');

        });

        elem.on('floor-loaded', function () {

            elem.trigger('start');

        });

    };


    ONE.init = 1;
    pt.init = function () {

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));

    };


    ONE.start = 1;
    pt.start = function () {

        this.menuButton.show();

        ui.common.BackgroundService.turnWhite();

        var walker = this.elem.getActor('.floor-walker');

        var floor = this.elem.getActor('.floor');

        var wall = this.elem.getActor('.wall');

        return floor.appear().then(function () {

            return wall.appear();

        }).then(function () {

            var wo = wall.findById(walker.getPosition().floorObjectId);

            return walker.appearAt(wo);

        });
    };


    pt.fadeOut = function () {

        this.menuButton.hide();

        var that = this;

        return this.elem.getActor('.wall').disappear().then(function () {

            that.elem.getActor('.floor').disappear();

            return ui.common.BackgroundService.turnBlack();

        });

    };


    pt.walkerFadeIntoDoor = function () {

        var that = this;

        return this.elem.getActor('.floor-walker').getIntoDoor().then(function () {

            return that.fadeOut();

        });

    };


    ONE.goToLevel = 1;
    /**
     * Go to the specified level.
     *
     * @param {String} level The level
     */
    pt.goToLevel = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.href = 'level.html';

        });

    };


    ONE.reload = 1;
    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    pt.reload = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.reload();

        });

    };

});


$.assignClass('map-scene', scene.map.MapScene);
