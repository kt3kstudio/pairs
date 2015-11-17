/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.map.FloorWalker = subclass(domain.common.CharSprite, function (pt) {
  'use strict'

  /**
   * Makes the character appear in the scene
   *
   * @param {domain.map.FloorAsset} floorAsset The wall object
   * @return {Promise}
   */
  pt.appearAt = function (floorAsset) {
    this.current = floorAsset

    this.x = floorAsset.x
    this.y = floorAsset.y

    var self = this

    return floorAsset.open().then(function () {
      return self.appear()

    })

  }

  /**
   * @param {$.Eevent} e The event
   * @param {domain.map.FloorAsset} floorAsset The floor asset
   */
  pt.doorKnock = function (e, floorAsset) {
    this.moveToFloorAsset(floorAsset)

  }.event('door-knock')

  /**
   * Character goes to another floor.
   *
   * @param {Event} e The event object
   */
  pt.characterGoto = function (e) {
    this.character.position.floorId = e.goto.floorId
    this.character.position.floorObjectId = e.goto.floorObjectId

    var self = this

    this.saveCharacter().then(function () {
      self.elem.trigger($.Event('sceneReload'))

    })

  }.event('character-goto')

  /**
   * Gets the character's position.
   *
   * @return {datadomain.CharPosition}
   */
  pt.getPosition = function () {
    return this.character.position

  }

  /**
   * Sets the floor object id.
   *
   * @param {String} floorObjectId The floor object id
   */
  pt.setFloorObjectId = function (floorObjectId) {
    this.character.position.floorObjectId = floorObjectId

    this.saveCharacter()

  }

  /**
   * Saves the character data.
   */
  pt.saveCharacter = function () {
    return this.characterRepository.save(this.character)

  }

  /**
   * Moves the character sprite to wall object
   *
   * @param {domain.map.FloorAsset} floorAsset The wall object to go to
   * @return {Promise}
   */
  pt.moveToFloorAsset = function (floorAsset) {
    var self = this

    var current = this.current

    this.setFloorObjectId(floorAsset.id)

    var goOutDur = 150
    var moveOnCorridor = 300
    var goIntoDur = goOutDur

    var goOutDistance = 80

    this.elem.trigger('character-focus', [current.x])

    current.close()

    return this.moveTo('y', current.y + goOutDistance, goOutDur).then(function () {
      self.elem.trigger('character-move', [floorAsset.x, moveOnCorridor])

      floorAsset.open()

      return self.moveTo('x', floorAsset.x, moveOnCorridor)

    }).then(function () {
      return self.moveTo('y', floorAsset.y, goIntoDur)

    }).then(function () {
      self.current = floorAsset

      floorAsset.onGetWalker(self)

      return self.turn('down')

    })

  }

  /**
   * Gets the character into the door.
   */
  pt.getIntoDoor = function () {
    var self = this

    this.turn('up')

    return this.disappear().then(function () {
      return self.current.close()

    })
  }

})

$.cc.assign('floor-walker', domain.map.FloorWalker)
