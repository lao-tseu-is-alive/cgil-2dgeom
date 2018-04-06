export const isNumeric = (n) => (!isNaN(parseFloat(n)) && isFinite(n))
export const PRECISION = 10
export const EPSILON = Number(`1e-${PRECISION}`) // 1e-10 or 0.0000000001
export const DIGITIZE_PRECISION = 2 // cm is enough in EPSG:21781
export const AngularSystem = Object.freeze({
  RADIAN: {
    id: 0,
    max: 2 * Math.PI
  },
  DEGREE: {
    id: 1,
    max: 360
  },
  GRADIAN: {
    id: 2,
    max: 400
  }
})

export const getRadians = (angle, angleSystem = AngularSystem.DEGREE) => angle * (AngularSystem.RADIAN.max / angleSystem.max)
export const getDegrees = (angle, angleSystem = AngularSystem.RADIAN) => angle * (AngularSystem.DEGREE.max / angleSystem.max)
export const getGradians = (angle, angleSystem = AngularSystem.DEGREE) => angle * (AngularSystem.GRADIAN.max / angleSystem.max)

/**
 * Rounds number  to a given decimal precision
 *
 * @param {(number|string)} num
 * @param {number} precision display precision
 * @return {number}
 */
export function roundNumber (num, precision = PRECISION) {
  let pair = (num + 'e').split('e')
  let value = Math.round(Number(pair[0] + 'e' + (+pair[1] + precision)))
  pair = (value + 'e').split('e')
  return Number(pair[0] + 'e' + (+pair[1] - precision))
}

export const fixDec = (n) => parseFloat(Number(n).toFixed(DIGITIZE_PRECISION))
