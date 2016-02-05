import Context from './context'
import PlaySceneLayout from './play-scene-layout'
import BackgroundService from '../../ui/common/BackgroundService'

const {component, event} = $.cc

/**
 * OutroScene handles the scene after finishing main play.
 */
@component('outro-scene')
export default class OutroScene extends Context {

    @event('play-scene-success play-scene-failure')
    main() {

        super.main()

    }

    /**
     * Sets up the scene.
     *
     * @override
     */
    setUp() {

        var layout = new PlaySceneLayout()

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

            domain.level.Cell.disappear()

            this.getMenuButton().hide()

            this.getScoreboard().disappear()

            return this.getField().disappear()

        })

        .then(() => this.getBall().goCenterX())

        .then(() => this.getBall().goCenterY())

        .then(() => Promise.all([

            this.getCharacter().show(400),
            this.getBall().disappear()

        ]))

        .then(() => this.getCharacter().moveTo('y', 800, 1000))

        .then(() => BackgroundService.turnBlack())

        .then(() => history.back())

    }

}
