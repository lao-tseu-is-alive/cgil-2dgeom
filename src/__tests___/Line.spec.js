/* eslint-disable no-unused-vars */
// noinspection NpmUsedModulesInstalled
import Point from '../Point'
import Line from '../Line'

// noinspection Annotator
describe('Line.js module', () => {
  const L0 = new Line()
  const P0 = new Point()
  const P1 = new Point(1.0, 2.0)
  const L1 = new Line(P0, P1)

  describe('Line constructor', () => {
    test(
      'constructor with default parameters should return an instance of Line',
      () => {
        expect(L0)
          .toBeInstanceOf(Line)
      })
    test(
      'constructor with default parameters should have startPoint of type Point',
      () => {
        expect(L0)
          .toHaveProperty('startPoint') && expect(L0.startPoint)
          .toBeInstanceOf(Point)
      })
    test(
      'constructor with default parameters should return endPoint of type Point',
      () => {
        expect(L0)
          .toHaveProperty('endPoint') && expect(L0.endPoint)
          .toBeInstanceOf(Point)
      })
    test('new Line(P0, P1) should return an instance of Line', () => {
      expect(L1)
        .toBeInstanceOf(Line)
    })
    test('should give back startPoint property correctly', () => {
      expect(L1)
        .toHaveProperty('startPoint', P0)
    })
    test('should give back endPoint property correctly', () => {
      expect(L1)
        .toHaveProperty('endPoint', P1)
    })
    const badValue = 'realWrongXValue'
    const wrongPoint = new Point()
    try {
      // noinspection JSValidateTypes
      wrongPoint.x = badValue
    } catch (e) {
      // console.log(e)
      // to allow doing this test without throwing the error for the Point
    }
    test('constructor should throw an error if invalid startPoint', () => {
      expect(function () {
        const LineWrong = new Line(wrongPoint, P1)
      }).toThrow('Class Line needs a valid startPoint')
    })
    test('constructor should throw an error if invalid endPoint', () => {
      expect(function () {
        const LineWrong = new Line(P0, wrongPoint)
      }).toThrow('Class Line needs a valid endPoint')
    })
    test('constructor should throw an error if startPoint equals endPoint', () => {
      expect(function () {
        const LineWrong = new Line(P1, P1)
      }).toThrow('Class Line needs a endPoint different from startPoint')
    })
  })

  describe('Line startPoint and endPoint accessors', () => {
    const L2 = new Line()
    L2.startPoint = P0
    L2.endPoint = P1
    const badValue = 'wrongXValue'
    const wrongPoint = new Point()
    try {
      wrongPoint.x = badValue
    } catch (e) {
      // console.log(e)
      // to allow doing this test without throwing the error for the Point
    }
    test('should allow to set startPoint correctly', () => {
      expect(L2)
        .toHaveProperty('startPoint', P0)
    })
    test('should allow to set endPoint correctly', () => {
      expect(L2)
        .toHaveProperty('endPoint', P1)
    })
    test('should throw an error if endPoint is not of type Point', () => {
      expect(function () {
        const LineWrong = new Line(P1, [1, 0])
      }).toThrow('endPoint setter needs parameter otherPoint of type Point')
    })
    test('should throw an error if startPoint is not of type Point', () => {
      expect(function () {
        // noinspection JSCheckFunctionSignatures
        const LineWrong = new Line([1, 0], P1)
      }).toThrow('startPoint setter needs parameter otherPoint of type Point')
    })
    test('should throw an error if invalid startPoint', () => {
      expect(function () {
        const LineWrong = new Line(wrongPoint, P1)
      }).toThrow('Class Line needs a valid startPoint')
    })
    test('should throw an error if invalid endPoint', () => {
      expect(function () {
        const LineWrong = new Line(P0, wrongPoint)
      }).toThrow('Class Line needs a valid endPoint')
    })
    test('should throw an error if startPoint setter receives point equals endPoint', () => {
      expect(function () {
        L2.startPoint = P1
      }).toThrow('Class Line needs a startPoint different from endPoint')
    })
    test('should throw an error if endPoint setter receives point equals startPoint', () => {
      expect(function () {
        L2.endPoint = P0
      }).toThrow('Class Line needs a endPoint different from startPoint')
    })
    test('should assign startPoint by value (copy)', () => {
      const POrigin = new Point()
      const L3 = new Line(POrigin, P1)
      const POriginCopy = POrigin.copyRel(0, 0)
      POrigin.moveTo(10, 20)
      expect(L3)
        .toHaveProperty('startPoint', POriginCopy)
    })
    test('should assign endPoint by value (copy)', () => {
      const POrigin = new Point()
      const L3 = new Line(P1, POrigin)
      const POriginCopy = POrigin.copyRel(0, 0)
      POrigin.moveTo(10, 20)
      expect(L3)
        .toHaveProperty('endPoint', POriginCopy)
    })
  })

  describe('Line.toString()', () => {
    test('should return a correct string representation', () => {
      expect(L1.toString())
        .toEqual(`Line(${P0.toString()} -> ${P1.toString()})`)
    })
  })

  describe('Line.toArray allows to get back array [[x1,y1],[x2,y2]]', () => {
    const tmpLineArray = L1.toArray()
    test('should return an array', () => {
      expect(tmpLineArray).toBeInstanceOf(Array)
    })
    test('should copy the startPoint value correctly in the array', () => {
      expect(tmpLineArray[0]).toEqual([0, 0])
    })
    test('should copy the endPoint value correctly in the array', () => {
      expect(tmpLineArray[1]).toEqual([1.0, 2.0])
    })
  })

  describe('Line can be exported to OGC and Postgis', () => {
    test(
      'toWKT should return a correct OGC Well-known text (WKT) representation',
      () => {
        expect(L1.toWKT()).toEqual(`LINESTRING(${L1.startPoint.x} ${L1.startPoint.y}, ${L1.endPoint.x} ${L1.endPoint.y})`)
      }
    )
    test(
      'toEWKT should return a correct Postgis Extended Well-known text (EWKT) representation',
      () => {
        const srid = 21781
        expect(L1.toEWKT()).toEqual(`SRID=${srid};LINESTRING(${L1.startPoint.x} ${L1.startPoint.y}, ${L1.endPoint.x} ${L1.endPoint.y})`)
      }
    )
    test(
      'toGeoJSON should return a correct GeoJSON (http://geojson.org/) representation',
      () => {
        expect(L1.toGeoJSON()).toEqual(`{"type":"LineString","coordinates":[[${L1.startPoint.x},${L1.startPoint.y}],[${L1.endPoint.x},${L1.endPoint.y}]]}`)
      }
    )
  })

  describe('Line.getLength()', () => {
    test('should return the correct length of the line', () => {
      const Pa = new Point(1, 1)
      const Pb = new Point(5, 4) // sqrt((4²)+(3²)) = sqrt(16 + 9) = sqrt(25) = 5
      const LLength = new Line(Pa, Pb)
      expect(LLength.getLength())
        .toEqual(5)
    })
  })

  describe('Line.getSlope()', () => {
    const POrigin = new Point() // 0,0 implicit
    const LHorizontal = new Line(POrigin, new Point(5, 0))
    test('Slope for Line(POrigin, (5, 0))should equal 0 (horizontal line at origin)', () => {
      expect(LHorizontal.getSlope()).toEqual(0)
    })
    test('Slope for Line((1,2), (3, 2))should should equal  0 (horizontal line)', () => {
      expect(new Line(new Point(1, 2), new Point(3, 2)).getSlope()).toEqual(0)
    })
    test('Slope for Line((1,1), (2, 2))should return 1 (45deg line)', () => {
      expect(new Line(new Point(1, 1), new Point(2, 2)).getSlope()).toEqual(1)
    })
    test('Slope for Line((1,1), (2, 0))should return 1 (-45deg line)', () => {
      expect(new Line(new Point(1, 1), new Point(2, 0)).getSlope()).toEqual(-1)
    })
    test('Slope for Line((1,1), (2, 0))should return Infinity (vertical line)', () => {
      expect(new Line(new Point(1, 1), new Point(1, 2)).getSlope()).toEqual(Infinity)
    })
    test('Slope for Line((0.3,0.2), (1.6, 0.5))should return Infinity (vertical line)', () => {
      expect(new Line(new Point(0.3, 0.2), new Point(1.6, 0.5)).getSlope()).toBeCloseTo(0.23076923, 8)
    })
  })

  describe('Line.getYintercept()', () => {
    const POrigin = new Point() // 0,0 implicit
    const LHorizontal = new Line(POrigin, new Point(5, 0))
    test('YIntercept for Line(POrigin, (5, 0))should equal 0 (horizontal line at origin)', () => {
      expect(LHorizontal.getYIntercept()).toEqual(0)
    })
    test('YIntercept for Line((1,2), (3, 2))should should equal  0 (horizontal line)', () => {
      expect(new Line(new Point(1, 2), new Point(3, 2)).getYIntercept()).toEqual(2)
    })
    test('YIntercept for Line((1,1), (2, 2))should return 1 (45deg line)', () => {
      expect(new Line(new Point(1, 1), new Point(2, 2)).getYIntercept()).toEqual(0)
    })
    test('YIntercept for Line((1,1), (2, 0))should return 1 (-45deg line)', () => {
      expect(new Line(new Point(1, 1), new Point(2, 0)).getYIntercept()).toEqual(2)
    })
    test('YIntercept for Line((1,1), (2, 0))should return Infinity (vertical line)', () => {
      expect(new Line(new Point(1, 1), new Point(1, 2)).getYIntercept()).toEqual(NaN)
    })
    test('YIntercept for Line((0.3,0.2), (1.6, 0.5))should return Infinity (vertical line)', () => {
      expect(new Line(new Point(0.3, 0.2), new Point(1.6, 0.5)).getYIntercept()).toBeCloseTo(0.13076923, 8)
    })
  })
})
