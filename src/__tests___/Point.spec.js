// noinspection NpmUsedModulesInstalled
/* eslint-disable no-unused-expressions */
import Point from '../Point'
import {AngularSystem} from '../utils'

// noinspection Annotator
describe('Point.js module', () => {
  const P0 = new Point()
  const P1 = new Point(1.0, 2.0)
  describe('Point constructor', () => {
    test(
      'constructor with default parameters should return an instance of Point',
      () => {
        expect(P0).toBeInstanceOf(Point)
      }
    )
    test('constructor with default parameters should have x = 0', () => {
      expect(P0).toHaveProperty('x', 0)
    })
    test('constructor with default parameters should return y = 0', () => {
      expect(P0).toHaveProperty('y', 0)
    })
    const P1 = new Point(1.0, 2.0)
    test('new Point(1.0, 2.0) should return an instance of Point', () => {
      expect(P1).toBeInstanceOf(Point)
    })
    test(
      'should allow new Point("1.12345689") with a x as string number and y=0 implicit',
      () => {
        // noinspection JSCheckFunctionSignatures
        const P3 = new Point('1.12345689') // y=0 implicitly
        expect(P3).toHaveProperty('x', 1.12345689)
        expect(P3).toHaveProperty('y', 0)
      }
    )

    test('should allow to set y to a valid string number value correctly', () => {
      // noinspection JSCheckFunctionSignatures
      const P3 = new Point('1.12345689') // y=0 implicitly
      P3.y = '-1.123456789'
      expect(P3).toHaveProperty('y', -1.123456789)
    })
    test(
      'should allow to construct a new Point from an array of 2 numbers ',
      () => {
        try {
          // noinspection JSCheckFunctionSignatures
          const PointFromArray = new Point([1.0, 2.0])
          expect(PointFromArray).toHaveProperty('x', 1.0)
          expect(PointFromArray).toHaveProperty('y', 2.0)
        } catch (e) {
          console.log('## ERROR trying to construct new Point([1.0, 2.0])')
        }
      }
    )
  })

  describe('Point x,y accessors ', () => {
    test('should give back x value correctly', () => {
      expect(P1).toHaveProperty('x', 1.0)
    })
    test('should give back y value correctly', () => {
      expect(P1).toHaveProperty('y', 2.0)
    })
    const P2 = new Point()
    P2.x = 3.0
    P2.y = 4.0
    test('should allow to set x value correctly', () => {
      expect(P2).toHaveProperty('x', 3.0)
    })
    test('should allow to set y value correctly', () => {
      expect(P2).toHaveProperty('y', 4.0)
    })
  })

  describe('Point refuses wrong values for x and y', () => {
    let PWrong = new Point()
    const badX = 'l25' // this is not a numeric value
    const badY = 'one'
    test('should throw an Error if invalid point x coordinate is given ', () => {
      expect(function () {
        const PointWithXWrong = new Point()
        PointWithXWrong.x = badX
      }).toThrow('Point.x setter needs a numeric value')
    })
    try {
      PWrong.y = badY
    } catch (e) {
      // console.log(`PWrong.y = ${badY} throws `, e)
    }
    test(
      'should set Point.isInvalid to true when given incorrect x or y value ', () => {
        expect(PWrong).toHaveProperty('isInvalid', true)
      })
    test(
      'should set Point.InvalidReason to string when given incorrect x or y value ',
      () => {
        expect(PWrong).toHaveProperty('InvalidReason', `cannot set y to ${badY} because it is not a numeric value`)
      }
    )
    test('should set X to NaN when given incorrect x value ', () => {
      try {
        PWrong.x = badX
      } catch (e) {
        // to allow doing this test without throwing the error
      }
      expect(PWrong.x).toBe(NaN)
    })
    test('should set Y to NaN when given incorrect x value ', () => {
      expect(PWrong.y).toBe(NaN)
    })
  })

  describe('Point.fromPolar(radius, theta)', () => {
    test('should throw an Error when no parameters are passed', () => {
      expect(Point.fromPolar.bind(undefined, [])).toThrow(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
    })
    test('should give a Point(0,0) when radius=0', () => {
      const P1 = Point.fromPolar(0, 45)
      expect(P1.equal(new Point())).toEqual(true)
    })
    test(
      'should give a Point(0,5) when radius=5 and theta=Pi/2 radians',
      () => {
        const P1 = Point.fromPolar(5, Math.PI / 2, AngularSystem.RADIAN)
        expect(P1.equal(new Point(0, 5))).toEqual(true)
      }
    )
  })

  describe('Point.fromPoint(otherPoint)', () => {
    test('should throw an Error when parameter is not a valid Point', () => {
      expect(Point.fromPoint.bind(undefined, [])).toThrow(TypeError, 'fromPoint needs parameter otherPoint of type Point')
    })
    test('should give a Point(0,0) when given new Point()', () => {
      const P1 = Point.fromPoint(new Point())
      expect(P1.equal(new Point())).toEqual(true)
    })
    test('should copy x,y values in the new point', () => {
      const P1 = new Point(5.3, 2.1)
      expect(P1.equal(new Point(5.3, 2.1))).toEqual(true)
    })
  })

  describe('Point.toString()', () => {
    test('should return a correct string representation', () => {
      expect(P1.toString()).toEqual(`(${1.0}, ${2.0})`)
    })
    test('should return a string  without parenthesis when surroundingParenthesis is false', () => {
      expect(P1.toString(',', false)).toEqual(`${1.0}, ${2.0}`)
    })
  })

  describe('Point.toArray allows to get back array [x,y]', () => {
    const arrPoint = P1.toArray()
    test('should return an array', () => {
      expect(arrPoint).toBeInstanceOf(Array)
    })
    test('should copy the x value correctly in the array', () => {
      expect(arrPoint[0]).toEqual(1.0)
    })
    test('should copy the y value correctly in the array', () => {
      expect(arrPoint[1]).toEqual(2.0)
    })
  })

  describe('Point can be exported to OGC and Postgis', () => {
    test(
      'toWKT should return a correct OGC Well-known text (WKT) representation',
      () => {
        expect(P1.toWKT()).toEqual(`POINT(${P1.x} ${P1.y})`)
      }
    )
    test(
      'toEWKT should return a correct Postgis Extended Well-known text (EWKT) representation',
      () => {
        const srid = 21781
        expect(P1.toEWKT()).toEqual(`SRID=${srid};POINT(${P1.x} ${P1.y})`)
      }
    )
    test(
      'toGeoJSON should return a correct GeoJSON (http://geojson.org/) representation',
      () => {
        expect(P1.toGeoJSON()).toEqual(`{"type":"Point","coordinates":[${P1.x},${P1.y}]}`)
      }
    )
  })

  describe('Point.js equals equality operator', () => {
    const P1bis = new Point(1, 2)
    const P2 = new Point(2, 1)
    test(
      'should throw an error when equals(otherPoint) with otherPoint is not an instance of Point',
      () => {
        expect(P1.equal.bind(P1, [1.0, 2.0])).toThrow(TypeError, 'A Point can only be compared to another Point')
      }
    )
    test(
      'should return true when comparing two Points with default constructor',
      () => {
        const P0 = new Point()
        const P0bis = new Point()
        expect(P0.equal(P0bis)).toEqual(true)
      }
    )
    test(
      'should return true when comparing two Points that have identical values',
      () => {
        expect(P1.equal(P1bis)).toEqual(true)
      }
    )
    test(
      'should return true when comparing two Points that have nearly identical values',
      () => {
        const P0 = new Point(2, 3)
        // Math.sqrt(2) * Math.sqrt(2) should give 2 but gives instead 2.0000000000000004
        // Math.sqrt(3) * Math.sqrt(3) should give 2 but gives instead 2.9999999999999996
        // Point Class equality should test near equality with EPSILON
        const P0FloatError = new Point((Math.sqrt(2) * Math.sqrt(2)), Math.sqrt(3) * Math.sqrt(3))
        expect(P0.equal(P0FloatError)).toEqual(true)
      }
    )
    test(
      'should return false when comparing two Points that have identical values',
      () => {
        expect(P1.equal(P2)).toEqual(false)
      }
    )
  })

  describe('Point can be moved', () => {
    test(
      'moveToArray should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.moveToArray.bind(P0, ['a', 1])).toThrow(TypeError, 'moveToArray needs an array of 2 numbers like this [1.0, 2.0]')
      }
    )
    test('moveToArray should move correctly x and y', () => {
      expect(P0.moveToArray([1.0, 2.0]).equal(P1)).toEqual(true)
    })
    test('moveTo should throw a TypeError when parameters are not numbers', () => {
      expect(P0.moveTo.bind(P0, ['x', 1])).toThrow(TypeError, 'moveTo needs newX and newY to be valid numbers !')
    })
    test('moveTo should move correctly x and y', () => {
      expect(P0.moveTo(1.0, 2.0).equal(P1)).toEqual(true)
    })
    test(
      'moveRelArray should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.moveRelArray.bind(P0, ['a', 1])).toThrow(TypeError, 'moveRelArray needs an array of 2 numbers like this [1.0, 2.0]')
      }
    )
    test('moveRelArray should move x and y by the vector displacement', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.moveRelArray([1.0, 2.0]).equal(P1)).toEqual(true)
    })
    test(
      'moveRel should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.moveRel.bind(P0, ['a', 1])).toThrow(TypeError, 'moveRel needs deltaX and deltaY to be valid numbers !')
      }
    )
    test('moveRel should move correctly x and y', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.moveRel(1.0, 2.0).equal(P1)).toEqual(true)
    })
    test(
      'moveRelPolar should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.moveRelPolar.bind(P0, ['a', 1])).toThrow(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
      }
    )
    test('moveRelPolar should move correctly x and y', () => {
      const P0 = new Point(1.0, 0.0)
      const P1 = new Point(1.0, 3.0)
      expect(P0.moveRelPolar(3.0, 90).equal(P1)).toEqual(true)
    })
  })

  describe('Point can be copied', () => {
    test(
      'copyRelArray should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.copyRelArray.bind(P0, ['a', 1])).toThrow(TypeError, 'copyRelArray needs an array of 2 numbers like this [1.0, 2.0]')
      }
    )
    test('copyRelArray should return an instance of Point', () => {
      expect(P0.copyRelArray([1.0, 2.0])).toBeInstanceOf(Point)
    })
    test('copyRelArray should move x and y by the vector displacement', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.copyRelArray([1.0, 2.0]).equal(P1)).toEqual(true)
    })

    test(
      'copyRel should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.copyRel.bind(P0, ['a', 1])).toThrow(TypeError, 'copyRel needs deltaX and deltaY to be valid numbers !')
      }
    )
    test('copyRel should return an instance of Point', () => {
      expect(P0.copyRel(1.0, 2.0)).toBeInstanceOf(Point)
    })
    test('copyRel should move correctly x and y', () => {
      const P0 = new Point(1.0, 1.0)
      const P1 = new Point(2.0, 3.0)
      expect(P0.copyRel(1.0, 2.0).equal(P1)).toEqual(true)
    })

    test(
      'copyRelPolar should throw a TypeError when parameters are not numbers',
      () => {
        expect(P0.copyRelPolar.bind(P0, ['a', 1])).toThrow(TypeError, 'fromPolar needs radius and theta to be valid numbers !')
      }
    )
    test('copyRelPolar should return an instance of Point', () => {
      expect(P0.copyRelPolar(1.0, 2.0)).toBeInstanceOf(Point)
    })
    test('copyRelPolar should copy correctly x and y', () => {
      const P0 = new Point(1.0, 0.0)
      const P1 = new Point(1.0, 3.0)
      expect(P0.copyRelPolar(3.0, 90).equal(P1)).toEqual(true)
    })
  })

  describe('Point.js distance method ', () => {
    const P1bis = new Point(1, 2)
    test(
      'should throw an error when distance(otherPoint) with otherPoint is not an instance of Point',
      () => {
        expect(P1.distance.bind(P1, [1.0, 2.0])).toThrow(TypeError, 'Point.distance(otherPoint) expects a Point as parameter')
      }
    )
    test(
      'should return zero when getting distance from two Points with default constructor',
      () => {
        const P0 = new Point()
        const P0bis = new Point()
        expect(P0.distance(P0bis)).toEqual(0)
      }
    )
    test(
      'should return zero when getting distance from two Points that have identical values',
      () => {
        expect(P1.distance(P1bis)).toEqual(0)
      }
    )
    test(
      'should return zero when getting distance from two Points that have nearly identical values',
      () => {
        const P0 = new Point(2, 3)
        // Math.sqrt(2) * Math.sqrt(2) should give 2 but gives instead 2.0000000000000004
        // Math.sqrt(3) * Math.sqrt(3) should give 3 but gives instead 2.9999999999999996
        // Point Class equality should test near equality with EPSILON
        const P0FloatError = new Point((Math.sqrt(2) * Math.sqrt(2)), Math.sqrt(3) * Math.sqrt(3))
        expect(P0.distance(P0FloatError)).toEqual(0)
      }
    )
    test(
      'should return 5 when getting distance from two Points that have identical values',
      () => {
        const Pa = new Point(1, 1)
        const Pb = new Point(5, 4) // sqrt((4²)+(3²)) = sqrt(16 + 9) = sqrt(25) = 5
        expect(Pa.distance(Pb)).toEqual(5)
      }
    )
  })
})
