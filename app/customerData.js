import * as moment from 'moment'

export const DATE_FORMAT = 'DD-MMM-YYYY'

export class CustomerData {
  static parseData (line) {
    const [date, customerId] = line.split('\t')
    const formattedDate = moment.utc(date, 'DD-MMM-YYYY h:mm A').format(DATE_FORMAT)
    return { customerId, date: formattedDate }
  };

  constructor () {
    this.data = {}
    this.repeatedCustomers = new Set()
  }

  addData (customerId, date) {
    if (this.data[date]) {
      return this.data[date].add(customerId)
    }

    this.data[date] = new Set([customerId])
  }

  clear () {
    this.data = {}
  }

  get lastEntry () {
    return this.entries[this.totalEntries - 1]
  }

  get entries () {
    return Object.keys(this.data)
  }

  get totalEntries () {
    return this.entries.length
  }

  findConsecutiveCustomers () {
    Object.values(this.data)
      .map(a => [...a])
      .reduce((a, b) => a.filter(c => b.includes(c)))
      .forEach(id => { this.repeatedCustomers.add(id) })
  }

  removeFirstEntry () {
    const key = this.entries.splice(0, 1)[0]
    delete this.data[key]
  }
}
