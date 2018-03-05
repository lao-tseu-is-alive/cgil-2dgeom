export function PointCcwPointIdenticalException (message) {
  this.message = message
  this.rule = '## Exception In Point.ccw(P0,P1,P2) ALL POINTS SHOULD BE DIFFERENT :'
  this.toString = function () {
    return this.rule + this.message
  }
}

/*
export default class PointError extends TypeError {
  constructor (errorMessage) {
    super()
    this.message = errorMessage
    this.CLASSNAME = 'Point'
    this.toString = function () {
      return `Error in Class ${this.CLASSNAME}: ${this.message}`
    }
  }
}
*/
