import Point from './Point'
// noinspection UnterminatedStatementJS

const lineDefaultOptions = {
  stroke: '#E1E1E1',
  strokeWidth: 2
}

class LineError extends Error {
  constructor (errorMessage) {
    super()
    this.message = errorMessage
    this.CLASSNAME = 'Line'
    this.toString = function () {
      return `Error in Class ${this.CLASSNAME}: ${this.message}`
    }
  }
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
    if (startPoint.isInvalid) throw new LineError(`I need a valid startPoint : ${startPoint.InvalidReason}`)
    if (endPoint.isInvalid) throw new LineError(`I need a valid endPoint : ${endPoint.InvalidReason}`)
    this._startPoint = startPoint
    this._endPoint = endPoint
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
   * @param {Point} value is the starting Point
   */
  set startPoint (value) {
    this._startPoint = value
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
   * @param {Point} value is the endPoint
   */
  set endPoint (value) {
    this._endPoint = value
  }

  /**
   * give a string representation of this class instance
   * @returns {string}
   */
  toString () {
    return `Line(${this.startPoint.toString()} -> ${this.endPoint.toString()})`
  }
}
