import fs from "fs"
import { allFilesFile } from "./files.const"

const close = `
  ]
}`

fs.appendFile(allFilesFile, close, (err) => {
  if (err) throw err
})
