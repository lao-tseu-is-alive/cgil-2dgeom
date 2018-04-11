import * as geom2d from '../index'
import Point from '../Point'
import Line from '../Line'
describe('geom2d index.js module', () => {
  test('it should export Point Class', () => {
    expect(new geom2d.Point()).toBeInstanceOf(Point)
  })
  test('it should export Line Class', () => {
    expect(new geom2d.Line()).toBeInstanceOf(Line)
  })
})
