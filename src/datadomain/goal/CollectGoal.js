datadomain.goal.CollectGoal = (function () {
  'use strict'

  var exports = function (type, opts) {
    this.type = type
    this.opts = opts
  }

  var cgPt = exports.prototype

  cgPt.toString = function () {
    var number = this.opts.number
    var target = domain.common.BomTable[this.opts.target]

    return 'This room needs ' + number + ' ' + this.numberize(target, number) + '.'
  }

  cgPt.numberize = function (noun, number) {
    if (number <= 1) {
      return noun
    } else {
      return noun + 's'
    }
  }

  return exports

}())
