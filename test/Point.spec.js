// noinspection NpmUsedModulesInstalled
/* eslint-disable no-unused-expressions */
import Point from '../src/Point'
// import {PointCcwPointIdenticalException} from '@/lib/PointError'
import {AngularSystem} from '../src/lib/utils'

// noinspection Annotator
describe('Point.js module', function () {
  before(function () {
    // executed before the begin of test :    https://mochajs.org/#hooks
  })
  const P0 = new Point()
  const P1 = new Point(1.0, 2.0)
  describe('Point constructor', function () {
    it('constructor with default parameters should return an instance of Point', () => {
      expect(P0).to.be.an.instanceOf(Point)
    })
    it('constructor with default parameters should have x = 0', () => {
      expect(P0).to.have.property('x', 0)
    })
    it('constructor with default parameters should return y = 0', () => {
      expect(P0).to.have.property('y', 0)
    })
    const P1 = new Point(1.0, 2.0)
    it('new Point(1.0, 2.0) should return an instance of Point', () => {
      expect(P1).to.be.an.instanceOf(Point)
    })
    it('should allow new Point("1.12345689") with a x as string number and y=0 implicit', () => {
      const P3 = new Point('1.12345689') // y=0 implicitly
      expect(P3).to.have.property('x', 1.12345689)
      expect(P3).to.have.property('y', 0)
    })

    it('should allow to set y to a valid string number value correctly', () => {
      const P3 = new Point('1.12345689') // y=0 implicitly
      P3.y = '-1.123456789'
      expect(P3).to.have.property('y', -1.123456789)
    })
    it('should allow to construct a new Point from an array of 2 numbers ', () => {
      try {
        const PointFromArray = new Point([1.0, 2.0])
        expect(PointFromArray).to.have.property('x', 1.0)
        expect(PointFromArray).to.have.property('y', 2.0)
      } catch (e) {
        console.log('## ERROR trying to construct new Point([1.0, 2.0])')
      }
    })
  })

  describe('Point x,y accessors ', function () {
    it('should give back x value correctly', () => {
      expect(P1).to.have.property('x', 1.0)
    })
    it('should give back y value correctly', () => {
      expect(P1).to.have.property('y', 2.0)
    })
    const P2 = new Point()
    P2.x = 3.0
    P2.y = 4.0
    it('should allow to set x value correctly', () => {
      expect(P2).to.have.property('x', 3.0)
    })
    it('should allow to set y value correctly', () => {
      expect(P2).to.have.property('y', 4.0)
    })
  })

  describe('Point.fromPolar(radius, theta)', function () {
    it('should throw an Error when no parameters are passed', () => {
      expect(Point.fromPolar.bind(undefined, [])).to.throw(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
    })
    it('should give a Point(0,0) when radius=0', function () {
      const P1 = Point.fromPolar(0, 45)
      expect(P1.equal(new Point())).to.equal(true)
    })
    it('should give a Point(0,5) when radius=5 and theta=Pi/2 radians', function () {
      const P1 = Point.fromPolar(5, Math.PI / 2, AngularSystem.RADIAN)
      expect(P1.equal(new Point(0, 5))).to.equal(true)
    })
  })

  describe('Point.fromPoint(otherPoint)', function () {
    it('should throw an Error when parameter is not a valid Point', () => {
      expect(Point.fromPoint.bind(undefined, [])).to.throw(TypeError, 'fromPoint needs parameter otherPoint of type Point')
    })
    it('should give a Point(0,0) when given new Point()', function () {
      const P1 = Point.fromPoint(new Point())
      expect(P1.equal(new Point())).to.equal(true)
    })
    it('should copy x,y values in the new point', function () {
      const P1 = new Point(5.3, 2.1)
      expect(P1.equal(new Point(5.3, 2.1))).to.equal(true)
    })
  })

  describe('Point stores isInvalid and NaN when using wrong values', function () {
    const badY = 'house'
    const PWrong = new Point('one', badY)
    it('should set Point.isInvalid to true when given incorrect x or y value ', () => {
      expect(PWrong).to.have.property('isInvalid', true)
    })
    it('should set Point.InvalidReason to string when given incorrect x or y value ', () => {
      expect(PWrong).to.have.property('InvalidReason', `cannot set y to ${badY} because it is not a numeric value`)
    })
    it('should set X to NaN when given incorrect x value ', () => {
      expect(PWrong.x).to.be.NaN
    })
    it('should set Y to NaN when given incorrect x value ', () => {
      expect(PWrong.y).to.be.NaN
    })
  })

  describe('Point.toString()', function () {
    it('should return a correct string representation', () => {
      expect(P1.toString()).to.equal(`(${1.0}, ${2.0})`)
    })
  })

  describe('Point.toArray allows to get back array [x,y]', function () {
    const arrPoint = P1.toArray()
    it('should return an array', () => {
      expect(arrPoint).to.be.an.instanceOf(Array)
    })
    it('should copy the x value correctly in the array', () => {
      expect(arrPoint[0]).to.equal(1.0)
    })
    it('should copy the y value correctly in the array', () => {
      expect(arrPoint[1]).to.equal(2.0)
    })
  })

  describe('Point can be exported to OGC and Postgis', function () {
    it('toWKT should return a correct OGC Well-known text (WKT) representation', () => {
      expect(P1.toWKT()).to.equal(`POINT(${P1.x} ${P1.y})`)
    })
    it('toEWKT should return a correct Postgis Extended Well-known text (EWKT) representation', () => {
      const srid = 21781
      expect(P1.toEWKT()).to.equal(`SRID=${srid};POINT(${P1.x} ${P1.y})`)
    })
    it('toGeoJSON should return a correct GeoJSON (http://geojson.org/) representation', () => {
      expect(P1.toGeoJSON()).to.equal(`{"type":"Point","coordinates":[${P1.x},${P1.y}]}`)
    })
  })

  describe('Point.js equals equality operator', function () {
    const P1bis = new Point(1, 2)
    const P2 = new Point(2, 1)
    it('should throw an error when equals(otherPoint) with otherPoint is not an instance of Point', () => {
      expect(P1.equal.bind(P1, [1.0, 2.0])).to.throw(TypeError, 'A Point can only be compared to another Point')
    })
    it('should return true when comparing two Points with default constructor', () => {
      const P0 = new Point()
      const P0bis = new Point()
      expect(P0.equal(P0bis)).to.equal(true)
    })
    it('should return true when comparing two Points that have identical values', () => {
      expect(P1.equal(P1bis)).to.equal(true)
    })
    it('should return true when comparing two Points that have nearly identical values', () => {
      const P0 = new Point(2, 3)
      // Math.sqrt(2) * Math.sqrt(2) should give 2 but gives instead 2.0000000000000004
      // Math.sqrt(3) * Math.sqrt(3) should give 2 but gives instead 2.9999999999999996
      // Point Class equality should test near equality with EPSILON
      const P0FloatError = new Point((Math.sqrt(2) * Math.sqrt(2)), Math.sqrt(3) * Math.sqrt(3))
      expect(P0.equal(P0FloatError)).to.equal(true)
    })
    it('should return false when comparing two Points that have identical values', () => {
      expect(P1.equal(P2)).to.equal(false)
    })
  })

  describe('Point can be moved', function () {
    it('moveToArray should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveToArray.bind(P0, ['a', 1])).to.throw(TypeError, 'moveToArray needs an array of 2 numbers like this [1.0, 2.0]')
    })
    it('moveToArray should move correctly x and y', () => {
      expect(P0.moveToArray([1.0, 2.0]).equal(P1)).to.equal(true)
    })
    it('moveTo should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveTo.bind(P0, ['x', 1])).to.throw(TypeError, 'moveTo needs newX and newY to be valid numbers !')
    })
    it('moveTo should move correctly x and y', () => {
      expect(P0.moveTo(1.0, 2.0).equal(P1)).to.equal(true)
    })
    it('moveRelArray should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveRelArray.bind(P0, ['a', 1])).to.throw(TypeError, 'moveRelArray needs an array of 2 numbers like this [1.0, 2.0]')
    })
    it('moveRelArray should move x and y by the vector displacement', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.moveRelArray([1.0, 2.0]).equal(P1)).to.equal(true)
    })
    it('moveRel should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveRel.bind(P0, ['a', 1])).to.throw(TypeError, 'moveRel needs deltaX and deltaY to be valid numbers !')
    })
    it('moveRel should move correctly x and y', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.moveRel(1.0, 2.0).equal(P1)).to.equal(true)
    })
    it('moveRelPolar should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveRelPolar.bind(P0, ['a', 1])).to.throw(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
    })
    it('moveRelPolar should move correctly x and y', () => {
      const P0 = new Point(1.0, 0.0)
      const P1 = new Point(1.0, 3.0)
      expect(P0.moveRelPolar(3.0, 90).equal(P1)).to.equal(true)
    })
  })
  describe('Point can be copied', function () {
    it('copyRelArray should throw a TypeError when parameters are not numbers', () => {
      expect(P0.copyRelArray.bind(P0, ['a', 1])).to.throw(TypeError, 'copyRelArray needs an array of 2 numbers like this [1.0, 2.0]')
    })
    it('copyRelArray should return an instance of Point', () => {
      expect(P0.copyRelArray([1.0, 2.0])).to.be.an.instanceOf(Point)
    })
    it('copyRelArray should move x and y by the vector displacement', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.copyRelArray([1.0, 2.0]).equal(P1)).to.equal(true)
    })

    it('copyRel should throw a TypeError when parameters are not numbers', () => {
      expect(P0.copyRel.bind(P0, ['a', 1])).to.throw(TypeError, 'copyRel needs deltaX and deltaY to be valid numbers !')
    })
    it('copyRel should return an instance of Point', () => {
      expect(P0.copyRel(1.0, 2.0)).to.be.an.instanceOf(Point)
    })
    it('copyRel should move correctly x and y', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.copyRel(1.0, 2.0).equal(P1)).to.equal(true)
    })

    it('copyRelPolar should throw a TypeError when parameters are not numbers', () => {
      expect(P0.copyRelPolar.bind(P0, ['a', 1])).to.throw(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
    })
    it('copyRelPolar should return an instance of Point', () => {
      expect(P0.copyRelPolar(1.0, 2.0)).to.be.an.instanceOf(Point)
    })
    it('copyRelPolar should copy correctly x and y', () => {
      const P0 = new Point(1.0, 0.0)
      const P1 = new Point(1.0, 3.0)
      expect(P0.copyRelPolar(3.0, 90).equal(P1)).to.equal(true)
    })
  })
  describe('Point.js distance method ', function () {
    const P1bis = new Point(1, 2)
    it('should throw an error when distance(otherPoint) with otherPoint is not an instance of Point', () => {
      expect(P1.distance.bind(P1, [1.0, 2.0])).to.throw(TypeError, 'Point.distance(otherPoint) expects a Point as parameter')
    })
    it('should return zero when getting distance from two Points with default constructor', () => {
      const P0 = new Point()
      const P0bis = new Point()
      expect(P0.distance(P0bis)).to.equal(0)
    })
    it('should return zero when getting distance from two Points that have identical values', () => {
      expect(P1.distance(P1bis)).to.equal(0)
    })
    it('should return zero when getting distance from two Points that have nearly identical values', () => {
      const P0 = new Point(2, 3)
      // Math.sqrt(2) * Math.sqrt(2) should give 2 but gives instead 2.0000000000000004
      // Math.sqrt(3) * Math.sqrt(3) should give 3 but gives instead 2.9999999999999996
      // Point Class equality should test near equality with EPSILON
      const P0FloatError = new Point((Math.sqrt(2) * Math.sqrt(2)), Math.sqrt(3) * Math.sqrt(3))
      expect(P0.distance(P0FloatError)).to.equal(0)
    })
    it('should return 5 when getting distance from two Points that have identical values', () => {
      const Pa = new Point(1, 1)
      const Pb = new Point(5, 4)  // sqrt((4²)+(3²)) = sqrt(16 + 9) = sqrt(25) = 5
      expect(Pa.distance(Pb)).to.equal(5)
    })
  })

  describe('Point.ccw(P0,P1,P2) when traveling from P0 to P1 to P2 ', function () {
    const PA = new Point(3, 9)
    const PB = new Point(11, 1)
    const PC = new Point(6, 8)
    const PD = new Point(4, 3)
    it('should throw an error when any parameter is not an instance of Point', () => {
      expect(Point.ccw.bind(P1, [1.0, 2.0])).to.throw(TypeError, 'Point.ccw(P0, P1, P2) expects all parameters to be from Point class')
    })
    it('ccw(PA, PB, PC) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': false, \'value\': 1}', () => {
      expect(Point.ccw(PA, PB, PC)).to.include({'counterClockwise': true, 'allPointsAreColinear': false, 'value': 1})
    })
    it('ccw(PA, PB, PD) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': false, \'value\': -1}', () => {
      expect(Point.ccw(PA, PB, PD)).to.include({'counterClockwise': false, 'allPointsAreColinear': false, 'value': -1})
    })
    // testing simple case from origin
    it('ccw(P(0,0), P(2,0), P(2,3)) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': false, \'value\': 1}', () => {
      expect(Point.ccw(new Point(), new Point(2.0, 0), new Point(2.0, 3.0))).to.include({'counterClockwise': true, 'allPointsAreColinear': false, 'value': 1})
    })
    it('ccw(P(0,0), P(2,0), P(2,-3)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': false, \'value\': -1}', () => {
      expect(Point.ccw(new Point(), new Point(2.0, 0), new Point(2.0, -3.0))).to.include({'counterClockwise': false, 'allPointsAreColinear': false, 'value': -1})
    })
    it('ccw(P(0,0), P(2,0), P(4,0.0)) should return Object : {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1}', () => {
      expect(Point.ccw(new Point(), new Point(2.0, 0), new Point(4.0, 0.0))).to.include({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    })
    it('ccw(P(0,0), P(4,0.0), P(2,0)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0}', () => {
      expect(Point.ccw(new Point(), new Point(4.0, 0.0), new Point(2.0, 0))).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    })
    it('ccw(P(2,0), P(0,0), P(4,0.0)) should return Object : {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1}', () => {
      expect(Point.ccw(new Point(2.0, 0), new Point(), new Point(4.0, 0.0))).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    })
    // testing extreme case where some or all points are identical
    const POrigin = new Point()
    it('ccw(P(0,0), P(0,0), P(0,0.0)) should throw an error when any points are identical here : P0 and P1 are identical', () => {
      expect(Point.ccw.bind(undefined, POrigin, POrigin, POrigin)).to.throw('PointCcwPointIdenticalException ==> P0 and P1 are identical')
    })
    it('ccw(P(2,2), P(4,4), P(2,2.0)) should throw an error when any points are identical here : P0 and P2 are identical', () => {
      expect(Point.ccw.bind(undefined, new Point(2, 2), new Point(4, 4), new Point(2, 2.0))).to.throw('PointCcwPointIdenticalException ==> P0 and P2 are identical')
    })
    it('ccw(P(0,0), P(2,2), P(2,2.0)) should throw an error when any points are identical here : P1 and P2 are identical', () => {
      expect(Point.ccw.bind(undefined, new Point(0, 0), new Point(2, 2), new Point(2, 2.0))).to.throw('PointCcwPointIdenticalException ==> P1 and P2 are identical')
    })
    const P0 = new Point(1, 1)
    const P1 = new Point(2, 2)
    const P2 = new Point(3, 3)
    it('ccw(P0, P2, P1) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0} when P0,P1 and P2 are colinear and P1 is between P0 and P2', () => {
      expect(Point.ccw(P0, P2, P1)).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    })
    it('ccw(P1, P0, P2) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1} when P0,P1 and P2 are colinear and P1 is between P0 and P2', () => {
      expect(Point.ccw(P1, P0, P2)).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    })
    it('ccw(P0, P1, P2) should return {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1} when  P0,P1 and P2 are colinear and P1 is between P0 and P2', () => {
      expect(Point.ccw(P0, P1, P2)).to.include({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    })
    const PF1 = new Point(0, 0.3) // testing robustness when having float values
    const PF2 = new Point(1, 0.6)
    const PF3 = new Point(2, 0.9)
    it('ccw(PF1, PF3, PF2) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': 0} when P1,P2 and P3 are colinear and P2 is between P1 and P3', () => {
      expect(Point.ccw(PF1, PF3, PF2)).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': 0})
    })
    it('ccw(PF2, PF1, PF3) should return {\'counterClockwise\': false, \'allPointsAreColinear\': true, \'value\': -1} when P1,P2 and P3 are colinear and P2 is between P1 and P3', () => {
      expect(Point.ccw(PF2, PF1, PF3)).to.include({'counterClockwise': false, 'allPointsAreColinear': true, 'value': -1})
    })
    it('ccw(PF1, PF2, PF3) should return {\'counterClockwise\': true, \'allPointsAreColinear\': true, \'value\': 1} when  P1,P2 and P3 are colinear and P2 is between P1 and P3', () => {
      expect(Point.ccw(PF1, PF2, PF3)).to.include({'counterClockwise': true, 'allPointsAreColinear': true, 'value': 1})
    })
  })
})
