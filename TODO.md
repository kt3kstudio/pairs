# TODO

- feat: information person speaks and gives Ma the key of 701.
- show possessed items in the corner

## Design

- design(ma):
- design(ellen):
- design(emma):
- design(ochanoba):

## feat(data):
- create floor 7 to floor 16, 10 levels for each.
- create 100 levels
  - 705 - 709 710(sp)
  - 805 - 809 810(sp)
  - 901 - 909 910(sp)
  - 1001 - 1009 1010(sp)
  - 1101 - 1109 1110(sp)
  - 1201 - 1209 1210(sp)
  - 1301 - 1309 1310(sp)
  - 1401 - 1409 1410(sp)
  - 1501 - 1509 1510(sp)
  - 1601 - 1609 1610(sp)

- feat(debug): clear level button in level scene

## feat(hisotry):
- create the history when the level finished
- apply the histories to the corresponding floor assets

## block refactoring
- make rect have more usable methods like scaleCenter, scaleMiddle etc
- remove XXXLayout classes and create local rects

## feat(emoji):
- add w emoji
- add b emoji
- add the combination emojis

## deprecate:
- remove result-pane

## feat(special-stage):
- create special stage per floor
- which use what user created at each level as goals

## feat(dialogs):
- create the prototypes of the dialog sequences
- create the opening sequence of the game (dialog0.html)
- create the 1st ending sequence of the game (dialog1.html)
- create the 2nd ending sequence of the game (dialog2.html)

## feat(level)
- give up button with confirmation dialog

## feat(swipe-guide)
- create swipe guide (blinking point moves along the possible swipable area)

## feat(settings):
- create settings page
- create "reset progress" button
- add link to settings page from the title page

## feat(residents)
- give a meaning to the sequence of the residents

## game logic
- Char difference
  - ma - torus
  - ellen - sphere, state
  - emma - P2
- Make char have some simple states (like black and white)

## feat(ad):
- Ad integration (in android, ios side, maybe better to create it as straw plugin)
- Choose ad platform

## refactor(Rx.Observable)
- remove Rx.Observable.prototype.filterNull
- remove Rx.Observable.prototype.pipe
- remove Rx.Observable.prototype.emitInto
- remove Array.prototype.toFlatStream

## feat(speech)
- Cancel (skip) target in the DSL.

## sprite
- refactor char-sprite not to use word Ma, character detail should be in the dom (markup)

# DONE
- chore: use gh-pages module and uncommit build
- fix: level goal doesn't work
- block ui during sensitive action
- refactor(sprite): don't require initSprite to be called
- refactor(block,body): don't require setPoint(this.getPoint()) explicitly
- feat(road): screen scroll
- feat(sugar): add Prebody (spn)
- chore: switch from sass to postcss
- fix: door knock doesn't work
- feat(domain): update character-repository for handling location correctly
- feat(scene): switch scenes depending the character.location
- rename app name to Pairs
- the room scene (room.html)
- the road scene (road.html)
- the entrance (entrance.html)
- the 7th to 16th floors (floor.html)
- the levels 701 to 1610 (level.html)
- the ending (ending.html)
- the settings (settings.html)
- the credits (credits.html)
- remove import export and use require exports instead
- refactor(test): update to mocha@3
- feat(domain): add location model
- feat(domain): add location-detail model
- button to unlock all the assets in the floor
- review unlocking algorithm especially the initial assets in the floors.
- unlock staircase
- unlock level button in floor scene
- CharacterInitService create the initial state of the character
- make @scene decorator
- restore staircase (where does it go?)
- add levelHistory when unlocked
- remove keys when used
- create more concrete roadmap
- class-component method invoke panel
- debug panel - another project
- reset storage state widget
- create test bed of spn module / block module
- include debug-panel in htmls in debug mode
- make block more simple
- write test of @block
- enable debug build of html
- create level-signboard class
- show level-signboard when entering the level
- show level-signboard again when leaving the level
- use bare @wire and refactor level/context
- use bare @component and refactor level/components
- make relative-body a bit more cleaver
- unlocking sequence
- camera handling
- detect the corresponding door or staircase of the given key
- unlock the next level when the hero has the keys
- start unlocking sequence when the hero has a key
- create level-key component
- give level-key when the hero is successful
- remove Rx.Observable.prototype.flattenObservable
- remove Rx.Observable.prototype.hook
- fix hero(level) show animation (it is blinking now)
- fix goal-panel hide animation
- do level end screenplay
- remove paper
- show failure when the game is finished without all goals finished
- move datadomain.LevelLock* to domain
- move datadomain.LevelHistory* to domain
- move datadomain.PlayingState* to domain
- move datadomain.CharPosition* to domain
- move datadomain.CharacterFactory to domain
- remove Rx.Observable.prototype.getPromise
- GeneSource @component('gene-source')
- remove Level, Cell and Goal models in datadomain
- switch to standard (very difficult because of decorator uses.)
- use dom-gen where possible
- update dom-gen to 2.3 and replace object usage
- finish the game when the goals are achieved
- finish the game when the field is empty and the exit queue has length 1
- replace @event with @on
- goal detection
- update class-component to v9.2 and replace goal-detection.goal usage
- Show goals (cells) in goal panel
- Goal panel
- SpeechBalloon class
  - start method, started event, finished event
- make emoji appear with animation
- Design emoji framework
  - creates cell emoji classes, <i class="emoji-amf"></i>
  - creates love emoji
- move BASE_PATH to global.js
- enhance Speaker can speak letter by letter
- dont flip bubbles, pop up it.
- ScreenplayLine @component('screenplay-line')
- ScreenplayManager @component('screenplay-manager')
  - parse text/x-screenplay
  - dispatch each line
- Moo @component('moo')
- MooSprite create class
- moo layout in level.scene context
- move grid-walker to spn
- move Speaker to ui/sprite
- delete class versions of sprites
- Switch to trait version of Sprite and StaticSprite
  - Frog
  - CharOnFloor
  - paper
  - CharOnLevel
- Make the way to specify the position of Moo in the data html.
- move body to spn
- ScenarioManager Manage senario progress
- ScenarioManager create plan of DSL
- Speaker clean up speech bubble handling
- Puncher show string letter by letter
- remove Dimension
- remove DimensionalBeing
- reconsider layout-factory, maybe rename to best-area-finder or something
- split layout-factory to get-best-rect (function) and dimension-factory
- move dir-state-image-map to spn
- move image to spn
- refactor LayoutFactory not to use word dimension
- separate SPRITE_MODULE
  - name: spn
- new Artwork Moo
- new model LevelKey
- refactor dimension and gridDimension
- refactor menu-btn
- Code reading of level scene and further refactoring
- Use magrove for Cell
- Use class-component v5.2
- Clean up around DimensionFactory
  - Remame PositionFactory to DimensionFactory
  - Return Dimension object, not Object object
- Do OutroScene
- Unlocking
- Reimplement splash, using CC arch
- Reimplement title, using CC arch
- model FrogSprite
- refactor domain.map.Floor
- history loading
- DirectionalStateImageDimensionalBeing === Sprite
- LevelHistory persistence key does not have the char id in the key
- datadomain.LevelLockRepository
  - (LevelLockCollection)getByFloorId(String)
  - saveCollection(LevelLockCollection)
- datadomain.LevelLockFactory
  - createFromObject
  - createCollectionFromObjectList
- datadomain.LevelLock
  - levelId
  - unlock()
  - isLocked()
- datadomain.LevelLockCollection
  - unlock(String)
  - @private find(String)
- think about the difference and similarity between context-base design and component-base design.
  - now these two overwrap each other very much and the difference is ambiguous.
  - nail down the best practice among the possible balances of these two.
- aggregate driven modeling
- User aggregate
  - currentCharacter
  - stat
- think about making each object more isolated custom element
  - like ajax-view, ajax-form, menu-item
  - jquery plugin is a bit behind of the completely isolated state.
  - they can be made in more isolated way.
- Floor
  - floorObjects
- Character aggregate
  - id
  - name
  - position
  - histories
- Level aggregate
  - id
  - goal
  - cells
- 6-cell
- 7-cell
- ankh
- Level
- Floor
- ScoreBoard
- DoorOpen
- EvalChair
- ExitDoor
- Stairs
- InfoPanel
  - EntranceInfo
  - GameResultInfo
- CharPosition
- Ma redraw
- Map entrance choreography
- create choreographic language (with pencil and paper)
  - pencil and paper and sequence of each scene are enough
- Fusion calculator
- scene choreography of level entrance
- PhaseController (map)
- test (scaffolding)
- bug of level reset
