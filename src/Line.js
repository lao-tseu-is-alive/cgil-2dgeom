import Point from './Point'
import {EPSILON} from './utils'
// noinspection UnterminatedStatementJS

const lineDefaultOptions = {
  stroke: '#E1E1E1',
  strokeWidth: 2
}

/**
 * Class representing a line segment in 2 dimension cartesian space
 * and helpers function to get other representations like toWKT, toGeoJSON etc
 * the line equation y = m*x + b can be derived with m=getSlope() and b=getYintercept() methods
 */
export default class Line {
  /**
   * Creates a line
   * @param {Point} startPoint of the Line (will be copied by value)
   * @param {Point} endPoint of the Line (will be copied by value)
   * @param {Object} params
   */
  constructor (startPoint = new Point(), endPoint = new Point(1, 1), params = null) {
    this._options = Object.assign({}, lineDefaultOptions, params)
    // using property setters above to check for valid values
    this.startPoint = startPoint
    this.endPoint = endPoint
  }

  /**
   * get a new Line that is a copy (clone) of the otherLine passed has parameter
   * @param {Line} otherLine is the Line you want to copy
   * @returns {Line} a new Line located at the same cartesian coordinates as otherLine
   */
  static fromLine (otherLine) {
    if (otherLine instanceof Line) {
      return new Line(otherLine.startPoint, otherLine.endPoint)
    } else {
      throw new TypeError('fromLine needs parameter otherLine of type Line')
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
   * give a string representation of this Line class instance
   * @returns {string}
   */
  toString () {
    return `Line(${this.startPoint.toString()} -> ${this.endPoint.toString()})`
  }

  /**
   * give an array representation of this Line class instance,
   * you can use Array.flatten()  to convert to [x1, y1, x2, y2]
   * if flatten is not implemented use reduce instead : arrResult.reduce((acc, val) => acc.concat(val), []);
   * @returns {Array} an Array giving the coord of the line like this [[x1, y1], [x2, y2]]
   */
  toArray () {
    let tmpArray = []
    tmpArray.push(this.startPoint.toArray())
    tmpArray.push(this.endPoint.toArray())
    return tmpArray
  }

  /**
   * give an OGC Well-known text (WKT) representation of this class instance
   * https://en.wikipedia.org/wiki/Well-known_text
   * @returns {string}
   */
  toWKT () {
    return `LINESTRING(${this.startPoint.x} ${this.startPoint.y}, ${this.endPoint.x} ${this.endPoint.y})`
  }

  /**
   * give an Postgis Extended Well-known text (EWKT) representation of this class instance
   * https://postgis.net/docs/using_postgis_dbmanagement.html#EWKB_EWKT
   * @param {number} srid is the Spatial reference systems identifier EPSG code default is 21781 for Switzerland MN03
   * @returns {string}
   */
  toEWKT (srid = 21781) {
    return `SRID=${srid};LINESTRING(${this.startPoint.x} ${this.startPoint.y}, ${this.endPoint.x} ${this.endPoint.y})`
  }

  // TO implement toEWKB I can maybe use this lib : https://github.com/cschwarz/wkx

  /**
   * give a GeoJSON geometry (http://geojson.org/) representation of this class instance geometry
   * @returns {string}
   */
  toGeoJSON () {
    return `{"type":"LineString","coordinates":[[${this.startPoint.x},${this.startPoint.y}],[${this.endPoint.x},${this.endPoint.y}]]}`
  }

  /**
   * give the length of the line
   * @returns {number} the length
   */
  getLength () {
    return this.startPoint.distance(this.endPoint)
  }

  /**
   * give the array [deltaX, deltaY] corresponding to difference in cartesian coordinates of this line
   * @returns {number} the length
   */
  getVectorArray () {
    const arrDelta = []
    arrDelta.push(this.endPoint.x - this.startPoint.x)
    arrDelta.push(this.endPoint.y - this.startPoint.y)
    return arrDelta
  }

  /**
   * gives the slope of the line or m defined as Δy/Δx in the line equation y = m*x + b (b is y-intercept)
   * @returns {number} a number the slope of the Line and Infinity if line is vertical
   */
  getSlope () {
    const delta = this.getVectorArray()
    if (delta[0] < EPSILON) {
      return Infinity
    } else {
      return delta[1] / delta[0] //  Δy/Δx
    }
  }

  /**
   * gives the y-intercept of the line or b in the line equation y = m*x + b (m is the Slope defined as Δy/Δx)
   * @returns {number} a number the y-intercept of the Line and NaN if line is vertical
   */
  getYIntercept () {
    const slope = this.getSlope()
    if (slope === Infinity) {
      return NaN
    } else {
      return this.startPoint.y - (slope * this.startPoint.x)
    }
  }
}
