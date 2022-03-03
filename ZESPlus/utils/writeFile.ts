import fs from "fs"
import { WriteUrlToAllFilesFile } from "../../AllFiles/WriteFileToAllFiles"
import { netlifyFileUrl } from "./netfilfyFileUrl"

type Props = {
  dataString: string
  dataLength: number
  outputFolder: string
  fileNamePart: string
  format: string
}

export const writeFile = ({
  dataString,
  dataLength,
  outputFolder,
  fileNamePart,
  format,
}: Props) => {
  const filePathAndName = `${outputFolder}${fileNamePart}.${format}`

  fs.writeFile(filePathAndName, dataString, function (error) {
    if (error) throw error

    console.log(
      "writeFile()",
      `${format} ${fileNamePart} mit ${dataLength} ${
        format == "geojson" ? "Feature" : "Zeilen/Elementen"
      } geschrieben.`
    )

    WriteUrlToAllFilesFile(netlifyFileUrl(filePathAndName))
  })
}
