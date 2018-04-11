// noinspection NpmUsedModulesInstalled
/* eslint-disable no-unused-expressions */
import Point from '../Point'
import {ccw} from '../ccw'

// noinspection Annotator
describe('ccw.js module', () => {
  const PA = new Point(3, 9)
  const PB = new Point(11, 1)
  const PC = new Point(6, 8)
  const PD = new Point(4, 3)
  test(
    'should throw an error when any parameter is not an instance of Point',
    () => {
      expect(ccw.bind(P1, [1.0, 2.0])).toThrow(TypeError, 'ccw(P0, P1, P2) expects all parameters to be from Point class')
    }
  )
  test(
    'ccw(PA, PB, PC) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': false, \'value\': 1}',
    () => {
      expect(ccw(PA, PB, PC)).toMatchObject({'counterClockwise': true, 'allPointsAreColinear': false, 'value': 1})
    }
  )
  test(
    'ccw(PA, PB, PD) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': false, \'value\': -1}',
    () => {
      expect(ccw(PA, PB, PD)).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': false, 'value': -1})
    }
  )
  // testing simple case from origin
  test(
    'ccw(P(0,0), P(2,0), P(2,3)) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': false, \'value\': 1}',
    () => {
      expect(ccw(new Point(), new Point(2.0, 0), new Point(2.0, 3.0))).toMatchObject({'counterClockwise': true, 'allPointsAreColinear': false, 'value': 1})
    }
  )
  test(
    'ccw(P(0,0), P(2,0), P(2,-3)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': false, \'value\': -1}',
    () => {
      expect(ccw(new Point(), new Point(2.0, 0), new Point(2.0, -3.0))).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': false, 'value': -1})
    }
  )
  test(
    'ccw(P(0,0), P(2,0), P(4,0.0)) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1}',
    () => {
      expect(ccw(new Point(), new Point(2.0, 0), new Point(4.0, 0.0))).toMatchObject({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    }
  )
  test(
    'ccw(P(0,0), P(4,0.0), P(2,0)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0}',
    () => {
      expect(ccw(new Point(), new Point(4.0, 0.0), new Point(2.0, 0))).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    }
  )
  test(
    'ccw(P(2,0), P(0,0), P(4,0.0)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1}',
    () => {
      expect(ccw(new Point(2.0, 0), new Point(), new Point(4.0, 0.0))).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    }
  )
  // testing extreme case where some or all points are identical
  const POrigin = new Point()
  test(
    'ccw(P(0,0), P(0,0), P(0,0.0)) should throw an error when any points are identical here : P0 and P1 are identical',
    () => {
      expect(ccw.bind(undefined, POrigin, POrigin, POrigin)).toThrow('PointCcwPointIdenticalException ==> P0 and P1 are identical')
    }
  )
  test(
    'ccw(P(2,2), P(4,4), P(2,2.0)) should throw an error when any points are identical here : P0 and P2 are identical',
    () => {
      expect(ccw.bind(undefined, new Point(2, 2), new Point(4, 4), new Point(2, 2.0))).toThrow('PointCcwPointIdenticalException ==> P0 and P2 are identical')
    }
  )
  test(
    'ccw(P(0,0), P(2,2), P(2,2.0)) should throw an error when any points are identical here : P1 and P2 are identical',
    () => {
      expect(ccw.bind(undefined, new Point(0, 0), new Point(2, 2), new Point(2, 2.0))).toThrow('PointCcwPointIdenticalException ==> P1 and P2 are identical')
    }
  )
  const P0 = new Point(1, 1)
  const P1 = new Point(2, 2)
  const P2 = new Point(3, 3)
  test(
    'ccw(P0, P2, P1) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0} when P0,P1 and P2 are colinear and P1 is between P0 and P2',
    () => {
      expect(ccw(P0, P2, P1)).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    }
  )
  test(
    'ccw(P1, P0, P2) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1} when P0,P1 and P2 are colinear and P1 is between P0 and P2',
    () => {
      expect(ccw(P1, P0, P2)).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    }
  )
  test(
    'ccw(P0, P1, P2) should return {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1} when  P0,P1 and P2 are colinear and P1 is between P0 and P2',
    () => {
      expect(ccw(P0, P1, P2)).toMatchObject({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    }
  )
  const PF1 = new Point(0, 0.3) // testing robustness when having float values
  const PF2 = new Point(1, 0.6)
  const PF3 = new Point(2, 0.9)
  test(
    'ccw(PF1, PF3, PF2) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0} when P1,P2 and P3 are colinear and P2 is between P1 and P3',
    () => {
      expect(ccw(PF1, PF3, PF2)).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    }
  )
  test(
    'ccw(PF2, PF1, PF3) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1} when P1,P2 and P3 are colinear and P2 is between P1 and P3',
    () => {
      expect(ccw(PF2, PF1, PF3)).toMatchObject({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    }
  )
  test(
    'ccw(PF1, PF2, PF3) should return {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1} when  P1,P2 and P3 are colinear and P2 is between P1 and P3',
    () => {
      expect(ccw(PF1, PF2, PF3)).toMatchObject({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    }
  )
})
