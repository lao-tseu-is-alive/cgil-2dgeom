// noinspection NpmUsedModulesInstalled
import Point from '../src/Point'
import Line from '../src/Line'

// noinspection Annotator
describe('Line.js', () => {
  const L0 = new Line()
  const P0 = new Point()
  const P1 = new Point(1.0, 2.0)
  const L1 = new Line(P0, P1)
  const L2 = new Line()
  L2.startPoint = P1
  beforeAll(function () {
    // executed before the begin of test :    https://mochajs.org/#hooks
  })
  test(
    'constructor with default parameters should return an instance of Line',
    () => {
      expect(L0).toBeInstanceOf(Line)
    }
  )
  test(
    'constructor with default parameters should have startPoint of type Point',
    () => {
      expect(L0).toHaveProperty('startPoint') && expect(L0.startPoint).toBeInstanceOf(Point)
    }
  )
  test(
    'constructor with default parameters should return endPoint of type Point',
    () => {
      expect(L0).toHaveProperty('endPoint') && expect(L0.endPoint).toBeInstanceOf(Point)
    }
  )
  test('new Point(1.0, 2.0) should return an instance of Line', () => {
    expect(L1).toBeInstanceOf(Line)
  })
  test('should give back startPoint value correctly', () => {
    expect(L1).toHaveProperty('startPoint', P0)
  })
  test('should give back y value correctly', () => {
    expect(L1).toHaveProperty('endPoint', P1)
  })
  test('should allow to set startPoint value correctly', () => {
    expect(L2).toHaveProperty('startPoint', P1)
  })
  test('should allow to set y value correctly', () => {
    expect(L2).toHaveProperty('endPoint')
  })
  test('toString should return a correct string representation', () => {
    expect(L1.toString()).toEqual(`Line(${P0.toString()} -> ${P1.toString()})`)
  })
})
