import SceneContext from '../common/SceneContext'

/**
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 */
domain.map.MapScene = subclass(SceneContext, function (pt, parent) {
    'use strict'

    /**
     * The entry point of the map scene.
     *
     * Loads things, initializes things in order, controls everything.
     */
    pt.main = function () {

        parent.main.apply(this, arguments)

    }.event('scene-start')

    /**
     * Gets the menu button
     *
     * @return {ui.common.MenuButton}
     */
    pt.getMenuButton = function () { return this.getGlobal('.menu-button-root', 'menu-button') }

    /**
     * Gets the floor asset collection.
     *
     * @return {domain.map.FloorAssetCollection}
     */
    pt.getFloorAssets = function () { return this.get('floor-asset-collection') }

    /**
     * Gets the camera.
     *
     * @return {domain.map.Camera}
     */
    pt.getCamera = function () { return this.getAtElem('camera') }

    /**
     * Gets the floor walker.
     *
     * @return {domain.map.FloorWalker}
     */
    pt.getWalker = function () { return this.get('floor-walker') }

    /**
     * Gets the floorboard.
     *
     * @return {domain.map.Floorboard}
     */
    pt.getFloorboard = function () { return this.get('floorboard') }

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

        this.spawnFloorWalker(this.character)

        this.initFloorAssets(this.character)

        this.getCamera().setUp()

    }

    /**
     * Initializes the floor walker.
     *
     * @param {datadomain.Character} character
     */
    pt.spawnFloorWalker = function (character) {

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

        var self = this

        this.getMenuButton().show()

        ui.common.BackgroundService.turnWhite()

        return this.getFloorboard().show().then(function () {

            return self.getFloorAssets().show()

        }).then(function () {

            var floorAsset = self.getFloorAssets().findById(self.getWalker().getPosition().floorObjectId)

            return self.getWalker().appearAt(floorAsset)

        })

    }

    pt.fadeOut = function () {

        this.getMenuButton().hide()

        var self = this

        return this.getFloorAssets().hide().then(function () {

            self.getFloorboard().hide()

            return ui.common.BackgroundService.turnBlack()

        })

    }

    pt.walkerFadeIntoDoor = function () {

        var self = this

        return this.getWalker().getIntoDoor().then(function () {

            return self.fadeOut()

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

        var self = this

        var asset = e.floorAsset

        return this.getCamera().scrollTo(asset.centerX(), 500).then(function () {

            asset.removeFrog()
            asset.locked = false
            asset.enableDoorKnock()

            return wait(500)

        }).then(function () {

            self.getCamera().scrollTo(self.getWalker().x, 500)

        })

    }.event('assetUnlock')

})

$.cc.assign('map-scene', domain.map.MapScene)
