import * as moment from 'moment'
import { DATE_FORMAT } from './customerData'

export const areDatesSameOrConsecutive = (date, lastDate) => {
  const momentDate = moment.utc(date, DATE_FORMAT)
  const lastMomentDate = moment.utc(lastDate, DATE_FORMAT)
  return lastMomentDate.isSame(momentDate) || lastMomentDate.add(1, 'day').isSame(momentDate)
}
