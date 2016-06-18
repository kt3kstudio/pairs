const GENES = ['f', 'm', 'a', 'w', 'b']

const GENE_SCORE_TABLE = {
  f: 1,
  m: 1,
  a: 8,
  w: 64,
  b: 512
}

function virtualLengthOfMonon(monon) {

  return GENE_SCORE_TABLE[monon] || 0

}

function countChar(string, c) {

  return string.split(c).length - 1

}

function sumArray(array) {
  return array.reduce((n, m) => n + m)
}

/**
 * MeioticService is the service class which handles meiotic recombination and calculation of its value.
 */
export default class MeioticService {

  /**
   * Calculates the recombination the maternal gene and the paternal gene and returns a new gene.
   *
   * @param {String} maternalGene The gene of the mother
   * @param {String} paternalGene The gene of the father
   * @return {String}
   */
  recombination(maternalGene, paternalGene) {

    let newGene = (maternalGene + paternalGene).replace(/([fm])(\1)+/g, '$1')

    if (newGene.length >= 8) {
      // remove all males and females
      newGene = newGene.replace(/[fm]/g, '')

      // add an ankh for the reward of over 8 recombination
      newGene += 'a'
    }

    if (newGene.length >= 8) {
      // remove all ankhs
      newGene = newGene.replace(/[a]/g, '')

      // add a wheel for the reward of over 8 recombination
      newGene += 'w'
    }

    if (newGene.length >= 8) {
      // remove all wheels
      newGene = newGene.replace(/[w]/g, '')

      // add a bat for the reward of over 8 recombination
      newGene += 'b'
    }

    if (newGene.length >= 8) {
      newGene = 'm' // Returns to the beginning
    }

    return newGene

  }

  /**
   * Returns the virtual length of the gene.
   *
   * @param {String} gene The gene
   * @return {Number}
   */
  virtualLength(gene) {

    return sumArray(GENES.map(c => countChar(gene, c) * virtualLengthOfMonon(c)))

  }
}
