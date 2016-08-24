const Context = require('./context')
const PlaySceneLayout = require('./layout/play-scene-layout')
const {wait} = require('spn')
const {toPromise} = require('../util/rx')
const FusionPreparationService = require('./component/fusion-preparation-service')
const BallMoveMobLeaveService = require('./component/ball-move-mob-leave-service')
const ExitQueue = require('./component/exit-queue')

const {component, on, emit} = $.cc

/**
 * PlayScene controlls the main playing scene of the level page.
 */
@component
class PlayScene extends Context {
  /**
   * The entry point
   */
  @on('intro-scene.finished') main () { super.main() }

  /**
   * Sets up the components.
   */
  setUp () {
    const layout = new PlaySceneLayout()

    this.character = this.hero.character

    this.cells.setGrid(layout.playGrid())
    this.cells.loadFromGenes(this.geneSource.genes)

    this.field.setRect(layout.fieldRect())

    this.elem.cc('cell-queue-bump-service')

    // services
    this.fps = new FusionPreparationService(layout.evalRoomGrid())
    this.fusionService.setGrid(layout.fusionBoxGrid())
    this.exitQueue = new ExitQueue(layout.queueGrid())

    // ball move service
    this.bms = new BallMoveMobLeaveService(this.ball, this.cells)

    // init scoreboard dimension
    this.scoreboard.setRect(layout.scoreboardRect())
  }

  /**
   * Records the stream of the directions.
   * @param {Rx.Observable<String>} dirs
   */
  recordDirStream (dirStream) {
    dirStream.forEach(dir => {
      this.character.playingState.add(dir)

      this.character.savePlayingState()
    })
  }

  /**
   * Hooks the playing state bump to the stream
   *
   * @param {Rx.Observable} stream The stream
   * @return {Rx.Observable}
   */
  hookPlayingStateBumping (stream) {
    return stream.filter(() => {
      this.character.playingState.bump()

      return true
    })
  }

  /**
   * Binds event handlers to the stream.
   * @param {Rx.Observable} dirStream The stream of directions
   * @return {Promise}
   */
  playLoop (dirStream) {
    const FINISH_TAG = 'finish'
    const cellStream = this.bms.processDirStream(dirStream)

    let fusionPairs = this.fps.processCellStream(cellStream)

    fusionPairs = this.scoreboard.hookToFusionPairStream(fusionPairs)

    let newCells = this.fusionService.processFusionPairStream(fusionPairs)

    newCells = Rx.Observable.merge(
      newCells,
      Rx.Observable.fromEvent(this.elem, 'goal-detection.finish').map(FINISH_TAG)
    ).takeWhile(x => x !== FINISH_TAG)

    let exitCells = this.exitQueue.processNewCellStream(newCells)

    exitCells = this.cellQueueBumpService.bump(exitCells)

    exitCells = this.hookPlayingStateBumping(exitCells)

    return toPromise(this.cells.rearangeCells(exitCells))
  }

  /**
   * Replays the saved playing state.
   * @return {Promise}
   */
  replayRounds () {
    return this.character.playingState.rounds.reduce((promise, round) =>
      promise.then(() =>
        this.playLoop(round.map((dir, i) => wait(i * 180, dir)).toFlatStream())
      ), Promise.resolve()
    )
  }

  /**
   * Is called when the user start playing the game.
   * @return {Promise}
   */
  userPlay () {
    const userDirStream = this.getUserSwipeStream()

    this.recordDirStream(userDirStream)

    return this.playLoop(userDirStream)
  }

  /**
   * Starts the scene.
   * @return {Promise}
   */
  @emit('play-scene.finished').last
  start () {
    return this.showComponents()

    // .then(() => this.replayRounds())

    .then(() => this.userPlay())

    .then(() => this.onSceneFinish())
  }

  /**
   * @return {Promise}
   */
  showComponents () {
    this.menuButton.show()

    return this.field.show()

    .then(() => this.character.reloadPlayingState())

    .then(() => this.hideResidents('moo'))

    .then(() => this.cells.appear())

    .then(() => this.scoreboard.show())
  }

  /**
   * Process the things necessary when this scene is finished
   */
  onSceneFinish () {
    this.removeSwipeField()
    this.character.clearPlayingState()
  }

  /**
   * Gets the stream of direction symbols from the user's swipe operation.
   *
   * @return {Rx.Observable}
   */
  getUserSwipeStream () {
    const field = $('.swipe-field')

    return Rx.Observable.merge(
      field.streamOf('swipeup').map('up'),
      field.streamOf('swipedown').map('down'),
      field.streamOf('swipeleft').map('left'),
      field.streamOf('swiperight').map('right')
    )
  }

  /**
   * Removes the swipe field.
   */
  removeSwipeField () {
    $('.swipe-field').remove()
  }
}

module.exports = PlayScene
