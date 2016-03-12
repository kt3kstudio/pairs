import SceneContext from '../domain/common/SceneContext'
import BackgroundService from '../ui/common/background-service'
import UserRepository from '../domain/user-repository'
import CharacterRepository from '../domain/character-repository'
import {wait} from 'spn'

import './component'

const {component, event} = $.cc

/**
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 */
@component('map-scene')
export default class MapScene extends SceneContext {

    /**
     * The entry point of the map scene.
     *
     * Loads things, initializes things in order, controls everything.
     */
    @event('scene-start')
    main() {

        super.main()

    }

    /**
     * Gets the floor asset collection.
     *
     * @return {FloorAssetCollection}
     */
    getFloorAssets() {

        return this.get('floor-asset-collection')

    }

    /**
     * Gets the camera.
     *
     * @return {Camera}
     */
    getCamera() {

        return this.getAtElem('camera')

    }

    /**
     * Gets the floor walker.
     *
     * @return {FloorWalker}
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

        return Promise.all([
            this.loadFloorData(),
            this.loadUserAndCharacter()
        ])

    }

    /**
     * Loads the user data and character data
     */
    loadUserAndCharacter() {

        return new UserRepository().get()

        .then(user => new characterRepository().getById(user.charId))

        .then(character => this.character = character)

    }

    /**
     * Loads the floor data.
     *
     * @return {Promise<string>}
     */
    loadFloorData() {

        return Promise.resolve($.get(this.getFloorDataURL()))

        .then(data => this.floorData = data)

    }

    /**
     * Gets the floor data url.
     *
     * @return {string}
     */
    getFloorDataURL() {

        return 'data/floor/' + this.character.position.floorId + '.html'

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
     * @param {Character} character
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
     * @param {Character} character
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
    @event('goToLevel')
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
    @event('sceneReload')
    sceneReload() {

        return this.walkerFadeIntoDoor().then(() => location.reload())

    }

    /**
     * Unlocks the asset specified at the event object.
     *
     * @param {Event} e The event
     * @return {Promise}
     */
    @event('assetUnlock')
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
