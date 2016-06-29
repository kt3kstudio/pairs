import { Grid, Rect } from 'spn'
import PlaySceneLayout from '../../../src/level/layout/play-scene-layout'

describe('PlaySceneLayout', function () {
  'use strict'

  let factory

  before(() => {
    factory = new PlaySceneLayout()
  })

  describe('fieldRect', () => {
    it('returns the rect for the field', () => {
      const dimension = factory.fieldRect()

      expect(dimension).to.be.instanceof(Rect)
    })
  })

  describe('evalRoomGrid', () => {
    it('returns the grid for the evaluation place', () => {
      const dimension = factory.evalRoomGrid()

      expect(dimension).to.be.instanceof(Grid)
    })
  })

  describe('queueGrid', () => {
    it('returns the grid for the queue', () => {
      const dimension = factory.queueGrid()

      expect(dimension).to.be.instanceof(Grid)
    })
  })

  describe('fusionBoxGrid', () => {
    it('returns the grid for the fusion place', () => {
      const dimension = factory.fusionBoxGrid()

      expect(dimension).to.be.instanceof(Grid)
    })
  })

  describe('resultPaneRect', () => {
    it('returns a rect for the result pane', () => {
      const dimension = factory.resultPaneRect()

      expect(dimension).to.be.instanceof(Rect)
    })
  })

  describe('scoreboardRect', () => {
    it('returns the rect for the scoreboard', () => {
      const dimension = factory.scoreboardRect()

      expect(dimension).to.be.instanceof(Rect)
    })
  })
})
