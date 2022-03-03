import fs from "fs"
import { allFilesFile } from "./files.const"

fs.appendFile(allFilesFile, "\n]", (err) => {
  if (err) throw err
})
