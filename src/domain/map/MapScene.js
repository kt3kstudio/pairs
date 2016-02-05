import SceneContext from '../common/SceneContext'
import BackgroundService from '../../ui/common/BackgroundService'
import {wait} from 'spn'

/**
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 */
@$.cc.Component('map-scene')
export default class MapScene extends SceneContext {

    /**
     * The entry point of the map scene.
     *
     * Loads things, initializes things in order, controls everything.
     */
    @$.cc.event('scene-start')
    main() {

        super.main()

    }

    /**
     * Gets the floor asset collection.
     *
     * @return {domain.map.FloorAssetCollection}
     */
    getFloorAssets() {

        return this.get('floor-asset-collection')

    }

    /**
     * Gets the camera.
     *
     * @return {domain.map.Camera}
     */
    getCamera() {

        return this.getAtElem('camera')

    }

    /**
     * Gets the floor walker.
     *
     * @return {domain.map.FloorWalker}
     */
    getWalker() {

        return this.get('floor-walker')

    }

    /**
     * Gets the floorboard.
     *
     * @return {Floorboard}
     */
    getFloorboard() {

        return this.get('floorboard')

    }

    /**
     * Loads the data for the scene.
     */
    load() {

        return new datadomain.UserRepository().get()

        .then(user => new datadomain.CharacterRepository().getById(user.charId))

        .then(character => {

            this.character = character

            return Promise.resolve($.get('data/floor/' + character.position.floorId + '.html'))

        })

        .then(data => (this.floorData = data))

    }

    /**
     * Sets up the components
     */
    setUp() {

        this.spawnFloorWalker(this.character)

        this.initFloorAssets(this.character)

        this.getCamera().setUp()

    }

    /**
     * Initializes the floor walker.
     *
     * @param {datadomain.Character} character
     */
    spawnFloorWalker(character) {

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
    initFloorAssets(character) {

        this.getFloorAssets().loadAssetsFromData(this.floorData)

        this.getFloorAssets().updateAssetsByLocksAndHistories(character.locks, character.histories)

        let currentFloorAsset = this.getFloorAssets().findById(character.position.floorObjectId)

        if (currentFloorAsset) {

            currentFloorAsset.locked = false

        }

    }

    start() {

        this.getMenuButton().show()

        BackgroundService.turnWhite()

        return this.getFloorboard().show()

        .then(() => this.getFloorAssets().show())

        .then(() => {

            let floorAsset = this.getFloorAssets().findById(this.getWalker().getPosition().floorObjectId)

            return this.getWalker().appearAt(floorAsset)

        })

    }

    fadeOut() {

        this.getMenuButton().hide()

        return this.getFloorAssets().hide().then(() => {

            this.getFloorboard().hide()

            return BackgroundService.turnBlack()

        })

    }

    walkerFadeIntoDoor() {

        return this.getWalker().getIntoDoor().then(() => this.fadeOut())

    }

    /**
     * Go to the specified level.
     *
     * @param {String} level The level
     */
    @$.cc.event('goToLevel')
    goToLevel() {

        return this.walkerFadeIntoDoor().then(() => (location.href = 'level.html'))

    }

    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    @$.cc.event('sceneReload')
    sceneReload() {

        return this.walkerFadeIntoDoor().then(() => location.reload())

    }

    /**
     * Unlocks the asset specified at the event object.
     *
     * @param {Event} e The event
     * @return {Promise}
     */
    @$.cc.event('assetUnlock')
    assetUnlock(e) {

        var asset = e.floorAsset

        return this.getCamera().scrollTo(asset.centerX(), 500)

        .then(() => {

            asset.removeFrog()
            asset.locked = false
            asset.enableDoorKnock()

            return wait(500)

        })

        .then(() => this.getCamera().scrollTo(this.getWalker().x, 500))

    }

}
