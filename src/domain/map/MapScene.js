/**
 * MapScene handles the scene of map
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.MapScene = subclass(domain.common.Actor, function (pt, parent) {
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

        elem.on('user-loaded', function (e, user) {

            elem.trigger('load-character', user.charId);

        });

    };


    ONE.init = 1;
    pt.init = function () {

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));

        this.elem.trigger('load-user');

    };


    ONE.start = 1;
    pt.start = function () {

        this.menuButton.show();

        ui.common.BackgroundService.turnWhite();

        var walker = this.elem.find('.floor-walker').getActor();

        var floorboard = this.elem.find('.floorboard').getActor();

        var assets = this.elem.find('.floor-asset-collection').getActor();

        return floorboard.appear().then(function () {

            return assets.appear();

        }).then(function () {

            var wo = assets.findById(walker.getPosition().floorObjectId);

            return walker.appearAt(wo);

        });
    };


    pt.fadeOut = function () {

        this.menuButton.hide();

        var that = this;

        return this.elem.find('.floor-asset-collection').getActor().disappear().then(function () {

            that.elem.find('.floorboard').getActor().disappear();

            return ui.common.BackgroundService.turnBlack();

        });

    };


    pt.walkerFadeIntoDoor = function () {

        var that = this;

        return this.elem.find('.floor-walker').getActor().getIntoDoor().then(function () {

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


    ONE['scene-reload'] = 1;
    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    pt['scene-reload'] = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.reload();

        });

    };

});


$.assignClassComponent('map-scene', domain.map.MapScene);
