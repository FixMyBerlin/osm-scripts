import { Feature } from "./types"
import { writeFile } from "./writeFile"

type Props = { data: Feature[]; folder: string; fileNamePart: string }

export const writeGeoJson = ({ data, folder, fileNamePart }: Props) => {
  const geoJsonString = JSON.stringify(
    {
      type: "FeatureCollection",
      features: data,
    },
    null,
    2
  )

  writeFile({
    dataString: geoJsonString,
    outputFolder: folder,
    dataLength: data.length,
    fileNamePart: fileNamePart,
    format: "geojson",
  })
}
