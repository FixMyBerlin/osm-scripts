import fs from "fs"
import { allFilesFile } from "./files.const"

const open = `{
  "AllFiles": [`

fs.appendFile(allFilesFile, open, (err) => {
  if (err) throw err
})
