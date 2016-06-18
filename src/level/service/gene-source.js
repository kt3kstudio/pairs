const {component} = $.cc

/**
 * The source of cells in a level
 */
void
@component('gene-source')
class {
  constructor (elem) {
    this.genes = this.parseGenes(elem.text())
  }

  /**
   * Parses the text genes.
   * @param {string} text The input text
   * @return {string[]}
   */
  parseGenes (text) {
    return text.replace(/^\s*|\s*$/g, '').split(/\s+/)
  }
}
