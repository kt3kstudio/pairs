import { Animation } from 'spn'

/**
 * The sprite modifier of Ma (the protagonist).
 */
export default function () {
  this.id = 'ma'
  this.name = 'ma'

  this.x = 0
  this.y = 0

  this.posture.width = 40
  this.posture.height = 60

  this.upImage = () => 'img/ma-B.svg'
  this.downImage = () => 'img/ma-F.svg'
  this.leftImage = () => 'img/ma-L.svg'
  this.rightImage = () => 'img/ma-R.svg'

  this.showAnim = () => new Animation('char-appear', 1000)
  this.hideAnim = () => new Animation('char-disappear', 1000)
}
