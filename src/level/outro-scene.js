import Context from './context'
import PlaySceneLayout from './layout/play-scene-layout'
import BackgroundService from '../ui/common/background-service'
import Cell from './component/cell'

const {component, event} = $.cc

/**
 * OutroScene handles the scene after finishing main play.
 */
@component('outro-scene')
class OutroScene extends Context {

    @event('play-scene.won play-scene.failed')
    main() {
        super.main()
    }

    /**
     * Sets up the scene.
     *
     * @override
     */
    setUp() {
        const layout = new PlaySceneLayout()

        this.getResultPane().setRect(layout.resultPaneRect())
        this.getResultPane().setScore(this.getScoreboard().score)
    }

    /**
     * Starts the scene.
     *
     * @override
     */
    start() {
        return this.getResultPane().show(30000000)

        .then(() => {

            Cell.disappear()

            this.getMenuButton().hide()

            this.getScoreboard().disappear()

            return this.getField().disappear()

        })

        .then(() => this.getBall().goCenterX())

        .then(() => this.getBall().goCenterY())

        .then(() => Promise.all([

            this.getCharacter().turn('down'),
            this.getCharacter().show(400),
            this.getBall().disappear()

        ]))

        .then(() => this.getCharacter().moveTo('y', 800, 1000))

        .then(() => BackgroundService.turnBlack())

        .then(() => history.back())
    }
}

module.exports = OutroScene
