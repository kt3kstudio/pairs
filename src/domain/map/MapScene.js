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

        var that = this;

        setTimeout(function () {

            // actual entry point
            that.init();

        });

        elem.on('floor-loaded', function () {

            that.start();

        });

    };


    pt.init = function () {

        var that = this;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId);

        }).then(function (character) {

            that.elem.trigger($.Event('character-loaded', {character: character}));

        });

    };


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

        return this.elem.find('.floor-asset-collection').getActor().hide().then(function () {

            that.elem.find('.floorboard').getActor().hide();

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
