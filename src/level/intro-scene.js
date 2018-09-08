const Context = require('./context')
const scene = require('../ui/scene')
const IntroSceneLayout = require('./layout/intro-scene-layout')
const PlaySceneLayout = require('./layout/play-scene-layout')
const UserRepository = require('../domain/user-repository')
const CharacterRepository = require('../domain/character-repository')

const block = require('../ui/block')
const Screenplay = require('../ui/screenplay/screenplay')

const { wait } = require('spn')

const { img } = require('dom-gen')

const { prep, on, emit } = capsid

/**
 * IntroScene class handles the introduction scene of the level page.
 */
@block
@scene.primary
class IntroScene extends Context {
  /**
   * Loads the data.
   * @protected
   * @return {Promise}
   */
  load () {
    return this.loadUser()

    .then(() => this.loadCharacter(this.user.charId))

    .then(() => this.loadLevelContents(this.character.location.detail.assetId))
  }

  /**
   * Loads the user.
   * @return {Promise}
   */
  loadUser () {
    return new UserRepository().get().then(user => { this.user = user })
  }

  /**
   * Loads the character.
   * @param {string} id The id of the character
   * @return {Promise}
   */
  loadCharacter (id) {
    return new CharacterRepository().getById(id)
    .then(character => {
      this.character = character
      this.$el.data('character', character)
    })
  }

  /**
   * Loads the level of the given id.
   * @param {string} id The id of the level
   * @return {Promise}
   */
  loadLevelContents (id) {
    return $.get(this.getLevelDataUrl(id))

      .then(data => $(data).appendTo(this.el))
  }

  /**
   * Gets the url of the level data.
   * @param {string} id The id of the level
   * @return {string}
   */
  getLevelDataUrl (id) {
    return `${BASEPATH}/level/data/${id}.html`
  }

  /**
   * Sets up the components.
   * @protected
   * @return {Promise}
   */
  setUp () {
    prep()

    const layout = new IntroSceneLayout()
    const pLayout = new PlaySceneLayout()

    this.blockRect = layout.main

    this.spawnBall()
    this.spawnCharacter(this.character)

    const centerGrid = layout.centerGrid()

    const character = this.hero

    character.setGrid(centerGrid, 0, 1)
    character.setTransitionDuration(500)
    character.fitToGrid()

    Screenplay.addVars({hero: this.character.name})

    this.levelSignboard.setEntering()

    this.residents('moo').forEach(moo => moo.onSetParentRect(layout.main))

    // sets goal-panel dimension
    this.goalPanel.setRect(pLayout.goalPanelRect())
  }

  /**
   * Starts the scene
   *
   * @return {Promise}
   */
  @emits('intro-scene.finished')
  start () {
    return this.bg.turnWhite()

    .then(() => this.levelSignboard.show())

    .then(() => wait(700))

    .then(() => this.levelSignboard.hide())

    .then(() => this.hero.moveUpOnGrid(600))

    .then(() => this.showResidents('moo'))

    .then(() => this.screenplay('level-beginning').play())

    .then(() => {
      this.hero.hide()

      return this.ball.show()
    })
  }

  @on('level-goals')
  onGoalsGiven (e) {
    this.showGoalPanel(e.detail)
  }

  /**
   * Spawns the ball.
   *
   * @private
   */
  spawnBall () {
    const playSceneLayout = new PlaySceneLayout()

    $($('#tpl-ball').html()).css({ display: 'none' }).data({

      grid: playSceneLayout.playGrid(),
      pos: { m: 1, n: 1 }

    }).appendTo(this.el).cc('ball')
  }

  /**
   * Spawns the character sprite.
   * @private
   */
  spawnCharacter (character) {
    this.$el.append(img({ data: { character }, cc: 'hero' }))
  }
}

module.exports = IntroScene
