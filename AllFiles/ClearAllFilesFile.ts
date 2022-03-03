import fs from "fs"
import { allFilesFile } from "./files.const"

fs.truncate(allFilesFile, 0, function () {
  console.log("ClearAllFiles: File is empty again")
})
