// noinspection NpmUsedModulesInstalled
import * as U from '../utils'

// noinspection Annotator
describe('utils.js module', () => {
  describe('isNumeric should allow to check for valid number', () => {
    test('isNumeric should be a function', () => {
      expect(typeof U.isNumeric).toBe('function')
    })
    test('isNumeric(1.0) should return true', () => {
      expect(U.isNumeric(1.0)).toEqual(true)
    })
    test('isNumeric(0) should return true', () => {
      expect(U.isNumeric(0)).toEqual(true)
    })
    test('isNumeric("2.0") should return true', () => {
      expect(U.isNumeric('2.0')).toEqual(true)
    })
    test('isNumeric("1.0E5") should return true', () => {
      expect(U.isNumeric('1.0E5')).toEqual(true)
    })
    test('isNumeric("dad") should return false', () => {
      expect(U.isNumeric('dad')).toEqual(false)
    })
    test('isNumeric(" ") should return false', () => {
      expect(U.isNumeric(' ')).toEqual(false)
    })
  })

  describe('getRadians(angle) should convert angles in degrees correctly', () => {
    test('getRadians(180, degree) should give PI', () => {
      expect(U.getRadians(180, U.AngularSystem.DEGREE)).toEqual(Math.PI)
    })
    test('getRadians(180) should imply second parameter as should give PI', () => {
      expect(U.getRadians(180)).toEqual(Math.PI)
    })
    test('getRadians(PI, radian) should give PI', () => {
      expect(U.getRadians(Math.PI, U.AngularSystem.RADIAN)).toEqual(Math.PI)
    })
    test('getRadians(200, gradian) should give PI', () => {
      expect(U.getRadians(200, U.AngularSystem.GRADIAN)).toBeCloseTo(Math.PI, U.EPSILON)
    })
  })
  describe('getDegrees(angle) should convert angles in degrees correctly', () => {
    test('getDegrees(180, degree) should give 180', () => {
      expect(U.getDegrees(180, U.AngularSystem.DEGREE)).toEqual(180)
    })
    test('getDegrees(PI, radian) should give 180', () => {
      expect(U.getDegrees(Math.PI, U.AngularSystem.RADIAN)).toEqual(180)
    })
    test('getDegrees(Pi) should imply second parameter as Radian should give 180', () => {
      expect(U.getDegrees(Math.PI)).toEqual(180)
    })
    test('getDegrees(200 in gradians) should give 180', () => {
      expect(U.getDegrees(200, U.AngularSystem.GRADIAN)).toEqual(180)
    })
  })
  describe('getGradians(angle) should convert angles in degrees correctly', () => {
    test('getGradians(Pi/2 in radians) should give 100', () => {
      expect(U.getGradians(Math.PI / 2.0, U.AngularSystem.RADIAN)).toEqual(100)
    })
    test('getGradians(270 in degrees) should give 300', () => {
      expect(U.getGradians(270, U.AngularSystem.DEGREE)).toEqual(300)
    })
    test('getGradians(270) should imply degrees as default second parameter) should give 300', () => {
      expect(U.getGradians(270)).toEqual(300)
    })
    test('getGradians(37 in gradians) should give 37', () => {
      expect(U.getGradians(37, U.AngularSystem.GRADIAN)).toEqual(37)
    })
  })
  describe('fixDec should give a float value rounded to DIGITIZE_PRECISION', () => {
    test('fixDec(Math.sqrt(2) * Math.sqrt(2)) should give 2 ', () => {
      expect(U.fixDec(Math.sqrt(2) * Math.sqrt(2))).toEqual(2)
    })
  })
  describe('roundNumber should give a float value rounded to PRECISION', () => {
    test('fixDec(Math.sqrt(2) * Math.sqrt(2)) should give 2 ', () => {
      expect(U.roundNumber(Math.sqrt(2) * Math.sqrt(2))).toEqual(2)
    })
  })
  describe('roundNumber should give a float value rounded to PRECISION', () => {
    test('fixDec(Math.sqrt(2) * Math.sqrt(2)) should give 2 ', () => {
      expect(U.roundNumber(1 / 3, 2)).toEqual(0.33)
    })
  })
})
