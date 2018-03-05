// noinspection NpmUsedModulesInstalled
import * as U from '../src/utils'

// noinspection Annotator
describe('utils.js module', function () {
  describe('isNumeric should allow to check for valid number', function () {
    it('isNumeric should be a function', () => {
      expect(U.isNumeric).to.be.a('function')
    })
    it('isNumeric(1.0) should return true', () => {
      expect(U.isNumeric(1.0)).to.equal(true)
    })
    it('isNumeric(0) should return true', () => {
      expect(U.isNumeric(0)).to.equal(true)
    })
    it('isNumeric("2.0") should return true', () => {
      expect(U.isNumeric('2.0')).to.equal(true)
    })
    it('isNumeric("1.0E5") should return true', () => {
      expect(U.isNumeric('1.0E5')).to.equal(true)
    })
    it('isNumeric("dad") should return false', () => {
      expect(U.isNumeric('dad')).to.equal(false)
    })
    it('isNumeric(" ") should return false', () => {
      expect(U.isNumeric(' ')).to.equal(false)
    })
  })

  describe('getDegrees(angle) should convert angles in degrees correctly', function () {
    it('getRadians(180 in degrees) should give PI', () => {
      expect(U.getRadians(180, U.AngularSystem.DEGREE)).to.equal(Math.PI)
    })
    it('getRadians(Pi in radians) should give PI', () => {
      expect(U.getRadians(Math.PI, U.AngularSystem.RADIAN)).to.equal(Math.PI)
    })
    it('getRadians(200 in gradians) should give PI', () => {
      expect(U.getRadians(200, U.AngularSystem.GRADIAN)).to.be.closeTo(Math.PI, U.EPSILON)
    })
  })
  describe('getDegrees(angle) should convert angles in degrees correctly', function () {
    it('getDegrees(180 in degrees) should give 180', () => {
      expect(U.getDegrees(180, U.AngularSystem.DEGREE)).to.equal(180)
    })
    it('getDegrees(Pi in radians) should give 180', () => {
      expect(U.getDegrees(Math.PI, U.AngularSystem.RADIAN)).to.equal(180)
    })
    it('getDegrees(200 in gradians) should give 180', () => {
      expect(U.getDegrees(200, U.AngularSystem.GRADIAN)).to.equal(180)
    })
  })
  describe('getGradians(angle) should convert angles in degrees correctly', function () {
    it('getGradians(Pi/2 in radians) should give 100', () => {
      expect(U.getGradians(Math.PI / 2.0, U.AngularSystem.RADIAN)).to.equal(100)
    })
    it('getGradians(270 in degrees) should give 300', () => {
      expect(U.getGradians(270, U.AngularSystem.DEGREE)).to.equal(300)
    })
    it('getGradians(37 in gradians) should give 37', () => {
      expect(U.getGradians(37, U.AngularSystem.GRADIAN)).to.equal(37)
    })
  })
  describe('fixDec should give a float value rounded to DIGITIZE_PRECISION', function () {
    it('fixDec(Math.sqrt(2) * Math.sqrt(2)) should give 2 ', () => {
      expect(U.fixDec(Math.sqrt(2) * Math.sqrt(2))).to.equal(2)
    })
  })
})
