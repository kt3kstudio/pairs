import CharSprite from '../common/CharSprite'
/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 */
class FloorWalker extends CharSprite {

    willShow() {

        return this.updateElem()

    }

    /**
     * Makes the character appear in the scene
     *
     * @param {domain.map.FloorAsset} floorAsset The wall object
     * @return {Promise}
     */
    appearAt(floorAsset) {

        this.current = floorAsset

        this.x = floorAsset.x
        this.y = floorAsset.y

        return floorAsset.open().then(() => {

            this.turn('down')

            return this.show()

        })

    }

    /**
     * @param {$.Eevent} e The event
     * @param {domain.map.FloorAsset} floorAsset The floor asset
     */
    @$.cc.event('door-knock')
    doorKnock(e, floorAsset) {

        this.moveToFloorAsset(floorAsset)

    }

    /**
     * Character goes to another floor.
     *
     * @param {Event} e The event object
     */
    @$.cc.event('character-goto')
    characterGoto(e) {

        this.character.position.floorId = e.goto.floorId
        this.character.position.floorObjectId = e.goto.floorObjectId

        this.saveCharacter().then(() => this.elem.trigger('sceneReload'))

    }

    /**
     * Gets the character's position.
     *
     * @return {datadomain.CharPosition}
     */
    getPosition() {

        return this.character.position

    }

    /**
     * Sets the floor object id.
     *
     * @param {String} floorObjectId The floor object id
     */
    setFloorObjectId(floorObjectId) {

        this.character.position.floorObjectId = floorObjectId

        this.saveCharacter()

    }

    /**
     * Saves the character data.
     */
    saveCharacter() {

        return this.characterRepository.save(this.character)

    }

    /**
     * Moves the character sprite to wall object
     *
     * @param {domain.map.FloorAsset} floorAsset The wall object to go to
     * @return {Promise}
     */
    moveToFloorAsset(floorAsset) {

        var current = this.current

        this.setFloorObjectId(floorAsset.id)

        var goOutDur = 220
        var moveOnCorridor = 300
        var goIntoDur = goOutDur

        var goOutDistance = 80

        this.elem.trigger('character-focus', [current.x])

        current.close()

        return this.moveTo('y', current.y + goOutDistance, goOutDur)

        .then(() => {

            this.elem.trigger('character-move', [floorAsset.x, moveOnCorridor])

            floorAsset.open()

            return this.moveTo('x', floorAsset.x, moveOnCorridor)

        })

        .then(() => this.moveTo('y', floorAsset.y, goIntoDur))

        .then(() => {

            this.current = floorAsset

            floorAsset.onGetWalker(this)

            return this.turn('down')

        })

    }

    /**
     * Gets the character into the door.
     */
    getIntoDoor() {

        this.turn('up')

        return this.disappear()

        .then(() => this.current.close())

    }

}

$.cc.assign('floor-walker', FloorWalker)
