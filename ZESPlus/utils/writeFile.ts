import fs from "fs"

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
  const resultPostFix = dataLength ? "" : "--empty"

  fs.writeFile(
    `${outputFolder}${fileNamePart}${resultPostFix}.${format}`,
    dataString,
    function (error) {
      if (error) throw error

      console.log(
        `${format} ${fileNamePart} mit ${dataLength} ${
          format == "geojson" ? "Feature" : "Zeilen/Elementen"
        } geschrieben.`
      )
    }
  )
}
