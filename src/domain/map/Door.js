/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
domain.map.Door = subclass(domain.map.FloorAsset, function (pt, parent) {
  'use strict'

  var DOOR_APPEAR_DUR = 400

  /**
   * @constructor
   */
  pt.constructor = function (elem) {
    parent.constructor.call(this, elem)

    this.level = elem.attr('level')
    this.star = 0
    this.score = 0

    this.locked = true

  }

  /**
   * Constructs the contents of the door. (Maybe not a good thing to do here)
   *
   * @override
   */
  pt.willShow = function () {
    parent.willShow.call(this)

    this.elem.css('opcaity', 0)

    this.$doorBody = $('<div />').addClass('door-body').appendTo(this.elem)

    $('<div />').addClass('door-front').text(this.id).appendTo(this.$doorBody)

    $('<div />').addClass('doorknob').text('●').appendTo(this.$doorBody)

    this.infoPane = $('<div><div class="door-info-content"><p>' + this.id + '</p><hr /><p><small>♛ Best ♛</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
      width: '150px',
      height: '150px',
      top: '-200px',
      left: '-40px'

    }).appendTo(this.elem).infoPane(3, 5, {bgcolor: '#393F44'})

    $('<button />').text('▶').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {
      event.preventDefault()
      $(this).trigger('goToLevel')

    })

    if (!this.locked) {
      this.enableDoorKnock()

    } else {
      return this.spawnFrog()

    }

  }

  /**
   * Opens the door.
   */
  pt.open = function () {
    this.infoPane.show()

    this.$doorBody
      .addClass('open')

    this.removeFrog()

    this.disableDoorKnock()

    return wait(this.doorActionDur)

  }

  /**
   * Closes the door.
   */
  pt.close = function () {
    this.infoPane.hide()

    this.$doorBody
      .removeClass('open')

    this.enableDoorKnock()

    return wait(this.doorActionDur)

  }

  /**
   * Unlocks the door.
   */
  pt.unlock = function () {
    this.locked = false

    this.enableDoorKnock()

    this.removeFrog()

  }

  /**
   * Enables the door knock.
   */
  pt.enableDoorKnock = function () {
    var that = this

    this.$doorBody.one('click', function () {
      that.doorKnock()

    })

  }

  /**
   * Disables the door knock.
   */
  pt.disableDoorKnock = function () {
    this.$doorBody.off('click')

  }

  pt.doorActionDur = 400

  pt.showAnim = 'door-appear'
  pt.showAnimDur = DOOR_APPEAR_DUR
  pt.hideAnim = 'door-disappear'
  pt.hideAnimDur = DOOR_APPEAR_DUR

})

$.cc.assign('door', domain.map.Door)
