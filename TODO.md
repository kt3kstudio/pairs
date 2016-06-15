# TODO

## refactor:
- use dom-gen where possible
- update dom-gen to 2.2 and replace object usage

## style:
- switch to standard

## feat(goal):
- finish the game when the goals are achieved
- show failure when the game is finished without all goals finished

## refactor(cell)
- CellSource @component('cell-source')

## feat(residents)
- give a meaning to the sequence of the residents

## game logic
- Char difference
  - ma - torus
  - ellen - sphere, state
  - emma - P2
- Make char have some simple states

## Ad
- Ad integration (in android, ios side, maybe better to create it as straw plugin)
- Choose ad platform

## Tutorial
- create tutorial (guidance) - guiding finger (or blinking light) swipes the screen

--

## feat(speech)
- Cancel (skip) target in the DSL.

## feat(emoji):
- make emoji appear more slowly
  - puncher `unit-dur` configurable depending on the character to be punched

## sprite
- refactor char-sprite not to use word Ma, character detail should be in the dom

# DONE
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
