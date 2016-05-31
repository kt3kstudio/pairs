import CharSprite from '../../ui/sprite/char-sprite'
import CharacterRepository from '../../domain/character-repository'
import {traits} from 'traits-decorator'
import {Body} from 'spn'

const {component, event} = $.cc

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 */
@traits(CharSprite)
@component('floor-walker')
export default class FloorWalker extends Body {

    constructor(elem) {
        super()

        this.initSprite(elem)

        this.characterRepository = new CharacterRepository()
    }

    ratioX() { return 0.5 }
    ratioY() { return 1 }

    willShow() {

        this.updateSprite()

        return super.willShow()

    }

    /**
     * Makes the character appear in the scene
     *
     * @param {FloorAsset} floorAsset The wall object
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
     * @param {Eevent} e The event
     * @param {FloorAsset} floorAsset The floor asset
     */
    @event('door-knock')
    doorKnock(e, floorAsset) {

        this.moveToFloorAsset(floorAsset)

    }

    /**
     * Character goes to another floor.
     *
     * @param {Event} e The event object
     */
    @event('character-goto')
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
     * @param {FloorAsset} floorAsset The wall object to go to
     * @return {Promise}
     */
    moveToFloorAsset(floorAsset) {

        const current = this.current

        this.setFloorObjectId(floorAsset.id)

        const goOutDur = 220
        const moveOnCorridor = 300
        const goIntoDur = goOutDur

        const goOutDistance = 80

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

        return this.disappear().then(() => this.current.close())

    }

}
