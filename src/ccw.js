import {EPSILON} from './utils'
import Point from './Point'

// noinspection FunctionTooLongJS
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
export const ccw = function (P0, P1, P2) {
  if ((P0 instanceof Point) && (P1 instanceof Point) && (P2 instanceof Point)) {
    let result = { counterClockwise: null, allPointsAreColinear: null, value: null }
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
    if (Math.abs(CPa - CPb) <= EPSILON) { // colinear cases (epsilon test is here to handle float errors)
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
