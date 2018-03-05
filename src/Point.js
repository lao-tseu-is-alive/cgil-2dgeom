import {isNumeric, EPSILON, AngularSystem, getRadians, roundNumber, PRECISION} from './utils'
// import {PointCcwPointIdenticalException} from './PointError'

// noinspection SpellCheckingInspection
/**
 * Class representing  a point in 2 dimension cartesian space
 */
export default class Point {
  /**
   * Creates a point
   * @param {number} x coordinates in cartesian space or array with [x, y] numbers
   * @param {number} y coordinates in cartesian space
   */
  constructor (x = 0, y = 0) {
    if ((typeof x[0] === 'number') && (typeof x[1] === 'number')) {
      // here i am using x and y attribute setter so that correct checks are done
      this.x = x[0]
      this.y = x[1]
    } else {
      // using x and y attribute setter
      this.x = x
      this.y = y
    }
  }

  /**
   * creates a new Point in cartesian space from polar coordinates
   * @param {number} radius is the distance from origin to the point
   * @param {number} theta is the angle from x axes origin to point in mathematical order Counter-Clockwise
   * @param {Object} angleSystem your choice of one of AngularSystem Enum Radian, Degree or Gradians
   * @returns {Point} a new Point(x,y) located at the given polar coordinates
   */
  static fromPolar (radius, theta, angleSystem = AngularSystem.DEGREE) {
    if ((isNumeric(radius)) && (isNumeric(theta))) {
      let angle = 0
      if (angleSystem === AngularSystem.RADIAN) {
        angle = theta
      } else {
        angle = getRadians(theta)
      }
      let tmpPoint = new Point()
      tmpPoint._radius = radius
      tmpPoint._theta = angle // we store angle in radians
      const tmpX = radius * Math.cos(angle)
      tmpPoint.x = Math.abs(tmpX) <= EPSILON ? 0 : roundNumber(tmpX, PRECISION)
      const tmpY = radius * Math.sin(angle)
      tmpPoint.y = Math.abs(tmpY) <= EPSILON ? 0 : roundNumber(tmpY, PRECISION)
      // console.log(`roundNumber(${tmpX},10):${roundNumber(tmpX, PRECISION)}`)
      // console.log(`roundNumber(${tmpY},10):${roundNumber(tmpY, PRECISION)}`)
      return tmpPoint
    } else {
      throw new TypeError('fromPolar needs radius and theta to be valid numbers !')
    }
  }

  /**
   * get a new Point that is a copy of the otherPoint passed has parameter
   * @param {Point} otherPoint is the Point you want to copy
   * @returns {Point} a new Point located at the same cartesian coordinates as otherPoint
   */
  static fromPoint (otherPoint) {
    if (otherPoint instanceof Point) {
      return new Point(otherPoint.x, otherPoint.y)
    } else {
      throw new TypeError('fromPoint needs parameter otherPoint of type Point')
    }
  }

  /**
   * Get the x value.
   * @return {number} The x value.
   */
  get x () {
    return this._x
  }

  /**
   * Set the x value
   * @param {number} value is the new numeric value for x
   */
  set x (value) {
    if (isNumeric(value)) {
      this._x = parseFloat(value)
    } else {
      this._x = NaN
      this.isInvalid = true
      this.InvalidReason = `cannot set x to ${value} because it is not a numeric value`
    }
  }

  /**
   * Get the y value.
   * @return {number} The y value.
   */
  get y () {
    return this._y
  }

  /**
   * Set the y value
   * @param {number} value is the new numeric value for y
   */
  set y (value) {
    if (isNumeric(value)) {
      this._y = parseFloat(value)
    } else {
      this._y = NaN
      this.isInvalid = true
      this.InvalidReason = `cannot set y to ${value} because it is not a numeric value`
    }
  }

  /**
   * give a string representation of this class instance
   * @param {string} separator placed between x and y values ', ' by default
   * @returns {string}
   */
  toString (separator = ',') {
    return `(${this.x}${separator} ${this.y})`
  }

  /**
   * give an array representation of this class instance
   * @returns {Array}
   */
  toArray () {
    return [this.x, this.y]
  }

  /**
   * give an OGC Well-known text (WKT) representation of this class instance
   * https://en.wikipedia.org/wiki/Well-known_text
   * @returns {string}
   */
  toWKT () {
    return `POINT(${this.x} ${this.y})`
  }

  /**
   * give an Postgis Extended Well-known text (EWKT) representation of this class instance
   * https://postgis.net/docs/using_postgis_dbmanagement.html#EWKB_EWKT
   * @param {number} srid is the Spatial reference systems identifier EPSG code default is 21781 for Switzerland MN03
   * @returns {string}
   */
  toEWKT (srid = 21781) {
    return `SRID=${srid};POINT(${this.x} ${this.y})`
  }

  // TO implement toEWKB I can maybe use this lib : https://github.com/cschwarz/wkx

  /**
   * give a GeoJSON (http://geojson.org/) representation of this class instance geometry
   * @returns {string}
   */
  toGeoJSON () {
    return `{"type":"Point","coordinates":[${this.x},${this.y}]}`
  }

  /**
   * will move this Point to the new position in cartesian space given by the arrCoordinates
   * @param {Array} arrCoordinates is an array with the 2 cartesian coordinates [x, y]
   * @returns {Point} return this instance of the object (to allow function chaining)
   */
  moveToArray (arrCoordinates) {
    if ((isNumeric(arrCoordinates[0])) && (isNumeric(arrCoordinates[1]))) {
      this.x = arrCoordinates[0]
      this.y = arrCoordinates[1]
      return this
    } else {
      throw new TypeError('moveToArray needs an array of 2 numbers like this [1.0, 2.0]')
    }
  }

  /**
   * will move this Point to the new position in cartesian space given by the newX and newY values
   * @param {number} newX is the new x coordinates in cartesian space of this Point
   * @param {number} newY is the new y coordinates in cartesian space of this Point
   * @returns {Point} return this instance of the object (to allow function chaining)
   */
  moveTo (newX, newY) {
    if ((isNumeric(newX)) && (isNumeric(newY))) {
      this.x = newX
      this.y = newY
      return this
    } else {
      throw new TypeError('moveTo needs newX and newY to be valid numbers !')
    }
  }

  /**
   * move this Point relative to its position by the arrVector displacement in cartesian space
   * @param {Array} arrVector is an array representing the vector displacement to apply to actual coordinates [deltaX, deltaY]
   * @returns {Point} return this instance of the object (to allow function chaining)
   */
  moveRelArray (arrVector) {
    if ((isNumeric(arrVector[0])) && (isNumeric(arrVector[1]))) {
      this.x = this.x + arrVector[0]
      this.y = this.y + arrVector[1]
      return this
    } else {
      throw new TypeError('moveRelArray needs an array of 2 numbers like this [1.0, 2.0]')
    }
  }

  /**
   * move this Point relative to its position by the deltaX, deltaY displacement in cartesian space
   * @param {number} deltaX is the new x coordinates in cartesian space of this Point
   * @param {number} deltaY is the new y coordinates in cartesian space of this Point
   * @returns {Point} return this instance of the object (to allow function chaining)
   */
  moveRel (deltaX, deltaY) {
    if ((isNumeric(deltaX)) && (isNumeric(deltaY))) {
      this.x = this.x + deltaX
      this.y = this.y + deltaY
      return this
    } else {
      throw new TypeError('moveRel needs deltaX and deltaY to be valid numbers !')
    }
  }

  /**
   * move this Point relative to its position by the polar displacement in cartesian space
   * @param {number} radius is the distance from origin to the point
   * @param {number} theta is the angle from x axes origin to point in mathematical order Counter-Clockwise
   * @param {Object} angleSystem your choice of one of AngularSystem Enum Radian, Degree or Gradians
   * @returns {Point} return this instance of the object (to allow function chaining)
   */
  moveRelPolar (radius, theta, angleSystem = AngularSystem.DEGREE) {
    let tmpPoint = Point.fromPolar(radius, theta, angleSystem)
    this.x = this.x + tmpPoint.x
    this.y = this.y + tmpPoint.y
    return this
  }

  /**
   * copy this Point relative to its position by the arrVector displacement in cartesian space
   * @param {Array} arrVector is an array representing the vector displacement to apply to actual coordinates [deltaX, deltaY]
   * @returns {Point} a new Point object at the relative displacement arrVector from original Point
   */
  copyRelArray (arrVector) {
    if ((isNumeric(arrVector[0])) && (isNumeric(arrVector[1]))) {
      let tmpPoint = Point.fromPoint(this)
      tmpPoint.x = tmpPoint.x + arrVector[0]
      tmpPoint.y = tmpPoint.y + arrVector[1]
      return tmpPoint
    } else {
      throw new TypeError('copyRelArray needs an array of 2 numbers like this [1.0, 2.0]')
    }
  }

  /**
   * copy this Point relative to its position by the deltaX, deltaY displacement in cartesian space
   * @param {number} deltaX is the increment to x coordinates to this Point
   * @param {number} deltaY is the increment to y coordinates to this Point
   * @returns {Point} a new Point object at the relative deltaX, deltaY displacement from original Point
   */
  copyRel (deltaX, deltaY) {
    if ((isNumeric(deltaX)) && (isNumeric(deltaY))) {
      let tmpPoint = Point.fromPoint(this)
      tmpPoint.x = tmpPoint.x + deltaX
      tmpPoint.y = tmpPoint.y + deltaY
      return tmpPoint
    } else {
      throw new TypeError('copyRel needs deltaX and deltaY to be valid numbers !')
    }
  }

  /**
   * copy this Point relative to its position by the polar displacement in cartesian space
   * @param {number} radius is the distance from origin to the point
   * @param {number} theta is the angle from x axes origin to point in mathematical order Counter-Clockwise
   * @param {Object} angleSystem your choice of one of AngularSystem Enum Radian, Degree or Gradians
   * @returns {Point} a new Point at the polar displacement from original Point
   */
  copyRelPolar (radius, theta, angleSystem = AngularSystem.DEGREE) {
    let tmpPoint = Point.fromPolar(radius, theta, angleSystem)
    let tmpPoint2 = Point.fromPoint(this)
    tmpPoint2.x = tmpPoint2.x + tmpPoint.x
    tmpPoint2.y = tmpPoint2.y + tmpPoint.y
    return tmpPoint2
  }

  /**
   * allows to compare equality with otherPoint, they should have the same values for x and y
   * Math.sqrt(2) * Math.sqrt(2) should give 2 but gives instead 2.0000000000000004
   * Math.sqrt(3) * Math.sqrt(3) should give 2 but gives instead 2.9999999999999996
   * i found
   * So the Point Class equality should take this fact account to test near equality with EPSILON=0.0000000001
   *  feel free to adapt EPSILON value to your needs in utils.js
   * @param {Point} otherPoint
   * @returns {boolean}
   */
  equal (otherPoint) {
    if (otherPoint instanceof Point) {
      return (
        (Math.abs(this.x - otherPoint.x) <= EPSILON) &&
        (Math.abs(this.y - otherPoint.y) <= EPSILON)
      )
    } else {
      throw new TypeError('A Point can only be compared to another Point')
    }
  }

  /**
   * get the distance from this point to otherPoint
   * @param {Point} otherPoint
   * @return {Number}
   */
  distance (otherPoint) {
    if (otherPoint instanceof Point) {
      let distance = Math.sqrt(
        ((this.x - otherPoint.x) * (this.x - otherPoint.x)) +
        ((this.y - otherPoint.y) * (this.y - otherPoint.y))
      )
      if (distance <= EPSILON) {
        return 0
      } else {
        return distance
      }
    } else {
      throw new TypeError('Point.distance(otherPoint) expects a Point as parameter')
    }
  }

  /** ccw allows to know if traveling from P0 to P1 to P2 we turn counterclockwise
   *  assuming we are in cartesian space where X is directed to right and Y axis goes up
   *  and assuming the 3 points are distinct points
   *  if any points are identical ccw wil trow an error
   * from p. 350 of Book : Algorithms in C++ by Robert Sedgewick Addison-Wesley ISBN 0-201-51059-6
   * here are some examples :
   * Point.ccw(P(0,0), P(2,0), P(2,3)) // should return this Object :
   * {'counterClockwise': true, 'allPointsAreColinear': false, 'value': 1}
   *
   * Point.ccw(PP(0,0), P(2,0), P(2,-3)) // should return this Object :
   * {'counterClockwise': false, 'allPointsAreColinear': false, 'value': -1}
   *
   * let {counterClockwise, allPointsAreColinear, value} = Point.ccw(Point(0, 0.3), Point(1, 0.6), Point(2, 0.9))
   * will give you 'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1
   * have a look on my unit test in Point.spec.js for more examples
   * @param {Point} P0
   * @param {Point} P1
   * @param {Point} P2
   * @return {Object} 1 when turn is counterclockwise, -1 if not, and 0 when P2 colinear in segment between P0 and P1
   */
  static ccw (P0, P1, P2) {
    if ((P0 instanceof Point) && (P1 instanceof Point) && (P2 instanceof Point)) {
      var result = { counterClockwise: null, allPointsAreColinear: null, value: null }
      const dx1 = P1.x - P0.x
      const dx2 = P2.x - P0.x
      const dy1 = P1.y - P0.y
      const dy2 = P2.y - P0.y
      console.log(`### IN Point.ccw(P0 = ${P0.toString()}, P1 = ${P1.toString()}, P2 = ${P2.toString()})`)
      console.log(`dx1 = ${dx1}, dx2 = ${dx2}, dy1 = ${dy1}, dy2 = ${dy2}`)
      if ((Math.abs(dx1) <= EPSILON) && (Math.abs(dy1) <= EPSILON)) {
        console.log('ERROR ==> P0 and P1 are identical !')
        throw new Error('PointCcwPointIdenticalException ==> P0 and P1 are identical')
      }
      if ((Math.abs(dx2) <= EPSILON) && (Math.abs(dy2) <= EPSILON)) {
        console.log('ERROR ==> P0 and P2 are identical !')
        throw new Error('PointCcwPointIdenticalException ==> P0 and P2 are identical')
      }
      if (P1.equal(P2)) {
        console.log('ERROR ==> P1 and P2 are identical !')
        throw new Error('PointCcwPointIdenticalException ==> P1 and P2 are identical')
      }
      const CPa = dx1 * dy2 // first term of "CrossProduct" or signed magnitude of 3d cross product vector with z=0
      const CPb = dy1 * dx2 // second term of CrossProduct or signed magnitude
      console.log(`Cpa = (dx1 * dy2) = ${CPa}, CPb = dy1 * dx2 = ${CPb}`)
      if (Math.abs(CPa - CPb) <= EPSILON) { // colinear cases (epsilon test is here to handle float erros)
        console.log(`==> ALL 3 POINTS ARE COLINEAR because = (Cpa - CPb) <= EPSILON `)
        result.allPointsAreColinear = true
        if (((dx1 * dx2) < 0) || ((dy1 * dy2) < 0)) {
          result.counterClockwise = false
          result.value = -1
          console.log(`==> And P0 is between P1->P2`)
        } else {
          if ((dx1 * dx1 + dy1 * dy1) < (dx2 * dx2 + dy2 * dy2)) {
            result.counterClockwise = true
            result.value = 1
            console.log(`==> And P1 is between P0->P2`)
          } else {
            result.counterClockwise = false
            result.value = 0
            console.log(`==> And P2 is between P0->P1`)
          }
        }
      } else {
        result.allPointsAreColinear = false
        if (CPa > CPb) {
          result.counterClockwise = true
          result.value = 1
          console.log(`=> From P0->P1->P2 we turn counter-clockwise`)
        } else {
          result.counterClockwise = false
          result.value = -1
          console.log(`=> From P0->P1->P2 we turn clockwise`)
        }
      }
      return result
    } else {
      console.log('ERROR ==> P0,P1 and P2 SHOULD be of type Point class !')
      throw new TypeError('Point.ccw(P0, P1, P2) expects all parameters to be from Point class')
    }
  }
}
