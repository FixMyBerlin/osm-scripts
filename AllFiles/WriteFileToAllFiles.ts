import fs from "fs"
import { netlifyFileUrl } from "../ZESPlus/utils/netfilfyFileUrl"
import { allFilesFile } from "./files.const"

export const WriteUrlToAllFilesFile = (url?: string) => {
  if (!url)
    console.error("👉 WriteUrlToAllFilesFile(): Did not receive an URL.")
  if (process.env.WRITE_ALL_FILES_FILE !== "true") {
    console.error(
      "👉 WriteUrlToAllFilesFile(): Skipped. Set `WRITE_ALL_FILES_FILE=true` to enable."
    )
    return
  }

  const string = `\n    "${url}",`

  fs.appendFile(allFilesFile, string, (err) => {
    if (err) throw err
    console.log(
      "🔗 WriteUrlToAllFilesFile():",
      `Added ${url} to AllFiles.json`,
      netlifyFileUrl(allFilesFile)
    )
  })
}
