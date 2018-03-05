// noinspection NpmUsedModulesInstalled
import Point from '../src/Point'
import Line from '../src/Line'

// noinspection Annotator
describe('Line.js', function () {
  const L0 = new Line()
  const P0 = new Point()
  const P1 = new Point(1.0, 2.0)
  const L1 = new Line(P0, P1)
  const L2 = new Line()
  L2.startPoint = P1
  before(function () {
    // executed before the begin of test :    https://mochajs.org/#hooks
  })
  it('constructor with default parameters should return an instance of Line', () => {
    expect(L0).to.be.an.instanceOf(Line)
  })
  it('constructor with default parameters should have startPoint of type Point', () => {
    expect(L0).to.have.property('startPoint').and.to.be.an.instanceof(Point)
  })
  it('constructor with default parameters should return endPoint of type Point', () => {
    expect(L0).to.have.property('endPoint').and.to.be.an.instanceof(Point)
  })
  it('new Point(1.0, 2.0) should return an instance of Line', () => {
    expect(L1).to.be.an.instanceOf(Line)
  })
  it('should give back startPoint value correctly', () => {
    expect(L1).to.have.property('startPoint', P0)
  })
  it('should give back y value correctly', () => {
    expect(L1).to.have.property('endPoint', P1)
  })
  it('should allow to set startPoint value correctly', () => {
    expect(L2).to.have.property('startPoint', P1)
  })
  it('should allow to set y value correctly', () => {
    expect(L2).to.have.property('endPoint')
  })
  it('toString should return a correct string representation', () => {
    expect(L1.toString()).to.equal(`Line(${P0.toString()} -> ${P1.toString()})`)
  })
})
