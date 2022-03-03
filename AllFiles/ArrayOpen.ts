import fs from "fs"
import { allFilesFile } from "./files.const"

fs.appendFile(allFilesFile, "[", (err) => {
  if (err) throw err
})
