import Point from './Point'
// noinspection UnterminatedStatementJS

const lineDefaultOptions = {
  stroke: '#E1E1E1',
  strokeWidth: 2
}

/**
 * Class representing  a line in 2 dimension cartesian space
 */
export default class Line {
  /**
   * Creates a line
   * @param {Point} startPoint of the Line
   * @param {Point} endPoint of the Line
   * @param {Object} params
   */
  constructor (startPoint = new Point(), endPoint = new Point(1, 1), params) {
    this._options = Object.assign({}, lineDefaultOptions, params)
    // using property setters above
    this.startPoint = startPoint
    this.endPoint = endPoint
    if (endPoint.equal(startPoint)) {
      throw new TypeError(`Class Line needs a endPoint different from startPoint: ${endPoint.toString()} == ${startPoint.toString()}`)
    }
  }

  /**
   * Get the starting Point.
   * @return {Point} The starting Point of this line.
   */
  get startPoint () {
    return this._startPoint
  }

  /**
   * Set the starting Point.
   * @param {Point} otherPoint is the starting Point
   */
  set startPoint (otherPoint) {
    if (otherPoint instanceof Point) {
      if (otherPoint.isInvalid) {
        throw new TypeError(`Class Line needs a valid startPoint : ${otherPoint.InvalidReason}`)
      } else  this._startPoint = Point.fromPoint(otherPoint) // make a copy of otherPoint values we don't want keep a reference
    } else {
      throw new TypeError('startPoint setter needs parameter otherPoint of type Point')
    }
  }

  /**
   * Get the endPoint value.
   * @return {Point} The endPoint value.
   */
  get endPoint () {
    return this._endPoint
  }

  /**
   * Set the endPoint value
   * @param {Point} otherPoint is the endPoint
   */
  set endPoint (otherPoint) {
    if (otherPoint instanceof Point) {
      if (otherPoint.isInvalid) {
        throw new TypeError(`Class Line needs a valid endPoint : ${otherPoint.InvalidReason}`)
      } else this._endPoint = Point.fromPoint(otherPoint) // make a copy of otherPoint values we don't want keep a reference 
    } else {
      throw new TypeError('endPoint setter needs parameter otherPoint of type Point')
    }
  }

  /**
   * give a string representation of this class instance
   * @returns {string}
   */
  toString () {
    return `Line(${this.startPoint.toString()} -> ${this.endPoint.toString()})`
  }
}
