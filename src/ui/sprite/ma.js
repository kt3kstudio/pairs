const {Animation} = require('spn')

/**
 * The sprite modifier of Ma (the protagonist).
 */
module.exports = function () {
  this.width = () => 40
  this.height = () => 60

  this.upImage = () => 'img/ma-B.svg'
  this.downImage = () => 'img/ma-F.svg'
  this.leftImage = () => 'img/ma-L.svg'
  this.rightImage = () => 'img/ma-R.svg'

  this.showAnim = () => new Animation('char-appear', 1000)
  this.hideAnim = () => new Animation('char-disappear', 1000)
}
