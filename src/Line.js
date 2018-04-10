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
  constructor (startPoint = new Point(), endPoint = new Point(1, 1), params = null) {
    this._options = Object.assign({}, lineDefaultOptions, params)
    // using property setters above to check for valid values
    this.startPoint = startPoint
    this.endPoint = endPoint
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
      } else {
        if (this._endPoint !== undefined && otherPoint.equal(this._endPoint)) {
          throw new TypeError(`Class Line needs a startPoint different from endPoint : ${otherPoint.toString()} == ${this._endPoint.toString()}`)
        } else {
          // make a copy of otherPoint values we don't want keep a reference
          this._startPoint = Point.fromPoint(otherPoint)
        }
      }
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
      } else {
        if (this._startPoint !== undefined && otherPoint.equal(this._startPoint)) {
          throw new TypeError(`Class Line needs a endPoint different from startPoint: ${otherPoint.toString()} == ${this._startPoint.toString()}`)
        } else {
          // make a copy of otherPoint values we don't want keep a reference
          this._endPoint = Point.fromPoint(otherPoint)
        }
      }
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
