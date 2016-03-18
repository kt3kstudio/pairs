import Context from './context'
import IntroSceneLayout from './layout/intro-scene-layout'
import PlaySceneLayout from './layout/play-scene-layout'
import BackgroundService from '../ui/common/background-service'
import UserRepository from '../domain/user-repository'
import CharacterRepository from '../domain/character-repository'

const {component, event} = $.cc

/**
 * IntroScene class handles the introduction scene of the level page.
 */
@component('intro-scene')
export default class IntroScene extends Context {

    /**
     * The entry point of the level scene.
     *
     * @protected
     * @return {Promise}
     */
    @event('scene-start')
    main() {

        super.main()

    }

    /**
     * Loads the data
     *
     * @protected
     * @return {Promise}
     */
    load() {

        return new UserRepository().get()

        .then(user => this.user = user)

        .then(() => new CharacterRepository().getById(this.user.charId))

        .then(character => this.character = character)

        .then(() => new datadomain.LevelRepository().getById(this.character.getFloorObjectId()))

        .then(level => this.level = level)

    }

    /**
     * Sets up the components.
     *
     * @protected
     * @return {Promise}
     */
    setUp() {

        const layout = new IntroSceneLayout()

        this.spawnBall()
        this.spawnPaper()
        this.spawnCharacter(this.character)

        const centerGrid = layout.centerGrid()

        this.getPaper().setGrid(centerGrid, 0, 0)

        const character = this.getCharacter()

        character.setGrid(centerGrid, 0, 1)

        character.setTransitionDuration(500)

        character.fitToGrid()

    }

    /**
     * Starts the scene
     *
     * @return {Promise}
     */
    start() {

        this.getPaper().show()

        return BackgroundService.turnWhite()

        .then(() => this.getCharacter().moveUpOnGrid(600))

        .then(() => {

            // the character takes the paper in the room.
            this.getPaper().disappear()

            const goals = $('<p />').text(this.level.goal.toString())

            // the character read up the goals of the room
            return this.getCharacter().speak(goals, {cancelDom: '.wrapper'})

        })

        .then(() => {

            this.getCharacter().hide()

            return this.getBall().show()

        })

        .then(() => this.elem.trigger('main.play-scene'))

    }

    /**
     * Spawns the ball.
     *
     * @private
     */
    spawnBall() {

        const playSceneLayout = new PlaySceneLayout()

        $($('#tpl-ball').html()).css({display: 'none'}).data({

            grid: playSceneLayout.playGrid(),
            pos: {m: 1, n: 1}

        }).appendTo(this.elem).cc.init('ball')

    }

    /**
     * Spawns the paper.
     *
     * @private
     */
    spawnPaper() {

        $('<img />').appendTo(this.elem).cc.init('paper')

    }

    /**
     * Spawns the character sprite.
     *
     * @private
     */
    spawnCharacter(character) {

        $('<img />').appendTo(this.elem).data({character: character}).cc.init('character-on-level')

    }

}
