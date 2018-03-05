import {getEl} from './utils'
import Point from './Point'

const crossDefaultOptions = {
  size: 10,
  stroke: '#E1E1E1',
  strokeWidth: 2,
  yAxisUp: true
}

export function drawCross (parentId, id, cx = 0, cy = 0, title = 'cross', params) {
  let opt = Object.assign({}, crossDefaultOptions, params)
  const halfSize = opt.size / 2
  let parentSvgElement = getEl(parentId)
  let pointGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  let pointTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title')
  pointTitle.textContent = `${title} : (${Math.round(cx)},${Math.round(cy)})`
  let pointElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pointElement.setAttribute('id', id)
  if (opt.yAxisUp) {
    pointElement.setAttribute('d', `M${cx - halfSize} ${cy * -1}  l${opt.size} 0 M${cx} ${((cy * -1) - halfSize)} l0 ${opt.size}`)
  } else {
    pointElement.setAttribute('d', `M${cx - halfSize} ${cy}  l${opt.size} 0 M${cx} ${cy - halfSize} l0 ${opt.size}`)
  }
  pointElement.setAttribute('stroke', opt.stroke)
  pointElement.setAttribute('stroke-width', opt.strokeWidth)
  pointElement.style.cursor = 'pointer'
  pointGroup.appendChild(pointTitle)
  pointGroup.appendChild(pointElement)
  parentSvgElement.appendChild(pointGroup)
}

export class Cross {
  constructor (parentId, id, centerPoint, title = 'cross', params) {
    if (centerPoint instanceof Point) {
      let options = Object.assign({}, crossDefaultOptions, params)
      this._cx = centerPoint.x
      this._cy = centerPoint.y
      this._size = options.size
      this._stroke = options.stroke
      this._strokeWidth = options.strokeWidth
      drawCross(parentId, id, this._cx, this._cy, title, params)
    } else {
      throw new TypeError('Cross expects centerPoint to be a Point')
    }
  }
}

export const makeGridCross = function (svgid = 'svg', axeCentered = true, deltaX = 100, deltaY = 100) {
  let svg = getEl(svgid)
  let gripGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  gripGroup.setAttribute('id', 'gridGroup')
  svg.appendChild(gripGroup)
  for (let xi = deltaX; xi < svg.clientWidth; xi += deltaX) {
    for (let yi = deltaY; yi < svg.clientHeight; yi += deltaY) {
      drawCross('gridGroup', `t-${xi}-${yi}`, xi, yi, {strokeWidth: 1})
    }
  }
}
