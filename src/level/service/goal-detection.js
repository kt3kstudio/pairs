const {extractCells} = require('../../util/emoji')

const {on, emit, component} = $.cc

/**
 * The service class which detects if the goals are achieved.
 */
void
@component('goal-detection')
class GoalDetectionService {
  /**
   * Sets the goals.
   * @param {string} goals The goals in text
   */
  constructor(elem) {
    this.goals = extractCells(elem.data('goals-text'))
  }

  /**
   * @param {object} e The event object
   * @param {Cell} cell The new born cell
   */
  @on('cell-fusion')
  onCellFusion(e, cell) {
    const index = this.goals.indexOf(cell.gene)

    if (index !== -1) {
      this.countGoal(index)
    }
  }

  /**
   * Counts the goal at the given index. This means the goal of the given index is achieved.
   * @param {number} index The index of the goal
   */
  @emit('goal-detection.goal')
  countGoal(index) {
    delete this.goals[index]

    if (this.remaining() === 0) {
      this.elem.trigger('goal-detection.finish')
    }
  }

  /**
   * Returns the number of remaining goals.
   * @return {number}
   */
  remaining() {
    return this.goals.filter(x => x != null).length
  }
}
