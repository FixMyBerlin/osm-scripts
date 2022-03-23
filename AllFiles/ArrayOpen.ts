import fs from "fs"
import { allFilesFile } from "./files.const"

const open = `{
  "GeneratedAt": "${new Date().toISOString()}",
  "AllFiles": [`

fs.appendFile(allFilesFile, open, (err) => {
  if (err) throw err
})
