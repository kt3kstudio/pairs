import Context from './context'
import IntroSceneLayout from './layout/intro-scene-layout'
import PlaySceneLayout from './layout/play-scene-layout'
import BackgroundService from '../ui/common/background-service'
import UserRepository from '../domain/user-repository'
import CharacterRepository from '../domain/character-repository'
import '../ui/screenplay/screenplay-manager'
import {wait} from 'spn'

const {component, on, trigger} = $.cc

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
    @on('scene-start')
    main() { super.main() }

    /**
     * Loads the data
     *
     * @protected
     * @return {Promise}
     */
    load() {
        return this.loadUser()

        .then(() => this.loadCharacter(this.user.charId))

        .then(() => this.loadLevel(this.character.getFloorObjectId()))

        .then(() => this.loadLevelNext(this.character.getFloorObjectId()))
    }

    /**
     * Loads the user.
     * @return {Promise}
     */
    loadUser() {

        return new UserRepository().get().then(user => this.user = user)

    }

    /**
     * Loads the character.
     * @param {string} id The id of the character
     * @return {Promise}
     */
    loadCharacter(id) {

        return new CharacterRepository().getById(id)
        .then(character => this.character = character)

    }

    /**
     * Loads the level of the given id.
     * @deprecated
     * @param {string} id The id of the level
     * @return {Promise}
     */
    loadLevel(id) {

        return new datadomain.LevelRepository().getById(id)
        .then(level => this.level = level)

    }

    /**
     * Loads the level of the given id.
     * @param {string} id The id of the level
     * @return {Promise}
     */
    loadLevelNext(id) {
        return Promise.resolve($.get(this.getLevelDataUrl(id))).then(levelData => {
            $(levelData).appendTo(this.elem)
        })
    }

    /**
     * Gets the url of the level data.
     * @param {string} id The id of the level
     * @return {string}
     */
    getLevelDataUrl(id) {
        return `${global.BASEPATH}/data/level/${id}.html`
    }

    /**
     * Sets up the components.
     *
     * @protected
     * @return {Promise}
     */
    setUp() {
        $.cc.init()

        const layout = new IntroSceneLayout()
        const pLayout = new PlaySceneLayout()

        this.spawnBall()
        this.spawnPaper()
        this.spawnCharacter(this.character)

        const centerGrid = layout.centerGrid()

        this.getPaper().setGrid(centerGrid, 0, 0)

        const character = this.getCharacter()

        character.setGrid(centerGrid, 0, 1)
        character.setTransitionDuration(500)
        character.fitToGrid()

        this.residents('moo').forEach(moo => moo.onSetParentRect(layout.main))

        // sets goal-panel dimension
        this.goalPanel().setRect(pLayout.goalPanelRect())
    }

    /**
     * Starts the scene
     *
     * @return {Promise}
     */
    @trigger(null, 'intro-scene.finished')
    start() {
        this.getPaper().show()

        return BackgroundService.turnWhite()

        .then(() => this.getCharacter().moveUpOnGrid(600))

        .then(() => {
            this.getPaper().disappear()

            return Promise.all(this.residents('moo').map(moo => {
                return wait(Math.random() * 500).then(() => moo.show())
            }))
        })

        .then(() => this.screenplayManager().play())

        .then(() => {
            this.getCharacter().hide()

            return this.getBall().show()
        })
    }

    @on('screenplay.goals')
    onGoalsSuggested(e, goals) {
        this.showGoalPanel(goals)
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
     * @private
     */
    spawnCharacter(character) {
        $('<img />').appendTo(this.elem).data({character: character}).cc('hero')
    }
}
