import * as fs from 'fs'
import * as path from 'path'
import { createInterface } from 'readline'

export const getLineReader = (fileName) => {
  const filePath = path.join('testData', fileName)
  if (fs.existsSync(filePath)) {
    const input = fs.createReadStream(filePath)
    return createInterface({ input })
  }

  console.log('Please provide valid file')
  process.exit()
}
