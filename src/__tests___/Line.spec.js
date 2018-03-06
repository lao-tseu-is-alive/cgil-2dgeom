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
    L2.startPoint = P1
    L2.endPoint = P0
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
        .toHaveProperty('startPoint', P1)
    })
    test('should allow to set endPoint correctly', () => {
      expect(L2)
        .toHaveProperty('endPoint', P0)
    })
    test('should throw an error if startPoint is not of type Point', () => {
      expect(function () {
        const LineWrong = new Line(P1, [1,0])
      }).toThrow('endPoint setter needs parameter otherPoint of type Point')
    })
    test('should throw an error if startPoint is not of type Point', () => {
      expect(function () {
        const LineWrong = new Line([1,0], P1)
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
    
  })
  
  describe('Line.toString()', () => {
    test('should return a correct string representation', () => {
      expect(L1.toString())
        .toEqual(`Line(${P0.toString()} -> ${P1.toString()})`)
    })
  })

})
