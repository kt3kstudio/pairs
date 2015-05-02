/**
 * @class
 * @extends scene.common.Scene
 * MapScene handles the scene of map
 */
scene.map.MapScene = subclass(scene.common.Scene, function (pt) {
    'use strict';

    var ONE = {};

    /**
     * @constructor
     * @param {jQuery} elem jQuery object
     */
    pt.constructor = function (elem) {

        this.elem = elem;

        this.elem.registerActor(this);

        this.elem.mapEventOne(this, ONE);

        setTimeout(function () {
            elem.trigger('init').trigger('start');
        });

    };


    ONE.init = 1;
    pt.init = function () {

        // actors
        this.floor = this.elem.getActor('.floor');

        this.wall = this.elem.getActor('.wall');

        this.walker = this.elem.getActor('.floor-walker');

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));

    };


    ONE.start = 1;
    pt.start = function () {
        var that = this;

        that.menuButton.show();

        ui.common.BackgroundService.turnWhite();

        return that.floor.appear().then(function () {

            return that.wall.appear();

        }).then(function () {

            var wo = that.wall.findById(that.walker.getPosition().floorObjectId);

            return that.walker.appearAt(wo);

        });
    };


    pt.fadeOut = function () {

        this.menuButton.hide();

        var that = this;

        return this.wall.disappear().then(function () {

            that.floor.disappear();

            return ui.common.BackgroundService.turnBlack();

        });

    };


    pt.walkerFadeIntoDoor = function () {

        var that = this;

        return this.walker.getIntoDoor().then(function () {

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
