import Context from './context'
const event = $.cc.event

/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends domain.common.Role
 */
class OutroScene extends Context {

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

        var layout = new scene.level.PlaySceneLayout()

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

        .then(() => ui.common.BackgroundService.turnBlack())

        .then(() => history.back())

    }

}

$.cc.assign('outro-scene', OutroScene)
