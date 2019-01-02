import { expect } from 'chai'
import { areDatesSameOrConsecutive } from '../app/helper'

describe('Test areDatesSameOrConsecutive', () => {
  it('should return true for same dates', function () {
    const result = areDatesSameOrConsecutive('02-June-2012', '02-June-2012')
    expect(result).to.be.true
  })

  it('should return true for consecutive dates', function () {
    const result = areDatesSameOrConsecutive('02-June-2012', '01-June-2012')
    expect(result).to.be.true
  })

  it('should return false for non consecutive dates', function () {
    const result = areDatesSameOrConsecutive('03-June-2012', '01-June-2012')
    expect(result).to.be.false
  })

  it('should return true for non same dates', function () {
    const result = areDatesSameOrConsecutive('02-June-2012', '03-June-2012')
    expect(result).to.be.false
  })
})
