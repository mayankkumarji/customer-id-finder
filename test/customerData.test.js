import { expect } from 'chai'
import { CustomerData } from '../app/customerData'

describe('Test CustomerData', () => {
  it('should parse tab delimited data ', function () {
    const { customerId, date } = CustomerData.parseData('02-Jun-2012 1:00 AM	4ABCDEF1st')
    expect(customerId).to.equal('4ABCDEF1st')
    expect(date).to.equal('02-Jun-2012')
  })

  it('should add 1 value with respect to date 02-Jun-2012', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '02-Jun-2012')
    expect(customerData.data).to.have.all.keys('02-Jun-2012')
    expect(customerData.data['02-Jun-2012']).to.include('testId')
  })

  it('should add 1 value to repeated customers', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '02-Jun-2012')
    customerData.findConsecutiveCustomers()
    expect(customerData.repeatedCustomers).to.include('testId')
    expect(customerData.repeatedCustomers.size).to.equal(1)
  })

  it('should remove first entry from the data', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '03-Jun-2012')
    customerData.addData('testId', '04-Jun-2012')
    expect(customerData.data).to.have.all.keys('02-Jun-2012', '03-Jun-2012', '04-Jun-2012')
    customerData.removeFirstEntry()
    expect(customerData.data).to.have.all.keys('03-Jun-2012', '04-Jun-2012')
  })

  it('should add data to the customer data', function () {
    const customerData = new CustomerData()
    expect(customerData.data).to.be.empty
    customerData.addData('testId', '02-Jun-2012')
    expect(customerData.data).to.not.be.empty
  })

  it('should return the last entry', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '03-Jun-2012')
    expect(customerData.lastEntry).to.be.equals('03-Jun-2012')
  })

  it('should return all entries', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '03-Jun-2012')
    expect(customerData.entries).to.includes('02-Jun-2012', '03-Jun-2012')
  })

  it('should return number of entries', function () {
    const customerData = new CustomerData()
    customerData.addData('testId', '02-Jun-2012')
    customerData.addData('testId', '03-Jun-2012')
    expect(customerData.entries).to.be.lengthOf(2)
  })
})
