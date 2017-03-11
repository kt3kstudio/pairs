const FieldIndexGenerator = require('../../util/FieldIndexGenerator')

const {wait} = require('spn')
const {object} = require('dom-gen')

const {component} = capsid

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */
@component
class CellCollection {
  constructor () {
    this.cells = []
  }

  /**
   * @param {Grid} grid
   */
  setGrid (grid) {
    this.grid = grid
  }

  /**
   * Checks if the field is empty.
   * @return {Boolean}
   */
  isEmpty () {
    return this.cells.length === 0
  }

  loadFromGenes (genes) {
    this.loadList(genes.map(gene => this.createCellFromGene(gene)))
  }

  /**
   * Create a cell from the gene.
   * @param {string} gene The gene string
   * @return {Cell}
   */
  createCellFromGene (gene) {
    return object({
      data: {gene: gene},
      prependTo: this.elem
    }).cc('cell').cc.get('cell')
  }

  /**
   * Loads field cells from cell list.
   *
   * @param {Array<Cell>}
   */
  loadList (list) {
    const indices = new FieldIndexGenerator().generate(list.length, this.usedIndices())

    list.forEach((cell, i) => {
      const nm = indices[i]

      cell.setGrid(this.grid, nm[1], nm[0])
      cell.unsetLastOne()

      this.cells.push(cell)
    })
  }

  /**
   * Processes the stream of released cells from the exit queue.
   *
   * @param {Rx.Observable<Cell[]>}
   * @return {Rx.Observable}
   */
  rearangeCells (releasedCellStream) {
    return releasedCellStream.pipe(releasedCells => {
      this.loadList(releasedCells)

      return this.resetShapeAndLocate()
    })
  }

  /**
   * Appears all the cells.
   * @return {Promise} The promise which resolves with the last cell when it resolved
   */
  appear () {
    return this.cells.map((cell, i) => wait(i * 56).then(() => cell.show())).pop()
  }

  /**
   * Reset the shapes of the cells and locate them.
   * @return {Promise}
   */
  resetShapeAndLocate () {
    return this.cells.map((cell, i) => wait(i * 56).then(() => cell.fitToGrid())).pop()
  }

  /**
   * Selects all the cells at the position.
   * @param {Object} pos The position
   * @return {Array}
   */
  select (pos) {
    return this.cells.filter(cell => cell.m === pos.m && cell.n === pos.n)
  }

  /**
   * Finds a cell at the position.
   * @param {Object} pos The position.
   * @return {Cell}
   */
  find (pos) {
    const candidates = this.select(pos)

    if (candidates.length === 0) {
      return null
    }

    return candidates[0]
  }

  /**
   * Selects the cells below the given postion.
   * @param {Object} pos The position
   * @return {Array}
   */
  selectRange (pos) {
    return this.cells.filter(cell => cell.m === pos.m && cell.n > pos.n)
  }

  /**
   * Removes the given cells.
   * @param {Array} cells The cells
   */
  remove (cells) {
    this.cells = this.cells.filter(cell => cells.indexOf(cell) < 0)
  }

  /**
   * Returns the list of used position indices.
   * @return {Array}
   */
  usedIndices () {
    return this.cells.map(cell => [cell.m, cell.n])
  }
}

module.exports = CellCollection
