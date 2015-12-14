/**
 * MapScene handles the scene of map
 *
 * Application Class
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.MapScene = subclass(domain.common.Actor, function (pt) {
    'use strict'

    /**
     * The entry point of the map scene.
     *
     * Loads things, initializes things in order, controls everything.
     */
    pt.main = function () {

        var self = this

        return this.load().then(function () {

            self.setUp()

            self.start()

        })

    }.event('scene-start')

    /**
     * Gets the menu button
     *
     * @return {ui.common.MenuButton}
     */
    pt.getMenuButton = function () {

        return $('.menu-button-root').cc.get('menu-button')

    }

    /**
     * Gets the floor asset collection.
     *
     * @return {domain.map.FloorAssetCollection}
     */
    pt.getFloorAssets = function () {

        return this.elem.find('.floor-asset-collection').cc.getActor()

    }

    /**
     * Gets the camera.
     *
     * @return {domain.map.Camera}
     */
    pt.getCamera = function () {

        return this.elem.cc.get('camera')

    }

    /**
     * Loads the data for the scene.
     */
    pt.load = function () {

        var self = this

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId)

        }).then(function (character) {

            self.character = character

            return Promise.resolve($.get('/data/floor/' + character.position.floorId + '.html'))

        }).then(function (data) {

            self.floorData = data

        })

    }

    /**
     * Sets up the components
     */
    pt.setUp = function () {

        this.initFloorWalker(this.character)

        this.initFloorAssets(this.character)

        this.getCamera().setUp()

    }

    /**
     * Initializes the floor walker.
     *
     * @param {datadomain.Character} character
     */
    pt.initFloorWalker = function (character) {

        $('<img />', {

            addClass: 'sub-door-knock sub-character-goto',
            appendTo: this.elem.find('.floor-asset-collection'),
            data: {character: character}

        }).cc.init('floor-walker')

    }

    /**
     * Initializes the floor assets.
     *
     * @param {datadomain.Character} character
     */
    pt.initFloorAssets = function (character) {

        this.getFloorAssets().loadAssetsFromData(this.floorData)

        this.getFloorAssets().updateAssetsByLocksAndHistories(character.locks, character.histories)

        var currentFloorAsset = this.getFloorAssets().findById(character.position.floorObjectId)

        if (currentFloorAsset) {

            currentFloorAsset.locked = false

        }

    }

    pt.start = function () {

        this.getMenuButton().show()

        ui.common.BackgroundService.turnWhite()

        var walker = this.elem.find('.floor-walker').cc.getActor()

        var floorboard = this.elem.find('.floorboard').cc.getActor()

        var assets = this.elem.find('.floor-asset-collection').cc.getActor()

        return floorboard.show().then(function () {

            return assets.show()

        }).then(function () {

            var floorAsset = assets.findById(walker.getPosition().floorObjectId)

            return walker.appearAt(floorAsset)

        })

    }

    pt.fadeOut = function () {

        this.getMenuButton().hide()

        var that = this

        return this.elem.find('.floor-asset-collection').cc.getActor().hide().then(function () {

            that.elem.find('.floorboard').cc.getActor().hide()

            return ui.common.BackgroundService.turnBlack()

        })

    }

    pt.walkerFadeIntoDoor = function () {

        var that = this

        return this.elem.find('.floor-walker').cc.getActor().getIntoDoor().then(function () {

            return that.fadeOut()

        })

    }

    /**
     * Go to the specified level.
     *
     * @param {String} level The level
     */
    pt.goToLevel = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.href = 'level.html'

        })

    }.event('goToLevel')

    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    pt.sceneReload = function () {

        return this.walkerFadeIntoDoor().then(function () {

            location.reload()

        })

    }.event('sceneReload')

    pt.assetUnlock = function (e) {

        var asset = e.floorAsset

        var camera = $('.camera').cc.get('camera')

        var walker = this.elem.find('.floor-walker').cc.getActor()

        return camera.scrollTo(asset.centerX(), 500).then(function () {

            asset.removeFrog()
            asset.locked = false
            asset.enableDoorKnock()

            return wait(500)

        }).then(function () {

            camera.scrollTo(walker.x, 500)

        })

    }.event('assetUnlock')

})

$.cc.assign('map-scene', domain.map.MapScene)
