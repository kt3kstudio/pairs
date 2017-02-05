const { Prebody } = require('spn')
const { traits } = require('traits-decorator')

const { component } = capsid

module.exports = ({ width, height, ratio, margin, defaultTransitionDuration, showDuration }) => Cls => {
  const pt = Cls.prototype

  if (width) { pt.width = () => width }
  if (height) { pt.height = () => height }
  if (ratio && ratio.x) { pt.ratioX = () => ratio.x }
  if (ratio && ratio.y) { pt.ratioY = () => ratio.y }
  if (margin && margin.x) { pt.marginX = () => margin.x }
  if (margin && margin.y) { pt.marginY = () => margin.y }
  if (margin && margin.top) { pt.marginTop = () => margin.top }
  if (margin && margin.left) { pt.marginLeft = () => margin.left }
  if (margin && margin.right) { pt.marginRight = () => margin.right }
  if (margin && margin.bottom) { pt.marginBottom = () => margin.bottom }

  return traits(Prebody)(component(Cls))
}
