# TODO


- Code reading of level scene and further refactoring

- Clean up around DimensionFactory
  - Remame PositionFactory to DimensionFactory
  - Return Dimension object, not Object object

[Make residents]
- Who suggest what they need for their rooms
- draw the residents in the notebook and pin it
- gather ideas of the residents, the reason for them needing the

### low pri
- Ad integration
- Switch dependency to mangrove


# Idea
- Char difference
  - ma - torus
  - ellen - sphere
  - emma - P2
- something should be always moving (dancing) in the map
  - maybe it has some silly interaction

## Artwork
- finger - swipe tutorial
  - use free finger icon out there

- backgrounds


# DONE
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
