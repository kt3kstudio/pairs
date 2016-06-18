const {subclass} = $.cc

/**
 * The factory class for Level.
 */
datadomain.LevelFactory = subclass(function (pt) {
  'use strict'

  pt.createFromObject = function (obj) {
    return new datadomain.Level(
      obj.name,
      new datadomain.goal.GoalFactory().createFromObject(obj.goal),
      new datadomain.CellFactory().createCollectionFromArray(obj.cells)
    )
  }
})
