/**
 * MapScene handles the scene of map
 *
 * Application Class
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

    };


    /**
     * The entry point of the map scene.
     *
     * Loads things, initializes things in order, controls everything.
     */
    pt.init = function () {

        var that = this;

        // ui parts
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId);

        }).then(function (character) {

            return Promise.all([

                that.initFloorWalker(character),

                that.initFloorAssets(character)

            ]);

        }).then(function () {

            that.elem.trigger($.Event('floor-built'));

            that.start();

        });

    };


    /**
     * Initializes the floor walker.
     *
     * @param {datadomain.Character} character
     */
    pt.initFloorWalker = function (character) {

        var $floorAssets = this.elem.find('.floor-asset-collection');

        $('<img />', {

            addClass: 'floor-walker sub-door-knock sub-character-goto',
            appendTo: $floorAssets,
            data: {character: character}

        });

        return $.cc.init('floor-walker', $floorAssets);

    };

    /**
     * Initializes the floor assets.
     *
     * @param {datadomain.Character} character
     */
    pt.initFloorAssets = function (character) {

        var $floorAssets = this.elem.find('.floor-asset-collection');

        var floorAssets = $floorAssets.getActor();

        return $floorAssets.spawn('/data/floor/' + character.position.floorId + '.html', 'door staircase', {prepend: true}).then(function () {

            floorAssets.buildFloorAssets();

            floorAssets.forEach(function (floorAsset) {

                floorAsset.locked = character.locks.isLocked(floorAsset.id);

                var history = character.histories.getById(floorAsset.id);

                if (history) {

                    floorAsset.score = history.score;

                }

            });

            var currentFloorAsset = floorAssets.findById(character.position.floorObjectId);

            if (currentFloorAsset) {

                currentFloorAsset.locked = false;

            }

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

            var floorAsset = assets.findById(walker.getPosition().floorObjectId);

            return walker.appearAt(floorAsset);

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


    ONE.sceneReload = 1;
    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    pt.sceneReload = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.reload();

        });

    };


    ONE.assetUnlock = 1;
    pt.assetUnlock = function (e) {

        var asset = e.floorAsset;

        var camera = $('.camera').getRole('camera');

        var walker = this.elem.find('.floor-walker').getActor();

        return camera.scrollTo(asset.centerX(), 500).then(function () {

            asset.removeFrog();
            asset.locked = false;
            asset.enableDoorKnock();

            return wait(500);

        }).then(function () {

            camera.scrollTo(walker.x, 500);

        });

    };

});


$.cc.assign('map-scene', domain.map.MapScene);
