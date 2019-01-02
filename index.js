import { CustomerData } from './app/customerData'
import { areDatesSameOrConsecutive } from './app/helper'
import { getLineReader } from './app/fileReader'

const customerData = new CustomerData()
const lineReader = getLineReader('sample.txt')
const DAY_LIMIT = parseInt((process.env.NUMBER_OF_CONSECUTIVE_DAYS || '3'), 10)

lineReader.on('line', (line) => {
  const { customerId, date } = CustomerData.parseData(line)
  const lastDate = customerData.lastEntry

  // We will find consecutive customers ids
  // if we have processed logs of more than three consecutive days
  if (customerData.totalEntries >= DAY_LIMIT && !customerData.data[date]) {
    customerData.findConsecutiveCustomers()
  }

  // if new date entry doesn't match with consecutive date rule then we'll clear the data.
  if (!(lastDate && areDatesSameOrConsecutive(date, lastDate))) {
    customerData.clear()
  }

  // Add new processed log.
  customerData.addData(customerId, date)

  // we will remove first processed log entry if we have forth one.
  if (customerData.totalEntries > DAY_LIMIT) {
    customerData.removeFirstEntry()
  }
})

lineReader.on('close', () => {
  if (customerData.totalEntries >= DAY_LIMIT) { customerData.findConsecutiveCustomers() }
  console.log('customer-ids', [...customerData.repeatedCustomers])
})
