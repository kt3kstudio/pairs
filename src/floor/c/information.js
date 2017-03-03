const { blockbody, sprite } = require('../../ui')

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Information {

  block (rect) {
    return rect.slice({
      bottom: '35%',
      left: +this.el.getAttribute('x'),
      height: 35,
      width: 170,
    })
  }

}

@sprite.static(`${BASEPATH}/img/female.svg`)
class InformationPerson {
}

module.exports = Information
